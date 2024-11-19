'use client';

import { Card, Header, LoadingSpinner, Modal } from '../components';
import { slugify } from '../utils';
import { useSearchParams, useRouter } from 'next/navigation'
import TourModalContent from './TourModalContent';
import fallbackTours from '../data/tours.json';
import { useEffect, useState } from 'react';

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
  const router = useRouter();
  const searchParams = useSearchParams();
  const search = searchParams.get('search') ?? '';

  const [tours, setTours] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Function to fetch data from the API
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
      // Check if the response is okay (status code 200–299)
      if (!response.ok) {
        throw new Error(`An error has occurred: ${response.status}`);
      }

      // Parse the JSON response
      const { data }: { data: Array<DataItem> } = await response.json();
      data ? setTours(data) : setTours(fallbackTours);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setTours(fallbackTours);
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const selectedCard = tours.find((card) => slugify(card.title) === search);

  return (
    <main className="flex flex-col items-center min-h-screen bg-[#13271c] font-poppins text-white">
      <Header />
      <div className="flex flex-1 flex-col w-full items-center gap-8 p-6">
        <h1 className="whitespace-pre-line font-playfair font-bold text-3xl md:text-6xl">
          Roteiros em Sergipe
        </h1>
        {loading ? (
          <LoadingSpinner />   
        ) : (
          <div className="flex flex-wrap justify-center gap-4 w-full lg:max-w-[900px]">
            {tours.map((card, index) => (
              <Card card={card} index={index} length={tours.length} url={`/roteiros?search=${slugify(card.title)}`} />
            ))}
          </div>
        )}
      </div>

      <Modal isOpen={!!selectedCard} onClose={() => router.push('/roteiros', { scroll: false })} title={selectedCard?.title}>
        <TourModalContent selectedTour={selectedCard!} />
      </Modal>
    </main>
  );
}
