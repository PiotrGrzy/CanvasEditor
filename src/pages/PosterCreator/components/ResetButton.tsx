import { ResetIcon } from '../../../components/icons/Reset';

export default function ResetButton({ onClick }: { onClick: () => void }) {
  return (
    <button className='text-red flex items-center gap-2' onClick={onClick}>
      <span className=''>Reset</span>
      <ResetIcon fill='alert' />
    </button>
  );
}
