"use client";

import { Model } from "@/hooks/models";
import useApp from "@/hooks/useApp";

export const Prompter = ({ model }: { model: Model }) => {
  const { responses, handleSubmit } = useApp();

  return (
    <>
      <div className="flex flex-col">
        <p>{responses[model]}</p>
        <form action={(e) => handleSubmit(e, model)} className="flex">
          <input name="prompt" className="w-full text-black" />
          <button type="submit">submit</button>
        </form>
      </div>
    </>
  );
};
