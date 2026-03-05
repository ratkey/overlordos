import { askGemini } from "@/actions/askGemini";
import { useState } from "react";
import { Model } from "./models";
import { Content } from "@google/genai";

export const useGemini = (model: Model) => {
  const [history, setHistory] = useState<Content[]>();
  const [response, setResponse] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const request = async (
    prompt: string,
    onSuccess?: (response: string | null) => void,
  ) => {
    setLoading(true);
    setError("");
    try {
      const result = await askGemini(prompt, model, history);

      if (result.error) {
        setError(result.error);
        return;
      }

      setResponse(result.text ?? "");
      setHistory(result.history);
      onSuccess?.(result.text);
    } catch (error) {
      console.error(error);
      setError("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return { request, response, error, loading };
};
