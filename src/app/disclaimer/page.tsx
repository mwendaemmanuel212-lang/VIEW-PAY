
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";

export default function DisclaimerPage() {
  return (
    <>
      <SiteHeader />
      <main className="min-h-screen bg-[#10051f] px-6 py-16 text-white">
        <article className="mx-auto max-w-4xl">
          <h1 className="text-4xl font-bold">Disclaimer</h1>

          <section className="mt-10 space-y-6 leading-8 text-gray-300">
            <div>
              <h2 className="text-2xl font-bold text-purple-300">
                No Guaranteed Earnings
              </h2>
              <p className="mt-3">
                ViewPay does not guarantee income, rewards or a specific
                financial outcome. Opportunities may have eligibility
                requirements and may not always be available.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-purple-300">
                Sponsored Opportunities
              </h2>
              <p className="mt-3">
                Sponsored content and tasks may be provided by third
                parties. Their individual terms and requirements may apply.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-purple-300">
                Accuracy of Information
              </h2>
              <p className="mt-3">
                We aim to provide useful and accurate information, but
                cannot promise that every listing or description is
                complete, current or error-free.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-purple-300">
                Personal Responsibility
              </h2>
              <p className="mt-3">
                Review the requirements of each opportunity carefully.
                Never share your password or pay unexpected fees to
                someone claiming to represent ViewPay.
              </p>
            </div>
          </section>
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
