import { PortableText } from "@portabletext/react";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";

const postQuery = `*[
  _type == "post" &&
  slug.current == $slug &&
  defined(publishedAt) &&
  publishedAt <= now()
][0]{
  title,
description,
publishedAt,
body,
mainImage,
"slug": slug.current
}`;

type Post = {
  title: string;
  description?: string;
  publishedAt: string;
  slug: string;
  body: any[];
  mainImage?: {
    asset?: {
      _ref: string;
    };
  };
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const post = await client.fetch<Post | null>(postQuery, { slug });

  if (!post) {
    return {
      title: "Article not found",
    };
  }

  const imageUrl = post.mainImage
    ? urlFor(post.mainImage).width(1200).height(630).url()
    : undefined;

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      ...(imageUrl && {
        images: [
          {
            url: imageUrl,
            width: 1200,
            height: 630,
            alt: post.title,
          },
        ],
      }),
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      ...(imageUrl && {
        images: [imageUrl],
      }),
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const post = await client.fetch<Post | null>(postQuery, { slug });

  if (!post) {
    return (
      <main className="min-h-screen bg-white text-neutral-900">
        <div className="mx-auto max-w-3xl px-6 py-16 sm:px-8 sm:py-24">
          <a
            href="/writing"
            className="text-sm text-neutral-500 hover:text-black"
          >
            ← Back to Writing
          </a>

          <h1 className="mt-12 text-3xl font-medium">
            Article not found
          </h1>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white text-neutral-900">
      <article className="mx-auto max-w-3xl px-6 py-16 sm:px-8 sm:py-24">
        <a
          href="/writing"
          className="text-sm text-neutral-500 hover:text-black"
        >
          ← Back to Writing
        </a>

        <header className="mt-16">
          <h1 className="text-4xl font-medium tracking-tight sm:text-5xl">
            {post.title}
          </h1>

          {post.description && (
            <p className="mt-6 text-lg leading-8 text-neutral-600">
              {post.description}
            </p>
          )}

          <p className="mt-6 text-sm text-neutral-400">
            {new Date(post.publishedAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </header>

        <div className="mt-16 max-w-none">
  <PortableText
    value={post.body}
    components={{
      block: {
        normal: ({ children }) => (
          <p className="mb-4 leading-8">{children}</p>
        ),
        h2: ({ children }) => (
          <h2 className="mb-5 mt-10 text-2xl font-medium">{children}</h2>
        ),
        h3: ({ children }) => (
          <h3 className="mb-4 mt-8 text-xl font-medium">{children}</h3>
        ),
      },
    }}
  />
</div>
      </article>
    </main>
  );
}