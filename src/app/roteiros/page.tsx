'use client';

import { Card, Header, LoadingSpinner, Modal } from '../components';
import { slugify } from '../utils';
import { useSearchParams, useRouter } from 'next/navigation'
import TourModalContent from './TourModalContent';
import fallbackTours from '../data/tours.json';
import { Suspense, useEffect, useState } from 'react';

type DataItem = {
  id: number;
  documentId: string;
  title: string;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  publishedAt: string; // ISO date string
  locale: string | null;
};

export default function ToursPage() {
  return(
    <Suspense fallback={<LoadingSpinner />}>
      <ToursContent />
    </Suspense>
  );
}

function ToursContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const search = searchParams.get('search') ?? '';

  const [tours, setTours] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  async function fetchData() {
    setLoading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/tours?populate=*`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`
        },
      });

      if (!response.ok) {
        throw new Error(`An error has occurred: ${response.status}`);
      }

      const { data }: { data: Array<DataItem> } = await response.json();
      data ? setTours(data) : setTours(fallbackTours);
      
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setTours([...fallbackTours, {
        "id": "e-muito-mais",
        "title": "E muito mais...",
        "description": "Além dos destinos incríveis mencionados, Sergipe oferece uma variedade de experiências turísticas, como praias paradisíacas, trilhas ecológicas e museus culturais. Explore o melhor da região e surpreenda-se com o que Sergipe tem a oferecer!",
        "imageUrl": "/images/museu-gente-sergipana.png",
        "hasCta": true
      }]);
      setLoading(false);
    }
  }

  const selectedCard = tours.find((card) => slugify(card.title) === search);
  
  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setIsModalOpen(!!selectedCard);
  }, [selectedCard]);

  const handleModalClose = () => {
    setIsModalOpen(false);
    router.replace('/roteiros', { scroll: false });
  }

  return (
    <main className="flex flex-col items-center min-h-screen bg-[#13271c] font-poppins text-white">
      <Header />
      <div className="flex flex-1 flex-col w-full items-center gap-8 p-6">
        <h1 className="whitespace-pre-line font-playfair font-bold text-3xl md:text-6xl">
          Roteiros em Sergipe e Arredores
        </h1>
        {loading ? (
          <LoadingSpinner />   
        ) : (
          <div className="flex flex-1 flex-wrap justify-center items-center gap-4 w-full lg:max-w-[1000px]">
            {tours.map((card) => (
              <Card card={card} url={`/roteiros?search=${slugify(card.title)}`} />
            ))}
          </div>
        )}
      </div>

      {selectedCard ? (
        <Modal isOpen={isModalOpen} onClose={handleModalClose} title={selectedCard?.title}>
          <TourModalContent selectedTour={selectedCard} />
        </Modal>
      ) : null}
    </main>
  );
}
