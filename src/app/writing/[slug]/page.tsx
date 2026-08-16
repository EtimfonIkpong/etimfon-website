const articles = {
  "the-architecture-of-trust": {
    title: "The Architecture of Trust",
    description:
      "An exploration of how trust is constructed, maintained, and changed in increasingly digital systems.",
    date: "August 12, 2026",
    content: [
      {
        type: "paragraph",
        text: "This is where your article begins. Your writing will eventually live here and can be as long as you want.",
      },
      {
        type: "paragraph",
        text: "The goal is to make this page feel like a quiet reading environment. There are no unnecessary cards, sidebars, or distractions.",
      },
      {
        type: "heading",
        text: "A new way of thinking about trust",
      },
      {
        type: "paragraph",
        text: "As technology becomes increasingly embedded in the systems we use every day, the way we establish trust is changing. This is where your actual article content will go.",
      },
      {
        type: "paragraph",
        text: "You will eventually be able to write and publish these articles through a proper editor rather than editing this file.",
      },
    ],
  },

  "why-ai-agents-need-portable-memory": {
    title: "Why AI Agents Need Portable Memory",
    description:
      "Thinking about memory as infrastructure for the next generation of AI agents.",
    date: "July 29, 2026",
    content: [
      {
        type: "paragraph",
        text: "AI agents are becoming increasingly capable, but their ability to remember and carry context across environments remains limited.",
      },
      {
        type: "heading",
        text: "Memory is becoming infrastructure",
      },
      {
        type: "paragraph",
        text: "The next generation of agents will need memory that can move with them across applications, models, and environments.",
      },
    ],
  },
};

type Article = (typeof articles)[keyof typeof articles];

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const article = articles[slug as keyof typeof articles] as Article | undefined;

  if (!article) {
    return (
      <main className="min-h-screen bg-white text-neutral-900">
        <div className="mx-auto max-w-3xl px-6 py-16 sm:px-8 sm:py-24">
          <a
            href="/writing"
            className="text-sm text-neutral-500 hover:text-black"
          >
            ← Back to writing
          </a>

          <h1 className="mt-24 text-4xl font-semibold tracking-tight">
            Article not found
          </h1>

          <p className="mt-4 text-neutral-500">
            The article you&apos;re looking for doesn&apos;t exist.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white text-neutral-900">
      <article className="mx-auto max-w-3xl px-6 py-16 sm:px-8 sm:py-24">

        {/* Navigation */}
        <nav className="mb-24 flex items-center justify-between">
          <a
            href="/"
            className="text-sm text-neutral-500 hover:text-black"
          >
            ← Home
          </a>

          <a
            href="/writing"
            className="text-sm text-neutral-500 hover:text-black"
          >
            Writing
          </a>
        </nav>

        {/* Article header */}
        <header className="mb-16">
          <p className="text-sm text-neutral-400">
            {article.date}
          </p>

          <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-6xl">
            {article.title}
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-neutral-600">
            {article.description}
          </p>
        </header>

        {/* Article body */}
        <div className="max-w-2xl">
          {article.content.map((block, index) => {
            if (block.type === "heading") {
              return (
                <h2
                  key={index}
                  className="mb-5 mt-12 text-2xl font-semibold tracking-tight"
                >
                  {block.text}
                </h2>
              );
            }

            return (
              <p
                key={index}
                className="mb-7 text-lg leading-9 text-neutral-700"
              >
                {block.text}
              </p>
            );
          })}
        </div>

        {/* Back to writing */}
        <div className="mt-20 border-t border-neutral-200 pt-8">
          <a
            href="/writing"
            className="text-sm underline underline-offset-4"
          >
            ← Back to writing
          </a>
        </div>

        {/* Footer */}
        <footer className="mt-24 text-sm text-neutral-400">
          © {new Date().getFullYear()} Etimfon
        </footer>
      </article>
    </main>
  );
}