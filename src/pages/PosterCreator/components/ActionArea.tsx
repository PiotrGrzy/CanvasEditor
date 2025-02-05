import { Button } from '../../../components/Button';
import Elements from './Elements';
import Header from './Header';

interface ActionAreaProps {
  exportToPDF: () => void;
  handleBackgroundImage: (e: React.ChangeEvent<HTMLInputElement>) => void;
  addText: () => void;
  addImage: (e: React.ChangeEvent<HTMLInputElement>) => void;
  resetPoster: () => void;
}

export default function ActionArea({
  handleBackgroundImage,
  addText,
  addImage,
  exportToPDF,
  resetPoster,
}: ActionAreaProps) {
  return (
    <div className='flex flex-col gap-4 justify-between h-full'>
      <Header onReset={resetPoster} />
      <hr className='bg-white-97 h-[1px] border-0' />
      <p className='font-bold text-black-75 p-4 bg-white-97 rounded-lg'>Add content</p>
      <Elements addText={addText} addImage={addImage} handleBackgroundImage={handleBackgroundImage} />
      <hr className='bg-white-97 h-[1px] border-0' />
      <Button onClick={exportToPDF} variant='primary' className='ml-auto'>
        Export to PNG
      </Button>
    </div>
  );
}
