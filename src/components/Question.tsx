// components/Question.tsx
import { Alert, Button, Radio, RadioGroup, Sheet, Typography } from "@mui/joy";
import { useState } from "preact/hooks";
import { ReadingQuestion } from "../types/reading";
import { match } from "ts-pattern";

interface QuestionProps {
  question: ReadingQuestion;
  onComplete: (questionId: string) => void;
  onScore: (points: number) => void; // New prop for scoring
}

export function Question({ question, onComplete, onScore }: QuestionProps) {
  const [selected, setSelected] = useState<string>("");
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [attempts, setAttempts] = useState(0);

  const handleSubmit = () => {
    setHasSubmitted(true);
    setAttempts(attempts + 1);
    const correct = selected === question.correctAnswer;
    setIsCorrect(correct);

    if (correct) {
      const points = attempts === 0 ? 10 : 5; // Award points
      onScore(points);
      setTimeout(() => onComplete(question.id), 2000);
    }
  };

  const handleChange = (value: string) => {
    if (isCorrect) return;
    setSelected(value);
    if (hasSubmitted) {
      setHasSubmitted(false);
      setIsCorrect(null);
    }
  };

  return (
    <Sheet
      variant="outlined"
      sx={{
        p: 3,
        my: 2,
        borderRadius: "lg",
        bgcolor: "background.surface",
      }}
    >
      <Typography level="title-lg" sx={{ mb: 2, color: "primary.plainColor" }}>
        Let's Check Your Understanding! 🤔
      </Typography>

      <Typography level="body-lg" sx={{ mb: 2 }}>
        {question.question}
      </Typography>

      <RadioGroup
        value={selected}
        onChange={(event) => handleChange(event.currentTarget.value)}
      >
        {question.choices.map((option) => (
          <Radio
            key={option}
            value={option}
            label={option}
            sx={{ mb: 1 }}
            disabled={isCorrect === true}
          />
        ))}
      </RadioGroup>

      {!hasSubmitted && (
        <Button
          variant="solid"
          sx={{ mt: 2 }}
          onClick={handleSubmit}
          disabled={!selected}
        >
          Check Answer
        </Button>
      )}

      {hasSubmitted && isCorrect !== null && (
        <Alert
          variant="soft"
          color={isCorrect ? "success" : "warning"}
          sx={{ mt: 2 }}
        >
          {match(isCorrect)
            .with(true, () => (
              <>
                <Typography level="title-sm">Correct! 🎉</Typography>
                <Typography level="body-sm">{question.explanation}</Typography>
              </>
            ))
            .otherwise(() => (
              <>
                <Typography level="title-sm">Try again! 💭</Typography>
                <Typography level="body-sm">
                  Think carefully about what happened in the story.
                </Typography>
              </>
            ))}
        </Alert>
      )}
    </Sheet>
  );
}
