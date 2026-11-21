
import Link from "next/link";
import { articles } from "@/lib/articles";

export default function ArticlesPage() {
  return (
    <main className="min-h-screen bg-[#10051f] px-6 py-16 text-white">
      <div className="mx-auto max-w-4xl">
        <Link href="/" className="text-purple-400">← ViewPay Home</Link>
        <h1 className="mt-10 text-4xl font-bold">ViewPay Guides</h1>
        <p className="mt-4 text-gray-300">
          Helpful information about using ViewPay and exploring opportunities.
        </p>

        <div className="mt-10 grid gap-5">
          {articles.map((article) => (
            <Link
              key={article.slug}
              href={`/articles/${article.slug}`}
              className="rounded-2xl border border-purple-900 bg-purple-950/40 p-6 transition hover:border-purple-500"
            >
              <span className="text-sm text-purple-300">
                {article.category}
              </span>
              <h2 className="mt-2 text-xl font-semibold">
                {article.title}
              </h2>
              <p className="mt-3 leading-7 text-gray-300">
                {article.description}
              </p>
              <span className="mt-4 inline-block text-purple-300">
                Read guide →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
