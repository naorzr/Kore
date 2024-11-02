// components/ReadingPage.tsx
import {
  Box,
  Sheet,
  Typography,
  IconButton,
  Button,
  LinearProgress,
} from "@mui/joy";
import DarkModeRoundedIcon from "@mui/icons-material/DarkModeRounded";
import LightModeRoundedIcon from "@mui/icons-material/LightModeRounded";
import { useColorScheme } from "@mui/joy/styles";
import { useState, useRef, useEffect } from "preact/hooks";
import { ReadingContent } from "../types/reading";
import { MediaRenderer } from "./MediaRenderer";
import { Question } from "./Question";
import { Progress } from "./Progress";
import { getTotalPoints, setTotalPoints, saveCompletedReading } from "../db";

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
  const [totalPoints, setTotalPointsState] = useState(0);

  const totalQuestions = content.sections.reduce(
    (total, section) => total + (section.questions?.length || 0),
    0,
  );

  const isDoneEnabled =
    completedQuestions.size === totalQuestions && !isSubmitting;

  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load total points from IndexedDB on mount
    (async () => {
      const points = await getTotalPoints();
      setTotalPointsState(points);
    })();
  }, []);

  useEffect(() => {
    // Save total points to IndexedDB whenever it changes
    (async () => {
      await setTotalPoints(totalPoints);
    })();
  }, [totalPoints]);

  const handleDone = async () => {
    if (isSubmitting) return;

    setIsSubmitting(true);
    try {
      // Award 40 points for finishing reading
      setTotalPointsState((prev) => prev + 40);

      // Save completed reading to IndexedDB
      await saveCompletedReading(content.title, Array.from(completedQuestions));

      onComplete(content.title);
    } catch (error) {
      console.error("Failed to mark reading as complete:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleQuestionComplete = (questionId: string) => {
    setCompletedQuestions((prev) => new Set([...prev, questionId]));
  };

  const handleScore = (points: number) => {
    setTotalPointsState((prev) => prev + points);
  };

  // Medal calculation logic
  const [currentMedal, setCurrentMedal] = useState("");
  const [progressToNextMedal, setProgressToNextMedal] = useState(0);

  useEffect(() => {
    const { medal, progress } = calculateMedal(totalPoints);
    setCurrentMedal(medal);
    setProgressToNextMedal(progress);
  }, [totalPoints]);

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

        {/* Medal and Points Display */}
        <Box sx={{ mt: 2 }}>
          <Typography level="body-md">Medal: {currentMedal}</Typography>
          <LinearProgress
            determinate
            value={progressToNextMedal}
            variant="soft"
            size="lg"
            sx={{ "--LinearProgress-radius": "8px", mt: 1 }}
          />
          <Typography level="body-sm" sx={{ mt: 1 }}>
            {progressToNextMedal.toFixed(1)}% to next medal
          </Typography>
          <Typography level="body-sm" sx={{ mt: 1 }}>
            Total Points: {totalPoints}
          </Typography>
        </Box>
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
                onScore={handleScore} // Pass onScore prop
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

// Medal calculation logic
function calculateMedal(totalPoints: number) {
  const medals = [
    { name: "Bronze 1 Star", minPoints: 0 },
    { name: "Bronze 2 Stars", minPoints: 50 },
    { name: "Bronze 3 Stars", minPoints: 100 },
    { name: "Silver 1 Star", minPoints: 150 },
    { name: "Silver 2 Stars", minPoints: 200 },
    { name: "Silver 3 Stars", minPoints: 250 },
    { name: "Gold 1 Star", minPoints: 300 },
    { name: "Gold 2 Stars", minPoints: 350 },
    { name: "Gold 3 Stars", minPoints: 400 },
    { name: "Platinum 1 Star", minPoints: 450 },
    { name: "Platinum 2 Stars", minPoints: 500 },
    { name: "Platinum 3 Stars", minPoints: 550 },
    { name: "Diamond 1 Star", minPoints: 600 },
    { name: "Diamond 2 Stars", minPoints: 650 },
    { name: "Diamond 3 Stars", minPoints: 700 },
  ];

  let currentMedal = medals[0];
  let nextMedal = medals[1] || medals[0];

  for (let i = medals.length - 1; i >= 0; i--) {
    if (totalPoints >= medals[i].minPoints) {
      currentMedal = medals[i];
      nextMedal = medals[i + 1] || medals[i];
      break;
    }
  }

  const progress =
    ((totalPoints - currentMedal.minPoints) /
      (nextMedal.minPoints - currentMedal.minPoints)) *
    100;

  return {
    medal: currentMedal.name,
    progress: Math.min(100, progress),
  };
}
