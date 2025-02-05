import { useState, useRef } from 'react';
import { SketchPicker } from 'react-color';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

import 'react-resizable/css/styles.css';
import { PosterElement } from './types';

import PosterArea from './components/PosterArea';
import ActionArea from './components/ActionArea';

export default function PosterCreator() {
  const [elements, setElements] = useState<PosterElement[]>([]);
  const [backgroundImage, setBackgroundImage] = useState<string | null>(null);
  const [selectedElement, setSelectedElement] = useState<string | null>(null);
  const [colorPickerVisible, setColorPickerVisible] = useState(false);
  const posterRef = useRef<HTMLDivElement>(null);

  const addText = () => {
    const newElement: PosterElement = {
      id: `text-${Date.now()}`,
      type: 'text',
      content: 'New Text',
      x: 0,
      y: 0,
      width: 100,
      height: 50,
      color: '#000000',
    };
    setElements([...elements, newElement]);
  };

  const addImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log('addImage', e);
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = event => {
        const newElement: PosterElement = {
          id: `image-${Date.now()}`,
          type: 'image',
          content: event.target?.result as string,
          x: 0,
          y: 0,
          width: 100,
          height: 100,
        };
        setElements([...elements, newElement]);
      };
      reader.readAsDataURL(file);
    }
  };

  const updateElement = (id: string, updates: Partial<PosterElement>) => {
    setElements(elements.map(el => (el.id === id ? { ...el, ...updates } : el)));
  };

  const handleDragEnd = (event: any) => {
    const { active, delta } = event;
    if (active) {
      updateElement(active.id, {
        x: elements.find(el => el.id === active.id)!.x + delta.x,
        y: elements.find(el => el.id === active.id)!.y + delta.y,
      });
    }
  };

  const handleResize = (id: string, e: any, { size }: { size: { width: number; height: number } }) => {
    updateElement(id, { width: size.width, height: size.height });
  };

  const handleBackgroundImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    console.log('handleBackgroundImage', file);
    if (file) {
      const reader = new FileReader();
      reader.onload = event => {
        setBackgroundImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleColorChange = (color: { hex: string }) => {
    if (selectedElement) {
      updateElement(selectedElement, { color: color.hex });
    }
  };

  const exportToPDF = async () => {
    if (posterRef.current) {
      const canvas = await html2canvas(posterRef.current);
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
      pdf.save('poster.pdf');
    }
  };

  return (
    <div className='container mx-auto font-poppins'>
      <div className='flex gap-4 p-4'>
        <div className='flex-1'>
          <PosterArea
            elements={elements}
            backgroundImage={backgroundImage || undefined}
            handleDragEnd={handleDragEnd}
            handleResize={handleResize}
            setSelectedElement={setSelectedElement}
            setColorPickerVisible={setColorPickerVisible}
          />
        </div>
        <div className='flex-1'>
          <ActionArea
            exportToPDF={exportToPDF}
            handleBackgroundImage={handleBackgroundImage}
            addText={addText}
            addImage={addImage}
          />
        </div>
      </div>
    </div>
  );
  {
    /* {colorPickerVisible && (
    <div className='mt-4'>
      <SketchPicker
        color={elements.find(el => el.id === selectedElement)?.color || '#000000'}
        onChangeComplete={handleColorChange}
      />
    </div>
  )} */
  }
}
