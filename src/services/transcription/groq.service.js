import fs from "fs";
import Groq from "groq-sdk";

export const transcribeAudio = async (
  filePath
) => {
  try {
    // Initialize client INSIDE function
    const groq = new Groq({
      apiKey: process.env.GROQ_API_KEY,
    });

    // Create transcription
    const transcription =
      await groq.audio.transcriptions.create({
        file: fs.createReadStream(filePath),

        model: "whisper-large-v3-turbo",

        response_format: "verbose_json",

        language: "en",

        temperature: 0.0,
      });

    console.log(transcription);

    return transcription.text;
  } catch (error) {
    console.error(
      "Groq transcription error:",
      error
    );

    throw error;
  }
};