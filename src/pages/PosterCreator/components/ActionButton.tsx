import { TextIcon } from '../../../components/icons/Text';
import { BackgroundIcon } from '../../../components/icons/Background';
import { ImgIcon } from '../../../components/icons/Img';

const icons = {
  text: TextIcon,
  background: BackgroundIcon,
  img: ImgIcon,
} as const;

interface ActionButtonProps {
  iconName: keyof typeof icons;
  name: string;
  onClick: () => void;
}

export function ActionButton({ iconName, name, onClick }: ActionButtonProps) {
  const Icon = icons[iconName];

  return (
    <button
      onClick={onClick}
      className='flex flex-col cursor-pointer items-center justify-center h-64 gap-2 p-3 rounded-[10px] bg-white-97 transition-colors'
    >
      <Icon size='l' />
      <span className='text-sm text-black-75'>{name}</span>
    </button>
  );
}
