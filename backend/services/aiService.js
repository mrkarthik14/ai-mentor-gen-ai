const OpenAI = require('openai');
const Anthropic = require('@anthropic-ai/sdk');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const aiConfig = require('../config/ai');

// Initialize AI clients
const openai = new OpenAI({ apiKey: aiConfig.openai.apiKey });
const anthropic = new Anthropic({ apiKey: aiConfig.anthropic.apiKey });
const genAI = new GoogleGenerativeAI(aiConfig.google.apiKey);

// Helper function to determine which AI service to use
const getAIService = (model) => {
  if (aiConfig.openai.models[model]) return 'openai';
  if (aiConfig.anthropic.models[model]) return 'anthropic';
  if (aiConfig.google.models[model]) return 'google';
  if (aiConfig.deepseek.models[model]) return 'deepseek';
  if (aiConfig.grok.models[model]) return 'grok';
  throw new Error('Unsupported AI model');
};

// Text Chat
const handleTextChat = async (message, model) => {
  const service = getAIService(model);
  
  try {
    switch (service) {
      case 'openai':
        const completion = await openai.chat.completions.create({
          model: aiConfig.openai.models[model],
          messages: [{ role: 'user', content: message }],
        });
        return completion.choices[0].message.content;

      case 'anthropic':
        const message = await anthropic.messages.create({
          model: aiConfig.anthropic.models[model],
          max_tokens: 1000,
          messages: [{ role: 'user', content: message }],
        });
        return message.content[0].text;

      case 'google':
        const genModel = genAI.getGenerativeModel({ model: aiConfig.google.models[model] });
        const result = await genModel.generateContent(message);
        return result.response.text();

      case 'deepseek':
        // Implement DeepSeek API call
        throw new Error('DeepSeek integration not implemented');

      case 'grok':
        // Implement Grok API call
        throw new Error('Grok integration not implemented');

      default:
        throw new Error('Unsupported AI service');
    }
  } catch (error) {
    console.error('Error in text chat:', error);
    throw error;
  }
};

// Voice Chat
const handleVoiceChat = async (audioBuffer, model) => {
  try {
    // Convert audio to text using Whisper
    const transcription = await openai.audio.transcriptions.create({
      file: audioBuffer,
      model: 'whisper-1',
    });

    // Get AI response
    const response = await handleTextChat(transcription.text, model);

    return {
      transcription: transcription.text,
      response,
    };
  } catch (error) {
    console.error('Error in voice chat:', error);
    throw error;
  }
};

// Screen Analysis
const handleScreenAnalysis = async (imageBuffer, model) => {
  const service = getAIService(model);
  
  try {
    switch (service) {
      case 'openai':
        const completion = await openai.chat.completions.create({
          model: aiConfig.openai.models[model],
          messages: [
            {
              role: 'user',
              content: [
                {
                  type: 'text',
                  text: 'Please analyze this screen capture and provide insights.',
                },
                {
                  type: 'image_url',
                  image_url: {
                    url: `data:image/jpeg;base64,${imageBuffer.toString('base64')}`,
                  },
                },
              ],
            },
          ],
        });
        return completion.choices[0].message.content;

      case 'google':
        const genModel = genAI.getGenerativeModel({ model: aiConfig.google.models[model] });
        const result = await genModel.generateContent([
          'Please analyze this screen capture and provide insights.',
          {
            inlineData: {
              mimeType: 'image/jpeg',
              data: imageBuffer.toString('base64'),
            },
          },
        ]);
        return result.response.text();

      default:
        throw new Error('Unsupported AI service for screen analysis');
    }
  } catch (error) {
    console.error('Error in screen analysis:', error);
    throw error;
  }
};

// File Analysis
const handleFileAnalysis = async (fileBuffer, model) => {
  try {
    // Convert file content to text
    const text = fileBuffer.toString('utf-8');
    
    // Get AI response
    const response = await handleTextChat(text, model);
    
    return response;
  } catch (error) {
    console.error('Error in file analysis:', error);
    throw error;
  }
};

// Image Analysis
const handleImageAnalysis = async (imageBuffer, model) => {
  const service = getAIService(model);
  
  try {
    switch (service) {
      case 'openai':
        const completion = await openai.chat.completions.create({
          model: aiConfig.openai.models[model],
          messages: [
            {
              role: 'user',
              content: [
                {
                  type: 'text',
                  text: 'Please analyze this image and provide insights.',
                },
                {
                  type: 'image_url',
                  image_url: {
                    url: `data:image/jpeg;base64,${imageBuffer.toString('base64')}`,
                  },
                },
              ],
            },
          ],
        });
        return completion.choices[0].message.content;

      case 'google':
        const genModel = genAI.getGenerativeModel({ model: aiConfig.google.models[model] });
        const result = await genModel.generateContent([
          'Please analyze this image and provide insights.',
          {
            inlineData: {
              mimeType: 'image/jpeg',
              data: imageBuffer.toString('base64'),
            },
          },
        ]);
        return result.response.text();

      default:
        throw new Error('Unsupported AI service for image analysis');
    }
  } catch (error) {
    console.error('Error in image analysis:', error);
    throw error;
  }
};

module.exports = {
  handleTextChat,
  handleVoiceChat,
  handleScreenAnalysis,
  handleFileAnalysis,
  handleImageAnalysis,
}; 