'use client';
import { useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import Link from 'next/link';
import { db } from '@/app/configs/db';
import { AnalysisList } from '@/app/configs/schema';
import { eq } from 'drizzle-orm';

function DashboardPage() {
    const { user } = useUser();
    const [analysisList, setAnalysisList] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserReports = async () => {
            if (!user) return;
            setLoading(true);
            const result = await db
                .select()
                .from(AnalysisList)
                .where(eq(AnalysisList.userid, user.id));
            setAnalysisList(result);
            setLoading(false);
        };

        fetchUserReports();
    }, [user]);

    if (loading) return <div className="p-6 text-gray-700">Loading...</div>;

    if (!analysisList.length)
        return <div className="p-6 text-gray-700">No analysis reports found.</div>;

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <h1 className="text-3xl font-bold mb-6">Your Analysis Reports</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {analysisList.map((report) => (
                    <Link key={report.analysisId} href={`/dashboard/${report.analysisId}`}>
                        <div className="cursor-pointer bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition">
                            <h2 className="text-xl font-semibold mb-2">Report ID: {report.analysisId.slice(0, 8)}...</h2>
                            <p className="text-gray-700 mb-1">
                                <strong>Symptoms:</strong> {report.symptom.slice(0, 100)}...
                            </p>
                            <p className="text-sm text-gray-500">
                                Click to view full analysis
                            </p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default DashboardPage;
