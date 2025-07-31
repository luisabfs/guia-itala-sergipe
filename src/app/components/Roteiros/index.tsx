'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import toursData from '../../data/tours.json';
import { useTourContext } from '../../contexts/TourContext';

interface Tour {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  departureTime: string;
  returnTime: string;
  included: string[];
  notIncluded: string[];
  category: 'praias' | 'cultural' | 'ecologico';
}

// Use tours data directly with categories
const roteiros: Tour[] = toursData as Tour[];

const categories = [
  { id: 'todos', label: 'Todos', icon: '🌟' },
  { id: 'praias', label: 'Praias', icon: '🏖️' },
  { id: 'cultural', label: 'Cultural/Histórico', icon: '🏛️' },
  { id: 'ecologico', label: 'Ecológico', icon: '🌿' }
];

export default function Roteiros() {
  const [selectedCategory, setSelectedCategory] = useState('todos');
  const [visibleTours, setVisibleTours] = useState(3);
  const [showTooltip, setShowTooltip] = useState(true);
  const [isSectionVisible, setIsSectionVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const { selectedTourIds, toggleTour, setIsWhatsAppOpen } = useTourContext();

  // Auto-hide tooltip after 5 seconds when section becomes visible
  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    if (isSectionVisible && selectedTourIds.length === 0) {
      timer = setTimeout(() => {
        setShowTooltip(false);
      }, 5000);
    }

    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [isSectionVisible, selectedTourIds.length]);

  // Detect when tours section is in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsSectionVisible(entry.isIntersecting);
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  // Filter tours based on selected category
  const filteredRoteiros = selectedCategory === 'todos' 
    ? roteiros 
    : roteiros.filter(roteiro => roteiro.category === selectedCategory);

  // Show only the first N tours
  const displayedRoteiros = filteredRoteiros.slice(0, visibleTours);

  // Calculate hidden selections
  const hiddenSelections = selectedTourIds.filter(id => 
    !displayedRoteiros.some(tour => tour.id === id)
  );
  const hiddenSelectionsCount = hiddenSelections.length;

  // Get selected tour objects
  const selectedTours = roteiros.filter(tour => selectedTourIds.includes(tour.id));

  // Determine the appropriate button text for the warning message
  const getWarningButtonText = () => {
    if (visibleTours === 3) {
      return 'Carregar mais...';
    }
    return 'Mostrar todos os passeios';
  };

  // Check if warning should be shown
  const shouldShowWarning = hiddenSelectionsCount > 0 && visibleTours < filteredRoteiros.length;

  // Check if there are hidden selections that belong to the current category
  const hiddenSelectionsInCurrentCategory = hiddenSelections.filter(id => {
    const tour = roteiros.find(t => t.id === id);
    return tour && (selectedCategory === 'todos' || tour.category === selectedCategory);
  });
  const hiddenSelectionsInCurrentCategoryCount = hiddenSelectionsInCurrentCategory.length;

  // Show warning only if there are hidden selections in the current category/filter
  const shouldShowWarningForCurrentFilter = hiddenSelectionsInCurrentCategoryCount > 0 && visibleTours < filteredRoteiros.length;

  // Auto-control WhatsApp popup based on selections
  const handleTourToggle = (tour: Tour) => {
    const wasSelected = selectedTourIds.includes(tour.id);
    toggleTour(tour);
    
    // Auto-open popup on first selection
    if (!wasSelected && selectedTourIds.length === 0) {
      setIsWhatsAppOpen(true);
    }
    // Auto-close popup on subsequent selections to guide user
    else if (!wasSelected && selectedTourIds.length > 0) {
      setIsWhatsAppOpen(false);
    }
  };

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
    <section id="roteiros" className="py-16 lg:py-24 bg-white" ref={sectionRef}>
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
          transition={{ duration: 0.8, delay: 0.4 }}
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
        {shouldShowWarningForCurrentFilter && (
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
                {hiddenSelectionsInCurrentCategoryCount} roteiro{hiddenSelectionsInCurrentCategoryCount > 1 ? 's' : ''} selecionado{hiddenSelectionsInCurrentCategoryCount > 1 ? 's' : ''} {hiddenSelectionsInCurrentCategoryCount > 1 ? 'estão' : 'está'} oculto{hiddenSelectionsInCurrentCategoryCount > 1 ? 's' : ''}
              </span>
            </div>
            <p className="text-sm text-gray-600 mt-1">
              Clique em "{getWarningButtonText()}" para ver suas seleções
            </p>
          </motion.div>
        )}

        {/* Tours Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-12 relative">
          {/* Tooltip for first tour card */}
          {(showTooltip || isHovering) && selectedTourIds.length === 0 && displayedRoteiros.length > 0 && isSectionVisible && (
            <AnimatePresence>
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: -10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: -10 }}
                transition={{ duration: 0.3 }}
                className="absolute -top-12 left-0 z-50"
              >
                <div className="bg-primary text-white text-xs font-medium px-3 py-2 rounded-lg shadow-lg">
                  <span>Clique para selecionar</span>
                  <div className="absolute top-full left-6 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-primary"></div>
                </div>
              </motion.div>
            </AnimatePresence>
          )}
          
                      {displayedRoteiros.map((roteiro, index) => (
              <motion.div
                key={roteiro.id}
                data-tour-index={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                onClick={() => handleTourToggle(roteiro)}
                onMouseEnter={() => index === 0 && setIsHovering(true)}
                onMouseLeave={() => index === 0 && setIsHovering(false)}
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
                <img
                  src={roteiro.imageUrl}
                  alt={roteiro.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>

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
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Saída: {roteiro.departureTime} | Retorno: {roteiro.returnTime}</span>
                </div>

                {/* Included Services */}
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm text-primary">Incluído:</h4>
                  <ul className="text-xs text-gray-600 space-y-1">
                    {roteiro.included.slice(0, 3).map((item, idx) => (
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

        {/* Hide Button */}
        {visibleTours === filteredRoteiros.length && (
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