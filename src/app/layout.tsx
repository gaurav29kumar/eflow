import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "eflow | Election Logistics Assistant",
  description: "Your personalized, actionable voting roadmap with zero friction.",
};

import { MenuBar } from '../components/Navigation/MenuBar';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <MenuBar />
        {children}
      </body>
    </html>
  );
}
