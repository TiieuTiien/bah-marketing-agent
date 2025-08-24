import { useEffect, useRef } from "react";

export const useHoverInside = (callback: (isHovering: boolean) => void) => {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const handleMouseEnter = () => callback(true);

    const handleMouseLeave = () => callback(false);

    const element = ref.current;

    if (element) {
      element.addEventListener("mouseenter", handleMouseEnter);
      element.addEventListener("mouseleave", handleMouseLeave);
    }

    return () => {
      if (element) {
        element.removeEventListener("mouseenter", handleMouseEnter);
        element.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, [callback]);

  return ref;
};
