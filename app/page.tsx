import { getCaseyVideos } from "@/lib/youtube";
import { getDailyPicks } from "@/lib/daily-pick";
import { VideoEmbed } from "@/components/video-embed";
import { HistoryList } from "@/components/history-list";
import { StaggerWrapper } from "@/components/stagger-wrapper";
import { AnimatedDate } from "@/components/animated-date";
import { Separator } from "@/components/ui/separator";

export const revalidate = 86400;

export default async function Home() {
  if (!process.env.YOUTUBE_API_KEY) {
    return (
      <main className="min-h-screen flex items-center justify-center px-6">
        <div className="max-w-sm text-center space-y-3">
          <h1 className="text-sm font-medium text-stone-500">Daily Neistat</h1>
          <p className="text-xs text-stone-400 leading-relaxed">
            Add <code className="font-mono bg-stone-200 px-1 rounded">YOUTUBE_API_KEY</code> to{" "}
            <code className="font-mono bg-stone-200 px-1 rounded">.env.local</code> to get started.
          </p>
        </div>
      </main>
    );
  }

  const videos = await getCaseyVideos();
  const picks = getDailyPicks(videos, 30);
  const today = picks[0];
  const history = picks.slice(1);

  return (
    <main className="min-h-screen flex flex-col items-center py-16 px-6">
      <StaggerWrapper className="w-full max-w-[600px] flex flex-col gap-8">

        <div
          className="t-stagger-line"
          style={{ transitionDelay: "calc(var(--stagger-stagger) * 0)" }}
        >
          <p className="text-sm font-medium text-foreground">Daily Neistat</p>
          <AnimatedDate
            text={today.displayDate}
            className="text-sm text-muted-foreground font-mono mt-0.5"
          />
        </div>

        <div
          className="t-stagger-line"
          style={{ transitionDelay: "calc(var(--stagger-stagger) * 1)" }}
        >
          <VideoEmbed videoId={today.video.id} title={today.video.title} />
        </div>

        <p
          className="t-stagger-line text-sm text-muted-foreground leading-snug"
          style={{ transitionDelay: "calc(var(--stagger-stagger) * 2)" }}
        >
          {today.video.title}
        </p>

        <Separator
          className="t-stagger-line bg-border"
          style={{ transitionDelay: "calc(var(--stagger-stagger) * 3)" }}
        />

        <div
          className="t-stagger-line"
          style={{ transitionDelay: "calc(var(--stagger-stagger) * 4)" }}
        >
          <p className="text-xs text-muted-foreground uppercase tracking-widest mb-4">
            Previous picks
          </p>
          <HistoryList picks={history} />
        </div>

      </StaggerWrapper>
    </main>
  );
}
