'use client';
import { UserButton, useUser } from '@clerk/nextjs';
import React, { useContext, useState } from 'react';
import { SymptomInputContext } from '../_context/SymptomInputContext';
import { GenerateSymptomAnalysis } from '../configs/AiModel';
import { AnalysisList } from '../configs/schema';
import uuid4 from 'uuid4';
import { db } from '../configs/db';
import { useRouter } from 'next/navigation';


function DashboardLayout() {
    const { userSymptomInput, setUserSymptomInput } = useContext(SymptomInputContext);
    const [loading, setLoading] = useState(false);
    const [showAnalysisButton, setShowAnalysisButton] = useState(false);
    const { user } = useUser();
    const router = useRouter();
    const [analysisId, setAnalysisId] = useState(null);

    const handleInputChange = (e) => {
        setUserSymptomInput(prev => ({
            ...prev,
            symptoms: e.target.value
        }));
    };

    const GenerateAnalysis = async () => {
        setLoading(true);
        const PROMPT = `I have been facing these symptoms: ${userSymptomInput.symptoms}. Analyze what problem or disease I'm most likely having, and also share the potential solution/treatment for the same in pure JSON format, no disclaimer about you not being able to provide medical diagnosis.`;
        console.log("Prompt for AI:", PROMPT);
        const res = await GenerateSymptomAnalysis.sendMessage(PROMPT);
        console.log("AI Response:", res);
        console.log(JSON.parse(res.response?.text()))
        SaveAnalysisInDb(JSON.parse(res.response?.text()));
        setLoading(false);
    }




    const handleSubmit = () => {
        console.log("User Symptoms:", userSymptomInput.symptoms);
        const prompt = `I have been facing these symptoms: ${userSymptomInput.symptoms}. Analyze what problem or disease I'm most likely having, and also share the potential solution/treatment for the same in pure JSON format, no disclaimer about you not being able to provide medical diagnosis.`;
        console.log("Prompt for AI:", prompt);
    };

    console.log("USer:", userSymptomInput);

    const SaveAnalysisInDb = async (Analysis) => {
        setLoading(true);
        const newId = uuid4(); // Generate the ID
        await db.insert(AnalysisList).values({
            analysisId: newId,
            userid: user?.id,
            symptom: userSymptomInput?.symptoms,
            analysis: Analysis,
        });
        setAnalysisId(newId); // <-- Step 2: Store it in state
        setShowAnalysisButton(true);
        setLoading(false);
    };

    return (
        <div className="min-h-screen bg-white text-gray-800 p-6">
            <header className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-bold">AI Symptom Checker</h1>

            </header>

            <main className="max-w-2xl mx-auto bg-gray-100 p-8 rounded-2xl shadow-md">
                <h2 className="text-xl font-semibold mb-4">Describe Your Symptoms</h2>
                <p className="text-sm text-gray-600 mb-6">
                    Please enter your symptoms in detail. Our AI assistant will analyze them and provide possible suggestions.
                </p>

                <textarea
                    className="w-full h-40 p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-400 resize-none"
                    placeholder="e.g. I've been feeling feverish and tired for the past 2 days..."
                    onChange={handleInputChange}
                    defaultValue={userSymptomInput?.symptoms}
                />

                <button
                    className={`mt-6 text-white py-3 px-6 rounded-xl font-medium transition ${loading
                            ? 'bg-gray-400 cursor-not-allowed'
                            : showAnalysisButton
                                ? 'bg-green-500 hover:bg-green-600'
                                : 'bg-red-500 hover:bg-red-600'
                        }`}
                    onClick={() => {
                        if (showAnalysisButton) {
                            router.push(`/dashboard/${analysisId}`);
                        } else {
                            handleSubmit();
                            GenerateAnalysis();
                        }
                    }}
                    disabled={loading}
                >
                    {loading
                        ? 'Analyzing...'
                        : showAnalysisButton
                            ? 'Show Analysis'
                            : 'Analyze Symptoms'}
                </button>

                

            </main>
        </div>
    );
}

export default DashboardLayout;
