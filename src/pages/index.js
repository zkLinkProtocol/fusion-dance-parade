import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from 'lib/utils';
import { Button } from 'components/ui/buttons/button';
import classNames from 'classnames';

const IMAGES_DATA = [
  { id: 1, src: '/images/carousel/1.jpg' },
  { id: 2, src: '/images/carousel/2.jpg' },
  { id: 3, src: '/images/carousel/3.jpg' },
  { id: 4, src: '/images/carousel/4.jpg' },
  { id: 5, src: '/images/carousel/5.jpg' },
  { id: 6, src: '/images/carousel/6.jpg' },
  { id: 7, src: '/images/carousel/7.jpg' },
];

export default function Carousel({list}) {
    console.log(list)
  const [index, setIndex] = useState(0);
  const [images, setImages] = useState(IMAGES_DATA);

  const handleMove = direction => {
    // Create a shallow copy of the images array
    const imgArrCopy = [...images];

    // If Next Click -> ie handleMove(1)
    if (direction > 0) {
      // Grab the first item in the array
      const firstItem = imgArrCopy.shift();
      // If firstItem returns false
      if (!firstItem) return;
      // Add the first item to the end of the array
      imgArrCopy.push({ ...firstItem, id: Math.random() });
      // Update the images array
      setImages(imgArrCopy);
    } else {
      // Grab the last item in the array
      const lastItem = imgArrCopy.pop();
      // Add the last item to the beginning of the array
      imgArrCopy.unshift({ ...lastItem, id: Math.random() });
      // Update the images array
      setImages(imgArrCopy);
    }
    console.log('images', images);
  };

  const variants = {
    active: {
      x: 'calc(-50% + 0px)',
      width: '22rem',
      scale: 1.1,
      opacity: 1,
    },
    level1: (position) => ({
      x: `calc(-50% + ${position * 240}px)`,
      width: '3rem',
      scale: 0.9,
      opacity: 1,
    }),
    level2: (position) => ({
      x: `calc(-50% + ${position * 145}px)`,
      width: '2rem',
      scale: 0.75,
      opacity: 1,
    }),
    level3: (position) => ({
      x: `calc(-50% + ${position * 108}px)`,
      width: '1.5rem',
      scale: 0.5,
      opacity: 1,
    }),
    level4: (position) => ({
      x: `calc(-50% + ${position * 90}px)`,
      width: 0,
      scale: 0.25,
      opacity: 0,
    })
  };


  return (
    <div className="relative h-96 w-[90%] mx-auto items-center flex justify-center">
      {images.map((image, i) => {
        let position = 0;

        if (images.length % 2) {
          position = i - (images.length + 1) / 2;
        } else {
          position = i - images.length / 2;
        }

        let imgLevel =
          position === 0
          ? "active"
          : position === -1 || position === 1
          ? "level1"
          : position === -2 || position === 2
          ? "level2"
          : position === -3 || position === 3
          ? "level3"
          : "level4";
        console.log(list)
        console.log(i)
        console.log(list[0])
        return (
          <motion.div
            key={image.id}
            initial={false}
            className={`absolute left-1/2 flex-none aspect-[3/2] text-white rounded-3xl overflow-hidden h-60 border border-neutral-200 dark:border-neutral-700 shadow-md`}
            animate={imgLevel}
            custom={position}
            variants={variants}
            transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] }}
          >
            {image.src}
            {i}
            
          </motion.div>
        );
      })}
        <button
          onClick={() => handleMove(-1)}
          className="grid h-14 w-14 place-content-center text-3xl transition-colors  hover:text-sky-500 absolute -left-6"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5 8.25 12l7.5-7.5"
            />
          </svg>
        </button>
        <button
          onClick={() => handleMove(1)}
          className="grid h-14 w-14 place-content-center text-3xl transition-colors  hover:text-sky-500 absolute -right-6"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m8.25 4.5 7.5 7.5-7.5 7.5"
            />
          </svg>
        </button>
    </div>
  );
}