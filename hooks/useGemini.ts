import { askGemini } from "@/actions/askGemini";
import { Responses } from "@/lib/context";
import { Content } from "@google/genai";
import { useState } from "react";
import { Model } from "./models";

export const useGemini = () => {
  const [history, setHistory] = useState<Content[]>();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [responses, setResponses] = useState<Responses>({
    castor: "",
    joberg: "",
    ganem: "",
  });

  const request = async (
    prompt: string,
    model: Model,
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

      setResponses((prev) => ({ ...prev, [model]: result.text ?? "" }));
      setHistory(result.history);
      onSuccess?.(result.text);
    } catch (error) {
      console.error(error);
      setError("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return { request, responses, error, loading };
};
