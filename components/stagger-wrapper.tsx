"use client";

import { useEffect, useRef } from "react";

export function StaggerWrapper({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    requestAnimationFrame(() => el.classList.add("is-shown"));
  }, []);

  return (
    <div ref={ref} className={`t-stagger ${className ?? ""}`}>
      {children}
    </div>
  );
}
