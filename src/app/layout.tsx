import type { Metadata } from "next";
import { Playfair_Display, Poppins } from "next/font/google";
import './globals.css';

const poppins = Poppins({ weight: ['100', '400', '600'], subsets: ['latin'], variable: '--font-poppins', display: 'swap' });
const playfairDisplay = Playfair_Display({ subsets: ["latin"], variable: '--font-playfair-display', display: 'swap'  });

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
      <body className={`${playfairDisplay.variable} ${poppins.variable}`}>
        {children}
      </body>
    </html>
  );
}
