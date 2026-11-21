
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";

export default function PrivacyPage() {
  return (
    <>
      <SiteHeader />
      <main className="min-h-screen bg-[#10051f] px-6 py-16 text-white">
        <article className="mx-auto max-w-4xl">
          <h1 className="text-4xl font-bold">Privacy Policy</h1>
          <p className="mt-4 text-sm text-gray-400">
            Last updated: November 21, 2026
          </p>

          <section className="mt-10 space-y-4 leading-8 text-gray-300">
            <h2 className="text-2xl font-bold text-purple-300">
              Information We Collect
            </h2>
            <p>
              ViewPay may collect information you provide when creating
              an account, such as your name and email address.
            </p>

            <h2 className="text-2xl font-bold text-purple-300">
              How We Use Information
            </h2>
            <p>
              Information may be used to manage accounts, provide platform
              features, protect security and respond to support requests.
            </p>

            <h2 className="text-2xl font-bold text-purple-300">
              Data Protection
            </h2>
            <p>
              We aim to protect account information and restrict
              unauthorized access. No online service can guarantee
              absolute security.
            </p>

            <h2 className="text-2xl font-bold text-purple-300">
              Third-Party Services
            </h2>
            <p>
              ViewPay uses Firebase services for authentication and
              related platform functions. Those services may process
              information under their own privacy terms.
            </p>

            <h2 className="text-2xl font-bold text-purple-300">
              Contact
            </h2>
            <p>
              Contact ViewPay through its official support channel
              for privacy questions once support details are published.
            </p>
          </section>
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
