import { useState, useEffect } from "react";
import { useAuthContext } from "@/hooks/use-auth-context";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  type ChartData,
} from "chart.js";
import { format } from "date-fns";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface QuizResult {
  date: string;
  title: string;
  score: number;
  totalQuestions: number;
  percentage: number;
}

export const useQuizResultsLogic = () => {
  const { user } = useAuthContext();
  const [quizResults, setQuizResults] = useState<QuizResult[]>([]);
  const [chartData, setChartData] = useState<ChartData<"line">>({
    labels: [],
    datasets: [],
  });
  const [averageScore, setAverageScore] = useState(0);
  const [feedbackMessage, setFeedbackMessage] = useState<string>("");
  const [performanceTrend, setPerformanceTrend] = useState<string>("");

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
        labels: {
          color: "rgba(255, 255, 255, 0.7)",
        },
      },
      title: {
        display: true,
        text: "Your Quiz Performance Over Time",
        color: "rgba(255, 255, 255, 0.9)",
      },
    },
    scales: {
      y: {
        min: 0,
        max: 100,
        ticks: {
          color: "rgba(255, 255, 255, 0.7)",
        },
        grid: {
          color: "rgba(255, 255, 255, 0.1)",
        },
      },
      x: {
        ticks: {
          color: "rgba(255, 255, 255, 0.7)",
        },
        grid: {
          color: "rgba(255, 255, 255, 0.1)",
        },
      },
    },
  };

  useEffect(() => {
    const userId = user?.uid || "anonymous";
    const storedResults = JSON.parse(localStorage.getItem(`quizResults_${userId}`) || "[]") as QuizResult[];

    const sortedResults = storedResults.sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );
    setQuizResults(sortedResults);

    if (sortedResults.length > 0) {
      const sum = sortedResults.reduce((acc, result) => acc + result.percentage, 0);
      setAverageScore(sum / sortedResults.length);
    }

    const labels = sortedResults.length > 0
      ? sortedResults.map((result, index) =>
          sortedResults.length <= 5 ? format(new Date(result.date), "MMM d, h:mm a") : `Quiz ${index + 1}`
        )
      : ["No Data"];
    const percentages = sortedResults.length > 0
      ? sortedResults.map((result) => result.percentage)
      : [0];

    setChartData({
      labels,
      datasets: [
        {
          label: "Quiz Performance (%)",
          data: percentages,
          borderColor: "rgb(99, 102, 241)",
          backgroundColor: "rgba(99, 102, 241, 0.5)",
          tension: 0.3,
          fill: true,
        },
      ],
    });

    const latestResult = sortedResults.length > 0 ? sortedResults[sortedResults.length - 1] : null;
    const previousResult = sortedResults.length > 1 ? sortedResults[sortedResults.length - 2] : null;

    if (latestResult) {
      const scoreThresholdGood = 70;
      const scoreThresholdPoor = 40;
      if (latestResult.percentage >= scoreThresholdGood) {
        setFeedbackMessage("Great job! Your performance is excellent! 🎉");
      } else if (latestResult.percentage <= scoreThresholdPoor) {
        setFeedbackMessage("Keep practicing! You can do better! 💪");
      } else {
        setFeedbackMessage("Good effort! Try to aim higher next time! 📈");
      }

      if (previousResult) {
        const change = latestResult.percentage - previousResult.percentage;
        if (change > 0) {
          setPerformanceTrend(
            `You're improving! Your score increased by ${Math.round(change)}% since your last quiz.`
          );
        } else if (change < 0) {
          setPerformanceTrend(
            `Your score dropped by ${Math.round(Math.abs(change))}% since your last quiz. Let's get back on track!`
          );
        } else {
          setPerformanceTrend("Your performance is consistent. Try to push for a higher score!");
        }
      } else {
        setPerformanceTrend("This is your first quiz. Keep going to track your progress!");
      }
    }
  }, [user]);

  const latestResult = quizResults.length > 0 ? quizResults[quizResults.length - 1] : null;
  const previousResult = quizResults.length > 1 ? quizResults[quizResults.length - 2] : null;
  const performanceChange = previousResult ? latestResult!.percentage - previousResult.percentage : 0;

  return {
    quizResults,
    chartData,
    chartOptions,
    averageScore,
    feedbackMessage,
    performanceTrend,
    latestResult,
    previousResult,
    performanceChange,
  };
};