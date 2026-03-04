"use client";

import { Model } from "@/hooks/models";
import { useGemini } from "@/hooks/useGemini";
import { SubmitEvent, useState } from "react";

export const Prompter = ({ model }: { model: Model }) => {
  const { request, loading, response, error } = useGemini(model);
  const [prompt, setPrompt] = useState("");

  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (prompt) {
      request(prompt);
    }
  };

  return (
    <div className="flex flex-col">
      <p>{loading ? "loading..." : response}</p>
      <p className="text-yellow-500">{error}</p>
      <form onSubmit={handleSubmit} className="flex">
        <input
          className="w-full"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        <button type="submit">submit</button>
      </form>
    </div>
  );
};
