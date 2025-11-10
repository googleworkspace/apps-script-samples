import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Full Link - Connect Your World in One Link",
  description: "Smart digital tool that combines all social media profiles, business links, and contact info into one customizable link.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
