import type { Video } from "./youtube";

export interface DailyPick {
  date: string;
  displayDate: string;
  video: Video;
}

function hashDate(dateStr: string, len: number): number {
  let h = 0;
  for (const c of dateStr) h = (h * 31 + c.charCodeAt(0)) % len;
  return h;
}

function toDateStr(daysAgo: number): string {
  const d = new Date();
  d.setDate(d.getDate() - daysAgo);
  return d.toISOString().split("T")[0];
}

function formatDate(dateStr: string): string {
  const [y, m, day] = dateStr.split("-").map(Number);
  return new Date(y, m - 1, day).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function getDailyPicks(videos: Video[], count = 30): DailyPick[] {
  return Array.from({ length: count }, (_, i) => {
    const date = toDateStr(i);
    return {
      date,
      displayDate: formatDate(date),
      video: videos[hashDate(date, videos.length)],
    };
  });
}
