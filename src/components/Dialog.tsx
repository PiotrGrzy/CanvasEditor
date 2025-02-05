import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Button } from './Button';

interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export function Dialog({ isOpen, onClose, children }: DialogProps) {
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black-100/50'>
      <div ref={dialogRef} className='bg-white-default rounded-lg shadow-lg p-6 max-w-2xl w-full mx-4'>
        <div className='flex justify-end items-center'>
          <Button variant='outline' size='sm' onClick={onClose} className='text-black-75 hover:text-black-100 text-4xl'>
            ×
          </Button>
        </div>
        <div className='mt-2'>{children}</div>
      </div>
    </div>,
    document.body
  );
}
