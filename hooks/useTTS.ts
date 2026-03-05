import { convertTextToSpeech } from "@/actions/elevenLabs";

export const useTTS = () => {
  const vanillaSpeak = (text: string | null) => {
    if (!text) return;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "es-AR";
    utterance.rate = 1;
    window.speechSynthesis.speak(utterance);
  };

  const elevenLabsSpeak = async (text: string | null) => {
    if (!text) return;
    try {
      const response = await convertTextToSpeech(text);
      if (response.error || !response.audio) {
        console.error(response.error);
        return;
      }

      // 1. Create a Blob from the base64 audio data
      const byteCharacters = atob(response.audio);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: "audio/mpeg" });

      // 2. Create a URL for the Blob
      const url = URL.createObjectURL(blob);

      // 3. Play the audio
      const audio = new Audio(url);
      await audio.play();

      // Clean up the URL after playing
      audio.onended = () => {
        URL.revokeObjectURL(url);
      };
    } catch (error) {
      console.error("Failed to play ElevenLabs audio:", error);
    }
  };

  return { vanillaSpeak, elevenLabsSpeak };
};
