'use client';

type ModalProps = {
  isOpen: boolean;
  title?: string;
  onClose?: () => void; 
  children: React.ReactElement;
};

export default function Modal({ isOpen, title = 'Modal Title', onClose, children }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50" onClick={onClose}>
      <div className="bg-white rounded-lg p-6 w-full max-w-lg mx-4" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-4 text-black">
          <h2 className="text-xl font-bold">{title}</h2>
          <button onClick={onClose} className="text-gray-500 text-xl hover:text-gray-800">&times;</button>
        </div>
        <div>
          {children}
        </div>
      </div>
    </div>
  );
}
