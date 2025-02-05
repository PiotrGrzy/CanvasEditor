import { Rnd } from 'react-rnd';
import DraggableElement from './DraggableElement';
import { PosterElement, TextColor } from '../types';
import { TextElement } from './elements/TextElement';
import { ImageElement } from './elements/ImageElement';

interface RndElementProps {
  element: PosterElement;
  selectedElement: string | null;
  onDragStop: (id: string, d: { x: number; y: number }) => void;
  onResize: (
    id: string,
    ref: HTMLElement,
    position: { x: number; y: number },
    size: { width: number; height: number }
  ) => void;
  onElementClick: (id: string, e: React.MouseEvent) => void;
  onDeleteElement: (id: string) => void;
  onColorChange: (color: TextColor) => void;
  handleTextChange: (id: string, value: string) => void;
  updateElement: (id: string, updates: Partial<PosterElement>) => void;
}

const ElementComponents = {
  text: TextElement,
  image: ImageElement,
} as const;

export function RndElement({
  element,
  selectedElement,
  onDragStop,
  onResize,
  onElementClick,
  onDeleteElement,
  onColorChange,
  handleTextChange,
  updateElement,
}: RndElementProps) {
  const ElementComponent = ElementComponents[element.type];

  return (
    <Rnd
      key={element.id}
      size={{ width: element.width, height: element.height }}
      position={{ x: element.x, y: element.y }}
      onDragStop={(_e, d) => onDragStop(element.id, d)}
      onResize={(_e, _direction, ref, _delta, position) =>
        onResize(element.id, ref, position, { width: ref.offsetWidth, height: ref.offsetHeight })
      }
      bounds='parent'
      className='relative'
      lockAspectRatio={element.type === 'text'}
      resizeHandleComponent={{
        bottomRight: <div className='w-24 h-24 '></div>,
      }}
    >
      <div onClick={e => onElementClick(element.id, e)}>
        <DraggableElement
          element={element}
          isActive={element.id === selectedElement}
          onDelete={() => onDeleteElement(element.id)}
          onColorChange={onColorChange}
        >
          <ElementComponent
            element={element}
            isSelected={element.id === selectedElement}
            onTextChange={handleTextChange}
            updateElement={updateElement}
          />
        </DraggableElement>
      </div>
    </Rnd>
  );
}
