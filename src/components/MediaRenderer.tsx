import { useState, useRef, useEffect } from "preact/hooks";

// Basic image loading states
interface MediaRendererState {
  isLoading: boolean;
  hasError: boolean;
}
import { Box, Typography, CircularProgress, Modal } from "@mui/joy";
import { MediaContent } from "../types/reading";

interface MediaRendererProps {
  media: MediaContent;
}

export const MediaRenderer = ({ media }: MediaRendererProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = media.url;
    img.onload = () => {
      console.log("Media loaded successfully:", media.url);
      setIsLoading(false);
    };
    img.onerror = (error) => {
      console.error("Media failed to load:", media.url, error);
      setHasError(true);
      setIsLoading(false);
    };
  }, [media.url]);

  const commonProps = {
    alt: media.alt || media.caption || "",
    style: {
      maxWidth: media.width || "100%",
      height: media.height || "auto",
      borderRadius: "8px",
    },
  };

  const renderMedia = () => {
    switch (media.type) {
      case "image":
        return <img src={media.url} {...commonProps} />;
      case "video":
        return (
          <video
            controls
            {...commonProps}
            style={{ ...commonProps.style, backgroundColor: "#000" }}
          >
            <source src={media.url} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        );
      case "gif":
        return <img src={media.url} {...commonProps} />;
      default:
        return null;
    }
  };

  return (
    <Box sx={{ my: 2 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          overflow: "hidden",
          borderRadius: "8px",
        }}
      >
        {renderMedia()}
      </Box>
      {media.caption && (
        <Typography
          level="body-sm"
          sx={{ textAlign: "center", mt: 1, color: "text.secondary" }}
        >
          {media.caption}
        </Typography>
      )}
    </Box>
  );
};
