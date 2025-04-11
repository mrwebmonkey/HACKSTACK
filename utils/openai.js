// openrouter.js (Create this file or use in your route)
const axios = require('axios');
require('dotenv').config(); // If using .env to store your key

async function getProjectIdeas(promptText) {
  try {
    const response = await axios.post(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        model: 'openai/gpt-3.5-turbo', // You can also try 'mistralai/mistral-7b-instruct'
        messages: [
          {
            role: 'user',
            content: promptText
          }
        ]
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`, // Or paste key directly
          'HTTP-Referer': 'https://yourwebsite.com', // Your website or GitHub project link
          'X-Title': 'HackStack AI Search'
        }
      }
    );

    return response.data.choices[0].message.content;

  } catch (error) {
    console.error('AI Request failed:', error.response?.data || error.message);
    return 'Sorry, something went wrong!';
  }
}

module.exports = getProjectIdeas;
