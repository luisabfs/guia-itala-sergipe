'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function Hero() {
  return (
    <section className="relative min-h-[100vh] bg-gradient-to-br from-secondary via-secondary-light to-white">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 right-20 w-32 h-32 bg-primary rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-24 h-24 bg-accent rounded-full blur-2xl"></div>
        <div className="absolute top-1/2 left-1/3 w-16 h-16 bg-gold rounded-full blur-xl"></div>
      </div>

      {/* Radial gradient overlay for depth */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.1)_0%,_transparent_70%)]"></div>

      {/* Mobile-specific background gradient */}
      <div className="absolute inset-0 lg:hidden bg-gradient-to-b from-gold/5 via-transparent to-accent/5"></div>



      <div className="relative z-10 w-full py-12 lg:py-24 flex flex-col items-center justify-center min-h-[100vh]">
        {/* Main Content Container */}
        <div className="w-full px-6 lg:px-16">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-0 items-center max-w-7xl mx-auto">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center lg:text-left order-2 lg:order-1 lg:pr-8 xl:pr-12 2xl:pr-16 max-w-2xl xl:max-w-3xl 2xl:max-w-4xl"
            >
              {/* Logo */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="flex justify-center lg:justify-start mb-8 lg:mb-12"
              >
                <div className="relative w-48 md:w-48 lg:w-56 h-16 md:h-16 lg:h-20">
                  <Image
                    src="/logos/logo-horizontal-white.png"
                    alt="Logo Guia Ítala"
                    fill
                    className="object-cover filter brightness-0 opacity-80"
                    priority
                  />
                </div>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="font-playfair font-bold text-3xl sm:text-4xl lg:text-5xl xl:text-5xl 2xl:text-6xl leading-tight text-primary mb-6"
              >
                Descubra Sergipe<br />
                com uma 
                <span className="text-accent"> Especialista</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-base sm:text-lg lg:text-xl xl:text-xl 2xl:text-2xl text-gray-700 leading-relaxed mb-8 max-w-2xl mx-auto lg:mx-0"
              >
                Há mais de{' '}
                <span className="font-semibold text-gold">30 anos</span>{' '}
                criando roteiros inesquecíveis com acolhimento e excelência cultural.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="flex flex-col sm:flex-row gap-3 lg:gap-4 xl:gap-4 justify-center lg:justify-start mb-6"
              >
                <Link
                  href="#roteiros"
                  className="group bg-primary hover:bg-gold-light hover:text-primary text-white font-semibold py-2.5 sm:py-3 lg:py-3 xl:py-3 px-4 sm:px-6 lg:px-6 xl:px-8 rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-xl flex items-center justify-center gap-2 sm:gap-2 lg:gap-2 text-sm sm:text-sm lg:text-sm xl:text-base"
                  aria-label="Ver roteiros disponíveis"
                >
                  <span>Montar meu roteiro</span>
                  <svg className="w-3 h-3 sm:w-4 sm:h-4 lg:w-4 lg:h-4 xl:w-4 xl:h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-1.447-.894L15 4m0 13V4m-6 3l6-3" />
                  </svg>
                </Link>

                <button
                  onClick={() => {
                    const message = encodeURIComponent('Olá! Gostaria de agendar um passeio personalizado em Sergipe. Poderia me ajudar?');
                    window.open(`https://wa.me/557996411312?text=${message}`, '_blank');
                  }}
                  className="group border-2 border-primary text-primary font-semibold py-2.5 sm:py-3 lg:py-3 xl:py-3 px-4 sm:px-6 lg:px-6 xl:px-8 rounded-full transition-all duration-300 flex items-center justify-center gap-2 sm:gap-2 lg:gap-2 text-sm sm:text-sm lg:text-sm xl:text-base"
                  aria-label="Agendar passeio personalizado via WhatsApp"
                >
                  <span>Agendar passeio</span>
                  <svg className="w-3 h-3 sm:w-3 sm:h-3 lg:w-3 lg:h-3 xl:w-4 xl:h-4 group-hover:rotate-12 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </button>
              </motion.div>

              {/* Trust indicators and Authority Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                                className="flex justify-center lg:justify-start items-center text-xs lg:text-xs xl:text-sm text-primary font-medium"
              >
                <div className="flex items-center gap-1">
                <svg className="w-3 h-3 lg:w-3 lg:h-3 xl:w-4 xl:h-4 text-gold" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="hidden sm:inline">Guia credenciada CADASTUR</span>
                <span className="sm:hidden">CADASTUR</span>
                </div>
                <span className="mx-2">•</span>
                <span className="hidden sm:inline">+500 clientes satisfeitos</span>
                <span className="sm:hidden">+500 clientes</span>
              </motion.div>
            </motion.div>

            {/* Right Side Image */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative hidden lg:block order-1 lg:order-2 h-64 sm:h-80 lg:h-screen lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2"
            >
              {/* Background image */}
              <div 
                className="w-full h-full bg-cover bg-center bg-no-repeat rounded-2xl lg:rounded-none lg:rounded-bl-3xl shadow-lg"
                style={{
                  backgroundImage: 'url(/aracaju-largo-da-gente-sergipana.jpg)',
                  backgroundPosition: 'center'
                }}
              >
                {/* Overlay for better contrast */}
                <div className="absolute inset-0 bg-white/10 rounded-2xl lg:rounded-none lg:rounded-bl-3xl"></div>
              </div>
            </motion.div>

            {/* Tablet Image - Better aspect ratio for medium screens */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative hidden md:block lg:hidden order-1 md:order-2 mb-8"
            >
              <div 
                className="w-full h-80 bg-cover bg-center bg-no-repeat rounded-2xl shadow-lg"
                style={{
                  backgroundImage: 'url(/aracaju-largo-da-gente-sergipana.jpg)',
                  backgroundPosition: 'center'
                }}
              >
                {/* Overlay for better contrast */}
                <div className="absolute inset-0 bg-white/10 rounded-2xl"></div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Curved bottom edge for organic transition */}
      <div className="absolute bottom-0 left-0 right-0 h-20 lg:h-24 overflow-hidden">
        <svg
          className="absolute bottom-0 w-full h-full"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M0,120 C200,60 400,20 600,40 C800,60 1000,80 1200,120 L1200,120 L0,120 Z"
            fill="#F8F5F2"
            className="drop-shadow-sm"
          />
        </svg>
      </div>
    </section>
  );
} 