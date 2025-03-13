import { useState, useEffect } from "react";
import type { z } from "zod";
import type { questionsSchema } from "@/lib/schemas";

interface QuizProps {
  title: string;
  questions: z.infer<typeof questionsSchema>;
  onComplete: (score: number) => void;
  onCancel: () => void;
}

export const useQuizLogic = ({ questions, onComplete, onCancel }: QuizProps) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [score, setScore] = useState(0);
  const [timeSpent, setTimeSpent] = useState(0);
  const [startTime] = useState(Date.now());

  const answerLabels = ["A", "B", "C", "D"];

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeSpent(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);

    return () => clearInterval(timer);
  }, [startTime]);

  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;
  const isFirstQuestion = currentQuestionIndex === 0;

  const handleAnswerSelect = (optionIndex: number) => {
    const selectedLabel = answerLabels[optionIndex];
    setSelectedAnswers({
      ...selectedAnswers,
      [currentQuestionIndex]: selectedLabel,
    });
  };

  const handleNext = () => {
    if (isLastQuestion) {
      calculateScore();
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (!isFirstQuestion) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const calculateScore = () => {
    let newScore = 0;
    questions.forEach((question, index) => {
      const userAnswer = selectedAnswers[index];
      if (userAnswer && userAnswer === question.answer) {
        newScore += 1;
      }
    });
    console.log("Calculated score:", newScore, "out of", questions.length); 
    setScore(newScore);
    onComplete(newScore);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const progressPercentage = ((currentQuestionIndex + 1) / questions.length) * 100;

  return {
    currentQuestionIndex,
    selectedAnswers,
    score,
    timeSpent,
    handleAnswerSelect,
    handleNext,
    handlePrevious,
    calculateScore,
    formatTime,
    progressPercentage,
    currentQuestion,
    isLastQuestion,
    isFirstQuestion,
    answerLabels,
  };
};