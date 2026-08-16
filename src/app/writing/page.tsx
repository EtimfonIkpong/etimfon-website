const articles = [];

export default function Writing() {
  return (
    <main className="min-h-screen bg-white text-neutral-900">
      <div className="mx-auto max-w-3xl px-6 py-16 sm:px-8 sm:py-24">

        {/* Navigation */}
        <nav className="mb-24 flex items-center justify-between">
          <a
            href="/"
            className="text-sm text-neutral-500 hover:text-black"
          >
            ← Home
          </a>

          <div className="flex gap-5 text-sm text-neutral-500">
            <a href="/writing" className="text-black">
              Writing
            </a>

            <a href="/research" className="hover:text-black">
              Research
            </a>

            <a href="/books" className="hover:text-black">
              Books
            </a>
          </div>
        </nav>

        {/* Introduction */}
        <section className="mb-16">
          <h1 className="text-4xl font-semibold tracking-tight sm:text-6xl">
            Writing
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-neutral-600">
            Essays and notes.
          </p>
        </section>

        {/* Articles */}
        <section className="border-t border-neutral-200">
          {articles.map((article) => (
            <a
              key={article.title}
              href={article.href}
              className="group block border-b border-neutral-200 py-8"
            >
              <div className="flex items-start justify-between gap-8">

                <div className="max-w-2xl">
                  <h2 className="text-xl font-medium tracking-tight group-hover:underline">
                    {article.title}
                  </h2>

                  <p className="mt-3 text-sm leading-6 text-neutral-500">
                    {article.description}
                  </p>

                  <p className="mt-4 text-xs text-neutral-400">
                    {article.date}
                  </p>
                </div>

                <span className="mt-1 text-neutral-400 transition-transform group-hover:translate-x-1">
                  →
                </span>

              </div>
            </a>
          ))}
        </section>

        {/* Footer */}
        <footer className="mt-24 text-sm text-neutral-400">
          © {new Date().getFullYear()} Etimfon
        </footer>

      </div>
    </main>
  );
}