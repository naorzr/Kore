import { CssVarsProvider } from "@mui/joy/styles";
import CssBaseline from "@mui/joy/CssBaseline";
import { ReadingPage } from "./components/ReadingPage";
import { sampleStory } from "./data/sampleStory";
import theme from "./theme/theme";
import { useState } from "preact/hooks";

export function App() {
  const [completedReadings, setCompletedReadings] = useState<string[]>([]);
  const handleReadingComplete = (readingTitle: string) => {
    setCompletedReadings((prev) => [...prev, readingTitle]);
    // You might want to save this to localStorage or your backend
  };
  return (
    <CssVarsProvider theme={theme} defaultMode="light">
      <CssBaseline />
      <ReadingPage content={sampleStory} onComplete={handleReadingComplete} />
    </CssVarsProvider>
  );
}
