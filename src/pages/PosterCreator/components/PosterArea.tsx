import { DndContext, DragEndEvent, useDroppable } from '@dnd-kit/core';
import { PosterElement } from '../types';
import DraggableElement from './DraggableElement';
import { ResizableBox } from 'react-resizable';
import StartImage from './StartImage';

interface PosterAreaProps {
  elements: PosterElement[];
  backgroundImage?: string;
  handleDragEnd: (event: DragEndEvent) => void;
  handleResize: (id: string, event: ResizeEndEvent, data: ResizeEndData) => void;
  setSelectedElement: (id: string) => void;
  setColorPickerVisible: (visible: boolean) => void;
}

export default function PosterArea(props: PosterAreaProps) {
  const { elements, backgroundImage, handleDragEnd, handleResize, setSelectedElement, setColorPickerVisible } = props;
  const { setNodeRef } = useDroppable({
    id: 'poster-area',
  });

  if (elements.length === 0 && !backgroundImage) return <StartImage />;
  console.log('elements', elements);

  return (
    <DndContext onDragEnd={props.handleDragEnd}>
      <div
        ref={setNodeRef}
        className='aspect-4/5 border-2 border-gray-300 relative overflow-hidden'
        style={{ backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'none', backgroundSize: 'cover' }}
      >
        {elements.map(element => (
          <DraggableElement key={element.id} element={element}>
            <ResizableBox
              width={element.width}
              height={element.height}
              onResize={(e, data) => handleResize(element.id, e, data)}
              draggableOpts={{ grid: [1, 1] }}
            >
              <div
                className='absolute cursor-move'
                style={{ width: '100%', height: '100%', left: element.x, top: element.y }}
              >
                {element.type === 'text' ? (
                  <p style={{ color: element.color, fontSize: '16px', wordWrap: 'break-word' }}>{element.content}</p>
                ) : (
                  <img
                    src={element.content || '/placeholder.svg'}
                    alt='Poster element'
                    style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                  />
                )}
              </div>
            </ResizableBox>
          </DraggableElement>
        ))}
      </div>
    </DndContext>
  );
}
