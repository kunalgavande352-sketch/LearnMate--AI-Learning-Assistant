import dotenv from 'dotenv';
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const listModels = async () => {
    try {
        const models = await ai.models.list();
        for await (const model of models) {
            console.log(model.name, "-", model.supportedActions || model.description || '');
        }
    } catch (error) {
        console.error('Error listing models:', error);
    }
};

listModels();