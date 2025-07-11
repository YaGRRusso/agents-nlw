import { GoogleGenAI } from '@google/genai';

const gemini = new GoogleGenAI({ apiKey: process.env.GEMINI_KEY });
const model = 'gemini-2.5-flash';

export async function transcribeAudio(audioAsBase64: string, mimeType: string) {
  const res = await gemini.models.generateContent({
    model,
    contents: [
      {
        text: 'transcribe the following audio with the original language and splice the transcription into sentences when possible',
      },
      {
        inlineData: {
          mimeType,
          data: audioAsBase64,
        },
      },
    ],
  });

  if (!res.text) {
    throw new Error('TRANSCRIPTION_FAILED');
  }

  return res.text;
}

export async function generateEmbeddings(text: string) {
  const res = await gemini.models.embedContent({
    model: 'text-embedding-004',
    contents: [{ text }],
    config: { taskType: 'RETRIEVAL_DOCUMENT' },
  });

  if (!res.embeddings?.[0].values) {
    throw new Error('EMBEDDING_FAILED');
  }

  return res.embeddings[0].values;
}

export async function generateAnswer(
  question: string,
  transcriptions: string[]
) {
  const context = transcriptions.join('\n\n');
  const prompt = `
  Answer the question based on the context provided below with clearance and precision.
  
  Context:
  ${context}

  Question:
  ${question}

  Instructions:
  - Provide a clear and concise answer based on the context.
  - If the answer is not in the context, respond with "WITHOUT_CONTEXT".
  - If the question is not clear, respond with "UNCLEAR_QUESTION".
  - Do not include any additional information or commentary.
  - Do not repeat the context in the answer.
  `.trim();

  const res = await gemini.models.generateContent({
    model,
    contents: [{ text: prompt }],
  });

  if (!res.text) {
    throw new Error('TRANSCRIPTION_FAILED');
  }

  return res.text;
}
