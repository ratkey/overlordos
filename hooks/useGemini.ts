import { askGemini } from "@/actions/useGemini";
import { useState } from "react";
import { Model } from "./models";

export const useGemini = (model: Model) => {
  const [response, setResponse] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const request = async (prompt: string) => {
    setLoading(true);
    setError("");
    try {
      const result = await askGemini(prompt, model);

      if (result.error) {
        setError(result.error);
        return;
      }

      setResponse(result.text ?? "");
    } catch (error) {
      console.error(error);
      setError("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return { request, response, error, loading };
};
