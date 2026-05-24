# Product Requirements Document (PRD)

## Overview

Build a meeting automation feature that turns recorded meetings into actionable outcomes with minimal manual effort.

## Workflow

1. Upload meeting recording
2. Transcription generated
3. AI extracts summary/tasks
4. Dashboard updates
5. Emails sent automatically

## Objectives

- Make meeting follow-up simple and reliable.
- Turn recordings into text, summaries, and tasks automatically.
- Ensure stakeholders see status on a dashboard.
- Send automated notifications without extra effort.

## Key Requirements

### 1. Upload meeting recording
- Support uploading audio/video meeting recordings.
- Confirm upload success and show progress if needed.
- Store recordings securely for processing.

### 2. Transcription generated
- Automatically transcribe the uploaded recording.
- Provide a clear transcription result.
- Ensure transcription quality is sufficient for summary/task extraction.

### 3. AI extracts summary/tasks
- Use AI to create a concise meeting summary.
- Extract action items or tasks from the transcription.
- Label each task with a title and optional owner/priority.

### 4. Dashboard updates
- Show the latest meeting summary on the dashboard.
- List extracted tasks with status and metadata.
- Indicate when the transcription and AI extraction are complete.

### 5. Emails sent automatically
- Send summary and task notifications to relevant recipients.
- Include a link to the dashboard or meeting details.
- Notify automatically after extraction is finished.

## Success Criteria

- Users can upload a recording and receive a transcription without manual steps.
- AI summary and task extraction appear on the dashboard automatically.
- Notification emails are sent successfully after processing.
- The workflow remains aligned with the five specified stages.

## Non-Goals

- No requirement for multi-user collaboration features in this version.
- No requirement for real-time speech recognition during live meetings.
- No requirement for advanced analytics beyond dashboard visibility.
