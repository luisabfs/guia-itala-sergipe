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

      {/* Floating decorative icon for mobile */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="absolute top-24 left-6 lg:hidden"
      >
        <motion.div
          animate={{ rotate: [0, 5, -5, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="w-12 h-12 text-primary/30"
        >
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        </motion.div>
      </motion.div>

      {/* Second floating decorative icon for mobile */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.8 }}
        className="absolute top-64 right-6 lg:hidden"
      >
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="w-10 h-10 text-accent/40"
        >
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" />
          </svg>
        </motion.div>
      </motion.div>

      <div className="relative z-10 w-full py-12 lg:py-24 flex flex-col items-center min-h-[100vh]">
        {/* Logo - Fixed at top */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex justify-center lg:justify-start w-full mb-8 lg:mb-12 px-6 lg:px-16"
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

        <div className="w-full px-6 lg:px-16 lg:pr-0">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left lg:max-w-2xl"
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="font-playfair font-bold text-4xl sm:text-5xl lg:text-6xl xl:text-7xl leading-tight text-primary mb-6"
            >
              Descubra Sergipe<br />
              com uma 
              <span className="text-accent"> Especialista</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg sm:text-xl lg:text-2xl text-gray-700 leading-relaxed mb-8 max-w-2xl mx-auto lg:mr-4"
            >
              Há mais de{' '}
              <span className="font-semibold text-gold">30 anos</span>{' '}
              criando roteiros inesquecíveis com acolhimento e excelência cultural.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-3 lg:gap-6 justify-center lg:justify-start mb-6"
            >
              <Link
                href="#roteiros"
                className="group bg-primary hover:bg-gold-light hover:text-primary text-white font-semibold py-3 sm:py-4 px-6 sm:px-8 rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-xl flex items-center justify-center gap-2 sm:gap-3 text-sm sm:text-base"
                aria-label="Ver roteiros disponíveis"
              >
                <span>Montar meu roteiro</span>
                <svg className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-1.447-.894L15 4m0 13V4m-6 3l6-3" />
                </svg>
              </Link>

              <Link
                href="#contato"
                className="group border-2 border-primary hover:bg-primary hover:text-white text-primary font-semibold py-3 sm:py-4 px-6 sm:px-8 rounded-full transition-all duration-300 flex items-center justify-center gap-2 sm:gap-3 text-sm sm:text-base"
                aria-label="Agendar passeio personalizado"
              >
                <span>Agendar passeio</span>
                <svg className="w-3 h-3 sm:w-4 sm:h-4 group-hover:rotate-12 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </Link>
            </motion.div>

            {/* Authority Badge - Integrated with CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex justify-center lg:justify-start items-center gap-4"
            >
              <motion.div 
                className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-sm text-primary px-4 py-2 rounded-full text-sm border border-primary/20 shadow-sm"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.svg 
                  className="w-4 h-4 text-gold" 
                  fill="currentColor" 
                  viewBox="0 0 20 20"
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </motion.svg>
                <span className="font-medium">Guia credenciada CADASTUR</span>
              </motion.div>
              
              {/* Trust indicators */}
              <div className="hidden sm:flex items-center gap-2 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <svg className="w-4 h-4 text-gold" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="font-medium">5.0</span>
                </div>
                <span>•</span>
                <span>+500 clientes satisfeitos</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Decorative Right Side */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative hidden lg:block lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2"
          >
            {/* Background image */}
            <div 
              className="absolute inset-0 bg-cover bg-no-repeat rounded-bl-3xl shadow-lg"
              style={{
                backgroundImage: 'url(/aracaju-largo-da-gente-sergipana.jpg)',
                backgroundPosition: '20%'
              }}
            >
              {/* Overlay for better contrast */}
              <div className="absolute inset-0 bg-white/10 rounded-bl-3xl"></div>
            </div>
          </motion.div>
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