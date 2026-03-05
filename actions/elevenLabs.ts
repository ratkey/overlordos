"use server";

import { ElevenLabsClient } from "@elevenlabs/elevenlabs-js";

const client = new ElevenLabsClient({
  apiKey: process.env.ELEVENLABS_API_KEY,
});

export async function convertTextToSpeech(text: string) {
  try {
    const audioStream = await client.textToSpeech.convert(
      "gwk2CKlAQ1B4a2RPxJoF",
      {
        outputFormat: "mp3_44100_128",
        text: text,
        modelId: "eleven_multilingual_v2",
      },
    );

    // Convert the ReadableStream to a Buffer
    const chunks: Uint8Array[] = [];
    for await (const chunk of audioStream) {
      chunks.push(chunk);
    }
    const buffer = Buffer.concat(chunks);

    // Return base64 so it can be easily sent over the wire
    return { audio: buffer.toString("base64"), error: null };
  } catch (error) {
    console.error("ElevenLabs Error:", error);
    return { audio: null, error: "Failed to generate audio." };
  }
}
