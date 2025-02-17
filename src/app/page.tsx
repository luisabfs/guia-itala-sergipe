import Link from 'next/link';
import { 
  // Card, 
  Header 
} from './components';
import styles from './styles.module.css';
// import { slugify } from './utils';
// import tours from './data/tours.json';

export default async function Home() {
  return (
    <main className="font-poppins">
      <section className={styles.backgroundWrapper}>
        <Header />
        <div className="flex flex-col w-full h-full justify-center items-center gap-4 md:gap-10">
          <h1 className="whitespace-pre-line font-playfair font-bold text-3xl mt-12 md:mt-32 md:text-6xl">
            Turismo para todos!
          </h1>
          <span className="m-6 md:m-0 max-w-xl md:max-w-3xl lg:max-w-4xl xl:max-w-4xl text-sm lg:text-lg">
            Olá! Meu nome é Itala Aben-Athar, e sou Turismóloga, Agente de Viagens e Guia de Turismo em Aracaju, Sergipe, com <span className="font-bold">mais de 30 anos de experiência!</span> Tenho um profundo conhecimento da história, cultura e atrações locais, e estou pronta para proporcionar uma experiência personalizada para a sua viagem.
          </span>
        </div>
        <Link href="/roteiros" className="flex mt-2 p-2 px-6 text-lg justify-center gap-2 border-2 rounded-full backdrop-blur-md md:text-sm md:py-2 md:px-5 hover:opacity-85">
          <span className="text-white font-bold text-sm md:text-lg">Ver roteiros</span>
        </Link>
        <span className="flex text-sm font-medium self-start mt-auto text-[#4b7670]">Foto: Giovana Sabbatini</span>
      </section>
      {/* <section id="tours" className="flex flex-col h-full items-center gap-4 p-6 lg:p-6">
        <div className="flex flex-col w-full justify-center items-center py-6 gap-4 text-center">
          <h1 className="text-5xl font-bold tracking-tighter leading-10">Roteiros para todos os gostos!</h1>
          <p className="mt-2 text-gray-600 max-w-[800px]">Sua viagem começa aqui – navegue por uma seleção de roteiros cuidadosamente planejados para todos os tipos de viajantes, seja para relaxar ou se aventurar, e crie uma experiência única!</p>
        </div>
        <div className="flex flex-wrap justify-center gap-4 w-full h-full lg:max-w-[900px]">
          {tours.map((card, index) => (
            <Card card={card} index={index} length={tours.length} url={`/roteiros?search=${slugify(card.id)}`} scroll />
          ))}
        </div>
        <div />
      </section> */}
    </main>
  );
}
