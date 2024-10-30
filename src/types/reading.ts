import { MediaContent } from "./media";

// types/reading.ts
export interface ReadingQuestion {
  id: string;
  question: string;
  choices: string[];
  correctAnswer: string;
  explanation: string;
  position?: number;
}

export interface ReadingSection {
  id: string;
  content: string;
  questions?: ReadingQuestion[];
  media?: MediaContent[];
}

export interface ReadingContent {
  id: string;
  category: string;
  tags: string[];
  language: string;
  title: string;
  sections: ReadingSection[];
  readingLevel: "beginner" | "intermediate" | "advanced";
  estimatedMinutes: number;
  vocabulary?: {
    word: string;
    definition: string;
    position?: number;
  }[];
}
