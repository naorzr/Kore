// types/media.ts
export type MediaType = "image" | "video" | "gif" | "embed";

export interface MediaSource {
  url: string;
  width?: number;
  height?: number;
  type?: string;
  quality?: "low" | "medium" | "high";
}

export interface MediaContent {
  type: MediaType;
  sources?: MediaSource[];
  url?: string;
  alt?: string;
  caption?: string;
  width?: number;
  height?: number;
  autoplay?: boolean;
  loop?: boolean;
  controls?: boolean;
}
