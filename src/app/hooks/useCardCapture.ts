import { useState } from 'react';
import html2canvas from 'html2canvas';

interface UseCardCaptureReturn {
  isCapturing: boolean;
  captureCard: (element: HTMLElement, fileName: string) => Promise<void>;
  toast: {
    message: string;
    type: 'success' | 'error';
    isVisible: boolean;
    showToast: (message: string, type: 'success' | 'error') => void;
    hideToast: () => void;
  };
}

export const useCardCapture = (): UseCardCaptureReturn => {
  const [isCapturing, setIsCapturing] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<'success' | 'error'>('success');
  const [toastVisible, setToastVisible] = useState(false);

  const showToast = (message: string, type: 'success' | 'error') => {
    setToastMessage(message);
    setToastType(type);
    setToastVisible(true);
  };

  const hideToast = () => {
    setToastVisible(false);
  };

  const captureCard = async (element: HTMLElement, fileName: string): Promise<void> => {
    setIsCapturing(true);
    
    try {
      console.log('Element to capture:', element);
      console.log('Element dimensions:', element.offsetWidth, 'x', element.offsetHeight);
      console.log('Element styles:', element.style.cssText);

      // Capture the element directly
      const canvas = await html2canvas(element, {
        backgroundColor: '#ffffff',
        scale: 2,
        useCORS: true,
        allowTaint: true,
        logging: true, // Enable logging for debugging
        width: 1080,
        height: 1920,
        scrollX: 0,
        scrollY: 0,
        windowWidth: 1080,
        windowHeight: 1920,
        foreignObjectRendering: true,
        removeContainer: true,
        imageTimeout: 15000,
      });

      console.log('Canvas created:', canvas.width, 'x', canvas.height);

      // Convert to blob
      const blob = await new Promise<Blob>((resolve, reject) => {
        canvas.toBlob((blob) => {
          if (blob) {
            resolve(blob);
          } else {
            reject(new Error('Failed to create blob'));
          }
        }, 'image/png', 1.0);
      });

      console.log('Blob created:', blob.size, 'bytes');

      // Download the image
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${fileName}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      showToast('Story baixado com sucesso!', 'success');
    } catch (error) {
      console.error('Erro ao capturar story:', error);
      showToast('Erro ao gerar story. Tente novamente.', 'error');
    } finally {
      setIsCapturing(false);
    }
  };

  return { 
    isCapturing, 
    captureCard,
    toast: {
      message: toastMessage,
      type: toastType,
      isVisible: toastVisible,
      showToast,
      hideToast
    }
  };
}; 