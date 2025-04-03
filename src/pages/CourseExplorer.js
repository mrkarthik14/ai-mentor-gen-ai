import React from 'react';
import { useAuth } from '../contexts/AuthContext';

const CourseExplorer = () => {
  const { user } = useAuth();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Course Explorer</h1>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <p className="text-gray-600 dark:text-gray-300">
          Discover and enroll in courses that match your career goals.
        </p>
      </div>
    </div>
  );
};

export default CourseExplorer; 