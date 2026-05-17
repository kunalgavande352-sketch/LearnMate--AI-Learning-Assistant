import express from 'express';
import {generatFlashcards,generateQuiz,generateSummary,chat,explainConcept,getChatHistory} from "../controllers/aiController.js";
import protect from '../middleware/auth.js';

const router = express.Router();

router.use(protect);

router.post('/generate-flashcards',generatFlashcards);
router.post("/generate-quiz",generateQuiz);
router.post("/generate-summary",generateSummary);
router.post("/chat",chat);
router.post("/explane-concept",explainConcept);
router.get("/chat-history/:documentId",getChatHistory);

export default router