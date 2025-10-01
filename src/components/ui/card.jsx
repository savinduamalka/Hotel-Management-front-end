import React from "react";
import { cn } from "../../lib/utils";

export function Card({
  className = "",
  variant = "default",
  padded = true,
  as: Component = "div",
  ...props
}) {
  // Variants for consistent sizing in marquee/testimonial usage
  const variants = {
    default: "rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md shadow-[0_4px_20px_-2px_rgba(0,0,0,0.3)]",
    subtle: "rounded-2xl border border-white/5 bg-white/3 backdrop-blur-sm shadow-sm",
    compact: "rounded-2xl border border-white/10 bg-white/10 backdrop-blur-md shadow-md"
  };

  return (
    <Component
      className={cn(
        variants[variant] || variants.default,
        // Prevent layout shift and overflow for dynamic text
        "relative flex flex-col overflow-hidden",
        // Provide intrinsic min sizing then allow shrink in flex rows
        "min-w-[14rem] max-w-[20rem]",
        // Smooth border & background transitions on hover (used in marquee)
        "transition-colors duration-300 hover:border-white/20",
        className
      )}
      {...props}
    />
  );
}

export function CardContent({
  className = "",
  padded = true,
  children,
  ...props
}) {
  return (
    <div
      className={cn(
        padded ? "px-5 pb-5 pt-4" : "p-0",
        // Text handling utilities
        "text-sm leading-relaxed",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

// Helper sub components for common testimonial layout
export function CardHeader({ className = "", children, ...props }) {
  return (
    <div
      className={cn(
        "flex items-start gap-3 mb-2", // spacing
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardTitle({ className = "", children, ...props }) {
  return (
    <h4
      className={cn(
        "font-semibold text-white/90 text-sm tracking-wide",
        // Clamp long emails gracefully
        "max-w-full break-words line-clamp-1",
        className
      )}
      {...props}
    >
      {children}
    </h4>
  );
}

export function CardBody({ className = "", children, ...props }) {
  return (
    <div
      className={cn(
        // Ensure internal text wraps without expanding width
        "w-full text-white/80 break-words whitespace-pre-wrap",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
