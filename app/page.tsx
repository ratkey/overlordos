import { Prompter } from "@/components/Prompter";

export default function Home() {
  return (
    <>
      <h1>Joberg</h1>
      <Prompter model="joberg" />
      <h1>Castor</h1>
      <Prompter model="castor" />
      <h1>Ganem</h1>
      <Prompter model="ganem" />
    </>
  );
}
