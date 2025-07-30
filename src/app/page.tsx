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
import { TourProvider } from './contexts/TourContext';

export default function Home() {
  return (
    <TourProvider>
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
    </TourProvider>
  );
}
