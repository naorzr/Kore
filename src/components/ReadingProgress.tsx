// src/components/ReadingStats.tsx
//
import { Box, Typography, Sheet } from "@mui/joy";
import { AccessTime, Book, Star, Whatshot } from "@mui/icons-material";
interface ReadingStatsProps {
  stats: {
    totalMinutes: number;
    completedReadings: number;
    streak: number;
    averageScore: number;
  };
}

export const ReadingStats = ({ stats }: ReadingStatsProps) => {
  return (
    <Sheet
      variant="outlined"
      sx={{
        p: 2,
        borderRadius: "lg",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
        gap: 2,
      }}
    >
      <Box sx={{ textAlign: "center" }}>
        <AccessTime sx={{ color: "primary.500", fontSize: "2rem" }} />
        <Typography level="h4">{stats.totalMinutes}</Typography>
        <Typography level="body-sm">Minutes Read</Typography>
      </Box>

      <Box sx={{ textAlign: "center" }}>
        <Book sx={{ color: "primary.500", fontSize: "2rem" }} />
        <Typography level="h4">{stats.completedReadings}</Typography>
        <Typography level="body-sm">Books Done</Typography>
      </Box>

      <Box sx={{ textAlign: "center" }}>
        <Whatshot sx={{ color: "primary.500", fontSize: "2rem" }} />
        <Typography level="h4">{stats.streak}</Typography>
        <Typography level="body-sm">Day Streak</Typography>
      </Box>

      <Box sx={{ textAlign: "center" }}>
        <Star sx={{ color: "primary.500", fontSize: "2rem" }} />
        <Typography level="h4">{stats.averageScore}%</Typography>
        <Typography level="body-sm">Avg Score</Typography>
      </Box>
    </Sheet>
  );
};
