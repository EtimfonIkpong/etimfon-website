const sections = [
  {
    title: "Writing",
    description: "Essays from me to you.",
    href: "/writing",
  },
  {
    title: "Research",
    description: "Research, analysis, articles, reports, and projects I have worked on.",
    href: "/research",
  },
  {
    title: "Books",
    description: "A library of books that have affected my thinking process and that have mainly shaped my view regarding life and the market.",
    href: "/books",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-neutral-900">
      <div className="mx-auto max-w-3xl px-6 py-16 sm:px-8 sm:py-24">

        {/* Navigation */}
        <nav className="mb-24 flex items-center justify-end">
          <div className="flex gap-5 text-sm text-neutral-500">
            <a
              href="/writing"
              className="transition-colors hover:text-black"
            >
              Writing
            </a>

            <a
              href="/research"
              className="transition-colors hover:text-black"
            >
              Research
            </a>

            <a
              href="/books"
              className="transition-colors hover:text-black"
            >
              Books
            </a>
          </div>
        </nav>

        {/* Introduction */}
        <section className="mb-16">
          <h1 className="text-4xl font-semibold tracking-tight sm:text-6xl">
            <span>Hi, I&apos;m </span>

            <span className="typing-name">Etimfon</span>

            <span className="blinking-dot">.</span>
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-neutral-600">
            I write, research, and build at the intersection of technology,
            markets, data, and the ideas shaping the future.
          </p>

          <div className="mt-7 max-w-2xl space-y-4 text-sm leading-7 text-neutral-500">
            <p>
              In 2022, I joined a team building a token deployer. A few months
              later, I joined a friend building a self-custodial wallet, where
              I worked on stablecoin adoption for Africa. Over the following years, I
              contributed to several startups, including a Layer 1 where I
              worked on technical writing and content. Roughly three years
              after I started, I joined Impossible as a Junior Associate
              Researcher.
            </p>

            <p>
              Today, I&apos;m researching prediction markets, machine
              learning, infrastructure, and game mechanics, while writing
              about data and market trends.
            </p>
          </div>

          <div className="mt-8 flex gap-5 text-sm">
            <a
              href="https://t.me/IamTim0x"
              className="underline underline-offset-4"
            >
              Connect with me
            </a>
          </div>
        </section>

        {/* Sections */}
        <section className="border-t border-neutral-200">
          {sections.map((section) => (
            <a
              key={section.title}
              href={section.href}
              className="group block border-b border-neutral-200 py-7"
            >
              <div className="flex items-start justify-between gap-6">
                <div>
                  <h2 className="text-lg font-medium group-hover:underline">
                    {section.title}
                  </h2>

                  <p className="mt-2 max-w-xl text-sm leading-6 text-neutral-500">
                    {section.description}
                  </p>
                </div>

                <span className="text-neutral-400 transition-transform group-hover:translate-x-1">
                  →
                </span>
              </div>
            </a>
          ))}
        </section>

        {/* Connect */}
        <section
          id="connect"
          className="mt-16 border-t border-neutral-200 pt-8"
        >
          <p className="mb-5 text-sm text-neutral-500">
            Find me elsewhere
          </p>

          <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm">
            <a href="https://x.com/whoisetimfon" className="hover:underline">
              X
            </a>

            <a
              href="https://tim0x.substack.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              Substack
            </a>

            <a
              href="https://tim0x.medium.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              Medium
            </a>

            <a href="https://www.linkedin.com/in/tim-0x/" className="hover:underline">
              LinkedIn
            </a>

            <a href="https://github.com/EtimfonIkpong" className="hover:underline">
              GitHub
            </a>
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-24 text-sm text-neutral-400">
          © {new Date().getFullYear()} Etimfon
        </footer>
      </div>

      {/* Animations */}
      <style>{`
        .typing-name {
          display: inline-block;
          white-space: nowrap;
          clip-path: inset(0 100% 0 0);
          animation: reveal-name 1.4s steps(8, end) forwards;
        }

        .blinking-dot {
          display: inline-block;
          margin-left: 0;
          animation: blink 1s ease-in-out infinite;
        }

        @keyframes reveal-name {
          from {
            clip-path: inset(0 100% 0 0);
          }

          to {
            clip-path: inset(0 0 0 0);
          }
        }

        @keyframes blink {
          0%,
          45% {
            opacity: 1;
          }

          50%,
          100% {
            opacity: 0.2;
          }
        }
      `}</style>
    </main>
  );
}