'use client';

import { Tour } from "@/app/types";
import Link from "next/link";

type CardProps = {
  card: Tour;
  url?: string;
  scroll?: boolean;
  isLastOne?: boolean;
};

export default function Card({ card, isLastOne, url = '/roteiros', scroll = false }: CardProps) {
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;
  const backgroundImage = card.image ? `url(${API_BASE_URL}${card?.image?.url})` : `url(${card.imageUrl})`;

  return (
    <Link
      href={url}
      scroll={scroll}
      key={card.id}
      className={`relative bg-cover bg-center rounded-lg w-full ${isLastOne ? 'lg:w-full' : 'lg:max-w-72'} min-h-[250px]`}
      style={{ backgroundImage }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg" />
      <div className="absolute bottom-0 z-10 p-4 text-white">
        <h2 className="text-xl font-bold">{card.title}</h2>
      </div>
    </Link>
  );
}
