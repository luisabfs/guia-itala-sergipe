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
  title: "Descubra Sergipe com uma Especialista | Guia Ítala - 30+ Anos de Experiência",
  description: "Explore Sergipe com roteiros personalizados e acompanhamento especializado. Guia turística Ítala Aben-Athar com mais de 30 anos de experiência em turismo em Sergipe. Agende seu passeio personalizado.",
  keywords: "guia turística Sergipe, turismo Sergipe, roteiros personalizados, Ítala Aben-Athar, passeios Sergipe, Croa do Goré, Mangue Seco, Aracaju turismo",
  authors: [{ name: "Ítala Aben-Athar" }],
  openGraph: {
    title: "Descubra Sergipe com uma Especialista",
    description: "Roteiros personalizados e acompanhamento especializado com 30+ anos de experiência",
    type: "website",
    locale: "pt_BR",
  },
  robots: {
    index: true,
    follow: true,
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
