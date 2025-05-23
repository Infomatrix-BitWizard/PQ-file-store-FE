"use client";

import React, { useEffect, useRef, useState } from "react";
import "./popup.css";
import { useMount } from "@/app/hooks/useMount";
import { useWindowResize } from "@/app/hooks/useWindowResize";
import { useWindowScroll } from "@/app/hooks/useWindowScroll";
import { debounce } from "@/app/helpers/debounce";

interface IPopupProps {
  children: React.ReactElement;
  content: React.ReactNode;
}

const Popup = ({ children, content }: IPopupProps) => {
  const elementRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);

  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [elementPosition, setElementPosition] = useState({ x: 0, y: 0 });
  const [arrowPosition, setArrowPosition] = useState({ x: 0, y: 0 });

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

  const calcPosition = () => {
    if (!contentRef.current || !elementRef.current) {
      return;
    }
    const childElement = elementRef.current.firstElementChild as HTMLElement;

    const containerSize = contentRef.current.getBoundingClientRect();
    const elementRect = childElement.getBoundingClientRect();

    const positionX = elementRect.width + elementRect.x - containerSize.width;
    // const positionY = windowScroll.y + elementRect.y + elementRect.height + 12;
    const positionY = elementRect.y + elementRect.height + 12;

    setElementPosition({ x: positionX, y: positionY });

    setArrowPosition({
      x: containerSize.width - Math.round(elementRect.width / 2) - 7,
      y: 0,
    });
  };

  const handlerOpen = async () => {
    await debounce(0);
    setIsVisible(true);
  };

  return (
    <>
      <div
        style={{display: 'contents'}}
        ref={elementRef}
        onClick={() => setIsOpen(prev => !prev)}
        data-name={"popup-wrapper"}
      >
        {children}
      </div>

      {isOpen && (
        <div
          ref={contentRef}
          className={"popup-content"}
          style={{
            top: `${elementPosition.y}px`,
            left: `${elementPosition.x}px`,
            opacity: isVisible ? 1 : 0,
          }}
        >
          {content}
        </div>
      )}
    </>
  );
};

export default Popup;
