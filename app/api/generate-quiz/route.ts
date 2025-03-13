
import { questionSchema, questionsSchema } from "@/lib/schemas";
import { google } from "@ai-sdk/google";
import { streamObject } from "ai";

export const maxDuration = 60;

export async function POST(req: Request) {
  const { files, questionCount } = await req.json(); // Add questionCount from client
  const firstFile = files[0].data;

  const numQuestions = questionCount || 4; // Default to 4 if not provided

  const result = streamObject({
    model: google("gemini-1.5-pro-latest"),
    messages: [
      {
        role: "system",
        content: `You are a teacher. Your job is to take a document and create a multiple-choice test with ${numQuestions} questions based on the content of the document. Each option should be roughly equal in length. Ensure each question has exactly one correct answer.`,
      },
      {
        role: "user",
        content: [
          {
            type: "text",
            text: `Create a multiple-choice test with ${numQuestions} questions based on this document. Each question should have 4 options labeled A, B, C, and D, with exactly one correct answer.`,
          },
          {
            type: "file",
            data: firstFile,
            mimeType: "application/pdf",
          },
        ],
      },
    ],
    schema: questionSchema,
    output: "array",
    onFinish: ({ object }) => {
      const res = questionsSchema.safeParse(object);
      if (res.error) {
        throw new Error(res.error.errors.map((e) => e.message).join("\n"));
      }
    },
  });

  return result.toTextStreamResponse();
}