import type { Metadata } from "next";
import "./globals.css";
import MonetagServiceWorker from "@/components/MonetagServiceWorker";

export const metadata: Metadata = {
  title: "ViewPay | Discover Opportunities and Rewards",
  description:
    "Join ViewPay to explore sponsored tasks, opportunities and eligible rewards.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#10051f] text-white antialiased">
        <MonetagServiceWorker />
        {children}
      </body>
    </html>
  );
}
