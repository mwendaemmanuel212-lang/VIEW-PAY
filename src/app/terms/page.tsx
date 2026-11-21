
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";

export default function TermsPage() {
  return (
    <>
      <SiteHeader />
      <main className="min-h-screen bg-[#10051f] px-6 py-16 text-white">
        <article className="mx-auto max-w-4xl">
          <h1 className="text-4xl font-bold">Terms of Service</h1>
          <p className="mt-4 text-sm text-gray-400">
            Last updated: November 21, 2026
          </p>

          <section className="mt-10 space-y-4 leading-8 text-gray-300">
            <h2 className="text-2xl font-bold text-purple-300">
              Using ViewPay
            </h2>
            <p>
              By accessing ViewPay, you agree to use the platform
              lawfully and follow these terms.
            </p>

            <h2 className="text-2xl font-bold text-purple-300">
              Accounts
            </h2>
            <p>
              Provide accurate registration information and keep your
              login credentials secure. You are responsible for activity
              under your account.
            </p>

            <h2 className="text-2xl font-bold text-purple-300">
              Opportunities and Rewards
            </h2>
            <p>
              Each opportunity may have its own eligibility and
              verification requirements. Rewards are not guaranteed.
              Participation does not promise income.
            </p>

            <h2 className="text-2xl font-bold text-purple-300">
              Prohibited Conduct
            </h2>
            <p>
              Do not use fake accounts, automated abuse, misleading
              information or attempts to manipulate platform rewards.
            </p>

            <h2 className="text-2xl font-bold text-purple-300">
              Changes and Availability
            </h2>
            <p>
              Features may change or become unavailable. We will aim
              to communicate important changes through official
              platform channels.
            </p>

            <h2 className="text-2xl font-bold text-purple-300">
              Contact
            </h2>
            <p>
              Contact ViewPay through its official support channel
              for questions about these terms.
            </p>
          </section>
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
