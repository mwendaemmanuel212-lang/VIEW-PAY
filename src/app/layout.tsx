
import type { Metadata } from "next";
import "./globals.css";

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
        {children}
      </body>
    </html>
  );
}
