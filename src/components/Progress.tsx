import { LinearProgress } from "@mui/joy";
import { useState, useEffect } from "preact/hooks";
import { memo, RefObject } from "preact/compat";

interface ProgressProps {
  contentRef: RefObject<HTMLDivElement>;
}

export const Progress = memo(({ contentRef }: ProgressProps) => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (contentRef.current) {
        const { scrollTop, scrollHeight, clientHeight } = contentRef.current;
        const scrollPercentage =
          (scrollTop / (scrollHeight - clientHeight)) * 100;
        setScrollProgress(Math.min(100, Math.max(0, scrollPercentage)));
      }
    };

    const currentRef = contentRef.current;
    if (currentRef) {
      currentRef.addEventListener("scroll", handleScroll);
    }

    // Cleanup function to remove the event listener
    return () => {
      if (currentRef) {
        currentRef.removeEventListener("scroll", handleScroll);
      }
    };
  }, [contentRef]);

  return (
    <LinearProgress
      determinate
      value={scrollProgress}
      variant="soft"
      size="lg"
      sx={{ "--LinearProgress-radius": "8px" }}
    />
  );
});
