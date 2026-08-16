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
            <a href="/research" className="hover:text-black">
              Research
            </a>

            <a href="/books" className="hover:text-black">
              Books
            </a>
          </div>
        </nav>

        {/* Header */}
        <section>
          <h1 className="text-5xl font-semibold tracking-tight sm:text-6xl">
            Writing
          </h1>

          <p className="mt-8 max-w-2xl text-lg leading-8 text-neutral-600">
            Essays, notes, and things I&apos;ve written about technology,
            markets, data, and the ideas shaping the future.
          </p>
        </section>

      </div>
    </main>
  );
}