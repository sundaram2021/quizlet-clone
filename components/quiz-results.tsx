
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Line } from "react-chartjs-2";
import { format } from "date-fns";
import { motion } from "framer-motion";
import { Trophy, TrendingUp, BarChart2, AlertTriangle } from "lucide-react";
import { useQuizResultsLogic } from "@/hooks/use-quiz-result-logic"; 

interface QuizResultsProps {
    onNewQuiz: () => void;
}

export default function QuizResults({ onNewQuiz }: QuizResultsProps) {
    const {
        quizResults,
        chartData,
        chartOptions,
        averageScore,
        feedbackMessage,
        performanceTrend,
        latestResult,
        previousResult,
        performanceChange,
    } = useQuizResultsLogic();

    return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Card className="bg-black/40 backdrop-blur-md border-white/10">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
                        Quiz Results
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    {latestResult ? (
                        <div className="space-y-4">
                            <div className="text-center text-white/80 text-lg">{feedbackMessage}</div>
                            {performanceTrend && (
                                <div className="text-center text-white/70 text-sm flex items-center justify-center gap-2">
                                    <TrendingUp className="h-4 w-4" />
                                    {performanceTrend}
                                </div>
                            )}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="bg-white/10 rounded-lg p-4 text-center">
                                    <div className="flex justify-center mb-2">
                                        <Trophy className="h-6 w-6 text-yellow-500" />
                                    </div>
                                    <p className="text-white/70 mb-1">Latest Score</p>
                                    <p className="text-3xl font-bold text-white">
                                        {latestResult.score}/{latestResult.totalQuestions}
                                    </p>
                                    <p className="text-lg text-white/70">{Math.round(latestResult.percentage)}%</p>
                                </div>
                                <div className="bg-white/10 rounded-lg p-4 text-center">
                                    <div className="flex justify-center mb-2">
                                        <TrendingUp className="h-6 w-6 text-blue-500" />
                                    </div>
                                    <p className="text-white/70 mb-1">Performance Change</p>
                                    <p
                                        className={`text-3xl font-bold ${performanceChange > 0 ? "text-green-500" : performanceChange < 0 ? "text-red-500" : "text-white"
                                            }`}
                                    >
                                        {performanceChange > 0 ? "+" : ""}
                                        {previousResult ? Math.round(performanceChange) : 0}%
                                    </p>
                                    <p className="text-sm text-white/50">{previousResult ? "from previous quiz" : "no previous data"}</p>
                                </div>
                                <div className="bg-white/10 rounded-lg p-4 text-center">
                                    <div className="flex justify-center mb-2">
                                        <BarChart2 className="h-6 w-6 text-purple-500" />
                                    </div>
                                    <p className="text-white/70 mb-1">Average Score</p>
                                    <p className="text-3xl font-bold text-white">{Math.round(averageScore)}%</p>
                                    <p className="text-sm text-white/50">
                                        across {quizResults.length} {quizResults.length === 1 ? "quiz" : "quizzes"}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="text-center text-white/70 flex flex-col items-center gap-2">
                            <AlertTriangle className="h-6 w-6 text-yellow-500" />
                            <p>No quiz results available. Take a quiz to see your performance!</p>
                        </div>
                    )}

                    <div className="bg-white/5 rounded-lg p-4">
                        <div className="h-64">
                            <Line data={chartData} options={chartOptions} />
                        </div>
                    </div>

                    {latestResult && (
                        <div className="bg-white/10 rounded-lg p-4">
                            <h3 className="text-lg font-medium text-white mb-2">Latest Quiz Summary</h3>
                            <p className="text-white/70">
                                <span className="font-medium">Title:</span> {latestResult.title}
                            </p>
                            <p className="text-white/70">
                                <span className="font-medium">Date:</span> {format(new Date(latestResult.date), "PPpp")}
                            </p>
                            <p className="text-white/70">
                                <span className="font-medium">Questions:</span> {latestResult.totalQuestions}
                            </p>
                        </div>
                    )}
                </CardContent>
                <CardFooter className="flex justify-center">
                    <Button
                        onClick={onNewQuiz}
                        className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-6 text-lg"
                    >
                        Take Another Quiz
                    </Button>
                </CardFooter>
            </Card>
        </motion.div>
    );
}