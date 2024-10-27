import { Alert, Button, Radio, RadioGroup, Sheet, Typography } from "@mui/joy";
import { useState } from "preact/hooks";
import { ReadingQuestion } from "../types/reading";

interface QuestionProps {
  question: ReadingQuestion;
  onComplete: (questionId: string) => void;
}

export function Question({ question, onComplete }: QuestionProps) {
  const [selected, setSelected] = useState<string>("");
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const handleSubmit = () => {
    setHasSubmitted(true);
    const correct = selected === question.correctAnswer;
    setIsCorrect(correct);

    if (correct) {
      setTimeout(() => onComplete(question.id), 2000);
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
        onChange={(e) => {
          // Prevent changing the selection after a correct answer
          if (isCorrect) {
            return;
          }
          setSelected(e.currentTarget.value);

          // Reset submission state if the user changes their answer
          if (hasSubmitted) {
            setHasSubmitted(false);
            setIsCorrect(null);
          }
        }}
      >
        {question.choices?.map((option) => (
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
          {isCorrect ? (
            <>
              <Typography level="title-sm">Correct! 🎉</Typography>
              <Typography level="body-sm">{question.explanation}</Typography>
            </>
          ) : (
            <>
              <Typography level="title-sm">Try again! 💭</Typography>
              <Typography level="body-sm">
                Think carefully about what happened in the story.
              </Typography>
            </>
          )}
        </Alert>
      )}
    </Sheet>
  );
}
