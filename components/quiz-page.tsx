
"use client";

import { FileUp, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import QuizComponent from "@/components/quiz";
import QuizResults from "@/components/quiz-results";
import { useQuizLogic } from "@/hooks/use-quiz-logic"; 

export default function Quizes() {
    const {
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
        handleFileChange,
        handleSubmitWithFiles,
        handleQuizComplete,
        clearQuiz,
        setQuestionCount,
    } = useQuizLogic();

    return (
        <div className="min-h-screen bg-gradient-to-br from-black to-gray-900 text-white">
            <div className="container mx-auto pt-24 pb-12 px-4">
                <div className="max-w-4xl mx-auto">
                    {!questions.length && !quizCompleted ? (
                        <div
                            className="w-full"
                            onDragOver={(e) => {
                                e.preventDefault();
                                setIsDragging(true);
                            }}
                            onDragExit={() => setIsDragging(false)}
                            onDragEnd={() => setIsDragging(false)}
                            onDragLeave={() => setIsDragging(false)}
                            onDrop={(e) => {
                                e.preventDefault();
                                setIsDragging(false);
                                handleFileChange({ target: { files: e.dataTransfer.files } } as React.ChangeEvent<HTMLInputElement>);
                            }}
                        >
                            <Card className="bg-black/40 backdrop-blur-md border-white/10">
                                <CardHeader className="text-center">
                                    <CardTitle className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
                                        Create a Quiz
                                    </CardTitle>
                                    <CardDescription className="text-white/70 text-lg">
                                        Upload a PDF to generate an interactive quiz based on its content
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <form onSubmit={handleSubmitWithFiles} className="space-y-6">
                                        <div className="space-y-2">
                                            <h3 className="text-lg font-medium text-white">Number of Questions</h3>
                                            <Tabs
                                                defaultValue="4"
                                                className="w-full"
                                                onValueChange={(value) => setQuestionCount(Number.parseInt(value))}
                                            >
                                                <TabsList className="grid grid-cols-3 w-full bg-black/20">
                                                    <TabsTrigger value="4" className="data-[state=active]:bg-blue-600">
                                                        4 Questions
                                                    </TabsTrigger>
                                                    <TabsTrigger value="8" className="data-[state=active]:bg-blue-600">
                                                        8 Questions
                                                    </TabsTrigger>
                                                    <TabsTrigger value="12" className="data-[state=active]:bg-blue-600">
                                                        12 Questions
                                                    </TabsTrigger>
                                                </TabsList>
                                            </Tabs>
                                        </div>

                                        <div
                                            className={`relative flex flex-col items-center justify-center border-2 border-dashed border-white/20 rounded-lg p-8 transition-colors hover:border-white/40 ${isDragging ? "border-blue-500 bg-blue-500/10" : ""
                                                }`}
                                        >
                                            <input
                                                type="file"
                                                onChange={handleFileChange}
                                                accept="application/pdf"
                                                className="absolute inset-0 opacity-0 cursor-pointer"
                                            />
                                            <FileUp className="h-12 w-12 mb-4 text-white/60" />
                                            <p className="text-lg text-white/80 text-center">
                                                {files.length > 0 ? (
                                                    <span className="font-medium text-white">{files[0].name}</span>
                                                ) : (
                                                    <span>Drop your PDF here or click to browse</span>
                                                )}
                                            </p>
                                            <p className="text-sm text-white/50 mt-2">Maximum file size: 5MB</p>
                                        </div>

                                        <Button
                                            type="submit"
                                            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-6 text-lg"
                                            disabled={files.length === 0 || isLoading}
                                        >
                                            {isLoading ? (
                                                <span className="flex items-center space-x-2">
                                                    <Loader2 className="h-5 w-5 animate-spin" />
                                                    <span>Generating Quiz...</span>
                                                </span>
                                            ) : (
                                                "Generate Quiz"
                                            )}
                                        </Button>
                                    </form>
                                </CardContent>
                                {isLoading && (
                                    <CardFooter className="flex flex-col space-y-4">
                                        <div className="w-full space-y-2">
                                            <div className="flex justify-between text-sm">
                                                <span>Progress</span>
                                                <span>{Math.round(progress)}%</span>
                                            </div>
                                            <Progress value={progress} className="h-2" />
                                        </div>
                                        <div className="w-full">
                                            <div className="flex items-center space-x-2 text-sm text-white/70">
                                                <div
                                                    className={`h-2 w-2 rounded-full ${isLoading ? "bg-blue-500 animate-pulse" : "bg-white/20"
                                                        }`}
                                                />
                                                <span>
                                                    {partialQuestions
                                                        ? `Generating question ${partialQuestions.length + 1} of ${questionCount}`
                                                        : "Analyzing PDF content"}
                                                </span>
                                            </div>
                                        </div>
                                    </CardFooter>
                                )}
                            </Card>
                        </div>
                    ) : showResults ? (
                        <QuizResults onNewQuiz={clearQuiz} />
                    ) : (
                        <QuizComponent
                            title={title}
                            questions={questions}
                            onComplete={handleQuizComplete}
                            onCancel={clearQuiz}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}