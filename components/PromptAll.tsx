"use client";

import useApp from "@/hooks/useApp";

export const PromptAll = () => {
  const { handleSubmit } = useApp();

  return (
    <>
      <div className="flex flex-col">
        <form action={(e) => handleSubmit(e, "all")} className="flex">
          <input name="prompt" className="w-full text-black" />
          <button type="submit">submit</button>
        </form>
      </div>
    </>
  );
};
