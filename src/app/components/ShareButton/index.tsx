'use client';

import { useRef } from 'react';
import { motion } from 'framer-motion';
import { useCardCapture } from '../../hooks/useCardCapture';
import Toast from '../Toast';

interface ShareButtonProps {
  cardRef: React.RefObject<HTMLElement>;
  fileName: string;
  className?: string;
}

export default function ShareButton({ cardRef, fileName, className = '' }: ShareButtonProps) {
  const { isCapturing, captureCard, toast } = useCardCapture();
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleShare = async () => {
    if (!cardRef.current) return;
    
    await captureCard(cardRef.current, fileName);
  };

  return (
    <>
      <motion.button
      ref={buttonRef}
      data-share-button
      onClick={handleShare}
      disabled={isCapturing}
      className={`w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Baixar card como imagem"
    >
      {isCapturing ? (
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
        />
      ) : (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 16l-4-4h3V4h2v8h3l-4 4zm9-13h-6v2h4v10H5V5h4V3H3v18h18V3z"/>
        </svg>
      )}
    </motion.button>

    {/* Toast Notification */}
    <Toast
      message={toast.message}
      type={toast.type}
      isVisible={toast.isVisible}
      onClose={toast.hideToast}
    />
  </>
  );
} 