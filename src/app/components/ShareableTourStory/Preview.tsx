'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import ShareableTourStory from './index';
import { useCardCapture } from '../../hooks/useCardCapture';
import html2canvas from 'html2canvas';

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

interface PreviewProps {
  tour: Tour;
  onClose: () => void;
}

export default function Preview({ tour, onClose }: PreviewProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);
  const storyRef = useRef<HTMLDivElement>(null);
  const { captureCard, toast } = useCardCapture();

  // Customization state
  const [showPrice, setShowPrice] = useState(false);
  const [customPrice, setCustomPrice] = useState('');
  const [showBrand, setShowBrand] = useState(false);
  const [showLinkBadge, setShowLinkBadge] = useState(false);
  const [showTag, setShowTag] = useState(true);
  const [showPromo, setShowPromo] = useState(false);

  const handleGenerateStory = async () => {
    if (!storyRef.current) return;
    
    setIsGenerating(true);
    await captureCard(storyRef.current, `story-${tour.title.toLowerCase().replace(/\s+/g, '-')}`);
    setIsGenerating(false);
  };

  const handleTestCapture = async () => {
    if (!storyRef.current) return;
    
    try {
      console.log('Testing capture...');
      console.log('Element:', storyRef.current);
      console.log('Element dimensions:', storyRef.current.offsetWidth, 'x', storyRef.current.offsetHeight);
      
      const canvas = await html2canvas(storyRef.current, {
        backgroundColor: '#ffffff',
        scale: 1,
        useCORS: true,
        allowTaint: true,
        logging: true,
      });
      
      console.log('Test canvas created:', canvas.width, 'x', canvas.height);
      
      const blob = await new Promise<Blob>((resolve, reject) => {
        canvas.toBlob((blob) => {
          if (blob) {
            resolve(blob);
          } else {
            reject(new Error('Failed to create blob'));
          }
        }, 'image/png', 1.0);
      });
      
      console.log('Test blob created:', blob.size, 'bytes');
      
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `test-${tour.title.toLowerCase().replace(/\s+/g, '-')}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Test capture failed:', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        className="bg-white rounded-2xl w-full max-w-6xl max-h-[95vh] lg:max-h-[90vh] flex flex-col"
      >
        {/* Header - Fixo no topo */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 flex-shrink-0">
          <h2 className="text-lg lg:text-2xl font-bold text-gray-800 whitespace-nowrap">
            Compartilhar Story
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Main Content - Flexível */}
        <div className="flex-1 flex min-h-0">
          {/* Control Panel - Sidebar (Desktop) */}
          <div className="hidden lg:block w-80 bg-gray-50 p-6 border-r border-gray-200 overflow-y-auto">
            <h3 className="text-lg font-semibold text-gray-800 mb-6">Personalizar Story</h3>
            
            {/* Price Section */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <label className="text-sm font-medium text-gray-700">Mostrar Preço</label>
                <input
                  type="checkbox"
                  checked={showPrice}
                  onChange={(e) => setShowPrice(e.target.checked)}
                  className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                />
              </div>
              {showPrice && (
                <input
                  type="text"
                  value={customPrice}
                  onChange={(e) => setCustomPrice(e.target.value)}
                  placeholder="Ex: R$ 150,00"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              )}
            </div>

            {/* Tag Section */}
            <div className="mb-6">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700">Mostrar Categoria</label>
                <input
                  type="checkbox"
                  checked={showTag}
                  onChange={(e) => setShowTag(e.target.checked)}
                  className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Link Badge Section */}
            <div className="mb-6">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700">Mostrar "Link na bio"</label>
                <input
                  type="checkbox"
                  checked={showLinkBadge}
                  onChange={(e) => setShowLinkBadge(e.target.checked)}
                  className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Brand Section */}
            <div className="mb-6">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700">Mostrar Marca</label>
                <input
                  type="checkbox"
                  checked={showBrand}
                  onChange={(e) => setShowBrand(e.target.checked)}
                  className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Promo Section */}
            <div className="mb-6">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700">Mostrar Promoção</label>
                <input
                  type="checkbox"
                  checked={showPromo}
                  onChange={(e) => setShowPromo(e.target.checked)}
                  className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Preview Info */}
            <div className="bg-green-50 p-4 rounded-lg">
              <h4 className="text-sm font-semibold text-green-900 mb-2">Dicas:</h4>
              <ul className="text-xs text-green-800 space-y-1">
                <li>• O preview atualiza automaticamente</li>
                <li>• Use preços atrativos para chamar atenção</li>
                <li>• "Link na bio" é ideal para Instagram</li>
                <li>• A marca reforça a credibilidade</li>
              </ul>
            </div>
          </div>

          {/* Story Preview Container */}
          <div className="flex-1 flex p-4 lg:p-6 sm:p-2 overflow-hidden flex-col lg:flex-row relative">
            {/* Mobile Accordion Toggle */}
            <div className="lg:hidden w-full mb-4">
              <button
                onClick={() => setIsOptionsOpen(!isOptionsOpen)}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
                </svg>
                Personalizar
                <svg 
                  className={`w-4 h-4 transition-transform duration-300 ${isOptionsOpen ? 'rotate-180' : ''}`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>

            {/* Mobile Accordion Content */}
            {isOptionsOpen && (
              <div className="lg:hidden absolute top-20 left-4 right-4 z-20 bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden max-h-96 overflow-y-auto">
                                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Opções de Personalização</h3>
                  
                  {/* Price Section */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-sm font-medium text-gray-700">Mostrar Preço</label>
                      <input
                        type="checkbox"
                        checked={showPrice}
                        onChange={(e) => setShowPrice(e.target.checked)}
                        className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                      />
                    </div>
                    {showPrice && (
                      <input
                        type="text"
                        value={customPrice}
                        onChange={(e) => setCustomPrice(e.target.value)}
                        placeholder="Ex: R$ 150,00"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    )}
                  </div>

                  {/* Tag Section */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-medium text-gray-700">Mostrar Categoria</label>
                      <input
                        type="checkbox"
                        checked={showTag}
                        onChange={(e) => setShowTag(e.target.checked)}
                        className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  {/* Link Badge Section */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-medium text-gray-700">Mostrar "Link na bio"</label>
                      <input
                        type="checkbox"
                        checked={showLinkBadge}
                        onChange={(e) => setShowLinkBadge(e.target.checked)}
                        className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  {/* Brand Section */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-medium text-gray-700">Mostrar Marca</label>
                      <input
                        type="checkbox"
                        checked={showBrand}
                        onChange={(e) => setShowBrand(e.target.checked)}
                        className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  {/* Promo Section */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-medium text-gray-700">Mostrar Promoção</label>
                      <input
                        type="checkbox"
                        checked={showPromo}
                        onChange={(e) => setShowPromo(e.target.checked)}
                        className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  {/* Preview Info */}
                  <div className="bg-green-50 p-3 rounded-lg">
                    <h4 className="text-sm font-semibold text-green-900 mb-2">Dicas:</h4>
                    <ul className="text-xs text-green-800 space-y-1">
                      <li>• O preview atualiza automaticamente</li>
                      <li>• Use preços atrativos para chamar atenção</li>
                      <li>• "Link na bio" é ideal para Instagram</li>
                      <li>• A marca reforça a credibilidade</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
            {/* Preview visível - mantém proporções 9:16 */}
            <div className="flex flex-1 justify-center overflow-x-hidden">
              <div className="transform scale-30 lg:scale-30 sm:scale-40 origin-top">
                <ShareableTourStory 
                  tour={tour}
                  showPrice={showPrice}
                  customPrice={customPrice}
                  showBrand={showBrand}
                  showLinkBadge={showLinkBadge}
                  showTag={showTag}
                  showPromo={showPromo}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Elemento para captura - completamente separado */}
        <div className="absolute -left-[9999px] top-0" ref={storyRef}>
          <ShareableTourStory 
            tour={tour}
            showPrice={showPrice}
            customPrice={customPrice}
            showBrand={showBrand}
            showLinkBadge={showLinkBadge}
            showTag={showTag}
            showPromo={showPromo}
          />
        </div>

        {/* Actions - Fixo na parte inferior */}
        <div className="flex items-center justify-center gap-4 p-4 border-t border-gray-200 flex-shrink-0">
          <button
            onClick={handleTestCapture}
            disabled={isGenerating}
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {isGenerating ? (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                />
                Gerando...
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 16l-4-4h3V4h2v8h3l-4 4zm9-13h-6v2h4v10H5V5h4V3H3v18h18V3z"/>
                </svg>
                Baixar
              </>
            )}
          </button>
        
          <button
            onClick={onClose}
            className="bg-gray-200 text-gray-700 px-8 py-3 rounded-full font-semibold hover:bg-gray-300 transition-colors"
          >
            Cancelar
          </button>
        </div>

        {/* Toast */}
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
          {toast.isVisible && (
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.3 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.3 }}
              transition={{ duration: 0.3 }}
              className={`px-6 py-3 rounded-lg shadow-lg text-white font-medium ${
                toast.type === 'success' ? 'bg-green-500' : 'bg-red-500'
              }`}
            >
              <div className="flex items-center gap-2">
                {toast.type === 'success' ? (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                )}
                <span>{toast.message}</span>
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
} 