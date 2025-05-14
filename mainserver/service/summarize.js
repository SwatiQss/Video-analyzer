// backend/summarize.js
const axios = require("axios");

const HUGGINGFACE_API_TOKEN = "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"; // Secure this in env in production

async function summarizeText(text) {
  const response = await axios.post(
    "https://api-inference.huggingface.co/models/t5-base",
    {
      inputs: `summarize: ${text}`,
    },
    {
      headers: {
        Authorization: `Bearer ${HUGGINGFACE_API_TOKEN}`,
      },
    }
  );

  return response.data[0]?.generated_text || "No summary generated";
}

module.exports = { summarizeText };
