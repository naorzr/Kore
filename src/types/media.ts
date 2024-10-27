type MediaType = "image" | "video" | "gif" | "embed";

interface MediaDimensions {
  width?: number;
  height?: number;
  aspectRatio?: number;
}

interface MediaSource {
  url: string;
  width?: number;
  height?: number;
  type?: string;
  quality?: "low" | "medium" | "high";
}

interface MediaContent extends MediaDimensions {
  type: MediaType;
  sources: MediaSource[];
  fallbackUrl: string;
  caption?: string;
  alt?: string;
  thumbnail?: string;
  autoplay?: boolean;
  loop?: boolean;
  muted?: boolean;
  controls?: boolean;
  preload?: "none" | "metadata" | "auto";
  priority?: boolean;
  lazyLoad?: boolean;
  placeholder?: string;
  duration?: number;
  metadata?: {
    [key: string]: unknown;
  };
}

interface MediaLoadError {
  code: number;
  message: string;
  details?: unknown;
}
