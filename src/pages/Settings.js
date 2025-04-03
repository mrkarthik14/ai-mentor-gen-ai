import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';

const Settings = () => {
  const { user } = useAuth();
  const { darkMode, toggleTheme } = useTheme();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Settings</h1>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <div className="mb-4">
          <h2 className="text-xl font-semibold mb-2">Theme Settings</h2>
          <button
            onClick={toggleTheme}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          >
            Toggle {darkMode ? 'Light' : 'Dark'} Mode
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings; 