import axios from "axios";

// Featherless.ai API endpoint
const FEATHERLESS_API_URL = "https://api.featherless.ai/inference";

const FEATHERLESS_API_KEY = process.env.REACT_APP_FEATHERLESS_KEY;

/**
 * Fetches a motivational study tip from Featherless.ai
 * @returns {Promise<string>} A motivational message
 */
export async function getMotivation() {
  try {
    const res = await axios.post(
      FEATHERLESS_API_URL,
      { prompt: "Give me a short motivational study tip for students." },
      {
        headers: {
          Authorization: `Bearer ${FEATHERLESS_API_KEY}`,
          "Content-Type": "application/json"
        },
        timeout: 5000
      }
    );

    console.log("Featherless response:", res.data);

    // Adjust this if Featherless returns a different field
    return res.data.output || "Keep going, you're doing great!";
  } catch (err) {
    console.error("Featherless API error:", err);
    return "Stay focused and keep learning!";
  }
}