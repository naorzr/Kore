import { ReadingContent } from "../types/reading";

export const sampleStory: ReadingContent = {
  id: "tommys-first-day",
  title: "Tommy's First Day at Programming Club",
  category: "Programming",
  tags: ["coding", "algorithms", "Scratch"],
  language: "en",
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
          embedHtml: `<iframe width="560" height="315" src="https://www.youtube.com/embed/AxOjPlHvuaY?si=N_CHM4OszNkZyFFl" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`,
          caption: "Tommy learns to code",
          alt: "Video of Tommy learning to code",
          width: 600,
          height: 338,
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

export const sampleScienceStory: ReadingContent = {
  id: "lians-space-adventure",
  title: "הרפתקאה של ליאן בחלל",
  category: "מדע",
  tags: ["חלל", "כוכבים", "גלקסיה"],
  language: "he",
  sections: [
    {
      id: "intro",
      content: `ליאן תמיד חלמה לטוס לחלל ולחקור את הכוכבים. יום אחד, ההזדמנות שלה הגיעה! היא קיבלה הזמנה להצטרף למסע חלל עם צוות מדען מיוחד.`,
    },
    {
      id: "section-1",
      content: `כשליאן נכנסה לחללית, היא ראתה חללים מתקדמים ומסכים מוארים. הקפטן אמר, "ברוכה הבאה, ליאן! אנחנו עומדים לנסוע לכוכב מאדים. האם את מוכנה?" ליאן הנהנה בהתלהבות.`,
      questions: [
        {
          id: "q1",
          question: "מה החלום של ליאן?",
          choices: [
            "לטוס למאדים",
            "להיות מדען ימי",
            "לטוס לחלל ולחקור כוכבים",
            "להיות אסטרונאוטית על כדור הארץ",
          ],
          correctAnswer: "לטוס לחלל ולחקור כוכבים",
          explanation:
            "ליאן חלמה תמיד לטוס לחלל ולחקור את הכוכבים, וזה מה שהוביל אותה להצטרף למסע החלל.",
          position: 1,
        },
      ],
    },
    {
      id: "section-2",
      content: `במהלך המסע, ליאן למדה על מערכת השמש שלנו. היא גילתה שכוכב מאדים הוא האדום והוא הרבה יותר קטן מהארץ. היא צפתה בסופות חול גדולות ובוולי ההרים הגבוהים ביותר.`,
      media: [
        {
          type: "image",
          url: "https://example.com/mars.jpg",
          caption: "תצפית של כוכב מאדים",
          alt: "תמונה של כוכב מאדים עם סופות חול והרים",
          width: 600,
        },
      ],
      questions: [
        {
          id: "q2",
          question: "מהי אחת התכונות של כוכב מאדים שלמדת ליאן?",
          choices: [
            "הוא הגדול יותר מהארץ",
            "יש בו אוקיינוסים גדולים",
            "יש בו סופות חול גדולות והרים גבוהים",
            "הוא צהוב בבוהק",
          ],
          correctAnswer: "יש בו סופות חול גדולות והרים גבוהים",
          explanation:
            "ליאן למדה שכוכב מאדים הוא אדום ויש בו סופות חול גדולות והרים גבוהים.",
          position: 2,
        },
      ],
    },
    {
      id: "section-3",
      content: `ליאן והצוות חקרו את הקרקע והחלו לגלות סימנים לחיים בעבר. הם אספו דגימות ואספו נתונים חשובים למחקר עתידי. ליאן הרגישה גאה להיות חלק מההרפתקה ההיסטורית הזו.`,
      media: [
        {
          type: "gif",
          url: "https://media.giphy.com/media/3o6Zt8MgUuvSbkZYWc/giphy.gif",
          caption: "החללית בחלל",
          alt: "אנימציה של חללית טסה בחלל",
          width: 400,
        },
      ],
      questions: [
        {
          id: "q3",
          question: "מה גילתה ליאן והצוות במחקרם?",
          choices: [
            "מים נוזליים על מאדים",
            "סימנים לחיים בעבר",
            "כוכבים חדשים",
            "חייזרים",
          ],
          correctAnswer: "סימנים לחיים בעבר",
          explanation: "הם אספו דגימות וגילו סימנים לחיים בעבר על כוכב מאדים.",
          position: 3,
        },
      ],
    },
    {
      id: "section-4",
      content: `בסיום המסע, החללית חזרה לכדור הארץ. ליאן לא יכלה לחכות לחלוק את מה שלמדה עם חבריה. היא ידעה שזה רק ההתחלה של קריירה מדעית מרתקת.`,
    },
  ],
  readingLevel: "beginner",
  estimatedMinutes: 5,
  vocabulary: [
    {
      word: "חללית",
      definition: "ספינה או רכב המיועד לטיסה בחלל.",
      position: 1,
    },
    {
      word: "מערכת השמש",
      definition:
        "המערכת האסטרונומית שבה נמצאים השמש וכוכבי הלכת המקיפים אותה.",
      position: 2,
    },
    {
      word: "סופות חול",
      definition:
        "תופעה מטאורולוגית המתאפיינת ברוחות חזקות המניעות כמויות גדולות של חול ואבק.",
      position: 3,
    },
  ],
};
