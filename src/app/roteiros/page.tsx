import { Card, Header } from '../components';

export default async function ItinerariesPage() {
  const cards = [
    { id: 1, title: 'Lagoa dos Tambaquis', imageUrl: '/images/lagoa-tambaquis.jpg' },
    { id: 2, title: 'Canyons do Xingó', imageUrl: '/images/xingo.jpg' },
    { id: 3, title: 'City-tour histórico em Aracaju', imageUrl: '/images/city-tour.webp' }, { id: 1, title: 'Lagoa dos Tambaquis', imageUrl: '/images/lagoa-tambaquis.jpg' },
    { id: 2, title: 'Canyons do Xingó', imageUrl: '/images/xingo.jpg' },
    { id: 3, title: 'City-tour histórico em Aracaju', imageUrl: '/images/city-tour.webp' },
    { id: 4, title: 'E muito mais...', imageUrl: '/images/museu-gente-sergipana.png' },
  ];

  return (
    <main className="flex flex-col justify-center items-center bg-[#13271c] font-poppins text-white">
      <Header />
      <div className="flex flex-col w-full justify-center items-center gap-8 p-6">
        <h1 className="whitespace-pre-line font-playfair font-bold text-3xl md:text-6xl">
          Roteiros
        </h1>
        <div className="flex flex-wrap justify-center gap-4 w-full lg:max-w-[900px]">
          {cards.map((card, index) => (
            <Card card={card} index={index} length={cards.length} />
          ))}
        </div>
      </div>
    </main>
  );
}
