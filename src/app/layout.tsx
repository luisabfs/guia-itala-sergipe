import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import './globals.css';

const inter = Inter({ subsets: ["latin"] });
const playfairDisplay = Playfair_Display({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Guia Itala Sergipe",
  description: "Guia de Turismo em Sergipe",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${playfairDisplay.className} ${inter.className}`}>{children}</body>
    </html>
  );
}
