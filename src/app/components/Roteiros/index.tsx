'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

interface Roteiro {
  id: string;
  title: string;
  description: string;
  image: string;
  duration: string;
  category: 'praias' | 'cultural' | 'ecologico';
  includesTransport: boolean;
  price?: string;
}

const roteiros: Roteiro[] = [
  {
    id: 'croa-do-gore',
    title: 'Croa do Goré',
    description: 'Ilha paradisíaca com praias de areia branca e águas cristalinas. Experiência única de contato com a natureza preservada.',
    image: '/images/croa-do-gore.jpg',
    duration: '1 dia',
    category: 'praias',
    includesTransport: true,
    price: 'A partir de R$ 150'
  },
  {
    id: 'mangue-seco',
    title: 'Mangue Seco',
    description: 'Vila de pescadores com dunas impressionantes e praias selvagens. Conheça a cultura local e saboreie a gastronomia regional.',
    image: '/images/mangue-seco.jpg',
    duration: '1 dia',
    category: 'praias',
    includesTransport: true,
    price: 'A partir de R$ 180'
  },
  {
    id: 'foz-rio-sao-francisco',
    title: 'Foz do Rio São Francisco',
    description: 'Ponto de encontro entre o rio e o mar. Visite o farol histórico e aprecie a paisagem única da região.',
    image: '/images/foz-rio-sao-francisco.gif',
    duration: '1 dia',
    category: 'cultural',
    includesTransport: true,
    price: 'A partir de R$ 120'
  },
  {
    id: 'lencois-sergipanos',
    title: 'Lençóis Sergipanos',
    description: 'Dunas de areia branca que se estendem por quilômetros. Experiência de aventura e contemplação da natureza.',
    image: '/images/lencois-sergipanos.jpeg',
    duration: '1 dia',
    category: 'ecologico',
    includesTransport: true,
    price: 'A partir de R$ 140'
  },
  {
    id: 'city-tour-aracaju',
    title: 'City Tour Aracaju',
    description: 'Conheça os principais pontos turísticos da capital: Museu da Gente Sergipana, Orla de Atalaia, Centro Histórico e muito mais.',
    image: '/images/city-tour.webp',
    duration: '1/2 dia',
    category: 'cultural',
    includesTransport: true,
    price: 'A partir de R$ 80'
  },
  {
    id: 'lagoa-tambaquis',
    title: 'Lagoa dos Tambaquis',
    description: 'Lagoa de água doce cercada por vegetação nativa. Ideal para observação de aves e momentos de tranquilidade.',
    image: '/images/lagoa-tambaquis.jpg',
    duration: '1 dia',
    category: 'ecologico',
    includesTransport: true,
    price: 'A partir de R$ 100'
  }
];

const categories = [
  { id: 'todos', label: 'Todos', icon: '🌍' },
  { id: 'praias', label: 'Praias', icon: '🏖️' },
  { id: 'cultural', label: 'Cultural/Histórico', icon: '🏛️' },
  { id: 'ecologico', label: 'Ecológico', icon: '🌿' }
];

export default function Roteiros() {
  const [selectedCategory, setSelectedCategory] = useState('todos');
  const [selectedRoteiros, setSelectedRoteiros] = useState<string[]>([]);

  const filteredRoteiros = selectedCategory === 'todos' 
    ? roteiros 
    : roteiros.filter(roteiro => roteiro.category === selectedCategory);

  const toggleRoteiro = (id: string) => {
    setSelectedRoteiros(prev => 
      prev.includes(id) 
        ? prev.filter(r => r !== id)
        : [...prev, id]
    );
  };

  const sendToWhatsApp = () => {
    if (selectedRoteiros.length === 0) {
      alert('Selecione pelo menos um roteiro para enviar.');
      return;
    }

    const itineraryList = selectedRoteiros.map(id => {
      const itinerary = roteiros.find(item => item.id === id);
      return `• ${itinerary?.title} (${itinerary?.duration})`;
    }).join('\n');

    const message = `Olá! Gostaria de saber mais sobre os seguintes roteiros:\n\n${itineraryList}\n\nPoderia me passar mais informações?`;
    const whatsappUrl = `https://wa.me/557996411312?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <section id="roteiros" className="py-20 bg-white">
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
            Roteiros{' '}
            <span className="text-accent">Exclusivos</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Explore Sergipe com roteiros personalizados para cada estilo de viajante. 
            Seja para relaxar, explorar a cultura local ou viver grandes aventuras, 
            sua experiência começa aqui!
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                selectedCategory === category.id
                  ? 'bg-primary text-white shadow-lg'
                  : 'bg-secondary text-primary hover:bg-primary/10'
              }`}
            >
              <span>{category.icon}</span>
              <span>{category.label}</span>
            </button>
          ))}
        </motion.div>

        {/* Roteiros Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {filteredRoteiros.map((roteiro, index) => (
            <motion.div
              key={roteiro.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={roteiro.image}
                    alt={roteiro.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  
                  {/* Category badge */}
                  <div className="absolute top-4 left-4">
                    <span className="bg-white/90 backdrop-blur-sm text-primary text-xs font-semibold px-3 py-1 rounded-full">
                      {roteiro.category === 'praias' && '🏖️ Praias'}
                      {roteiro.category === 'cultural' && '🏛️ Cultural'}
                      {roteiro.category === 'ecologico' && '🌿 Ecológico'}
                    </span>
                  </div>

                  {/* Selection checkbox */}
                  <button
                    onClick={() => toggleRoteiro(roteiro.id)}
                    className={`absolute top-4 right-4 w-6 h-6 rounded-full border-2 transition-all duration-300 ${
                      selectedRoteiros.includes(roteiro.id)
                        ? 'bg-primary border-primary'
                        : 'bg-white/90 border-white'
                    }`}
                    aria-label={`Selecionar ${roteiro.title}`}
                  >
                    {selectedRoteiros.includes(roteiro.id) && (
                      <svg className="w-4 h-4 text-white mx-auto" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </button>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="font-playfair font-bold text-xl text-primary mb-3">
                    {roteiro.title}
                  </h3>
                  
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">
                    {roteiro.description}
                  </p>

                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>{roteiro.duration}</span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      {roteiro.includesTransport ? (
                        <>
                          <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="text-green-600">Transporte incluso</span>
                        </>
                      ) : (
                        <span>Transporte não incluso</span>
                      )}
                    </div>
                  </div>

                  {roteiro.price && (
                    <div className="text-primary font-semibold text-lg mb-4">
                      {roteiro.price}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Selection Actions */}
        {selectedRoteiros.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="bg-secondary rounded-2xl p-6 max-w-2xl mx-auto">
              <h3 className="font-semibold text-primary text-lg mb-4">
                Roteiros selecionados ({selectedRoteiros.length})
              </h3>
              
              <div className="flex flex-wrap gap-2 mb-6 justify-center">
                {selectedRoteiros.map(id => {
                  const roteiro = roteiros.find(r => r.id === id);
                  return (
                    <span key={id} className="bg-primary text-white px-3 py-1 rounded-full text-sm">
                      {roteiro?.title}
                    </span>
                  );
                })}
              </div>

              <button
                onClick={sendToWhatsApp}
                className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-lg flex items-center gap-2 mx-auto"
                aria-label="Enviar roteiros selecionados para WhatsApp"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                </svg>
                <span>Enviar para WhatsApp</span>
              </button>
            </div>
          </motion.div>
        )}

        {/* Policy Notice */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="bg-primary/5 rounded-2xl p-6 max-w-4xl mx-auto">
            <h3 className="font-semibold text-primary text-lg mb-3">
              Política de Cancelamento
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Cancelamentos com até 24h de antecedência são gratuitos. 
              Roteiros personalizados podem ser adaptados conforme suas necessidades. 
              Entre em contato para mais informações sobre condições especiais.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
} 