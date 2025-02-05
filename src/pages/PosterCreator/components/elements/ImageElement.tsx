import { PosterElement } from '../../types';

interface ImageElementProps {
  element: PosterElement;
}

export function ImageElement({ element }: ImageElementProps) {
  return (
    <img
      src={element.content || '/placeholder.svg'}
      alt='Poster element'
      className='w-full h-full object-contain'
      style={{ pointerEvents: 'none' }}
    />
  );
}
