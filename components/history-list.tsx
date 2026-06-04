import type { DailyPick } from "@/lib/daily-pick";
import { AnimatedDate } from "@/components/animated-date";

interface HistoryListProps {
  picks: DailyPick[];
}

export function HistoryList({ picks }: HistoryListProps) {
  return (
    <div className="flex flex-col">
      {picks.map(({ date, displayDate, video }) => (
        <div
          key={date}
          className="group flex items-baseline justify-between gap-6 -mx-2 px-2 py-1.5 rounded-lg hover:bg-muted transition-all duration-150 border-b border-border last:border-0"
        >
          <AnimatedDate
            text={displayDate}
            className="text-xs text-muted-foreground shrink-0 font-mono"
          />
          <a
            href={`https://www.youtube.com/watch?v=${video.id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-foreground text-right leading-snug"
          >
            {video.title}
          </a>
        </div>
      ))}
    </div>
  );
}
