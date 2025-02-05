import { Button } from '../../../components/Button';
import Elements from './Elements';
import Header from './Header';

interface ActionAreaProps {
  exportToPDF: () => void;
  handleBackgroundImage: (e: React.ChangeEvent<HTMLInputElement>) => void;
  addText: () => void;
  addImage: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function ActionArea({ handleBackgroundImage, addText, addImage }: ActionAreaProps) {
  return (
    <div className='flex flex-col gap-4 justify-between h-full'>
      <Header onReset={() => {}} />
      <hr className='bg-white-97 h-[1px] border-0' />
      <p className='font-bold text-black-75 p-4 bg-white-97 rounded-lg'>Add content</p>
      <Elements addText={addText} addImage={addImage} handleBackgroundImage={handleBackgroundImage} />
      <hr className='bg-white-97 h-[1px] border-0' />
      <Button className='bg-primary text-white ml-auto'>Export to PNG</Button>
    </div>
  );
}
