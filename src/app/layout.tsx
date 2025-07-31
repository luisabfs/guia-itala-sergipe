import type { Metadata } from "next";
import { Playfair_Display, Poppins } from "next/font/google";
import './globals.css';

const poppins = Poppins({ 
  weight: ['300', '400', '500', '600', '700'], 
  subsets: ['latin'], 
  variable: '--font-poppins', 
  display: 'swap' 
});

const playfairDisplay = Playfair_Display({ 
  weight: ['400', '500', '600', '700', '800', '900'],
  subsets: ["latin"], 
  variable: '--font-playfair', 
  display: 'swap'  
});

export const metadata: Metadata = {
  title: "Guia Ítala Aben-Athar - Turismo em Sergipe",
  description: "Explore Sergipe com roteiros personalizados e acompanhamento especializado. Guia turística Ítala Aben-Athar com mais de 30 anos de experiência em turismo em Sergipe. Agende seu passeio personalizado.",
  keywords: "guia turística Sergipe, turismo Sergipe, roteiros personalizados, Ítala Aben-Athar, passeios Sergipe, Croa do Goré, Mangue Seco, Aracaju turismo",
  authors: [{ name: "Ítala Aben-Athar" }],
  openGraph: {
    title: "Guia Ítala Aben-Athar - Turismo em Sergipe",
    description: "Roteiros personalizados e acompanhamento especializado com 30+ anos de experiência",
    type: "website",
    locale: "pt_BR",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      { url: '/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="scroll-smooth">
      <body className={`${playfairDisplay.variable} ${poppins.variable} font-poppins antialiased`}>
        {children}
      </body>
    </html>
  );
}
