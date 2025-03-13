
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useQuizLogic } from "@/hooks/use-quiz"; 
import type { z } from "zod";
import type { questionsSchema } from "@/lib/schemas";

interface QuizProps {
  title: string;
  questions: z.infer<typeof questionsSchema>;
  onComplete: (score: number) => void;
  onCancel: () => void;
}

export default function QuizComponent({ title, questions, onComplete, onCancel }: QuizProps) {
  const {
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
  } = useQuizLogic({ title, questions, onComplete, onCancel });

  return (
    <Card className="bg-black/40 backdrop-blur-md border-white/10">
      <CardHeader className="space-y-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
            {title}
          </CardTitle>
          <div className="text-white/70 text-sm">Time: {formatTime(timeSpent)}</div>
        </div>
        <div className="w-full bg-white/10 h-1 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-300"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <span className="text-white/70">
              Question {currentQuestionIndex + 1} of {questions.length}
            </span>
            <span className="text-white/70">{selectedAnswers[currentQuestionIndex] ? "Answered" : "Unanswered"}</span>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestionIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="space-y-4">
                <h3 className="text-xl font-medium text-white">{currentQuestion.question}</h3>

                <div className="space-y-3">
                  {currentQuestion.options.map((option, index) => (
                    <Button
                      key={index}
                      variant={selectedAnswers[currentQuestionIndex] === answerLabels[index] ? "secondary" : "outline"}
                      className={`w-full h-auto py-4 px-4 justify-start text-left whitespace-normal border-white/20 hover:border-white/40 ${selectedAnswers[currentQuestionIndex] === answerLabels[index]
                          ? "bg-blue-500/20 border-blue-500 text-white"
                          : "text-white hover:bg-white/10"
                        } transition-colors`}
                      onClick={() => handleAnswerSelect(index)}
                    >
                      <span className="font-medium mr-4 shrink-0">{answerLabels[index]}.</span>
                      <span className="flex-grow">{option}</span>
                    </Button>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={isFirstQuestion}
          className="border-white/20 text-white hover:bg-white/10"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Previous
        </Button>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={onCancel} className="border-white/20 text-white hover:bg-white/10">
            Cancel
          </Button>
          <Button
            onClick={handleNext}
            disabled={!selectedAnswers[currentQuestionIndex]}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
          >
            {isLastQuestion ? "Finish" : "Next"} <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}