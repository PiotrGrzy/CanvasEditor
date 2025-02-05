import { CSS } from '@dnd-kit/utilities';
import { useDraggable, type DraggableAttributes } from '@dnd-kit/core';
import { PosterElement } from '../types';

export default function DraggableElement({ element, children }: { element: PosterElement; children: React.ReactNode }) {
  console.log('element.id', element.id);
  const { attributes, listeners, setNodeRef, transform, active } = useDraggable({
    id: element.id,
  });

  const style = transform
    ? {
        transform: CSS.Translate.toString(transform),
      }
    : undefined;

  console.log('active', active);

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={active?.id === element.id ? 'opacity-50 border-2 border-blue-500' : ''}
    >
      {children}
    </div>
  );
}
