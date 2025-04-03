import React from 'react';
import { useAuth } from '../contexts/AuthContext';

const ResumeAnalysis = () => {
  const { user } = useAuth();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Resume Analysis</h1>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <p className="text-gray-600 dark:text-gray-300">
          Upload your resume for AI-powered analysis and feedback.
        </p>
      </div>
    </div>
  );
};

export default ResumeAnalysis; 