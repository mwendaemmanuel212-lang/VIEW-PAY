
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#10051f] px-6 text-center text-white">
      <h1 className="text-7xl font-bold text-purple-400">404</h1>
      <h2 className="mt-4 text-2xl font-semibold">Page not found</h2>
      <p className="mt-3 text-gray-300">
        Sorry, the page you are looking for does not exist.
      </p>
      <Link
        href="/"
        className="mt-7 rounded-xl bg-purple-600 px-6 py-3 font-semibold"
      >
        Back to Home
      </Link>
    </main>
  );
}
