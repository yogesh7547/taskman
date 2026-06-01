# TaskMan Server

TaskMan Server is a backend service for a task-aware meeting assistant. It accepts uploaded meeting audio/video files, transcribes speech to text, analyzes the transcript with AI, extracts action items, and sends task notification emails.

## Key Features

- **Meeting upload endpoint**: accepts audio/video files via `/api/meetings/upload`
- **Speech-to-text transcription**: converts meeting audio into text using a transcription service
- **AI transcript analysis**: analyzes meeting transcripts with Google Gemini to extract summaries and tasks
- **Automated email notifications**: sends task assignment emails based on AI-extracted action items
- **Health check**: simple `/api/health` endpoint to verify service status
- **File validation**: allows MP3, WAV, and MP4 uploads with size limits

## Project Structure

- `src/`
  - `app.js` - configures Express middleware and routes
  - `server.js` - starts the HTTP server
  - `controllers/`
    - `healthController.js` - health endpoint handler
    - `meeting.controller.js` - meeting upload flow and orchestration
  - `routes/`
    - `index.js` - health route definitions
    - `meeting.routes.js` - meeting upload route definitions
  - `middleware/`
    - `upload.middleware.js` - upload handling and file validation using Multer
  - `services/`
    - `ai/gemini.service.js` - uses Google Gemini to analyze transcripts and extract tasks
    - `notification/email.service.js` - sends task emails through Gmail SMTP
    - `transcription/`
      - `groq.service.js` - transcribes audio with GROQ Whisper
      - `elevenlabs.service.js` - alternate transcription service via ElevenLabs
  - `temp/uploads/` - stores uploaded files temporarily

## Setup

1. Copy `.env.example` to `.env` and add your credentials.
2. Install dependencies:
   ```powershell
   npm install
   ```
3. Start the server:
   ```powershell
   npm run dev
   ```
4. The server listens on port `5000` by default.

## Environment Variables

The following variables are expected:

- `GEMINI_API_KEY` - Google Gemini API key
- `GROQ_API_KEY` - GROQ transcription API key
- `ELEVENLABS_API_KEY` - ElevenLabs transcription API key (if used)
- `EMAIL_USER` - Gmail address used to send notification emails
- `EMAIL_PASS` - Gmail app password or SMTP password

## API Endpoints

- `GET /api/health`
  - Returns service health status
- `POST /api/meetings/upload`
  - Uploads a meeting file and processes it
  - Accepts a `meeting` file field
  - Returns transcription and AI analysis results

## Processing Flow

1. Upload meeting audio/video to `/api/meetings/upload`
2. File is saved to `src/temp/uploads`
3. Transcript is generated via transcription service
4. Transcript is sent to Gemini for task extraction
5. Task emails are sent for assignees with generated email addresses
6. Response includes `transcript` and `analysis`

## Notes

- The AI analysis expects a JSON response from Gemini and parses it directly.
- Email generation converts assignee names into lowercase Gmail addresses.
- The code currently uses GROQ transcription by default; `elevenlabs.service.js` is available as an alternate implementation.
- Ensure Gmail SMTP credentials are valid and allowed to send from your account.

## Development

- `npm run dev` - start with `nodemon` for hot reload
- `npm start` - start normally with Node

## License

This project is private and intended for internal use.
