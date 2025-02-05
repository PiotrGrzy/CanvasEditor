import { PosterElement, TextColor } from '../types';
import { MoveIcon } from '../../../components/icons/Move/inddex';
import { DeleteIcon } from '../../../components/icons/Delete';
import { cn } from '../../../lib/utils';

const colorClassMap = {
  'black-100': 'bg-black-100',
  'white-default': 'bg-white-default',
  red: 'bg-red',
  blue: 'bg-blue',
  green: 'bg-green',
} as const;

const ColorDot = ({ color, selected, onClick }: { color: TextColor; selected: boolean; onClick: () => void }) => {
  const className = cn(
    'w-3 h-3 rounded-2xl cursor-pointer',
    colorClassMap[color],
    selected ? 'border-2 border-white-97' : ''
  );

  return <button onClick={onClick} className={className}></button>;
};

const colorOptions: TextColor[] = ['black-100', 'white-default', 'red', 'blue', 'green'];

export default function DraggableElement({
  element,
  children,
  isActive,
  onDelete,
  onColorChange,
}: {
  element: PosterElement;
  children: React.ReactNode;
  isActive: boolean;
  onDelete: () => void;
  onColorChange: (color: TextColor) => void;
}) {
  if (!isActive) return <>{children}</>;

  return (
    <div className='relative flex justify-center align-middle border-2 border-primary'>
      <button className='absolute bg-white-default rounded-4xl z-10 top-0 left-0 translate-x-[-50%] translate-y-[-50%] cursor-grab'>
        <MoveIcon fill='primary' />
      </button>
      {children}
      <button
        onClick={onDelete}
        className='absolute bg-white rounded-4xl z-10 top-0 right-0 translate-x-[50%] translate-y-[-50%] cursor-pointer'
      >
        <DeleteIcon fill='alert' size='sm' />
      </button>
      <div className='absolute p-0.5 bg-white rounded-4xl z-10 bottom-0 right-0 translate-x-[50%] translate-y-[50%] '>
        <div className='w-3 h-3 bg-primary rounded-2xl'></div>
      </div>

      {element.type === 'text' && (
        <div className='flex gap-1 absolute bottom-[-4px] translate-y-[16px] left-1'>
          {colorOptions.map(color => (
            <ColorDot
              key={color}
              color={color}
              selected={element.color === color}
              onClick={() => onColorChange(color)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
