import { ActionButton } from './ActionButton';
import { ActionInput } from './ActionInput';
interface ElementsProps {
  addText: () => void;
  addImage: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleBackgroundImage: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Elements({ addText, addImage, handleBackgroundImage }: ElementsProps) {
  return (
    <div className='grid grid-cols-2 grid-rows-[max-content] gap-4 flex-1'>
      <ActionButton iconName='text' name='Text' onClick={addText} />
      <ActionInput iconName='img' name='Image' onChange={addImage} />
      <ActionInput iconName='background' name='Set Background' onChange={handleBackgroundImage} />
    </div>
  );
}
