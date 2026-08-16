import {client} from '@/sanity/lib/client'
import {urlFor} from '@/sanity/lib/image'

type Book = {
  _id: string
  title: string
  author: string
  cover?: {
    asset?: {
      _ref: string
    }
  }
  description?: string
  link?: string
}

const booksQuery = `*[
  _type == "book"
] | order(title asc) {
  _id,
  title,
  author,
  cover,
  description,
  link
}`

async function getBooks() {
  return client.fetch<Book[]>(booksQuery)
}

export default async function BooksPage() {
  const books = await getBooks()

  return (
    <main className="min-h-screen bg-white text-neutral-900">
      <div className="mx-auto max-w-5xl px-6 py-16 sm:px-8 sm:py-24">

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

            <a href="/research" className="hover:text-black">
              Research
            </a>

            <a href="/books" className="text-black">
              Books
            </a>
          </div>
        </nav>

        {/* Header */}
        <section className="mb-14">
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            Books
          </h1>

          <p className="mt-5 max-w-2xl text-lg leading-8 text-neutral-600">
            Would be nice if you can read these too.
          </p>
        </section>

        {/* Library */}
        {books.length === 0 ? (
          <p className="text-sm text-neutral-500">
            No books added yet.
          </p>
        ) : (
          <section className="grid grid-cols-2 gap-x-6 gap-y-12 sm:grid-cols-3 md:grid-cols-4">

            {books.map((book) => (
              <article key={book._id} className="group">

                {book.cover && (
                  <div className="overflow-hidden bg-neutral-100">
                    <img
                      src={urlFor(book.cover)
                        .width(500)
                        .height(750)
                        .fit('crop')
                        .url()}
                      alt={`Cover of ${book.title}`}
                      className="aspect-[2/3] w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                    />
                  </div>
                )}

                <h2 className="mt-4 text-base font-medium leading-6">
                  {book.title}
                </h2>

                <p className="mt-1 text-sm text-neutral-500">
                  {book.author}
                </p>

              </article>
            ))}

          </section>
        )}

      </div>
    </main>
  )
}