/**
 * Theme configuration for kids reading app
 * - Uses playful, friendly colors
 * - Comic Sans font for readability
 * - Large, clear typography
 * - Smooth animations and rounded corners
 */
import { extendTheme } from "@mui/joy/styles";

const theme = extendTheme({
  colorSchemes: {
    light: {
      palette: {
        primary: {
          50: "#e3f2fd",
          100: "#bbdefb",
          200: "#90caf9",
          300: "#64b5f6",
          400: "#42a5f5",
          500: "#2196f3", // Primary blue - friendly and calm
          600: "#1e88e5",
          700: "#1976d2",
          800: "#1565c0",
          900: "#0d47a1",
        },
        success: {
          500: "#4caf50", // Success green - encouraging
        },
        warning: {
          500: "#ff9800", // Warning orange - attention grabbing but not scary
        },
        neutral: {
          50: "#fafafa",
          100: "#f5f5f5",
          200: "#eeeeee",
          300: "#e0e0e0",
          400: "#bdbdbd",
          500: "#9e9e9e",
          600: "#757575",
          700: "#616161",
          800: "#424242",
          900: "#212121",
        },
      },
    },
    dark: {
      palette: {
        primary: {
          50: "#e8eaf6",
          100: "#c5cae9",
          200: "#9fa8da",
          300: "#7986cb",
          400: "#5c6bc0",
          500: "#3f51b5", // Softer blue for dark mode
          600: "#3949ab",
          700: "#303f9f",
          800: "#283593",
          900: "#1a237e",
        },
      },
    },
  },
  fontFamily: {
    display: '"Comic Sans MS", "Comic Neue", cursive',
    body: '"Comic Sans MS", "Comic Neue", cursive',
  },
  typography: {
    h1: {
      fontSize: "2.5rem",
      fontWeight: 700,
      lineHeight: 1.2,
    },
    h2: {
      fontSize: "2rem",
      fontWeight: 600,
      lineHeight: 1.3,
    },
    h3: {
      fontSize: "1.75rem",
      fontWeight: 600,
      lineHeight: 1.4,
    },
  },
  components: {
    JoyButton: {
      styleOverrides: {
        root: {
          borderRadius: "12px",
          fontSize: "1.1rem",
          transition: "transform 0.2s ease-in-out",
          "&:hover": {
            transform: "scale(1.05)",
          },
        },
      },
    },
    JoyCard: {
      styleOverrides: {
        root: {
          borderRadius: "16px",
          boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
        },
      },
    },
  },
});

export default theme;
