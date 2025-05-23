import { useEffect, useRef, useState } from "react";
import { debounce } from "@/app/helpers/debounce";
import { useMount } from "@/app/hooks/useMount";
import { useWindowResize } from "@/app/hooks/useWindowResize";
import { useWindowScroll } from "@/app/hooks/useWindowScroll";

export const useOutsideClick = () => {
  const elementRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);

  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [elementPosition, setElementPosition] = useState({ x: 0, y: 0 });

  const { isMount } = useMount();
  const { windowSize } = useWindowResize();
  const { windowScroll } = useWindowScroll();

  useEffect(() => {
    if (!isOpen) {
      setElementPosition({ x: 0, y: 0 });
      setIsVisible(false);
    } else {
      handlerOpen();
    }

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isOpen]);

  useEffect(() => {
    calcPosition();
  }, [isMount, isOpen, windowSize, windowScroll]);

  const handleOutsideClick = (event: MouseEvent) => {
    if (!elementRef.current || !contentRef.current) {
      return;
    }

    if (elementRef.current.contains(event.target as Node) || contentRef.current.contains(event.target as Node)) {
      return;
    }

    setIsOpen(false);
    setIsVisible(false);
  };

  const handlerOpen = async () => {
    await debounce(0);
    setIsVisible(true);
  };

  const calcPosition = () => {
    if (!contentRef.current || !elementRef.current) {
      return;
    }
    const childElement = elementRef.current.firstElementChild as HTMLElement;

    const containerSize = contentRef.current.getBoundingClientRect();
    const elementRect = childElement.getBoundingClientRect();

    const positionX = elementRect.width + elementRect.x - containerSize.width;
    // const positionY = windowScroll.y + elementRect.y + elementRect.height;
    const positionY = elementRect.y + elementRect.height;

    setElementPosition({ x: positionX, y: positionY });
  };

  return {
    elementRef,
    contentRef,

    isOpen,
    setIsOpen,

    isVisible,

    elementPosition,
  };
};
