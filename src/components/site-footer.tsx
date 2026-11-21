
import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="border-t border-purple-900 bg-[#10051f] px-6 py-10 text-gray-400">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xl font-bold text-purple-400">ViewPay</p>
          <p className="mt-2 text-sm">
            Discover opportunities. Explore eligible rewards.
          </p>
        </div>

        <nav className="flex flex-wrap gap-5 text-sm">
          <Link href="/about">About</Link>
          <Link href="/articles">Guides</Link>
          <Link href="/privacy">Privacy</Link>
          <Link href="/terms">Terms</Link>
          <Link href="/contact">Contact</Link>
        </nav>
      </div>

      <p className="mx-auto mt-8 max-w-6xl text-xs">
        © {new Date().getFullYear()} ViewPay. All rights reserved.
      </p>
    </footer>
  );
}
