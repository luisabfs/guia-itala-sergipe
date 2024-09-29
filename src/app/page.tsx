import Header from "./components/Header";
import styles from './styles.module.css';

export default async function Home() {
  const cards = [
    { id: 1, title: 'Lagoa dos Tambaquis', imageUrl: '/images/lagoa-tambaquis.jpg' },
    { id: 2, title: 'Canyons do Xingó', imageUrl: '/images/xingo.jpg' },
    { id: 3, title: 'City-tour histórico em Aracaju', imageUrl: '/images/city-tour.webp' },
    { id: 4, title: 'E muito mais...', imageUrl: '/images/museu-gente-sergipana.png' },
  ];

  return (
    <main className="font-poppins">
      <section className={styles.backgroundWrapper}>
        <Header />
        <div className="flex flex-col w-full h-full justify-center items-center gap-6">
          <h1 className="whitespace-pre-line font-playfair font-bold text-3xl -mt-[120px] md:text-6xl">
            Turismo para todos!
          </h1>
          <span className="m-6 md:m-0 max-w-xl md:max-w-3xl lg:max-w-4xl xl:max-w-4xl text-sm lg:text-lg">
            Olá! Meu nome é Itala Aben-Athar, e sou Turismóloga, Agente de Viagens e Guia de Turismo em Aracaju, Sergipe, com <span className="font-bold">mais de 30 anos de experiência!</span> Tenho um profundo conhecimento da história, cultura e atrações locais, e estou pronta para proporcionar uma experiência personalizada para a sua viagem.
          </span>
        </div>
        <span className="flex text-md font-semibold self-start m-2 text-[#233330]">Foto: Giovana Sabbatini</span>
      </section>
      <section id="itineraries" className="flex flex-col h-full items-center gap-4 p-6 lg:p-6">
        <div className="flex flex-col w-full justify-center items-center py-6 gap-4 text-center">
          <h1 className="text-5xl font-bold tracking-tighter leading-10">Roteiros para todos os gostos!</h1>
          <p className="mt-2 text-gray-600 max-w-[750px]">Sua viagem começa aqui – navegue por uma seleção de roteiros pensados para atender todos os estilos de viagem, do descanso à aventura, e personalize a sua experiência!</p>
        </div>
        <div className="flex flex-wrap justify-center gap-4 w-full h-full lg:max-w-[900px]">
          {cards.map(({ id, title, imageUrl }, index) => (
            <div
              key={id}
              className={`relative bg-cover bg-center rounded-lg w-full ${index === cards.length - 1 ? 'lg:w-full' : 'lg:max-w-72'} min-h-[250px]`}
              style={{ backgroundImage: `url(${imageUrl})` }}
            >
              <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg"></div>
              <div className="absolute bottom-0 z-10 p-4 text-white">
                <h2 className="text-xl font-bold">{title}</h2>
              </div>
            </div>
          ))}
        </div>
        <div />
      </section>
    </main>
  );
}
