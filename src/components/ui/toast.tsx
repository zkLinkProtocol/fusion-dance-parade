import * as React from 'react';
import Image from 'next/image';
import { toast } from 'sonner';
import { ChainId, SCAN_URLS } from 'config/chain';
import { Spinner } from './spinner';
import { useAccount } from 'wagmi';
import { cn } from 'lib/utils';

type Props = {
  id: string | number;
  title: string;
  description: string;
  transactionHash?: string;
  type?: 'success' | 'error' | 'loading';
};
export const Toast = (props: Props) => {
  const { address, chainId } = useAccount();
  const { id, title, description, transactionHash } = props;

  const type = props.type || 'success';

  const renderIcon = () => {
    switch (type) {
      case 'success':
        return <Image src='/assets/svgs/success.svg' width={24} height={24} alt='check-green' />;
      case 'error':
        return <Image src='/assets/svgs/error.svg' width={24} height={24} alt='error' />;
      case 'loading':
        return <Spinner />;
      default:
        return null;
    }
  };
  return (
    <div className='flex w-[480px] max-w-[480px] flex-col items-start rounded-2xl bg-[#1A1F24] p-4 leading-8 tracking-widest'>
      <div className='flex items-center gap-3 font-bold'>
        {renderIcon()}
        <div
          className={cn(
            'flex-auto text-white',
            type === 'success'
              ? 'bg-gradient-to-r from-[#6276E7] to-[#E884FE] bg-clip-text text-transparent'
              : type === 'error'
              ? 'text-[#CA7E7E]'
              : 'text-white',
          )}
        >
          {title}
        </div>
      </div>
      <div className='ml-9 text-gray-400'>{description}</div>
    </div>

    // <div className='pointer-events-auto flex rounded-box bg-white shadow-lg ring-1 ring-lightGray1 dark:bg-[#282828] dark:ring-[#5C5C5C] sm:min-w-[600px]'>
    //   <div className='w-0 flex-1 p-6'>
    //     <div className='flex items-start'>
    //       <div className='shrink-0 pt-0.5'>{renderIcon()}</div>
    //       <div className='ml-4 flex-1'>
    //         <p className='text-lg font-bold leading-6'>{title}</p>
    //         <p className='mt-2 text-base leading-6 text-gray1 dark:text-[#ADADAD]'>
    //           {transactionHash ? (
    //             <>
    //               You can view your transaction on
    //               <span
    //                 className='ml-1 cursor-pointer underline'
    //                 onClick={() => {
    //                   window.open(`${SCAN_URLS[chainId as ChainId]}/tx/${transactionHash}`);
    //                 }}
    //               >
    //                 here
    //               </span>
    //             </>
    //           ) : (
    //             description
    //           )}
    //         </p>
    //       </div>
    //     </div>
    //   </div>
    //   <div className='flex border-gray-200 p-6'>
    //     <button
    //       onClick={() => toast.dismiss(id)}
    //       className='flex w-full items-start justify-center rounded-none rounded-r-lg border border-transparent'
    //     >
    //       <svg
    //         xmlns='http://www.w3.org/2000/svg'
    //         width='24'
    //         height='24'
    //         viewBox='0 0 24 24'
    //         fill='none'
    //         stroke='currentColor'
    //         strokeWidth='2'
    //         strokeLinecap='round'
    //         strokeLinejoin='round'
    //       >
    //         <line x1='18' y1='6' x2='6' y2='18'></line>
    //         <line x1='6' y1='6' x2='18' y2='18'></line>
    //       </svg>
    //     </button>
    //   </div>
    // </div>
  );
};
