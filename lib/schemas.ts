

import { z } from "zod";

export const questionSchema = z.object({
  question: z.string(),
  options: z.array(z.string()).length(4),
  answer: z.string(),
});

export const questionsSchema = z.array(questionSchema);