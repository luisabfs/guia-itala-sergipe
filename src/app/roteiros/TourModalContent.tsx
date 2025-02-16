'use client';

import WhatsappCta from '../components/WhatsappCta';
import { Tour } from '../types';
import { formatTime } from '../utils';

export default function TourModalContent({ selectedTour }: { selectedTour: Tour }) {
  // const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;
  const backgroundImage = 
    // selectedTour.image ? `url(${API_BASE_URL}${selectedTour?.image?.url})` : 
    `url(${selectedTour.imageUrl})`;

  return (
    <div className='text-black flex flex-col gap-2'>
      <p className='text-justify'>{selectedTour.description ?? ''}</p>
      <div
        className={`relative bg-cover bg-center rounded-lg w-full min-h-[200px]`}
        style={{ backgroundImage }}
      />
      <div id="schedule" className='flex gap-6 text-sm'>
        {selectedTour.departureTime ? (
          <div className='flex flex-col'>
            <span>saída</span>
            <span className='p-2 bg-[#c0dfd3] w-fit rounded-lg font-bold'>{formatTime(selectedTour.departureTime)}</span>
          </div>
        ) : null}
        {selectedTour.returnTime ? (
          <div className='flex flex-col'>
            <span>previsão de retorno</span>
            <span className='p-2 bg-[#c0dfd3] w-fit rounded-lg font-bold'>{formatTime(selectedTour.returnTime)}</span>
          </div>
        ) : null}
      </div>

      <div className='flex flex-col gap-4 md:flex-row md:gap-10'>
        {selectedTour.included && selectedTour.included?.length > 0 ? (
          <div id="included-items min-w-[200px]">
            <span className='font-bold'>Incluso:</span>
            <ul className='text-sm list-disc pl-6'>
              {selectedTour.included?.map(item => (
                <li key={item} className='whitespace-nowrap'>{item}</li>
              ))}
            </ul>
          </div>
        ) : null}
        {selectedTour.notIncluded && selectedTour.notIncluded?.length > 0 ? (
          <div id="non-included-items">
            <span className='font-bold'>Não Incluso:</span>
            <ul className='text-sm list-disc pl-6'>
              {selectedTour.notIncluded.map(item => (
                <li key={item + Math.random()} dangerouslySetInnerHTML={{ __html: item }} />
              ))}
            </ul>
          </div>
        ) : null}

        {selectedTour.hasCta ? <WhatsappCta /> : null}

      </div>
    </div>
  );
}
