import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from 'lib/utils';
import Bridge from 'components/bridge';
import { useBridgeTx } from 'features/bridge/hooks/useBridge';
import useNft from 'features/nft/hooks/useNft';

export default function Carousel({ lists }) {
  const { mintNovaNft, isMinting, fetchMemeNftBalances } = useNft();
  const { sendDepositTx, loading } = useBridgeTx();
  const [index, setIndex] = useState(0);
  const [list, setList] = useState(lists);
  // lists.length > 0 && setList(lists)
  const handleMove = (direction) => {
    console.log(direction, 'direction');
    // Create a shallow copy of the images array
    const imgArrCopy = list.length > 0 ? [...list] : [...lists];

    // If Next Click -> ie handleMove(1)
    if (direction > 0) {
      // Grab the first item in the array
      const firstItem = imgArrCopy.shift();
      // If firstItem returns false
      if (!firstItem) return;
      // Add the first item to the end of the array
      imgArrCopy.push({ ...firstItem });
      // Update the images array
      setList(imgArrCopy);
    } else {
      // Grab the last item in the array
      const lastItem = imgArrCopy.pop();
      // Add the last item to the beginning of the array
      imgArrCopy.unshift({ ...lastItem });
      // Update the images array
      setList(imgArrCopy);
    }
    console.log('images', list);
  };

  const variants = {
    active: {
      x: 'calc(-50% + 0px)',
      width: '16rem',
      scale: 1.1,
      opacity: 1,
      zIndex: 9,
    },
    level1: (position) => ({
      x: `calc(-50% + ${position * 50}px)`,
      width: '16rem',
      scale: 0.9,
      opacity: 1,
      zIndex: 1,
    }),
    level2: (position) => ({
      x: `calc(-50% + ${position * 90}px)`,
      width: 0,
      scale: 0.25,
      opacity: 0,
      zIndex: 1,
    }),
  };
  return (
    <div className='block md:hidden'>
      <div className='relative mx-auto flex h-96 w-[90%] items-center justify-center md:hidden'>
        {(list.length > 0 ? list : lists)?.map((item, i) => {
          let position = 0;
          if (i === 0) {
            position = 0;
          } else if (i === 1) {
            position = 1;
          } else if (i === lists.length - 1) {
            position = -1;
          } else {
            position = 2;
          }
          const imgLevel = position === 0 ? 'active' : position === -1 || position === 1 ? 'level1' : 'level2';
          return (
            <motion.div
              key={item.tokenId}
              initial={false}
              className={`gradientBorder absolute left-1/2 aspect-[3/2] h-[19rem] flex-none rounded-2xl bg-zinc-900 text-white shadow-md`}
              animate={imgLevel}
              custom={position}
              variants={variants}
              transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] }}
            >
              <div className='relative flex aspect-[0.5] h-full w-full flex-col overflow-hidden rounded-2xl bg-black'>
                <img
                  src={`/assets/imgs/${item.tokenId}.png`}
                  className={cn(
                    'absolute inset-0 object-cover rounded-2xl',
                    !item.isEligible && 'opacity-20 cursor-not-allowed',
                    !item.hasMint && item.isEligible && 'cursor-pointer !opacity-80',
                  )}
                  alt=''
                />
                <div
                  className={cn(
                    'font-normal mr-2.5 absolute top-[10px] right-[10px] rounded-lg border-2 border-solid border-indigo-500 bg-zinc-900 px-2.5',
                    !item.hasMint && !item.isEligible && 'hidden',
                  )}
                >
                  {item.hasMint ? item.balance?.toString() : item.isEligible ? 'Mintable' : ''}
                </div>
              </div>
              {position === 0 && (
                <div className='mt-5 flex-col'>
                  <Bridge
                    mintNovaNft={mintNovaNft}
                    isMinting={isMinting}
                    fetchMemeNftBalances={fetchMemeNftBalances}
                    data={item}
                    sendDepositTx={sendDepositTx}
                    loading={loading}
                  />
                  <div className='mt-3 text-xs text-[#AAAAAA]'>
                    Deposit any amount of {item.coin?.toUpperCase() === 'OMNI2' ? 'OMNI' : item.coin?.toUpperCase()}{' '}
                    into Nova Network and mint your NOVA {item.chain}{' '}
                    {item.coin?.toUpperCase() === 'OMNI2' ? 'OMNI' : item.coin?.toUpperCase()}.
                  </div>
                </div>
              )}
            </motion.div>
          );
        })}
        <button
          onClick={() => handleMove(-1)}
          className='absolute -left-8 z-10 grid h-14 w-8 place-content-center text-3xl text-white transition-colors'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='h-6 w-6'
          >
            <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 19.5 8.25 12l7.5-7.5' />
          </svg>
        </button>
        <button
          onClick={() => handleMove(1)}
          className='absolute -right-8 z-10 grid h-14 w-8 place-content-center text-3xl text-white transition-colors'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='h-6 w-6'
          >
            <path strokeLinecap='round' strokeLinejoin='round' d='m8.25 4.5 7.5 7.5-7.5 7.5' />
          </svg>
        </button>
      </div>
    </div>
  );
}
