import { askGemini } from "@/actions/askGemini";
import { Responses } from "@/lib/context";
import { Content } from "@google/genai";
import { useState } from "react";
import { Model, modelNames } from "./models";

export const useGemini = () => {
  const [history, setHistory] = useState<Content[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [responses, setResponses] = useState<Responses>({
    castor: "",
    joberg: "",
    ganem: "",
  });

  const handleAsk = async (
    prompt: string,
    model: Model,
    currentHistory: Content[],
    onSuccess?: (response: string | null) => void,
  ) => {
    const result = await askGemini(prompt, model, currentHistory);

    if (result.error) {
      setError(result.error);
      return null;
    }
    setResponses((prev) => ({ ...prev, [model]: result.text ?? "" }));
    onSuccess?.(result.text);
    return result.history;
  };

  const request = async (
    prompt: string,
    model: Model | "all",
    onSuccess?: (response: string | null) => void,
  ) => {
    setLoading(true);
    setError("");
    try {
      let currentHistory = [...history];

      if (model !== "all") {
        const nextHistory = await handleAsk(prompt, model, currentHistory, onSuccess);
        if (nextHistory) currentHistory = nextHistory;
      } else {
        for (const modelName of modelNames) {
          console.log("asking: ", modelName);
          const nextHistory = await handleAsk(
            prompt,
            modelName as Model,
            currentHistory,
            onSuccess,
          );
          if (nextHistory) currentHistory = nextHistory;
        }
      }
      setHistory(currentHistory);
    } catch (error) {
      console.error(error);
      setError("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return { request, responses, error, loading };
};
