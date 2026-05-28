import { GoogleGenerativeAI } from "@google/generative-ai";

export const analyzeMeetingTranscript =
  async (transcript) => {
    try {
      const genAI =
        new GoogleGenerativeAI(
          process.env.GEMINI_API_KEY
        );

      const model =
        genAI.getGenerativeModel({
          model: "gemini-3.5-flash",
        });

      const prompt = `
You are an AI meeting assistant.

Analyze the following meeting transcript and return ONLY valid JSON.

Extract:
1. Meeting summary
2. Action items/tasks
3. Assignee names
4. Deadlines if mentioned

Return JSON in this exact format:

{
  "meeting_summary": "",
  "tasks": [
    {
      "assignee": "",
      "task": "",
      "deadline": ""
    }
  ]
}

Transcript:
${transcript}
`;

      const result =
        await model.generateContent(prompt);

      const response =
        result.response.text();

      const cleanedText = response
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();

      return JSON.parse(cleanedText);
    } catch (error) {
      console.error(
        "Gemini analysis error:",
        error
      );

      throw error;
    }
  };