// ReadingPage.tsx
import { Box, Sheet, Typography, IconButton, Button } from "@mui/joy";
import DarkModeRoundedIcon from "@mui/icons-material/DarkModeRounded";
import LightModeRoundedIcon from "@mui/icons-material/LightModeRounded";
import { useColorScheme } from "@mui/joy/styles";
import { useState, useRef } from "preact/hooks";
import { ReadingContent } from "../types/reading";
import { MediaRenderer } from "./MediaRenderer";
import { Question } from "./Question";
import { Progress } from "./Progress";

interface ReadingPageProps {
  content: ReadingContent;
  onComplete: (readingId: string) => void;
}

export const ReadingPage = ({ content, onComplete }: ReadingPageProps) => {
  const [completedQuestions, setCompletedQuestions] = useState<Set<string>>(
    new Set(),
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { mode, setMode } = useColorScheme();

  const totalQuestions = content.sections.reduce(
    (total, section) => total + (section.questions?.length || 0),
    0,
  );

  const isDoneEnabled =
    completedQuestions.size === totalQuestions && !isSubmitting;

  const handleDone = async () => {
    if (isSubmitting) return;

    setIsSubmitting(true);
    try {
      const storedReadings = JSON.parse(
        localStorage.getItem("completedReadings") || "[]",
      );
      localStorage.setItem(
        "completedReadings",
        JSON.stringify([
          ...storedReadings,
          {
            title: content.title,
            completedAt: new Date().toISOString(),
            questionsCompleted: Array.from(completedQuestions),
          },
        ]),
      );
      onComplete(content.title);
    } catch (error) {
      console.error("Failed to mark reading as complete:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const contentRef = useRef<HTMLDivElement>(null);

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
          bgcolor: "background.surface",
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

        <Progress contentRef={contentRef} />
      </Sheet>

      <Sheet
        variant="outlined"
        sx={{
          mt: 2,
          p: 4,
          borderRadius: "lg",
          height: "calc(100vh - 160px)",
          overflowY: "auto",
          scrollbarWidth: "thin",
          "&::-webkit-scrollbar": {
            width: "12px",
          },
          "&::-webkit-scrollbar-track": {
            backgroundColor: "background.level1",
            borderRadius: "8px",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "primary.softBg",
            borderRadius: "8px",
            "&:hover": {
              backgroundColor: "primary.softHoverBg",
            },
          },
        }}
        ref={contentRef}
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

            {section.questions?.map((question) => (
              <Question
                key={question.id}
                question={question}
                onComplete={handleQuestionComplete}
              />
            ))}
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
