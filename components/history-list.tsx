import type { DailyPick } from "@/lib/daily-pick";

interface HistoryListProps {
  picks: DailyPick[];
}

export function HistoryList({ picks }: HistoryListProps) {
  return (
    <div className="flex flex-col">
      {picks.map(({ date, displayDate, video }) => (
        <div
          key={date}
          className="flex items-baseline justify-between gap-6 py-3 border-b border-stone-200 last:border-0"
        >
          <span className="text-xs text-stone-400 shrink-0 tabular-nums">{displayDate}</span>
          <a
            href={`https://www.youtube.com/watch?v=${video.id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-stone-500 hover:text-stone-800 transition-colors text-right leading-snug"
          >
            {video.title}
          </a>
        </div>
      ))}
    </div>
  );
}
