import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from 'lib/utils';
import { Button } from 'components/ui/buttons/button';
import classNames from 'classnames';
import Bridge from 'components/bridge';

const IMAGES_DATA = [
  { id: 1, src: '/images/carousel/1.jpg' },
  { id: 2, src: '/images/carousel/2.jpg' },
  { id: 3, src: '/images/carousel/3.jpg' },
  { id: 4, src: '/images/carousel/4.jpg' },
  { id: 5, src: '/images/carousel/5.jpg' },
  { id: 6, src: '/images/carousel/6.jpg' },
  { id: 7, src: '/images/carousel/7.jpg' },
];

export default function Carousel({ lists }) {
  const [index, setIndex] = useState(0);
  const [list, setList] = useState(lists);

  const handleMove = (direction) => {
    // Create a shallow copy of the images array
    const imgArrCopy = [...list];

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
  console.log(list, 'list');
  return (
    <div className='block md:hidden'>
      <div className='relative mx-auto flex h-96 w-[90%] items-center justify-center md:hidden'>
        {list?.map((image, i) => {
          let position = 0;
          if (i === 0) {
            position = 0;
          } else if (i === 1) {
            position = 1;
          } else if (i === list.length - 1) {
            position = -1;
          } else {
            position = 2;
          }
          const imgLevel = position === 0 ? 'active' : position === -1 || position === 1 ? 'level1' : 'level2';
          return (
            <motion.div
              key={image.type}
              initial={false}
              className={`absolute left-1/2 aspect-[3/2] h-80 flex-none overflow-hidden rounded-2xl border border-solid border-indigo-500 bg-zinc-900 text-white shadow-md`}
              animate={imgLevel}
              custom={position}
              variants={variants}
              transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] }}
            >
              <img
                src={`/assets/imgs/${image.type}.png`}
                className={cn(
                  'absolute inset-0 object-cover rounded-2xl',
                  !image.isEligible && 'opacity-20 cursor-not-allowed',
                  !image.hasMint && image.isEligible && 'cursor-pointer !opacity-80',
                )}
                alt=''
              />
              <div
                className={cn(
                  'font-normal mr-2.5 absolute top-[10px] right-[10px] rounded-lg border-2 border-solid border-indigo-500 bg-zinc-900 px-2.5',
                  !image.hasMint && !image.isEligible && 'hidden',
                )}
              >
                {image.hasMint ? image.balance?.toString() : image.isEligible ? 'Mintable' : ''}
              </div>
            </motion.div>
          );
        })}
        <button
          onClick={() => handleMove(-1)}
          className='absolute -left-12 grid h-14 w-14 place-content-center text-3xl text-white transition-colors'
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
          className='absolute -right-12 grid h-14 w-14 place-content-center text-3xl text-white transition-colors'
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
      {/* <Bridge data={} /> */}
    </div>
  );
}
