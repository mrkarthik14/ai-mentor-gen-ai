import React from 'react';
import { useAuth } from '../contexts/AuthContext';

const JobMatching = () => {
  const { user } = useAuth();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Job Matching</h1>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <p className="text-gray-600 dark:text-gray-300">
          Find the perfect job matches based on your skills and preferences.
        </p>
      </div>
    </div>
  );
};

export default JobMatching; 