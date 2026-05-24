import express from "express";

import upload from "../middleware/upload.middleware.js";

import {
  uploadMeeting,
} from "../controllers/meeting.controller.js";

const router = express.Router();

router.post(
  "/upload",
  upload.single("meeting"),
  uploadMeeting
);

export default router;