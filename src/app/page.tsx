import Header from "./components/Header";
import styles from './styles.module.css';

export default async function Home() {
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
    </main>
  );
}
