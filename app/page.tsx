"use client";
import { PromptAll } from "@/components/PromptAll";
import { Prompter } from "@/components/Prompter";
import { AppProvider } from "@/lib/provider";

export default function Home() {
  return (
    <AppProvider>
      <PromptAll />
      <h1>Joberg</h1>
      <Prompter model="joberg" />
      <h1>Castor</h1>
      <Prompter model="castor" />
      <h1>Ganem</h1>
      <Prompter model="ganem" />
    </AppProvider>
  );
}
