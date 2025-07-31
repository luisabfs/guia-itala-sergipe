'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

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

interface TourContextType {
  selectedTours: Tour[];
  selectedTourIds: string[];
  toggleTour: (tour: Tour) => void;
  removeTour: (tourId: string) => void;
  clearTours: () => void;
  isWhatsAppOpen: boolean;
  setIsWhatsAppOpen: (open: boolean) => void;
}

const TourContext = createContext<TourContextType | undefined>(undefined);

export function TourProvider({ children }: { children: ReactNode }) {
  const [selectedTourIds, setSelectedTourIds] = useState<string[]>([]);
  const [selectedTours, setSelectedTours] = useState<Tour[]>([]);
  const [isWhatsAppOpen, setIsWhatsAppOpen] = useState(false);

  const toggleTour = (tour: Tour) => {
    setSelectedTourIds(prev => {
      const isSelected = prev.includes(tour.id);
      if (isSelected) {
        const newIds = prev.filter(id => id !== tour.id);
        setSelectedTours(prevTours => prevTours.filter(t => t.id !== tour.id));
        return newIds;
      } else {
        const newIds = [...prev, tour.id];
        setSelectedTours(prevTours => {
          // Check if tour already exists to prevent duplicates
          if (prevTours.some(t => t.id === tour.id)) {
            return prevTours;
          }
          return [...prevTours, tour];
        });
        return newIds;
      }
    });
  };

  const removeTour = (tourId: string) => {
    setSelectedTourIds(prev => prev.filter(id => id !== tourId));
    setSelectedTours(prev => prev.filter(tour => tour.id !== tourId));
  };

  const clearTours = () => {
    setSelectedTourIds([]);
    setSelectedTours([]);
  };

  return (
    <TourContext.Provider value={{
      selectedTours,
      selectedTourIds,
      toggleTour,
      removeTour,
      clearTours,
      isWhatsAppOpen,
      setIsWhatsAppOpen
    }}>
      {children}
    </TourContext.Provider>
  );
}

export function useTourContext() {
  const context = useContext(TourContext);
  if (context === undefined) {
    throw new Error('useTourContext must be used within a TourProvider');
  }
  return context;
} 