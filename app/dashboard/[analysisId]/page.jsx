"use client";
import { db } from '@/app/configs/db';
import { useUser } from '@clerk/nextjs';
import { and, eq } from 'drizzle-orm';
import React, { useEffect, useState } from 'react';

function AnalysisPage({ params: paramsPromise }) {
  const { user } = useUser();
  const [analysisData, setAnalysisData] = useState(null);
  const [params, setParams] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    paramsPromise.then(setParams);
  }, [paramsPromise]);

  useEffect(() => {
    if (params && user?.id) {
      getAnalysis();
    }
  }, [params, user]);

  const getAnalysis = async () => {
    if (!params?.analysisId) return;
    setLoading(true);
    try {
      const result = await db
        .select()
        .from(AnalysisList)
        .where(
          and(
            eq(AnalysisList.analysisId, params.analysisId),
            eq(AnalysisList.userid, user.id)
          )
        );
      const analysis = result[0]?.analysis;
      if (typeof analysis === 'string') {
        setAnalysisData(JSON.parse(analysis));
      } else {
        setAnalysisData(analysis);
      }
    } catch (error) {
      console.error("Error fetching analysis:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">AI Symptom Analysis</h1>

      {loading && <p className="text-gray-600">Loading analysis...</p>}

      {!loading && !analysisData && <p>No analysis data found.</p>}

      {!loading && analysisData && (
        <div className="space-y-6">
          {/* Symptoms */}
          <div>
            <h2 className="text-xl font-semibold">Your Symptoms:</h2>
            <ul className="list-disc list-inside mt-2 text-gray-800">
              {analysisData.symptoms.map((symptom, idx) => (
                <li key={idx}>{symptom}</li>
              ))}
            </ul>
          </div>

          {/* Possible Conditions */}
          <div>
            <h2 className="text-xl font-semibold">Possible Conditions:</h2>
            <div className="space-y-4 mt-4">
              {analysisData.possible_conditions.map((condition, idx) => (
                <div key={idx} className="bg-white p-4 rounded-xl shadow border border-gray-200">
                  <h3 className="text-lg font-bold text-red-600">{condition.condition}</h3>
                  <p className="text-sm text-gray-600 italic">Likelihood: {condition.likelihood}</p>
                  <p className="mt-2 text-gray-800">{condition.description}</p>

                  <div className="mt-3">
                    <p className="font-medium">Potential Treatments:</p>
                    <ul className="list-disc list-inside mt-1 text-gray-700">
                      {condition.potential_treatments.map((treatment, tIdx) => (
                        <li key={tIdx}>{treatment}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Important Note */}
          {analysisData.important_note && (
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-md text-sm text-yellow-800">
              <strong>Note:</strong> {analysisData.important_note}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default AnalysisPage;
