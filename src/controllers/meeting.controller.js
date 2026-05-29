import { transcribeAudio } from "../services/transcription/groq.service.js";
import { sendTaskEmail } from "../services/notification/email.service.js";
import { analyzeMeetingTranscript } from "../services/ai/gemini.service.js";

export const uploadMeeting = async (req, res) => {
  try {
    // Check file
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
    }

    console.log(req.file);

    // STEP 1 → Speech-to-text
    const transcript = await transcribeAudio(req.file.path);

    console.log("Transcript:", transcript);

    // STEP 2 → Gemini analysis
    const analysis = await analyzeMeetingTranscript(transcript);

    for (const task of analysis.tasks) {
      if (task.email) {
        await sendTaskEmail({
          to: task.email,

          assignee: task.assignee,

          task: task.task,

          deadline: task.deadline,
        });
      }
    }

    // FINAL RESPONSE
    return res.status(200).json({
      success: true,

      transcript,

      analysis,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};
