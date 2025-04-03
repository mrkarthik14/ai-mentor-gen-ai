const express = require('express');
const router = express.Router();
const multer = require('multer');
const { authenticateToken } = require('../middleware/auth');
const {
  handleTextChat,
  handleVoiceChat,
  handleScreenAnalysis,
  handleFileAnalysis,
  handleImageAnalysis,
} = require('../services/aiService');

// Configure multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Text Chat
router.post('/chat/text', authenticateToken, async (req, res) => {
  try {
    const { message, model } = req.body;
    const response = await handleTextChat(message, model);
    res.json({ message: response });
  } catch (error) {
    console.error('Error in text chat route:', error);
    res.status(500).json({ error: error.message });
  }
});

// Voice Chat
router.post('/chat/voice', authenticateToken, upload.single('audio'), async (req, res) => {
  try {
    const { model } = req.body;
    const audioBuffer = req.file.buffer;
    const response = await handleVoiceChat(audioBuffer, model);
    res.json(response);
  } catch (error) {
    console.error('Error in voice chat route:', error);
    res.status(500).json({ error: error.message });
  }
});

// Screen Analysis
router.post('/chat/screen', authenticateToken, upload.single('image'), async (req, res) => {
  try {
    const { model } = req.body;
    const imageBuffer = req.file.buffer;
    const response = await handleScreenAnalysis(imageBuffer, model);
    res.json({ message: response });
  } catch (error) {
    console.error('Error in screen analysis route:', error);
    res.status(500).json({ error: error.message });
  }
});

// File Analysis
router.post('/chat/files', authenticateToken, upload.single('file'), async (req, res) => {
  try {
    const { model } = req.body;
    const fileBuffer = req.file.buffer;
    const response = await handleFileAnalysis(fileBuffer, model);
    res.json({ message: response });
  } catch (error) {
    console.error('Error in file analysis route:', error);
    res.status(500).json({ error: error.message });
  }
});

// Image Analysis
router.post('/chat/images', authenticateToken, upload.single('image'), async (req, res) => {
  try {
    const { model } = req.body;
    const imageBuffer = req.file.buffer;
    const response = await handleImageAnalysis(imageBuffer, model);
    res.json({ message: response });
  } catch (error) {
    console.error('Error in image analysis route:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router; 