"use server";

import { GoogleGenAI } from "@google/genai";
import { models, type Model } from "@/hooks/models";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export async function askGemini(prompt: string, model: Model) {
  try {
    console.log(models[model]);

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        systemInstruction: models[model],
      },
    });

    return { text: response.text ?? "", error: null };
  } catch (error) {
    console.error("Gemini Error:", error);
    return { text: null, error: "Failed to generate response." };
  }
}
