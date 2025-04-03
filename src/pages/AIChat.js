import React from 'react';
import { useAuth } from '../contexts/AuthContext';

const AIChat = () => {
  const { user } = useAuth();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">AI Chat</h1>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <p className="text-gray-600 dark:text-gray-300">
          Welcome to the AI Chat feature. This is where you can interact with our AI mentor.
        </p>
      </div>
    </div>
  );
};

export default AIChat; 