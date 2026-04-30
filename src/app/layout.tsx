import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "eflow | Election Logistics Assistant",
  description: "Your personalized, actionable voting roadmap with zero friction.",
};

import { MenuBar } from '../components/Navigation/MenuBar';
import { Outfit } from 'next/font/google';

const outfit = Outfit({ subsets: ['latin'], display: 'swap' });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={outfit.className}>
      <body>
        <MenuBar />
        {children}
      </body>
    </html>
  );
}
