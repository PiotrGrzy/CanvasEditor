import { LogoIcon } from '../../../components/icons/Logo';
import ResetButton from './ResetButton';

export default function Header({ onReset }: { onReset: () => void }) {
  return (
    <div className='flex justify-between items-center'>
      <div className='flex items-center gap-2'>
        <LogoIcon fill='primary' />
        <h1 className='text-2xl font-bold text-black-75'>CanvasEditor</h1>
      </div>
      <ResetButton onClick={onReset} />
    </div>
  );
}
