'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useTourContext } from '../../contexts/TourContext';
import type { NotionTour } from '@/lib/notion';
import toursData from '../../data/tours.json';

interface Tour extends NotionTour {
  // Extends the NotionTour interface
}

// Fallback data from JSON
const fallbackTours: Tour[] = toursData as Tour[];

const categories = [
  { id: 'todos', label: 'Todos', icon: '🌟' },
  { id: 'praias', label: 'Praias', icon: '🏖️' },
  { id: 'cultural', label: 'Cultural/Histórico', icon: '🏛️' },
  { id: 'ecologico', label: 'Ecológico', icon: '🌿' }
];

export default function Roteiros() {
  const [selectedCategory, setSelectedCategory] = useState('todos');
  const [visibleTours, setVisibleTours] = useState(3);
  const [roteiros, setRoteiros] = useState<Tour[]>(fallbackTours); // Start with fallback
  const [loading, setLoading] = useState(true);
  const { selectedTourIds, toggleTour } = useTourContext();

  // Fetch tours from Notion API with fallback
  useEffect(() => {
    const fetchTours = async () => {
      try {
        setLoading(true);
        
        const response = await fetch('/api/tours');
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Use Notion data if available, otherwise keep fallback
        if (data.tours && data.tours.length > 0) {
          setRoteiros(data.tours);
        } else {
          console.log('No tours from Notion, keeping fallback data');
        }
      } catch (err) {
        console.warn('Failed to fetch from Notion API, keeping fallback data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTours();
  }, []);

  // Filter tours based on selected category
  const filteredRoteiros = selectedCategory === 'todos' 
    ? roteiros 
    : roteiros.filter((roteiro: Tour) => roteiro.category === selectedCategory);

  // Show only the first N tours
  const displayedRoteiros = filteredRoteiros.slice(0, visibleTours);

  // Calculate hidden selections
  const hiddenSelections = selectedTourIds.filter(id => 
    !displayedRoteiros.some(tour => tour.id === id)
  );
  const hiddenSelectionsCount = hiddenSelections.length;

  // Get selected tour objects
  const selectedTours = roteiros.filter((tour: Tour) => selectedTourIds.includes(tour.id));

  // Loading state with skeleton
  if (loading) {
    return (
      <section id="roteiros" className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4">
          {/* Header Skeleton */}
          <div className="text-center mb-12 lg:mb-16">
            <div className="h-12 bg-gray-200 rounded-lg relative overflow-hidden mb-4 max-w-md mx-auto">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent -translate-x-full animate-shimmer"></div>
            </div>
            <div className="h-6 bg-gray-200 rounded relative overflow-hidden max-w-2xl mx-auto">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent -translate-x-full animate-shimmer"></div>
            </div>
          </div>

          {/* Category Filters Skeleton */}
          <div className="flex flex-wrap justify-center gap-3 mb-8 lg:mb-12">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-10 w-24 bg-gray-200 rounded-full relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent -translate-x-full animate-shimmer"></div>
              </div>
            ))}
          </div>

          {/* Tours Grid Skeleton */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-12">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-white rounded-2xl shadow-lg overflow-hidden">
                {/* Image Skeleton */}
                <div className="h-48 bg-gray-200 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent -translate-x-full animate-shimmer"></div>
                </div>
                
                {/* Content Skeleton */}
                <div className="p-6">
                  <div className="h-6 bg-gray-200 rounded relative overflow-hidden mb-3">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent -translate-x-full animate-shimmer"></div>
                  </div>
                  <div className="space-y-2 mb-4">
                    <div className="h-4 bg-gray-200 rounded relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent -translate-x-full animate-shimmer"></div>
                    </div>
                    <div className="h-4 bg-gray-200 rounded relative overflow-hidden w-3/4">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent -translate-x-full animate-shimmer"></div>
                    </div>
                    <div className="h-4 bg-gray-200 rounded relative overflow-hidden w-1/2">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent -translate-x-full animate-shimmer"></div>
                    </div>
                  </div>
                  <div className="h-4 bg-gray-200 rounded relative overflow-hidden mb-4">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent -translate-x-full animate-shimmer"></div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent -translate-x-full animate-shimmer"></div>
                    </div>
                    <div className="h-4 bg-gray-200 rounded relative overflow-hidden w-2/3">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent -translate-x-full animate-shimmer"></div>
                    </div>
                    <div className="h-4 bg-gray-200 rounded relative overflow-hidden w-1/3">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent -translate-x-full animate-shimmer"></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }



  const loadMore = () => {
    if (visibleTours === 3) {
      // First click: load next 3 tours
      setVisibleTours(prev => prev + 3);
    } else {
      // Second click: show all remaining tours
      setVisibleTours(filteredRoteiros.length);
    }
  };

  const hideTours = () => {
    setVisibleTours(3);
    // Scroll to maintain context after hiding tours - scroll to last visible tour
    setTimeout(() => {
      const lastTour = document.querySelector('[data-tour-index="2"]');
      if (lastTour) {
        const isMobile = window.innerWidth < 768;
        lastTour.scrollIntoView({ 
          behavior: 'smooth', 
          block: isMobile ? 'start' : 'center',
          inline: 'nearest'
        });
      }
    }, 150);
  };

  const resetVisibleTours = () => {
    setVisibleTours(3);
  };

  // Reset visible tours when category changes
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    resetVisibleTours();
  };

  return (
    <section id="roteiros" className="py-16 lg:py-24 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-center mb-12 lg:mb-16"
        >
          <h2 className="font-playfair font-bold text-3xl sm:text-4xl lg:text-5xl text-primary mb-4">
            Roteiros Personalizados
          </h2>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            Descubra Sergipe com roteiros exclusivos e acompanhamento especializado. 
            Escolha seus destinos favoritos e envie para consultar disponibilidade.
          </p>
        </motion.div>

        {/* Category Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-wrap justify-center gap-3 mb-8 lg:mb-12"
        >
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => handleCategoryChange(category.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                selectedCategory === category.id
                  ? 'bg-primary text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <span className="mr-2">{category.icon}</span>
              {category.label}
            </button>
          ))}
        </motion.div>

        {/* Hidden Selections Indicator */}
        {hiddenSelectionsCount > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6 p-4 bg-primary/10 border border-primary/20 rounded-xl text-center"
          >
            <div className="flex items-center justify-center gap-2 text-primary font-medium">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>
                {hiddenSelectionsCount} roteiro{hiddenSelectionsCount > 1 ? 's' : ''} selecionado{hiddenSelectionsCount > 1 ? 's' : ''} {hiddenSelectionsCount > 1 ? 'estão' : 'está'} oculto{hiddenSelectionsCount > 1 ? 's' : ''}
              </span>
            </div>
            <p className="text-sm text-gray-600 mt-1">
              Clique em "Mostrar todos os passeios" para ver suas seleções
            </p>
          </motion.div>
        )}

        {/* Tours Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-12">
          {displayedRoteiros.map((roteiro: Tour, index: number) => (
            <motion.div
              key={roteiro.id}
              data-tour-index={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              onClick={() => toggleTour(roteiro)}
              className={`bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer relative ${
                selectedTourIds.includes(roteiro.id)
                  ? 'bg-primary/10 shadow-2xl shadow-primary/30 transform scale-[1.03] ring-1 ring-primary/30'
                  : 'hover:shadow-xl'
              }`}
            >
              {/* Selection Indicator Bar */}
              {selectedTourIds.includes(roteiro.id) && (
                <div className="absolute top-0 left-0 right-0 h-1 bg-primary z-10"></div>
              )}

              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                {/* Fallback/Skeleton - Always visible initially */}
                <div 
                  data-skeleton-id={roteiro.id}
                  className="w-full h-full bg-gray-200 relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent -translate-x-full animate-shimmer"></div>
                  <div className="w-full h-full flex items-center justify-center">
                    <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                </div>

                {/* Image - Positioned absolutely over skeleton */}
                {roteiro.imageUrl && (
                  <div className="absolute inset-0">
                    <Image
                      src={roteiro.imageUrl}
                      alt={roteiro.title}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      priority={index < 3}
                      onLoad={() => {
                        // Hide skeleton when image loads
                        const skeleton = document.querySelector(`[data-skeleton-id="${roteiro.id}"]`) as HTMLElement;
                        if (skeleton) {
                          skeleton.style.opacity = '0';
                          skeleton.style.transition = 'opacity 0.3s ease-out';
                          setTimeout(() => {
                            skeleton.style.display = 'none';
                          }, 300);
                        }
                        
                        // Show gradient overlay when image loads
                        const overlay = document.querySelector(`[data-overlay-id="${roteiro.id}"]`) as HTMLElement;
                        if (overlay) {
                          overlay.style.opacity = '1';
                          overlay.style.transition = 'opacity 0.3s ease-out';
                        }
                      }}
                      onError={() => {
                        // Keep skeleton visible on error
                        console.warn(`Failed to load image for tour: ${roteiro.title}`);
                      }}
                    />
                  </div>
                )}
                
                {/* Gradient overlay - hidden initially, shown when image loads */}
                <div 
                  data-overlay-id={roteiro.id}
                  className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"
                  style={{ opacity: roteiro.imageUrl ? '0' : '0' }}
                ></div>

                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-primary text-xs font-medium rounded-full">
                    {categories.find(c => c.id === roteiro.category)?.icon} {categories.find(c => c.id === roteiro.category)?.label}
                  </span>
                </div>

                {/* Selection Indicator */}
                <div className={`absolute top-4 right-4 w-6 h-6 rounded-full border-2 transition-all duration-300 flex items-center justify-center ${
                  selectedTourIds.includes(roteiro.id)
                    ? 'bg-primary border-primary'
                    : 'bg-white/90 border-white'
                }`}>
                  {selectedTourIds.includes(roteiro.id) && (
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="font-playfair font-bold text-xl text-primary mb-3">
                  {roteiro.title}
                </h3>

                <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                  {roteiro.description}
                </p>

                {/* Duration */}
                {roteiro.departureTime && roteiro.returnTime && <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Saída: {roteiro.departureTime} | Retorno: {roteiro.returnTime}</span>
                </div>}

                {/* Included Services */}
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm text-primary">Incluído:</h4>
                  <ul className="text-xs text-gray-600 space-y-1">
                    {roteiro.included.slice(0, 3).map((item: string, idx: number) => (
                      <li key={idx} className="flex items-center gap-2">
                        <svg className="w-3 h-3 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        {item}
                      </li>
                    ))}
                    {roteiro.included.length > 3 && (
                      <li className="text-xs text-gray-500">
                        +{roteiro.included.length - 3} itens incluídos
                      </li>
                    )}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Load More Button */}
        {visibleTours < filteredRoteiros.length && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <button
              onClick={loadMore}
              data-load-more
              className="bg-primary hover:bg-primary/90 text-white font-semibold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-lg flex items-center gap-2 mx-auto"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
              {visibleTours === 3 ? 'Carregar mais...' : 'Mostrar todos os passeios'}
            </button>
          </motion.div>
        )}

        {/* Hide Button - Only show when there are more than 3 tours and all are visible */}
        {visibleTours === filteredRoteiros.length && filteredRoteiros.length > 3 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <button
              onClick={hideTours}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-lg flex items-center gap-2 mx-auto"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
              </svg>
              Ocultar passeios
            </button>
          </motion.div>
        )}

        {/* Cancellation Policy */}
        <motion.div
          id="politica-cancelamento"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-16 text-center"
        >
          <div className="bg-secondary/50 rounded-2xl p-8 max-w-4xl mx-auto">
            <h3 className="font-playfair font-bold text-2xl text-primary mb-4 flex items-center justify-center gap-3">
              <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Política de Cancelamento
            </h3>
            <p className="text-gray-700 leading-relaxed">
              Cancelamentos podem ser feitos até 24 horas antes do início do passeio. 
              Em caso de cancelamento em período inferior, será cobrada uma taxa de 50% do valor total. 
              Para cancelamentos no dia do passeio, será cobrado 100% do valor.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
} 