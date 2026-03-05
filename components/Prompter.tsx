"use client";

import { Model } from "@/hooks/models";
import useApp from "@/hooks/useApp";

export const Prompter = ({ model }: { model: Model }) => {
  // const { request, loading, response, error } = useGemini(model);
  const { responses, handleSubmit } = useApp();

  return (
    <>
      <div className="flex flex-col">
        <p>{responses[model]}</p>
        {/* <p className="text-yellow-500">{error}</p> */}
        <form action={(e) => handleSubmit(e, model)} className="flex">
          <input name="prompt" className="w-full text-black" />
          <button type="submit">submit</button>
        </form>
      </div>
    </>
  );
};
