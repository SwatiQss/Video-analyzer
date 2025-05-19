const axios = require("axios");

const HUGGINGFACE_API_TOKEN = "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";
const HUGGINGFACE_MODEL = "sshleifer/distilbart-cnn-12-6";

async function summarizeText(text) {
  console.log("In summarizeText function");

  const cleanedText = text.trim();

  if (cleanedText.length < 50) {
    console.warn("Input too short for summarization.");
    return "Input too short to summarize.";
  }

  const maxLength = 1000;
  const truncatedText = cleanedText.length > maxLength ? cleanedText.slice(0, maxLength) : cleanedText;

  try {
    const response = await axios.post(
      `https://api-inference.huggingface.co/models/${HUGGINGFACE_MODEL}`,
      { inputs: truncatedText },
      {
        headers: {
          Authorization: `Bearer ${HUGGINGFACE_API_TOKEN}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );

    if (Array.isArray(response.data) && response.data[0]?.summary_text) {
      return response.data[0].summary_text;
    } else {
      console.log("Unexpected response format:", response.data);
      return "No summary found.";
    }
  } catch (error) {
    console.error("Error calling Hugging Face API:", error.response?.data || error.message);
    throw new Error("Failed to summarize");
  }
}


module.exports = { summarizeText };
