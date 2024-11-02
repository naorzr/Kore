// types/media.ts
export type MediaContent = UrlMediaContent | EmbedMediaContent;

interface BaseMediaContent {
  type: "image" | "video" | "gif";
  alt?: string;
  caption?: string;
  width?: number;
  height?: number;
}

interface UrlMediaContent extends BaseMediaContent {
  url: string;
  embedHtml?: never;
}

interface EmbedMediaContent extends BaseMediaContent {
  url?: never;
  embedHtml: string;
}
