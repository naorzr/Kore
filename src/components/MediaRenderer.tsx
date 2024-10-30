import { Box, Typography } from "@mui/joy";
import { match } from "ts-pattern";
import { MediaContent } from "../types/media";

interface MediaRendererProps {
  media: MediaContent;
}

export const MediaRenderer = ({ media }: MediaRendererProps) => {
  const { url, type, alt, caption, width, height } = media;

  const commonStyles = {
    width: "100%",
    maxWidth: width || "100%",
    height: height || "auto",
    borderRadius: "8px",
    objectFit: "contain",
  };

  const imageAlt = alt || caption || "";

  const renderMedia = () =>
    match(type)
      .with("video", () => (
        <video controls style={{ ...commonStyles, backgroundColor: "#000" }}>
          <source src={url} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      ))
      .with("image", "gif", () => (
        <img src={url} alt={imageAlt} style={commonStyles} />
      ))
      .otherwise(() => null);

  return (
    <Box sx={{ my: 2 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        {renderMedia()}
      </Box>
      {caption && (
        <Typography
          level="body-sm"
          sx={{ textAlign: "center", mt: 1, color: "text.secondary" }}
        >
          {caption}
        </Typography>
      )}
    </Box>
  );
};
