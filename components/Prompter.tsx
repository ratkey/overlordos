"use client";

import { Model } from "@/hooks/models";
import { useGemini } from "@/hooks/useGemini";
import { useTTS } from "@/hooks/useTTS";
import { SubmitEvent, useState } from "react";

export const Prompter = ({ model }: { model: Model }) => {
  const { request, loading, response, error } = useGemini(model);
  const { elevenLabsSpeak, vanillaSpeak } = useTTS();
  const [elevenlabs, setElevenlabs] = useState(false);
  const [prompt, setPrompt] = useState("");

  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!prompt) return;
    request(prompt, (text) => {
      if (elevenlabs) {
        elevenLabsSpeak(text);
      } else {
        vanillaSpeak(text);
      }
    });
  };

  return (
    <>
      <span>
        <input
          id="use11"
          type="checkbox"
          checked={elevenlabs}
          onChange={(e) => setElevenlabs(e.target.checked)}
        ></input>
        <label htmlFor="use11">Usar Elevenlabs</label>
      </span>
      <div className="flex flex-col">
        <p>{loading ? "loading..." : response}</p>
        <p className="text-yellow-500">{error}</p>
        <form onSubmit={handleSubmit} className="flex">
          <input
            className="w-full text-black"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
          <button type="submit">submit</button>
        </form>
      </div>
    </>
  );
};
