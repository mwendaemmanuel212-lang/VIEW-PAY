
import Link from "next/link";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";

export default function HomePage() {
  return (
    <>
      <SiteHeader />

      <main className="min-h-screen bg-[#10051f] px-6 py-20 text-white">
        <section className="mx-auto max-w-6xl text-center">
          <p className="font-semibold text-purple-400">
            WELCOME TO VIEWPAY
          </p>

          <h1 className="mt-6 text-5xl font-bold leading-tight md:text-7xl">
            Discover Opportunities.
            <span className="block text-purple-400">
              Explore Rewards.
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-300">
            ViewPay helps members discover sponsored opportunities,
            explore eligible tasks and learn about available rewards.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              href="/register"
              className="rounded-xl bg-purple-700 px-8 py-4 font-bold hover:bg-purple-600"
            >
              Create Account
            </Link>

            <Link
              href="/login"
              className="rounded-xl border border-purple-500 px-8 py-4 font-bold hover:bg-purple-950"
            >
              Login
            </Link>
          </div>
        </section>

        <section className="mx-auto mt-24 grid max-w-6xl gap-6 md:grid-cols-3">
          {[
            {
              title: "Sponsored Opportunities",
              description: "Discover opportunities shared on ViewPay.",
            },
            {
              title: "Eligible Rewards",
              description: "Explore reward opportunities and their requirements.",
            },
            {
              title: "Helpful Guides",
              description: "Learn how to use ViewPay safely and effectively.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-purple-900 bg-purple-950/40 p-8"
            >
              <h2 className="text-xl font-bold text-purple-300">
                {item.title}
              </h2>
              <p className="mt-4 leading-7 text-gray-300">
                {item.description}
              </p>
            </div>
          ))}
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
