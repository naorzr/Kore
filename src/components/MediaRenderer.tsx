// mediaRenderer.tsx

import { Box, Typography } from "@mui/joy";
import { MediaContent } from "../types/media";
import DOMPurify from "dompurify";
import { match, P } from "ts-pattern";
import { useCallback } from "preact/hooks";
import { memo } from "preact/compat";

interface MediaRendererProps {
  media: MediaContent;
}

export const MediaRenderer = memo(({ media }: MediaRendererProps) => {
  const { type, alt, caption, width, height } = media;

  const commonStyles = {
    width: "100%",
    maxWidth: width ? `${width}px` : "100%",
    height: height ? `${height}px` : "auto",
    borderRadius: "8px",
    objectFit: "contain" as const,
  };

  const imageAlt = alt || caption || "";
  const RenderMedia = useCallback(
    () =>
      match(media)
        .with({ url: P.string }, (media) =>
          match(type)
            .with("image", () => (
              <img src={media.url} alt={imageAlt} style={commonStyles} />
            ))
            .with("gif", () => (
              <img src={media.url} alt={imageAlt} style={commonStyles} />
            ))
            .with("video", () => (
              <video
                controls
                style={{ ...commonStyles, backgroundColor: "#000" }}
              >
                <source src={media.url} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            ))
            .exhaustive(),
        )
        .with({ embedHtml: P.string }, ({ embedHtml }) => {
          const sanitizedHtml = DOMPurify.sanitize(embedHtml, {
            ALLOWED_TAGS: [
              "iframe",
              "div",
              "p",
              "span",
              "b",
              "i",
              "u",
              "br" /* other tags you want to allow */,
            ],
            ALLOWED_ATTR: [
              "width",
              "height",
              "src",
              "title",
              "frameborder",
              "allow",
              "referrerpolicy",
              "allowfullscreen",
              "style",
              "class" /* other attributes needed */,
            ],
            ALLOWED_URI_REGEXP: /^(https:\/\/www\.youtube\.com\/embed\/)/, // Only allows YouTube embed URLs
          });
          return (
            <Box
              sx={{
                position: "relative",
                width: "100%",
                paddingBottom: "56.25%",
                height: 0,
                overflow: "hidden",
                borderRadius: "8px",
              }}
              dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
            />
          );
        })
        .exhaustive(),
    [media, type, imageAlt, commonStyles],
  );

  return (
    <Box sx={{ my: 2 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        <RenderMedia />
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
});
