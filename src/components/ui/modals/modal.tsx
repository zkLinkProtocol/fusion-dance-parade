import { cn } from 'lib/utils';
import { Button } from '../buttons/button';
import { create } from 'zustand';

interface ModalState {
  isOpen: boolean;
  toggleModal: (open?: boolean) => void;
}

export const useModalStore = create<ModalState>((set) => ({
  isOpen: false,
  toggleModal: (open?: boolean) => set((state) => ({ isOpen: open ?? !state.isOpen })),
}));

const Modal: React.FC = () => {
  const { isOpen, toggleModal } = useModalStore();

  return (
    <div className={cn(!isOpen && '!hidden', 'w-full h-full mask z-50')}>
      <div className='flex flex-col items-center rounded-2xl bg-black p-8'>
        <div className='mb-2 text-center text-5xl font-bold text-white'>Congratulations</div>
        <div className='mb-6 text-center text-2xl text-white'>You've summoned</div>
        <img
          loading='lazy'
          src='/assets/imgs/chad.png'
          className='mb-6 aspect-[0.93] w-full max-w-[450px] rounded-2xl border-2 border-solid border-indigo-500 bg-zinc-900'
          alt=''
        />
        <span className='mb-3 text-lg text-[#c875ff]'>Deposit 0.1 ETH to get 1 Mystery box</span>
        <Button
          className='backButton cursor-pointer'
          onClick={() => {
            window.open('https://app.zklink.io/aggregation-parade');
            toggleModal(false);
          }}
        >
          <span>Deposit Now</span>
        </Button>
      </div>
    </div>
  );
};

export default Modal;
