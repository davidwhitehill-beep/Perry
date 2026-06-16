import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Perry",
  description: "A private network for organizing and joining walking salons."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
