import { useState, useEffect } from "preact/hooks";

export const useIntersectionObserver = (
  ref: preact.RefObject<Element>,
  options: IntersectionObserverInit = {},
  skip = false
) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (skip) {
      setIsVisible(true);
      return;
    }

    if (!ref.current) return;

    const observer = new IntersectionObserver(([entry]) => {
      setIsVisible(entry.isIntersecting);
    }, options);

    observer.observe(ref.current);

    return () => {
      observer.disconnect();
    };
  }, [ref, options, skip]);

  return isVisible;
};
