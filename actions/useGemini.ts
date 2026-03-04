"use server";

import { GoogleGenAI } from "@google/genai";
import { models, type Model } from "@/hooks/models";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export async function askGemini(prompt: string, model: Model) {
  try {
    const response = await ai.models.generateContentStream({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        systemInstruction: models[model],
      },
    });

    let text = "";
    for await (const chunk of response) {
      console.log(chunk.text);
      text += chunk.text;
    }

    return { text: text ?? "", error: null };
  } catch (error) {
    console.error("Gemini Error:", error);
    return { text: null, error: "Failed to generate response." };
  }
}
