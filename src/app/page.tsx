import {
  Hero,
  SobreGuia,
  Roteiros,
  Depoimentos,
  Galeria,
  FAQ,
  Footer,
  WhatsAppButton
} from './components';

export default function Home() {
  return (
    <main className="font-poppins">
      <Hero />
      <SobreGuia />
      <Roteiros />
      <Depoimentos />
      <Galeria />
      <FAQ />
      <Footer />
      <WhatsAppButton />
    </main>
  );
}
