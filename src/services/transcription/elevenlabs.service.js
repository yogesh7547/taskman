import fs from "fs";
import axios from "axios";
import FormData from "form-data";

export const transcribeAudio = async (
  filePath
) => {
  try {
    const formData = new FormData();

    formData.append(
      "file",
      fs.createReadStream(filePath)
    );

    formData.append(
      "model_id",
      "scribe_v1"
    );

    const response = await axios.post(
      "https://api.elevenlabs.io/v1/speech-to-text",
      formData,
      {
        headers: {
          ...formData.getHeaders(),

          "xi-api-key":
            process.env.ELEVENLABS_API_KEY,
        },
      }
    );

    // console.log(response.data);

    return response.data.text;
  } catch (error) {
    console.error(
      "ElevenLabs transcription error:"
    );

    console.error(
      error.response?.data || error.message
    );

    throw error;
  }
};