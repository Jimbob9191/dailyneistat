"use client";

import { useEffect, useState } from "react";

export function AnimatedDate({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  const [ready, setReady] = useState(false);

  useEffect(() => setReady(true), []);

  return (
    <span className={`t-digit-group ${ready ? "is-animating" : ""} ${className ?? ""}`}>
      {text.split("").map((char, i) => (
        <span
          key={i}
          className="t-digit"
          style={i > 0 ? { animationDelay: `calc(var(--digit-stagger) * ${i})` } : undefined}
        >
          {char === " " ? " " : char}
        </span>
      ))}
    </span>
  );
}
