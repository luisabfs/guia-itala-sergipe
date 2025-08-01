'use client';

import { useState, useEffect } from 'react';
import type { NotionTour } from '@/lib/notion';

export default function TestNotionPage() {
  const [tours, setTours] = useState<NotionTour[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [category, setCategory] = useState<string>('all');

  useEffect(() => {
    fetchTours();
  }, [category]);

  const fetchTours = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const url = category === 'all' 
        ? '/api/tours' 
        : `/api/tours?category=${category}`;
      
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      setTours(data.tours);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Loading tours from Notion...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            <strong className="font-bold">Error:</strong>
            <span className="block sm:inline"> {error}</span>
          </div>
          <p className="text-sm text-gray-600 mb-4">
            Make sure you have set up your environment variables:
          </p>
          <div className="bg-gray-100 p-4 rounded text-left text-sm">
            <code>NOTION_API_KEY=your_api_key</code><br />
            <code>NOTION_DATABASE_ID=your_database_id</code>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Notion API Test</h1>
          
          <div className="flex gap-4 mb-6">
            <select 
              value={category} 
              onChange={(e) => setCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="all">All Tours</option>
              <option value="praias">Praias</option>
              <option value="cultural">Cultural</option>
              <option value="ecologico">Ecológico</option>
            </select>
            
            <button 
              onClick={fetchTours}
              className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors"
            >
              Refresh
            </button>
          </div>

          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
            <strong className="font-bold">Success!</strong>
            <span className="block sm:inline"> Found {tours.length} tour(s)</span>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {tours.map((tour) => (
            <div key={tour.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              {tour.imageUrl && (
                <div className="h-48 bg-gray-200">
                  <img 
                    src={tour.imageUrl} 
                    alt={tour.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                </div>
              )}
              
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">{tour.title}</h3>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    tour.category === 'praias' ? 'bg-blue-100 text-blue-800' :
                    tour.category === 'cultural' ? 'bg-amber-100 text-amber-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {tour.category}
                  </span>
                </div>
                
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {tour.description}
                </p>
                
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Departure:</span>
                    <span className="font-medium">{tour.departureTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Return:</span>
                    <span className="font-medium">{tour.returnTime}</span>
                  </div>
                  {tour.price && (
                    <div className="flex justify-between">
                      <span className="text-gray-500">Price:</span>
                      <span className="font-medium text-green-600">{tour.price}</span>
                    </div>
                  )}
                </div>
                
                {tour.included.length > 0 && (
                  <div className="mt-4">
                    <h4 className="text-sm font-medium text-gray-900 mb-2">Included:</h4>
                    <div className="flex flex-wrap gap-1">
                      {tour.included.slice(0, 3).map((item, index) => (
                        <span key={index} className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">
                          {item}
                        </span>
                      ))}
                      {tour.included.length > 3 && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                          +{tour.included.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {tours.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No tours found for the selected category.</p>
          </div>
        )}
      </div>
    </div>
  );
} 