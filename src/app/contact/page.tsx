
import Link from "next/link";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";

export default function ContactPage() {
  return (
    <>
      <SiteHeader />
      <main className="min-h-screen bg-[#10051f] px-6 py-16 text-white">
        <div className="mx-auto max-w-3xl">
          <p className="font-semibold text-purple-400">GET IN TOUCH</p>
          <h1 className="mt-4 text-4xl font-bold">Contact ViewPay</h1>

          <p className="mt-6 leading-8 text-gray-300">
            Need help with your account or have a question about
            ViewPay? We are preparing our official support channels.
          </p>

          <div className="mt-10 rounded-2xl border border-purple-900 bg-purple-950/40 p-7">
            <h2 className="text-xl font-bold text-purple-300">
              Support information
            </h2>
            <p className="mt-4 leading-7 text-gray-300">
              Official support email and contact details will be
              published here once configured.
            </p>
          </div>

          <Link
            href="/"
            className="mt-8 inline-block rounded-xl bg-purple-700 px-6 py-3 font-semibold"
          >
            Back to Home
          </Link>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
