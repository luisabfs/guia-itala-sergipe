'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import toursData from '../../data/tours.json';

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
  const [selectedRoteiros, setSelectedRoteiros] = useState<string[]>([]);
  const [visibleTours, setVisibleTours] = useState(3);

  // Filter tours based on selected category
  const filteredRoteiros = selectedCategory === 'todos' 
    ? roteiros 
    : roteiros.filter(roteiro => roteiro.category === selectedCategory);

  // Show only the first N tours
  const displayedRoteiros = filteredRoteiros.slice(0, visibleTours);

  // Calculate hidden selections
  const hiddenSelections = selectedRoteiros.filter(id => 
    !displayedRoteiros.some(tour => tour.id === id)
  );
  const hiddenSelectionsCount = hiddenSelections.length;

  const toggleRoteiro = (id: string) => {
    setSelectedRoteiros(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const handleSendWhatsApp = () => {
    if (selectedRoteiros.length === 0) return;

    const selectedTours = roteiros.filter(r => selectedRoteiros.includes(r.id));
    const message = `Olá! Gostaria de saber mais sobre os seguintes roteiros:\n\n${selectedTours.map(tour => `• ${tour.title}`).join('\n')}\n\nPoderia me enviar mais informações sobre horários, preços e disponibilidade?`;

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/557996411312?text=${encodedMessage}`, '_blank');
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
          {displayedRoteiros.map((roteiro, index) => (
            <motion.div
              key={roteiro.id}
              data-tour-index={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              onClick={() => toggleRoteiro(roteiro.id)}
              className={`bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer relative ${
                selectedRoteiros.includes(roteiro.id)
                  ? 'bg-primary/10 shadow-2xl shadow-primary/30 transform scale-[1.03] ring-1 ring-primary/30'
                  : 'hover:shadow-xl'
              }`}
            >
              {/* Selection Indicator Bar */}
              {selectedRoteiros.includes(roteiro.id) && (
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
                  selectedRoteiros.includes(roteiro.id)
                    ? 'bg-primary border-primary'
                    : 'bg-white/90 border-white'
                }`}>
                  {selectedRoteiros.includes(roteiro.id) && (
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

        {/* WhatsApp Button */}
        {selectedRoteiros.length > 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <button
              onClick={handleSendWhatsApp}
              className="bg-green-500 hover:bg-green-600 text-white font-semibold py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-xl flex items-center gap-3 mx-auto"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
              </svg>
              Enviar {selectedRoteiros.length} roteiro{selectedRoteiros.length > 1 ? 's' : ''} selecionado{selectedRoteiros.length > 1 ? 's' : ''} via WhatsApp
            </button>
          </motion.div>
        )}

        {/* Cancellation Policy */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-16 text-center"
        >
          <div className="bg-secondary/50 rounded-2xl p-8 max-w-4xl mx-auto">
            <h3 className="font-playfair font-bold text-2xl text-primary mb-4">
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