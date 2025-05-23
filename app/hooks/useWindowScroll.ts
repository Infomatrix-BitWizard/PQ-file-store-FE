import { useEffect, useState } from "react";

export interface IWindowScroll {
  x: number;
  y: number;
}

export const useWindowScroll = () => {
  const [windowScroll, setWindowScroll] = useState({ x: 0, y: 0 })

  useEffect(() => {
    getScrollPosition()

    window.addEventListener("scroll", getScrollPosition);

    return () => {
      window.removeEventListener("scroll", getScrollPosition);
    }
  }, []);

  const getScrollPosition = () => {
    setWindowScroll({ x: window.scrollX, y: window.scrollY });
  }

  return { windowScroll }
};