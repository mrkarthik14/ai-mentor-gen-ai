require('dotenv').config();

const aiConfig = {
  openai: {
    apiKey: process.env.OPENAI_API_KEY,
    models: {
      'gpt-4': 'gpt-4',
      'gpt-3.5-turbo': 'gpt-3.5-turbo',
      'gpt-4-vision': 'gpt-4-vision-preview',
    },
  },
  anthropic: {
    apiKey: process.env.ANTHROPIC_API_KEY,
    models: {
      'claude-3-opus': 'claude-3-opus-20240229',
      'claude-3-sonnet': 'claude-3-sonnet-20240229',
    },
  },
  google: {
    apiKey: process.env.GOOGLE_API_KEY,
    models: {
      'gemini-pro': 'gemini-pro',
      'gemini-pro-vision': 'gemini-pro-vision',
    },
  },
  deepseek: {
    apiKey: process.env.DEEPSEEK_API_KEY,
    models: {
      'deepseek-chat': 'deepseek-chat',
    },
  },
  grok: {
    apiKey: process.env.GROK_API_KEY,
    models: {
      'grok-1': 'grok-1',
    },
  },
};

module.exports = aiConfig; 