import { useRef, useEffect } from "react";

export const useEffectOnce = (callback: () => void, dependency: unknown) => {
  const hasRunOnce = useRef(false);
  useEffect(() => {
    if (dependency && !hasRunOnce.current) {
      callback();
      hasRunOnce.current = true;
    }
  }, [dependency]);
};
