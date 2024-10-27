import { createContext } from "preact";
import { useContext, useState } from "preact/hooks";

interface MediaContextType {
  imageProxy?: string;
  lazyLoadOffset?: number;
  lightboxEnabled: boolean;
  mediaQuality: "auto" | "low" | "medium" | "high";
  toggleLightbox: (enabled: boolean) => void;
  setMediaQuality: (quality: "auto" | "low" | "medium" | "high") => void;
}

const MediaContext = createContext<MediaContextType>({
  lightboxEnabled: true,
  mediaQuality: "auto",
  toggleLightbox: () => {},
  setMediaQuality: () => {},
});

export const MediaProvider = ({
  children,
}: {
  children: preact.ComponentChildren;
}) => {
  const [lightboxEnabled, setLightboxEnabled] = useState(true);
  const [mediaQuality, setMediaQuality] = useState<
    "auto" | "low" | "medium" | "high"
  >("auto");

  return (
    <MediaContext.Provider
      value={{
        imageProxy: import.meta.env.IMAGE_PROXY_URL,
        lazyLoadOffset: 100,
        lightboxEnabled,
        mediaQuality,
        toggleLightbox: setLightboxEnabled,
        setMediaQuality,
      }}
    >
      {children}
    </MediaContext.Provider>
  );
};

export const useMedia = () => useContext(MediaContext);
