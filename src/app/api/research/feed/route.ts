import { NextResponse } from "next/server";
import Parser from "rss-parser";

const parser = new Parser();

const feeds = [
  {
    name: "Substack",
    url: "https://tim0x.substack.com/feed",
  },
  {
    name: "Medium",
    url: "https://medium.com/feed/@tim0x",
  },
];

export async function GET() {
  const articles = [];

  for (const feed of feeds) {
    try {
      const response = await fetch(feed.url);

      if (!response.ok) {
        console.error(
          `${feed.name} returned ${response.status}`
        );
        continue;
      }

      const xml = await response.text();
      const data = await parser.parseString(xml);

      for (const item of data.items) {
        articles.push({
          title: item.title || "Untitled",
          description:
            item.contentSnippet ||
            item.content ||
            "",
          url: item.link || "",
          publishedAt:
            item.isoDate ||
            item.pubDate ||
            null,
          platform: feed.name,
        });
      }
    } catch (error) {
      console.error(
        `Could not fetch ${feed.name}:`,
        error
      );
    }
  }

  articles.sort((a, b) => {
    const dateA = a.publishedAt
      ? new Date(a.publishedAt).getTime()
      : 0;

    const dateB = b.publishedAt
      ? new Date(b.publishedAt).getTime()
      : 0;

    return dateB - dateA;
  });

  return NextResponse.json(articles);
}