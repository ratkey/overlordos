"use server";
import { GoogleGenAI, type Content } from "@google/genai";
import { models, type Model } from "@/hooks/models";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export async function askGemini(
  prompt: string,
  model: Model,
  history: Content[] = [],
) {
  try {
    const contents: Content[] = [
      ...history,
      { role: "user", parts: [{ text: prompt }] },
    ];

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents,
      config: {
        systemInstruction: models[model],
      },
    });

    const assistantMessage: Content = {
      role: "model",
      parts: [{ text: response.text ?? "" }],
    };

    return {
      text: response.text ?? "",
      history: [...contents, assistantMessage],
      error: null,
    };
  } catch (error) {
    console.error("Gemini Error:", error);
    return { text: null, history, error: "Failed to generate response." };
  }
}
