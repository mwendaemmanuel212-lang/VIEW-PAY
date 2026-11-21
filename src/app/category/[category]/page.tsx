
import Link from "next/link";
import { notFound } from "next/navigation";
import { articles } from "@/lib/articles";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";

export function generateStaticParams() {
  return [...new Set(articles.map((article) => article.category))].map(
    (category) => ({ category: category.toLowerCase() })
  );
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;

  const matchingArticles = articles.filter(
    (article) => article.category.toLowerCase() === category.toLowerCase()
  );

  if (matchingArticles.length === 0) {
    notFound();
  }

  return (
    <>
      <SiteHeader />
      <main className="min-h-screen bg-[#10051f] px-6 py-16 text-white">
        <div className="mx-auto max-w-4xl">
          <Link href="/articles" className="text-purple-400">
            ← All Guides
          </Link>

          <h1 className="mt-8 text-4xl font-bold">
            {matchingArticles[0].category}
          </h1>

          <div className="mt-10 grid gap-5">
            {matchingArticles.map((article) => (
              <Link
                key={article.slug}
                href={`/articles/${article.slug}`}
                className="rounded-2xl border border-purple-900 bg-purple-950/40 p-6 hover:border-purple-500"
              >
                <h2 className="text-xl font-bold text-purple-300">
                  {article.title}
                </h2>
                <p className="mt-3 text-gray-300">
                  {article.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
