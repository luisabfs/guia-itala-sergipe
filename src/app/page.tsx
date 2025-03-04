import Link from 'next/link';
import {
  Card,
  Header
} from './components';
import styles from './styles.module.css';
import { slugify } from './utils';
import tours from './data/tours.json';
import { Tour } from './types';

export default async function Home() {
  const mainTours = tours.slice(0, 4);
  const tourCta: Tour = {
    id: "e-muito-mais",
    title: "E muito mais...",
    description: "Além dos destinos incríveis mencionados, Sergipe oferece uma variedade de experiências turísticas, como praias paradisíacas, trilhas ecológicas e museus culturais. Explore o melhor da região e surpreenda-se com o que Sergipe tem a oferecer!",
    imageUrl: "/images/museu-gente-sergipana.png",
    hasCta: "true"
  };

  return (
    <main className="font-poppins">
      <section id="introduction" className={styles.backgroundWrapper}>
        <Header />
        <div className="flex flex-col w-full h-full justify-center items-center gap-4 md:gap-10">
          <h1 className="leading-tight whitespace-pre-line font-playfair font-bold drop-shadow-2xl text-3xl mt-10 md:mt-32 md:text-5xl">
            Descubra Sergipe com uma <span className="bg-[#1c4d42] text-white px-2 md:my-2 lg:my-0 rounded-md inline-block">Especialista</span>
          </h1>
          <span className="drop-shadow-xl m-6 md:m-0 max-w-xl md:max-w-3xl lg:max-w-4xl xl:max-w-4xl text-base lg:text-lg">
            Olá! Meu nome é Itala Aben-Athar, e sou Turismóloga, Agente de Viagens e Guia de Turismo em Aracaju, Sergipe, com <span className="font-bold">mais de 30 anos de experiência!</span> Tenho um profundo conhecimento da história, cultura e atrações locais, e estou pronta para proporcionar uma experiência personalizada para a sua viagem.
          </span>
        </div>
        <Link href="/roteiros" className="flex mt-4 p-2 px-6 text-lg justify-center gap-2 border-2 rounded-full backdrop-blur-md md:text-sm md:py-2 md:px-5 md:mt-12 hover:opacity-85">
          <span className="text-white font-bold text-sm md:text-lg">Ver roteiros</span>
        </Link>
      </section>
      <section id="tours" className="flex flex-col h-full items-center gap-4 p-6 lg:p-6">
        <div className="flex flex-col w-full justify-center items-center py-6 gap-4 text-center">
          <h1 className="text-3xl font-bold tracking-tighter leading-10 md:text-4xl">  Roteiros exclusivos, planejados para você</h1>
          <p className="mt-2 text-gray-600 max-w-[800px]">Explore Sergipe com roteiros personalizados para cada estilo de viajante. Seja para relaxar, explorar a cultura local ou viver grandes aventuras, sua experiência começa aqui!
          </p>
        </div>
        <div className='flex w-full h-full flex-col gap-4 md:flex-row lg:max-w-[1000px]'>
          <div className="flex flex-wrap justify-center gap-4 w-full h-full">
            {mainTours.map((card, index) => (
              <Card card={card} key={index} url={`/roteiros?search=${slugify(card.title)}`} scroll />
            ))}
          </div>
          <Card card={tourCta} url={`/roteiros`} scroll />
        </div>
        <div />
      </section>
    </main>
  );
}
