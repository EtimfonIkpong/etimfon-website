import { client } from "@/sanity/lib/client";
export const dynamic = "force-dynamic";
const postsQuery = `*[
  _type == "post" &&
  defined(slug.current) &&
  defined(publishedAt) &&
  publishedAt <= now()
] | order(publishedAt desc) {
  title,
  description,
  "slug": slug.current,
  publishedAt
}`;

type Post = {
  title: string;
  description?: string;
  slug: string;
  publishedAt: string;
};

export default async function Writing() {
  const posts = await client.fetch<Post[]>(postsQuery);

  return (
    <main className="min-h-screen bg-white text-neutral-900">
      <div className="mx-auto max-w-3xl px-6 py-16 sm:px-8 sm:py-24">
        <nav className="mb-24 flex items-center justify-between">
          <a
            href="/"
            className="text-sm text-neutral-500 hover:text-black"
          >
            ← Back
          </a>
        </nav>

        <h1 className="mb-12 text-3xl font-medium">Writing</h1>

        <div className="space-y-10">
          {posts.map((post) => (
            <article key={post.slug}>
              <a href={`/writing/${post.slug}`} className="group">
                <h2 className="text-xl font-medium group-hover:underline">
                  {post.title}
                </h2>

                {post.description && (
                  <p className="mt-2 text-neutral-600">
                    {post.description}
                  </p>
                )}

                <p className="mt-3 text-sm text-neutral-400">
                  {new Date(post.publishedAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </a>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}