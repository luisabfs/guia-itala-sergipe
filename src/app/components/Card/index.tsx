'use client';

import Link from "next/link";

type Card = {
  id: number;
  title: string;
  imageUrl: string;
}

type CardProps = {
  card: Card;
  index: number;
  length: number;
};

export default function Card({ card, index, length }: CardProps) {
  return (
    <Link
      href="/roteiros"
      key={card.id}
      className={`relative bg-cover bg-center rounded-lg w-full ${index === length - 1 ? 'lg:w-full' : 'lg:max-w-72'} min-h-[250px]`}
      style={{ backgroundImage: `url(${card.imageUrl})` }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg" />
      <div className="absolute bottom-0 z-10 p-4 text-white">
        <h2 className="text-xl font-bold">{card.title}</h2>
      </div>
    </Link>
  );
}
