import { PosterElement, TextColor } from '../types';
import StartImage from './StartImage';
import { useCallback } from 'react';
import { RndElement } from './RndElement';

interface PosterAreaProps {
  posterRef: React.RefObject<HTMLDivElement>;
  elements: PosterElement[];
  setElements: React.Dispatch<React.SetStateAction<PosterElement[]>>;
  selectedElement: string | null;
  setSelectedElement: (id: string | null) => void;
  backgroundImage?: string;
}

export default function PosterArea(props: PosterAreaProps) {
  const { elements, backgroundImage, setSelectedElement, posterRef, selectedElement, setElements } = props;

  const updateElement = useCallback(
    (id: string, updates: Partial<PosterElement>) => {
      setElements((prevElements: PosterElement[]) =>
        prevElements.map(el => (el.id === id ? { ...el, ...updates } : el))
      );
    },
    [setElements]
  );

  const handleDragStop = (id: string, d: { x: number; y: number }) => {
    updateElement(id, { x: d.x, y: d.y });
  };

  const handleTextChange = useCallback(
    (id: string, newContent: string) => {
      updateElement(id, { content: newContent, isEditing: false });
    },
    [updateElement]
  );

  const handleElementClick = useCallback(
    (id: string, e: React.MouseEvent) => {
      e.stopPropagation();
      setSelectedElement(id);
    },
    [setSelectedElement]
  );

  const handlePosterClick = useCallback(() => {
    setSelectedElement(null);
  }, [setSelectedElement]);

  const handleColorChange = (color: TextColor) => {
    if (selectedElement) {
      updateElement(selectedElement, { color });
    }
  };

  const handleResize = (
    id: string,
    _ref: HTMLElement,
    position: { x: number; y: number },
    size: { width: number; height: number }
  ) => {
    const element = elements.find(el => el.id === id);
    if (element) {
      const updates: Partial<PosterElement> = {
        x: position.x,
        y: position.y,
        width: size.width,
        height: size.height,
      };

      if (element.type === 'text') {
        const aspectRatio = element.width / element.fontSize!;
        updates.fontSize = Math.round(size.width / aspectRatio);
      }
      updateElement(id, updates);
    }
  };

  const handleDeleteElement = useCallback(
    (id: string) => {
      setElements(prevElements => prevElements.filter(el => el.id !== id));
    },
    [setElements]
  );

  if (elements.length === 0 && !backgroundImage) return <StartImage />;

  return (
    <div
      ref={posterRef}
      className='aspect-4/5 relative overflow-hidden bg-black-50'
      style={{ backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'none', backgroundSize: 'cover' }}
      onClick={handlePosterClick}
    >
      {elements.map(element => (
        <RndElement
          key={element.id}
          element={element}
          selectedElement={selectedElement}
          onDragStop={handleDragStop}
          onResize={handleResize}
          onElementClick={handleElementClick}
          onDeleteElement={handleDeleteElement}
          onColorChange={handleColorChange}
          handleTextChange={handleTextChange}
          updateElement={updateElement}
        />
      ))}
    </div>
  );
}
