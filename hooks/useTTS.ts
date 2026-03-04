export const useTTS = () => {
  const vanillaSpeak = (text: string | null) => {
    if (!text) return;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "es-AR";
    utterance.rate = 1;
    window.speechSynthesis.speak(utterance);
  };

  return { vanillaSpeak };
};
