import { ResetIcon } from '../../../components/icons/Reset';

export default function ResetButton({ onClick }: { onClick: () => void }) {
  return (
    <button className='text-red flex items-center gap-2 border-b-1 border-red cursor-pointer' onClick={onClick}>
      <span>Reset</span>
      <ResetIcon fill='alert' />
    </button>
  );
}
