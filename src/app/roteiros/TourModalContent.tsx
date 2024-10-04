'use client';
import { Tour } from '../types';

export default function TourModalContent({ selectedTour }: { selectedTour: Tour }) {
  return (
    <div className='text-black flex flex-col gap-2'>
      <p className='text-justify'>{selectedTour.description}</p>
      <div
        className={`relative bg-cover bg-center rounded-lg w-full min-h-[200px]`}
        style={{ backgroundImage: `url(${selectedTour.imageUrl})` }}
      />
      <div id="schedule" className='flex gap-6 text-sm'>
        <div className='flex flex-col'>
          <span>saída</span>
          <span className='p-2 bg-[#c0dfd3] w-fit rounded-lg font-bold'>{selectedTour.departure}</span>
        </div>
        <div className='flex flex-col'>
          <span>previsão de retorno</span>
          <span className='p-2 bg-[#c0dfd3] w-fit rounded-lg font-bold'>{selectedTour.returnTime}</span>
        </div>
      </div>
      <div className='flex gap-8 md:gap-10'>
        <div id="included-items">
          <span className='font-bold'>Incluso:</span>
          <ul className='text-sm list-disc pl-6'>
            {selectedTour.included.map(item => (
              <li>{item}</li>
            ))}
          </ul>
        </div>
        <div id="non-included-items">
          <span className='font-bold'>Não Incluso:</span>
          <ul className='text-sm list-disc pl-6'>
            {selectedTour.notIncluded.map(item => (
              <li>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
