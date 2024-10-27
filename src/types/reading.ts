export type Difficulty = "easy" | "medium" | "hard";

export interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

export interface Section {
  id: string;
  content: string;
  question?: Question;
}

export interface User {
  id: string;
  name: string;
  email: string;
  preferences: {
    fontSize: number;
    fontFamily: string;
    theme: "light" | "dark";
  };
}

export interface ReadingStats {
  totalMinutesRead: number;
  averageWordsPerMinute: number;
  totalStoriesCompleted: number;
  currentStreak: number;
  bestStreak: number;
}

export interface VocabularyItem {
  word: string;
  definition: string;
  usageExample?: string;
  learnedAt?: Date;
  reviewCount: number;
}

export interface ReadingHistory {
  completedStories: string[];
  bookmarks: {
    storyId: string;
    position: number;
    addedAt: Date;
  }[];
  vocabulary: VocabularyItem[];
}
// Types for reading content management
export interface Story {
  id: string;
  title: string;
  author?: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
  published: boolean;
}

export interface Category {
  id: string;
  name: string;
  description?: string;
  stories: Story[];
}

export interface ReadingProgress {
  storyId: string;
  userId: string;
  lastPosition: number;
  completedSections: string[];
  score?: number;
  timeSpent: number;
}
export interface ReadingQuestion {
  id: string;
  question: string;
  choices?: string[];
  correctAnswer?: string;
  explanation: string;
  position: number; // Position in text where question should appear
}

export type MediaType = "image" | "video" | "gif";

export interface MediaContent {
  type: MediaType;
  url: string;
  alt?: string;
  caption?: string;
  description?: string;
  sources?: {
    url: string;
    type: string;
    width?: number;
  }[];
  width?: number;
  height?: number;
}

export interface ReadingSection {
  id: string;
  content: string;
  questions?: ReadingQuestion[];
  media?: MediaContent[];
}

export interface ReadingContent {
  title: string;
  sections: ReadingSection[];
  readingLevel: "beginner" | "intermediate" | "advanced";
  estimatedMinutes: number;
  vocabulary?: {
    word: string;
    definition: string;
    position: number;
  }[];
}
