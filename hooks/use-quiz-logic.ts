import { useState } from "react";
import { experimental_useObject } from "ai/react";
import { questionsSchema } from "@/lib/schemas";
import type { z } from "zod";
import { toast } from "sonner";
import { generateQuizTitle } from "@/app/actions";
import { useAuthContext } from "@/hooks/use-auth-context";

interface QuizLogicProps {
  initialQuestionCount?: number;
}

export const useQuizLogic = ({ initialQuestionCount = 4 }: QuizLogicProps = {}) => {
  const { user } = useAuthContext();

  const [files, setFiles] = useState<File[]>([]);
  const [questions, setQuestions] = useState<z.infer<typeof questionsSchema>>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [title, setTitle] = useState<string>("Quiz");
  const [questionCount, setQuestionCount] = useState<number>(initialQuestionCount);
  const [showResults, setShowResults] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const { submit, object: partialQuestions, isLoading } = experimental_useObject({
    api: "/api/generate-quiz",
    schema: questionsSchema,
    initialValue: [],
    onError: (error) => {
      toast.error("Failed to generate quiz. Please try again.");
      setFiles([]);
    },
    onFinish: ({ object }) => {
      if (object) {
        setQuestions(object);
      }
    },
  });

  const progress = partialQuestions ? (partialQuestions.length / questionCount) * 100 : 0;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    if (isSafari && isDragging) {
      toast.error("Safari does not support drag & drop. Please use the file picker.");
      return;
    }

    const selectedFiles = Array.from(e.target.files || []);
    const validFiles = selectedFiles.filter(
      (file) => file.type === "application/pdf" && file.size <= 5 * 1024 * 1024
    );

    if (validFiles.length !== selectedFiles.length) {
      toast.error("Only PDF files under 5MB are allowed.");
    }

    setFiles(validFiles);
  };

  const encodeFileAsBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleSubmitWithFiles = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (files.length === 0) {
      toast.error("Please select a PDF file first.");
      return;
    }

    try {
      const encodedFiles = await Promise.all(
        files.map(async (file) => ({
          name: file.name,
          type: file.type,
          data: await encodeFileAsBase64(file),
        }))
      );

      submit({ files: encodedFiles, questionCount });

      const generatedTitle = await generateQuizTitle(files[0].name);
      setTitle(generatedTitle || files[0].name.replace(/\.[^/.]+$/, ""));
    } catch (error) {
      console.error("Error processing file:", error);
      toast.error("Error processing your PDF. Please try again.");
    }
  };

  const handleQuizComplete = (score: number) => {
    const userId = user?.uid || "anonymous";
    const quizResults = JSON.parse(localStorage.getItem(`quizResults_${userId}`) || "[]");
    quizResults.push({
      date: new Date().toISOString(),
      title,
      score,
      totalQuestions: questions.length,
      percentage: (score / questions.length) * 100,
    });
    localStorage.setItem(`quizResults_${userId}`, JSON.stringify(quizResults));

    setQuizCompleted(true);
    setShowResults(true);
  };

  const clearQuiz = () => {
    setFiles([]);
    setQuestions([]);
    setQuizCompleted(false);
    setShowResults(false);
    setTitle("Quiz");
  };

  return {
    // States
    files,
    questions,
    isDragging,
    setIsDragging,
    title,
    questionCount,
    showResults,
    quizCompleted,
    isLoading,
    progress,
    partialQuestions,

    // Handlers
    handleFileChange,
    handleSubmitWithFiles,
    handleQuizComplete,
    clearQuiz,
    setQuestionCount,
  };
};