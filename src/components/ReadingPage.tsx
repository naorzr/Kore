import { useState, useEffect, useMemo } from "preact/hooks";

import { MediaRenderer } from "./MediaRenderer";

import {
  Box,
  Sheet,
  Typography,
  IconButton,
  LinearProgress,
  useColorScheme,
  Button,
} from "@mui/joy";
import DarkModeRoundedIcon from "@mui/icons-material/DarkModeRounded";
import LightModeRoundedIcon from "@mui/icons-material/LightModeRounded";
import { Question } from "./Question";
import { ReadingContent } from "../types/reading";

interface CompletedQuestion {
  id: string;
  sectionId: string;
  completedAt: Date;
}

type CompletedQuestionsSet = Set<CompletedQuestion["id"]>;

interface ReadingPageProps {
  content: ReadingContent;
  onComplete: (readingId: string) => void;
}

const ERROR_MESSAGES = {
  COMPLETION_FAILED: "Failed to mark reading as complete. Please try again.",
  STORAGE_FAILED: "Failed to save your progress locally.",
} as const;

type ErrorType = keyof typeof ERROR_MESSAGES;

const handleError = (error: unknown, type: ErrorType) => {
  console.error(`${ERROR_MESSAGES[type]}:`, error);
};

export const ReadingPage = ({ content, onComplete }: ReadingPageProps) => {
  const [timeSpent, setTimeSpent] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [completedQuestions, setCompletedQuestions] =
    useState<CompletedQuestionsSet>(new Set());
  const { mode, setMode } = useColorScheme();

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Calculate total number of questions across all sections
  const totalQuestions = useMemo(
    () =>
      content.sections.reduce(
        (total, section) => total + (section.questions?.length || 0),
        0,
      ),
    [content.sections],
  );

  // Track reading completion status based on answered questions
  const isDoneEnabled = useMemo(
    () => completedQuestions.size === totalQuestions && !isSubmitting,
    [completedQuestions.size, totalQuestions, isSubmitting],
  );

  const handleDone = async () => {
    // Store completion in localStorage
    const storedReadings = localStorage.getItem("completedReadings");
    const completedReadings = storedReadings ? JSON.parse(storedReadings) : [];
    localStorage.setItem(
      "completedReadings",
      JSON.stringify([
        ...completedReadings,
        {
          title: content.title,
          completedAt: new Date().toISOString(),
          questionsCompleted: Array.from(completedQuestions),
        },
      ]),
    );

    if (isSubmitting) return;

    setIsSubmitting(true);
    try {
      await onComplete(content.title);
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeSpent((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleScroll = (e: Event) => {
    const target = e.target as HTMLDivElement;
    const scrollPercentage =
      (target.scrollTop / (target.scrollHeight - target.clientHeight)) * 100;
    setScrollProgress(Math.min(100, Math.max(0, scrollPercentage)));
  };

  const handleQuestionComplete = (questionId: string) => {
    setCompletedQuestions((prev) => new Set([...prev, questionId]));
  };

  return (
    <Box sx={{ minHeight: "100vh", p: 2 }}>
      <Sheet
        sx={{
          position: "sticky",
          top: 0,
          zIndex: 20,
          p: 2,
          borderRadius: "lg",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Typography level="title-lg">
            Time: {Math.floor(timeSpent / 60)}:
            {(timeSpent % 60).toString().padStart(2, "0")}
          </Typography>
          <IconButton
            onClick={() => setMode(mode === "dark" ? "light" : "dark")}
            variant="soft"
          >
            {mode === "dark" ? (
              <LightModeRoundedIcon />
            ) : (
              <DarkModeRoundedIcon />
            )}
          </IconButton>
        </Box>

        <Typography level="body-md" sx={{ mb: 1 }}>
          Questions completed: {completedQuestions.size} / {totalQuestions}
        </Typography>

        <LinearProgress
          determinate
          value={scrollProgress}
          variant="soft"
          size="lg"
          sx={{ "--LinearProgress-radius": "8px" }}
        />
      </Sheet>

      <Sheet
        variant="outlined"
        sx={{
          mt: 2,
          p: 4,
          borderRadius: "lg",
          height: "calc(100vh - 160px)",
          overflowY: "auto",
          "&::-webkit-scrollbar": {
            width: "12px",
          },
          "&::-webkit-scrollbar-track": {
            bgcolor: "background.level1",
            borderRadius: "8px",
          },
          "&::-webkit-scrollbar-thumb": {
            bgcolor: "primary.softBg",
            borderRadius: "8px",
            "&:hover": {
              bgcolor: "primary.softHoverBg",
            },
          },
        }}
        onScroll={handleScroll}
      >
        <Typography level="h1" sx={{ mb: 4 }}>
          {content.title}
        </Typography>

        {content.sections.map((section) => (
          <Box key={section.id}>
            <Typography
              level="body-lg"
              sx={{
                fontSize: "1.2rem",
                lineHeight: 1.8,
                textAlign: "justify",
                mb: 2,
              }}
            >
              {section.content}
            </Typography>
            {section.media?.map((media, index) => (
              <MediaRenderer
                key={`${section.id}-media-${index}`}
                media={media}
              />
            ))}

            {section.questions?.map((question) => {
              return (
                <Question
                  key={question.id}
                  question={question}
                  onComplete={handleQuestionComplete}
                />
              );
            })}
          </Box>
        ))}

        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <Button
            size="lg"
            color="success"
            disabled={!isDoneEnabled}
            onClick={handleDone}
            sx={{ px: 6 }}
          >
            Done Reading
          </Button>
        </Box>
      </Sheet>
    </Box>
  );
};
