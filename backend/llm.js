const OpenAI = require('openai');
require('dotenv').config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const generateSummary = async (oldContent, newContent, changes) => {
  try {
    const prompt = `Analyze the following changes between two versions of a competitor's webpage.

OLD CONTENT (first 500 chars):
${oldContent.substring(0, 500)}

NEW CONTENT (first 500 chars):
${newContent.substring(0, 500)}

DETECTED CHANGES:
${changes.substring(0, 1000)}

Provide a concise summary of:
1. What changed (pricing, features, documentation, etc.)
2. Key differences that matter for competitive analysis
3. Notable additions or removals

Keep it under 200 words.`;

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 300,
      temperature: 0.7,
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error('OpenAI API error:', error);
    return 'Summary generation failed. Please check your API key.';
  }
};

const testConnection = async () => {
  try {
    await openai.models.list();
    return true;
  } catch (error) {
    return false;
  }
};

module.exports = { generateSummary, testConnection };
