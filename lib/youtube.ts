export interface Video {
  id: string;
  title: string;
  publishedAt: string;
}

const CASEY_UPLOADS_PLAYLIST = "UUtinbF-Q-fVthA0qrFQTgXQ";

export async function getCaseyVideos(): Promise<Video[]> {
  const apiKey = process.env.YOUTUBE_API_KEY;
  if (!apiKey) throw new Error("YOUTUBE_API_KEY is not set");

  const videos: Video[] = [];
  let pageToken: string | undefined;

  do {
    const params = new URLSearchParams({
      part: "snippet",
      playlistId: CASEY_UPLOADS_PLAYLIST,
      maxResults: "50",
      key: apiKey,
      ...(pageToken ? { pageToken } : {}),
    });

    const res = await fetch(
      `https://www.googleapis.com/youtube/v3/playlistItems?${params}`,
      { next: { revalidate: 604800 } }
    );

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(`YouTube API error: ${err?.error?.message ?? res.status}`);
    }

    const data = await res.json();

    for (const item of data.items ?? []) {
      const { title, publishedAt, resourceId } = item.snippet;
      if (title === "Private video" || title === "Deleted video") continue;
      videos.push({ id: resourceId.videoId, title, publishedAt });
    }

    pageToken = data.nextPageToken;
  } while (pageToken);

  return videos;
}
