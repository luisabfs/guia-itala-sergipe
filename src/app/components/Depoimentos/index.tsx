'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Depoimento {
  id: number;
  nome: string;
  cidade: string;
  texto: string;
  nota: number;
  roteiro: string;
  data: string;
}

const depoimentos: Depoimento[] = [
  {
    id: 1,
    nome: "Maria Silva",
    cidade: "São Paulo, SP",
    texto: "Experiência incrível! A Ítala nos levou para lugares que nem imaginávamos existir. O Croa do Goré foi o ponto alto da viagem. Profissionalismo e conhecimento local impressionantes.",
    nota: 5,
    roteiro: "Croa do Goré",
    data: "Janeiro 2024"
  },
  {
    id: 2,
    nome: "João Santos",
    cidade: "Rio de Janeiro, RJ",
    texto: "Roteiro personalizado perfeito para nossa família. A Ítala adaptou tudo às nossas necessidades e criou momentos inesquecíveis. Recomendo muito!",
    nota: 5,
    roteiro: "Mangue Seco",
    data: "Dezembro 2023"
  },
  {
    id: 3,
    nome: "Ana Costa",
    cidade: "Belo Horizonte, MG",
    texto: "Mais de 30 anos de experiência faz toda diferença! Conhecemos a história e cultura de Sergipe de forma única. A Ítala é uma excelente guia e pessoa.",
    nota: 5,
    roteiro: "City Tour Aracaju",
    data: "Novembro 2023"
  },
  {
    id: 4,
    nome: "Carlos Oliveira",
    cidade: "Brasília, DF",
    texto: "Passeio pelos Lençóis Sergipanos foi espetacular! A Ítala nos mostrou ângulos que só quem conhece bem o local pode mostrar. Experiência autêntica!",
    nota: 5,
    roteiro: "Lençóis Sergipanos",
    data: "Outubro 2023"
  },
  {
    id: 5,
    nome: "Fernanda Lima",
    cidade: "Salvador, BA",
    texto: "Atendimento personalizado e profissional. A Ítala transformou nossa viagem em uma experiência única. Já estamos planejando voltar!",
    nota: 5,
    roteiro: "Foz do Rio São Francisco",
    data: "Setembro 2023"
  }
];

export default function Depoimentos() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % depoimentos.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prev) => (prev + newDirection + depoimentos.length) % depoimentos.length);
  };

  const renderStars = (nota: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <svg
        key={i}
        className={`w-5 h-5 ${i < nota ? 'text-yellow-400' : 'text-gray-300'}`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };

  return (
    <section className="py-20 bg-secondary">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-playfair font-bold text-4xl sm:text-5xl text-primary mb-6">
            O que nossos{' '}
            <span className="text-accent">clientes</span> dizem
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Experiências reais de viajantes que descobriram Sergipe com nossa especialista. 
            Cada depoimento representa uma história única de descoberta e satisfação.
          </p>
        </motion.div>

        {/* Flex container for testimonials and stats */}
        <div className="flex flex-col gap-16">
          {/* Testimonials Carousel */}
          <div className="flex flex-col items-center">
            <div className="relative max-w-4xl w-full">
              <div className="overflow-hidden rounded-2xl bg-white shadow-xl h-[400px] sm:h-[450px]">
                <AnimatePresence initial={false} custom={direction}>
                  <motion.div
                    key={currentIndex}
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                      x: { type: "spring", stiffness: 300, damping: 30 },
                      opacity: { duration: 0.2 }
                    }}
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={1}
                    onDragEnd={(e, { offset, velocity }) => {
                      const swipe = swipePower(offset.x, velocity.x);

                      if (swipe < -swipeConfidenceThreshold) {
                        paginate(1);
                      } else if (swipe > swipeConfidenceThreshold) {
                        paginate(-1);
                      }
                    }}
                    className="w-full h-full flex items-center justify-center"
                  >
                    <div className="p-8 sm:p-12 w-full">
                      <div className="text-center">
                        {/* Stars */}
                        <div className="flex justify-center gap-1 mb-6">
                          {renderStars(depoimentos[currentIndex].nota)}
                        </div>

                        {/* Quote */}
                        <div className="mb-8">
                          <svg className="w-12 h-12 text-primary/20 mx-auto mb-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
                          </svg>
                          
                          <blockquote className="text-lg sm:text-xl text-gray-700 leading-relaxed italic mb-6">
                            "{depoimentos[currentIndex].texto}"
                          </blockquote>
                        </div>

                        {/* Author */}
                        <div className="space-y-2">
                          <div className="font-semibold text-primary text-lg">
                            {depoimentos[currentIndex].nome}
                          </div>
                          <div className="text-gray-500 text-sm">
                            {depoimentos[currentIndex].cidade}
                          </div>
                          <div className="text-accent text-sm font-medium">
                            Roteiro: {depoimentos[currentIndex].roteiro}
                          </div>
                          <div className="text-gray-400 text-xs">
                            {depoimentos[currentIndex].data}
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Navigation */}
              <div className="flex justify-center mt-8 space-x-2">
                {depoimentos.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setDirection(index > currentIndex ? 1 : -1);
                      setCurrentIndex(index);
                    }}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentIndex ? 'bg-primary' : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                    aria-label={`Ir para depoimento ${index + 1}`}
                  />
                ))}
              </div>

              {/* Arrow Navigation */}
              <button
                onClick={() => paginate(-1)}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center text-primary hover:bg-white transition-all duration-300 hover:scale-110"
                aria-label="Depoimento anterior"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              <button
                onClick={() => paginate(1)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center text-primary hover:bg-white transition-all duration-300 hover:scale-110"
                aria-label="Próximo depoimento"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>

          {/* Stats - Completely separate section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="flex justify-center"
          >
            <div className="bg-white rounded-2xl p-8 shadow-lg max-w-4xl w-full">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                <div>
                  <div className="text-3xl font-bold text-primary mb-2">500+</div>
                  <div className="text-gray-600 text-sm">Clientes satisfeitos</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary mb-2">30+</div>
                  <div className="text-gray-600 text-sm">Anos de experiência</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary mb-2">4.9</div>
                  <div className="text-gray-600 text-sm">Avaliação média</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary mb-2">100%</div>
                  <div className="text-gray-600 text-sm">Roteiros personalizados</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 