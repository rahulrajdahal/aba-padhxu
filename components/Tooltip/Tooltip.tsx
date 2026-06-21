"use client";

import React from "react";

type TooltipPosition = "top" | "bottom" | "left" | "right";

export interface TooltipProps {
  content: React.ReactNode;
  position?: TooltipPosition;
  delay?: number; // Delay in ms before showing
  children: React.ReactElement; // Requires a single child element to anchor to
}

const POSITION_STYLES: Record<TooltipPosition, string> = {
  top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
  bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
  left: "right-full top-1/2 -translate-y-1/2 mr-2",
  right: "left-full top-1/2 -translate-y-1/2 ml-2",
};

const ARROW_STYLES: Record<TooltipPosition, string> = {
  top: "top-full left-1/2 -translate-x-1/2 border-t-gray-900",
  bottom: "bottom-full left-1/2 -translate-x-1/2 border-b-gray-900",
  left: "left-full top-1/2 -translate-y-1/2 border-l-gray-900",
  right: "right-full top-1/2 -translate-y-1/2 border-r-gray-900",
};

export default function Tooltip({
  content,
  position = "top",
  delay = 200,
  children,
}: TooltipProps) {
  const [isVisible, setIsVisible] = React.useState(false);
  const timeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  // React 19 native unique ID generation for bulletproof ARIA accessibility pairing
  const id = React.useId();
  const tooltipId = `tooltip-${id}`;

  const showTooltip = () => {
    timeoutRef.current = setTimeout(() => {
      setIsVisible(true);
    }, delay);
  };

  const hideTooltip = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsVisible(false);
  };

  // Clean up timers on unmount
  React.useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const trigger = React.cloneElement(children, {
    "aria-describedby": isVisible ? tooltipId : undefined,
    onMouseEnter: showTooltip,
    onMouseLeave: hideTooltip,
    onFocus: showTooltip,
    onBlur: hideTooltip,
  });

  return (
    <div className="relative inline-block">
      {trigger}

      {isVisible && (
        <div
          id={tooltipId}
          role="tooltip"
          aria-live="polite"
          className={`
            absolute z-50 whitespace-nowrap bg-gray-900 text-white text-xs 
            py-1.5 px-3 rounded shadow-md pointer-events-none animate-fade-in
            ${POSITION_STYLES[position]}
          `.trim()}
        >
          {content}
          <div
            className={`
              absolute border-4 border-transparent 
              ${ARROW_STYLES[position]}
            `.trim()}
          />
        </div>
      )}
    </div>
  );
}
