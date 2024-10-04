'use client';

import { Card, Header, Modal } from '../components';
import { slugify } from '../utils';
import { useSearchParams, useRouter } from 'next/navigation'
import TourModalContent from './TourModalContent';
import tours from '../data/tours.json';

export default function ToursPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const search = searchParams.get('search') ?? '';

  const selectedCard = tours.find((card) => card.id === search);

  return (
    <main className="flex flex-col justify-center items-center bg-[#13271c] font-poppins text-white">
      <Header />
      <div className="flex flex-col w-full justify-center items-center gap-8 p-6">
        <h1 className="whitespace-pre-line font-playfair font-bold text-3xl md:text-6xl">
          Roteiros em Sergipe
        </h1>
        <div className="flex flex-wrap justify-center gap-4 w-full lg:max-w-[900px]">
          {tours.map((card, index) => (
            <Card card={card} index={index} length={tours.length} url={`/roteiros?search=${slugify(card.id)}`} />
          ))}
        </div>
      </div>

      <Modal isOpen={!!search && !!selectedCard} onClose={() => router.push('/roteiros', { scroll: false })} title={selectedCard?.title}>
        <TourModalContent selectedTour={selectedCard!} />
      </Modal>
    </main>
  );
}
