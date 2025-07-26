'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

interface Foto {
  id: string;
  src: string;
  alt: string;
  category: 'natureza' | 'cultura' | 'gastronomia' | 'clientes';
  title: string;
}

const fotos: Foto[] = [
  {
    id: 'croa-gore-1',
    src: '/images/croa-do-gore.jpg',
    alt: 'Praia paradisíaca do Croa do Goré',
    category: 'natureza',
    title: 'Croa do Goré - Paraíso Natural'
  },
  {
    id: 'mangue-seco-1',
    src: '/images/mangue-seco.jpg',
    alt: 'Dunas de Mangue Seco',
    category: 'natureza',
    title: 'Dunas de Mangue Seco'
  },
  {
    id: 'lencois-1',
    src: '/images/lencois-sergipanos.jpeg',
    alt: 'Lençóis Sergipanos',
    category: 'natureza',
    title: 'Lençóis Sergipanos'
  },
  {
    id: 'museu-1',
    src: '/images/museu-gente-sergipana.png',
    alt: 'Museu da Gente Sergipana',
    category: 'cultura',
    title: 'Museu da Gente Sergipana'
  },
  {
    id: 'city-tour-1',
    src: '/images/city-tour.webp',
    alt: 'City Tour Aracaju',
    category: 'cultura',
    title: 'City Tour Aracaju'
  },
  {
    id: 'foz-1',
    src: '/images/foz-rio-sao-francisco.gif',
    alt: 'Foz do Rio São Francisco',
    category: 'cultura',
    title: 'Foz do Rio São Francisco'
  },
  {
    id: 'lagoa-1',
    src: '/images/lagoa-tambaquis.jpg',
    alt: 'Lagoa dos Tambaquis',
    category: 'natureza',
    title: 'Lagoa dos Tambaquis'
  },
  {
    id: 'rota-sergipanidade',
    src: '/images/rota-sergipanidade.jpeg',
    alt: 'Rota Sergipanidade',
    category: 'cultura',
    title: 'Rota Sergipanidade'
  },
  {
    id: 'rota-saberes',
    src: '/images/rota-saberes-e-fazeres.jpg',
    alt: 'Rota Saberes e Fazeres',
    category: 'cultura',
    title: 'Rota Saberes e Fazeres'
  },
  {
    id: 'park-boa-luz',
    src: '/images/park-boa-luz.jpg',
    alt: 'Park Boa Luz',
    category: 'cultura',
    title: 'Park Boa Luz'
  },
  {
    id: 'morro-lucrecia',
    src: '/images/morro-da-lucrecia.jpeg',
    alt: 'Morro da Lucrécia',
    category: 'natureza',
    title: 'Morro da Lucrécia'
  },
  {
    id: 'xingo',
    src: '/images/xingo.jpg',
    alt: 'Cânion do Xingó',
    category: 'natureza',
    title: 'Cânion do Xingó'
  }
];

const categories = [
  { id: 'todas', label: 'Todas', icon: '📸' },
  { id: 'natureza', label: 'Natureza', icon: '🌿' },
  { id: 'cultura', label: 'Cultura', icon: '🏛️' },
  { id: 'gastronomia', label: 'Gastronomia', icon: '🍽️' },
  { id: 'clientes', label: 'Clientes Felizes', icon: '😊' }
];

export default function Galeria() {
  const [selectedCategory, setSelectedCategory] = useState('todas');
  const [selectedImage, setSelectedImage] = useState<Foto | null>(null);

  const filteredFotos = selectedCategory === 'todas' 
    ? fotos 
    : fotos.filter(foto => foto.category === selectedCategory);

  return (
    <section className="py-20 bg-white">
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
            Galeria de{' '}
            <span className="text-accent">Experiências</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Momentos únicos capturados durante nossos passeios. 
            Cada imagem conta uma história de descoberta e encantamento com Sergipe.
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

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-12">
          {filteredFotos.map((foto, index) => (
            <motion.div
              key={foto.id}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative overflow-hidden rounded-xl cursor-pointer"
              onClick={() => setSelectedImage(foto)}
            >
              <div className="aspect-square relative">
                <img
                  src={foto.src}
                  alt={foto.alt}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <h3 className="font-semibold text-sm mb-1">{foto.title}</h3>
                    <div className="flex items-center gap-2 text-xs opacity-80">
                      <span>
                        {foto.category === 'natureza' && '🌿 Natureza'}
                        {foto.category === 'cultura' && '🏛️ Cultura'}
                        {foto.category === 'gastronomia' && '🍽️ Gastronomia'}
                        {foto.category === 'clientes' && '😊 Clientes'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Zoom icon */}
                <div className="absolute top-4 right-4 w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                  </svg>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Modal */}
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative max-w-4xl max-h-[90vh] bg-white rounded-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedImage.src}
                alt={selectedImage.alt}
                className="w-full h-auto max-h-[70vh] object-cover"
              />
              
              <div className="p-6">
                <h3 className="font-playfair font-bold text-xl text-primary mb-2">
                  {selectedImage.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {selectedImage.alt}
                </p>
              </div>

              {/* Close button */}
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-700 hover:bg-white transition-all duration-300"
                aria-label="Fechar modal"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </motion.div>
          </motion.div>
        )}

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-primary to-accent rounded-2xl p-8 text-white">
            <h3 className="font-playfair font-bold text-2xl mb-4">
              Quer viver essas experiências?
            </h3>
            <p className="text-lg mb-6 opacity-90">
              Agende seu roteiro personalizado e descubra os encantos de Sergipe
            </p>
            <button
              onClick={() => window.open('https://wa.me/557996411312?text=Olá! Gostaria de agendar um roteiro personalizado em Sergipe.', '_blank')}
              className="bg-primary hover:bg-primary-dark text-white font-semibold py-3 px-6 rounded-full transition-all duration-300 flex items-center gap-2 mx-auto"
              aria-label="Agendar roteiro via WhatsApp"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
              </svg>
              <span>Agendar Roteiro</span>
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
} 