
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";

export default function AboutPage() {
  return (
    <>
      <SiteHeader />
      <main className="min-h-screen bg-[#10051f] px-6 py-16 text-white">
        <div className="mx-auto max-w-4xl">
          <p className="font-semibold text-purple-400">ABOUT US</p>
          <h1 className="mt-4 text-4xl font-bold">About ViewPay</h1>

          <p className="mt-8 text-lg leading-8 text-gray-300">
            ViewPay is a platform designed to help members discover
            sponsored opportunities, explore eligible tasks and learn
            about available rewards.
          </p>

          <h2 className="mt-10 text-2xl font-bold text-purple-300">
            Our Mission
          </h2>
          <p className="mt-4 leading-8 text-gray-300">
            Our aim is to make online opportunities easier to discover
            while encouraging transparency, safety and clear participation
            requirements.
          </p>

          <h2 className="mt-10 text-2xl font-bold text-purple-300">
            Our Commitment
          </h2>
          <p className="mt-4 leading-8 text-gray-300">
            We aim to provide clear information about opportunities.
            Rewards depend on eligibility and successful verification;
            earnings are not guaranteed.
          </p>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
