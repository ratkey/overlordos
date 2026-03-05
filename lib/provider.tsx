import { Model } from "@/hooks/models";
import { useGemini } from "@/hooks/useGemini";
import { useTTS } from "@/hooks/useTTS";
import { PropsWithChildren, useState } from "react";
import { AppContext, Prompts } from "./context";

export const AppProvider = ({ children }: PropsWithChildren) => {
  const { request, responses } = useGemini();
  const { elevenLabsSpeak, vanillaSpeak } = useTTS();
  const [elevenlabs, setElevenlabs] = useState(false);
  const [prompts, setPrompts] = useState<Prompts>({
    castor: "",
    joberg: "",
    ganem: "",
    all: "",
  });

  const talk = (text: string | null) => {
    if (!text) return;
    if (elevenlabs) {
      elevenLabsSpeak(text);
    } else {
      vanillaSpeak(text);
    }
  };

  const handleSubmit = async (formData: FormData, model: Model | "all") => {
    const prompt = formData.get("prompt") as string;
    if (!prompt) return;
    setPrompts((prev) => ({ ...prev, [model]: prompt }));
    request(prompt, model, talk);
  };

  return (
    <AppContext.Provider
      value={{
        responses,
        prompts,
        handleSubmit,
      }}
    >
      <span>
        <input
          id="use11"
          type="checkbox"
          checked={elevenlabs}
          onChange={(e) => setElevenlabs(e.target.checked)}
        ></input>
        <label htmlFor="use11">Usar Elevenlabs</label>
      </span>
      {children}
    </AppContext.Provider>
  );
};
