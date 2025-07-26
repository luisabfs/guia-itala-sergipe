'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface FAQItem {
  id: number;
  question: string;
  answer: string;
  category: 'geral' | 'roteiros' | 'pagamento' | 'seguranca';
}

const faqItems: FAQItem[] = [
  {
    id: 1,
    question: "Como funciona a personalização dos roteiros?",
    answer: "Cada roteiro é adaptado às suas necessidades específicas. Analisamos seu perfil de viajante, interesses, tempo disponível e grupo para criar uma experiência única. Você pode escolher destinos, duração e até mesmo incluir paradas especiais.",
    category: "roteiros"
  },
  {
    id: 2,
    question: "Quais são as formas de pagamento aceitas?",
    answer: "Aceitamos PIX, transferência bancária, cartão de crédito e débito. Para grupos, oferecemos condições especiais de pagamento parcelado. O pagamento pode ser feito à vista ou com entrada + parcelas.",
    category: "pagamento"
  },
  {
    id: 3,
    question: "Qual é a melhor época para visitar Sergipe?",
    answer: "Sergipe pode ser visitado o ano todo! De maio a agosto temos temperaturas mais amenas (22-28°C), ideal para passeios. De setembro a abril é mais quente (28-35°C), perfeito para praias. Cada época tem seus encantos especiais.",
    category: "geral"
  },
  {
    id: 4,
    question: "O transporte está incluso nos roteiros?",
    answer: "Sim! Todos os nossos roteiros incluem transporte confortável e seguro. Utilizamos veículos modernos e bem equipados, com ar condicionado e motorista experiente. O ponto de partida é sempre Aracaju.",
    category: "roteiros"
  },
  {
    id: 5,
    question: "Como funciona a política de cancelamento?",
    answer: "Cancelamentos com até 24h de antecedência são gratuitos. Entre 24h e 12h antes, cobramos 50% do valor. Menos de 12h, 100% do valor. Em caso de condições climáticas adversas, reagendamos sem custo adicional.",
    category: "geral"
  },
  {
    id: 6,
    question: "Os passeios são seguros?",
    answer: "Absolutamente! Trabalhamos apenas com parceiros credenciados e seguimos todos os protocolos de segurança. Nossa guia tem mais de 30 anos de experiência e conhece cada detalhe dos destinos. Seguro viagem é opcional.",
    category: "seguranca"
  },
  {
    id: 7,
    question: "Posso incluir refeições nos roteiros?",
    answer: "Sim! Oferecemos opções com café da manhã, almoço ou jantar incluídos. Trabalhamos com restaurantes locais selecionados para você experimentar a autêntica gastronomia sergipana. Consulte disponibilidade.",
    category: "roteiros"
  },
  {
    id: 8,
    question: "Vocês atendem grupos grandes?",
    answer: "Sim! Atendemos desde casais até grupos de até 20 pessoas. Para grupos maiores, temos condições especiais e roteiros adaptados. Também organizamos eventos corporativos e excursões escolares.",
    category: "geral"
  },
  {
    id: 9,
    question: "Preciso levar documentos específicos?",
    answer: "Para brasileiros, RG ou CNH são suficientes. Para estrangeiros, passaporte válido. Recomendamos também levar cópia digital dos documentos. Para alguns destinos específicos, informamos antecipadamente.",
    category: "seguranca"
  },
  {
    id: 10,
    question: "Vocês oferecem roteiros para crianças?",
    answer: "Sim! Temos roteiros especialmente adaptados para famílias com crianças. Incluímos atividades educativas, paradas estratégicas e ritmo adequado para os pequenos. Crianças até 5 anos não pagam.",
    category: "roteiros"
  }
];

const categories = [
  { id: 'todas', label: 'Todas', icon: '❓' },
  { id: 'geral', label: 'Geral', icon: 'ℹ️' },
  { id: 'roteiros', label: 'Roteiros', icon: '🗺️' },
  { id: 'pagamento', label: 'Pagamento', icon: '💳' },
  { id: 'seguranca', label: 'Segurança', icon: '🛡️' }
];

export default function FAQ() {
  const [selectedCategory, setSelectedCategory] = useState('todas');
  const [openItems, setOpenItems] = useState<number[]>([]);

  const filteredItems = selectedCategory === 'todas' 
    ? faqItems 
    : faqItems.filter(item => item.category === selectedCategory);

  const toggleItem = (id: number) => {
    setOpenItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
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
            Perguntas{' '}
            <span className="text-accent">Frequentes</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Tire suas dúvidas sobre nossos serviços, roteiros e condições. 
            Aqui você encontra as respostas para as principais perguntas sobre sua viagem.
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
                  : 'bg-white text-primary hover:bg-primary/10'
              }`}
            >
              <span>{category.icon}</span>
              <span>{category.label}</span>
            </button>
          ))}
        </motion.div>

        {/* FAQ Items */}
        <div className="max-w-4xl mx-auto space-y-4">
          {filteredItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden"
            >
              <button
                onClick={() => toggleItem(item.id)}
                className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-300"
                aria-expanded={openItems.includes(item.id)}
                aria-controls={`faq-answer-${item.id}`}
              >
                <h3 className="font-semibold text-primary text-lg pr-4">
                  {item.question}
                </h3>
                <div className="flex-shrink-0">
                  <svg
                    className={`w-6 h-6 text-primary transition-transform duration-300 ${
                      openItems.includes(item.id) ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </button>

              <AnimatePresence>
                {openItems.includes(item.id) && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    id={`faq-answer-${item.id}`}
                  >
                    <div className="px-6 pb-6">
                      <div className="pt-4 border-t border-gray-100">
                        <p className="text-gray-600 leading-relaxed">
                          {item.answer}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="bg-primary rounded-2xl p-8 text-white max-w-2xl mx-auto">
            <h3 className="font-playfair font-bold text-2xl mb-4">
              Ainda tem dúvidas?
            </h3>
            <p className="text-lg mb-6 opacity-90">
              Entre em contato conosco e tire todas as suas dúvidas sobre roteiros e condições
            </p>
            <button
              onClick={() => window.open('https://wa.me/557996411312?text=Olá! Tenho algumas dúvidas sobre os roteiros em Sergipe.', '_blank')}
              className="bg-primary hover:bg-primary-dark text-white font-semibold py-3 px-6 rounded-full transition-all duration-300 flex items-center gap-2 mx-auto"
              aria-label="Tirar dúvidas via WhatsApp"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
              </svg>
              <span>Tirar Dúvidas</span>
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
} 