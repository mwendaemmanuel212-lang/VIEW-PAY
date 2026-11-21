
import Link from "next/link";
import { notFound } from "next/navigation";
import { articles } from "@/lib/articles";

export function generateStaticParams() {
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = articles.find((item) => item.slug === slug);

  if (!article) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#10051f] px-6 py-16 text-white">
      <article className="mx-auto max-w-3xl">
        <Link href="/articles" className="text-purple-400">
          ← All Guides
        </Link>

        <p className="mt-10 text-sm text-purple-300">
          {article.category}
        </p>

        <h1 className="mt-3 text-4xl font-bold leading-tight">
          {article.title}
        </h1>

        <p className="mt-5 text-lg leading-8 text-gray-300">
          {article.description}
        </p>

        <div className="mt-10 space-y-6 text-base leading-8 text-gray-200">
          {article.content.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>

        <Link
          href="/"
          className="mt-12 inline-block rounded-xl bg-purple-700 px-6 py-3 font-semibold"
        >
          Back to ViewPay
        </Link>
      </article>
    </main>
  );
}
