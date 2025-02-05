import { useState, useRef } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

import { PosterElement } from './types';

import PosterArea from './components/PosterArea';
import ActionArea from './components/ActionArea';
import ResetConfirmDialog from './components/ResetConfirmDialog';

export default function PosterCreator() {
  const [elements, setElements] = useState<PosterElement[]>([]);
  const [isResetDialogOpen, setIsResetDialogOpen] = useState(false);
  const [backgroundImage, setBackgroundImage] = useState<string | null>(null);
  const [selectedElement, setSelectedElement] = useState<string | null>(null);
  const posterRef = useRef<HTMLDivElement>(null);

  const addText = () => {
    const newElement: PosterElement = {
      id: `text-${Date.now()}`,
      type: 'text',
      content: '',
      x: 200,
      y: 400,
      width: 350,
      height: 120,
      color: 'black-100',
      isEditing: false,
      fontSize: 32,
    };
    setElements([...elements, newElement]);
    setSelectedElement(newElement.id);
  };

  const addImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = event => {
        const newElement: PosterElement = {
          id: `image-${Date.now()}`,
          type: 'image',
          content: event.target?.result as string,
          x: 200,
          y: 400,
          width: 200,
          height: 200,
        };
        setElements([...elements, newElement]);
        setSelectedElement(newElement.id);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBackgroundImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = event => {
        setBackgroundImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const exportToPDF = async () => {
    if (posterRef.current) {
      const canvas = await html2canvas(posterRef.current);
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      pdf.addImage(imgData, 'PNG', 0, 0, 210, 297);
      pdf.save('poster.pdf');
    }
  };

  const handleResetPoster = () => {
    setElements([]);
    setBackgroundImage(null);
    setSelectedElement(null);
    setIsResetDialogOpen(false);
  };

  return (
    <div className='container mx-auto font-poppins overflow-auto min-w-[1920px]'>
      <div className='flex gap-4 py-4 px-48 w-full mt-12'>
        <div className='flex-1'>
          <PosterArea
            elements={elements}
            backgroundImage={backgroundImage || undefined}
            posterRef={posterRef}
            setSelectedElement={setSelectedElement}
            selectedElement={selectedElement}
            setElements={setElements}
          />
        </div>
        <div className='flex-1'>
          <ActionArea
            exportToPDF={exportToPDF}
            handleBackgroundImage={handleBackgroundImage}
            addText={addText}
            addImage={addImage}
            resetPoster={() => setIsResetDialogOpen(true)}
          />
        </div>
        <ResetConfirmDialog
          isOpen={isResetDialogOpen}
          onClose={() => setIsResetDialogOpen(false)}
          onConfirm={handleResetPoster}
        />
      </div>
    </div>
  );
}
