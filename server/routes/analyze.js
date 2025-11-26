const express = require('express');
const router = express.Router();
const { getAnalysisAndRoadmap } = require('../utils/googleAiClient');

router.post('/', async (req, res) => {
  try {
    const { context, answers, language = 'en' } = req.body;

    if (!context || !answers) {
      return res.status(400).json({ error: 'Missing context or answers' });
    }

    console.log('Received request:', { context, answerCount: Object.keys(answers).length, language });

    const analysis = await getAnalysisAndRoadmap(context, answers, language);
    res.json(analysis);
  } catch (error) {
    console.error('Error in /api/analyze:', error);
    console.error('Error message:', error.message);
    if (error.response) {
      console.error('API Response:', error.response.data);
    }
    res.status(500).json({ error: 'Internal server error', details: error.message });
  }
});

module.exports = router;
