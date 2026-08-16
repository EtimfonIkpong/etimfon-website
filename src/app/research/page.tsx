"use client";

import { useEffect, useState } from "react";

type Article = {
  title: string;
  description: string;
  url: string;
  publishedAt: string | null;
  platform: string;
};

const platforms = ["All", "Substack", "Medium"];

export default function ResearchPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [activePlatform, setActivePlatform] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadArticles() {
      try {
        const response = await fetch("/api/research/feed");

        if (!response.ok) {
          throw new Error("Failed to fetch research feed");
        }

        const data = await response.json();

        // Our API returns { articles, errors }
        setArticles(data);
      } catch (error) {
        console.error("Failed to load research:", error);
        setArticles([]);
      } finally {
        setLoading(false);
      }
    }

    loadArticles();
  }, []);

  const filteredArticles =
    activePlatform === "All"
      ? articles
      : articles.filter(
          (article) => article.platform === activePlatform
        );

  return (
    <main className="min-h-screen bg-white text-neutral-900">
      <div className="mx-auto max-w-3xl px-6 py-16 sm:px-8 sm:py-24">

        {/* Navigation */}
        <nav className="mb-20 flex items-center justify-between">
          <a
            href="/"
            className="text-sm text-neutral-500 hover:text-black"
          >
            Etimfon
          </a>

          <div className="flex gap-5 text-sm text-neutral-500">
            <a href="/writing" className="hover:text-black">
              Writing
            </a>

            <a href="/research" className="text-black">
              Research
            </a>

            <a href="/books" className="hover:text-black">
              Books
            </a>
          </div>
        </nav>

        {/* Header */}
        <section className="mb-12">
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            Research
          </h1>

          <p className="mt-5 max-w-2xl text-lg leading-8 text-neutral-600">
            Research, analysis, and investigations across technology,
            markets, data, and crypto.
          </p>
        </section>

        {/* Platform filters */}
        <div className="mb-12 flex flex-wrap gap-3">
          {platforms.map((platform) => (
            <button
              key={platform}
              onClick={() => setActivePlatform(platform)}
              className={`rounded-full border px-4 py-2 text-sm transition ${
                activePlatform === platform
                  ? "border-black bg-black text-white"
                  : "border-neutral-200 text-neutral-500 hover:border-neutral-400 hover:text-black"
              }`}
            >
              {platform}
            </button>
          ))}
        </div>

        {/* Articles */}
        <section className="border-t border-neutral-200">
          {loading ? (
            <div className="py-12 text-sm text-neutral-500">
              Loading research...
            </div>
          ) : filteredArticles.length === 0 ? (
            <div className="py-12 text-sm text-neutral-500">
              No research found.
            </div>
          ) : (
            filteredArticles.map((article, index) => (
              <a
                key={`${article.url}-${index}`}
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group block border-b border-neutral-200 py-7"
              >
                <div className="flex items-start justify-between gap-6">
                  <div className="min-w-0">
                    <h2 className="text-lg font-medium leading-7 group-hover:underline">
                      {article.title}
                    </h2>

                    {article.description && (
                      <p className="mt-2 max-w-xl text-sm leading-6 text-neutral-500">
                        {article.description}
                      </p>
                    )}

                    <div className="mt-3 flex items-center gap-3 text-xs text-neutral-400">
                      <span>{article.platform}</span>

                      {article.publishedAt && (
                        <>
                          <span>·</span>

                          <span>
                            {new Date(
                              article.publishedAt
                            ).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </span>
                        </>
                      )}
                    </div>
                  </div>

                  <span className="shrink-0 text-neutral-400 transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </div>
              </a>
            ))
          )}
        </section>

        {/* Other research */}
        <section className="mt-20 border-t border-neutral-200 pt-10">
          <p className="text-sm text-neutral-500">
            More of my research
          </p>

          <p className="mt-3 max-w-xl text-sm leading-6 text-neutral-600">
            I also publish research and analysis on other platforms.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href="https://www.artemis.ai/profile/tim0x"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-neutral-200 px-4 py-2 text-sm transition hover:border-neutral-400"
            >
              Research on Artemis →
            </a>

            <a
              href="https://hackernoon.com/u/etimfon"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-neutral-200 px-4 py-2 text-sm transition hover:border-neutral-400"
            >
              Research on HackerNoon →
            </a>
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-24 text-sm text-neutral-400">
          © {new Date().getFullYear()} Etimfon
        </footer>

      </div>
    </main>
  );
}