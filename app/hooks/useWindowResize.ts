import { useEffect, useState } from "react";

export interface IWindowResize {
  x: number;
  y: number;
}

export const useWindowResize = () => {
  const [windowSize, setWindowSize] = useState({ x: 0, y: 0 });

  useEffect(() => {
    getScrollPosition();

    window.addEventListener("resize", getScrollPosition);

    return () => {
      window.removeEventListener("resize", getScrollPosition);
    };
  }, []);

  const getScrollPosition = () => {
    setWindowSize({ x: innerWidth, y: innerHeight });
  };

  return { windowSize };
};
