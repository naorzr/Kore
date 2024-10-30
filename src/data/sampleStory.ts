import { ReadingContent } from "../types/reading";

export const sampleStory: ReadingContent = {
  id: "tommys-first-day",
  title: "Tommy's First Day at Programming Club",
  category: "Programming",
  tags: ["coding", "algorithms", "Scratch"],
  sections: [
    {
      id: "intro",
      content: `Tommy was excited about his first day at the after-school Programming Club. He had always loved playing games on his computer, but now he was going to learn how to make them! As he walked into the classroom, he saw other kids sitting at computers with colorful screens full of blocks and pictures.`,
    },
    {
      id: "section-1",
      content: `"Welcome everyone!" said Ms. Chen, the club teacher. "Today we're going to learn about algorithms - they're like recipes that tell a computer what to do, step by step." Tommy sat next to a girl named Maya who smiled and showed him how to open Scratch, a program with fun cartoon characters they could control.`,
      questions: [
        {
          id: "q1",
          question: "What is an algorithm similar to, according to Ms. Chen?",
          choices: [
            "A book of stories",
            "A recipe with steps",
            "A video game",
            "A computer screen",
          ],
          correctAnswer: "A recipe with steps",
          explanation:
            "Ms. Chen explained that algorithms are like recipes because they tell computers what to do step by step!",
          position: 1,
        },
      ],
    },
    {
      id: "section-2",
      content: `Ms. Chen showed them how to make a cat character dance across the screen. Tommy tried clicking and dragging different colored blocks together like puzzle pieces. Each block was a command that told the cat what to do. When he pressed the green flag button, his cat spun around and meowed!`,
      media: [
        {
          type: "image",
          url: "https://placecats.com/300/200",
          caption: "Example of Scratch programming blocks",
          alt: "Screenshot showing colorful Scratch programming blocks connected together",
          width: 600,
        },
      ],
    },
    {
      id: "section-3",
      content: `Maya was making her cat draw shapes. She showed Tommy how to use blocks that made the cat move forward and turn. Together, they figured out how to make the cat draw a square by repeating the same steps four times.`,
      media: [
        {
          type: "gif",
          url: "https://media1.tenor.com/m/zlKoX5HPPu8AAAAC/cat-annoyed.gif",
          caption: "The cat sprite dancing across the screen",
          alt: "Animated GIF showing a Scratch cat sprite dancing",
          width: 400,
        },
        {
          type: "video",
          url: "https://www.youtube.com/embed/il23o-rqSiY?si=8x1qjSlq0vdbd0Da",
          caption: "foo",
          alt: "Animated GIF showing a Scratch cat sprite dancing",
          width: 400,
        },
      ],
      questions: [
        {
          id: "q2",
          question: "How did Tommy and Maya make their cat draw a square?",
          choices: [
            "By using one big block",
            "By drawing it with a mouse",
            "By repeating the same steps four times",
            "By asking Ms. Chen to do it",
          ],
          correctAnswer: "By repeating the same steps four times",
          explanation:
            "They made a square by making the cat repeat the same movement steps four times - that's an algorithm!",
          position: 1,
        },
      ],
    },
    {
      id: "section-4",
      content: `At the end of class, Tommy couldn't believe how much fun programming was. "Next week we'll learn how to make our own simple game!" Ms. Chen announced. Tommy could hardly wait. On his way home, he realized that programming wasn't just about computers - it was about being creative and solving puzzles too!`,
    },
  ],
  readingLevel: "beginner",
  estimatedMinutes: 4,
  vocabulary: [
    {
      word: "algorithm",
      definition:
        "A step-by-step set of instructions for solving a problem or completing a task",
      position: 1,
    },
  ],
};
