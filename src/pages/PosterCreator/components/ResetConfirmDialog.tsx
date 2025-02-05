import { Dialog } from '../../../components/Dialog';
import { Button } from '../../../components/Button';
import { AlertIcon } from '../../../components/icons/Alert';

export default function ResetConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
}: {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}) {
  return (
    <Dialog isOpen={isOpen} onClose={onClose}>
      <div className='flex flex-col items-center '>
        <AlertIcon size='xxl' fill='alert' />
        <h1 className='font-bold text-2xl'>WARNING</h1>
        <p className='text-center font-medium my-8 text-black-75 max-w-72'>
          You're about to reset whole process. Are you sure you want to do it?
        </p>
        <div className='flex gap-4'>
          <Button variant='secondary' onClick={onClose}>
            Cancel
          </Button>
          <Button variant='primary' onClick={onConfirm}>
            Reset
          </Button>
        </div>
      </div>
    </Dialog>
  );
}
