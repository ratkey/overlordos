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

    const modelName = model.charAt(0).toUpperCase() + model.slice(1);
    const systemInstruction = `${models[model]}
      IMPORTANTE: Estás en un chat compartido con otros personajes (Castor, Joberg, Ganem). 
      En el historial, verás que las respuestas del "model" están prefijadas con el nombre de quien respondió (ej: "Castor: Hola").
      Tú eres ${modelName}. Debes responder DIRECTAMENTE el texto que quieres decir, pero en el historial se guardará prefijado con tu nombre para que los demás sepan que fuiste tú.
      No respondas prefijando tu nombre, ya sabemos quién eres.
    `;

    const response = await ai.models.generateContent({
      model: process.env.GEMINI_MODEL as string,
      contents,
      config: {
        systemInstruction,
      },
    });

    const assistantMessage: Content = {
      role: "model",
      parts: [{ text: `${modelName}: ${response.text ?? ""}` }],
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
