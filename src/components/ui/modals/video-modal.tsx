import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAssetPath } from 'hoc/withImagePath';

const VideoModal = () => {
  const getAssetPath = useAssetPath();
  const [isOpen, setIsOpen] = useState(true);

  const handleVideoEnd = () => {
    setIsOpen(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className='fixed inset-0 z-50 hidden items-center justify-center bg-black bg-opacity-75 sm:flex'
        >
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.8 }}
            transition={{ duration: 0.3 }}
            className='relative w-full'
          >
            <video autoPlay muted playsInline onEnded={handleVideoEnd} className='h-auto w-full'>
              <source src={getAssetPath('/assets/videos/intro-video.mp4')} type='video/mp4' />
            </video>
            <button onClick={() => setIsOpen(false)} className='absolute right-4 top-4 text-2xl font-bold text-white'>
              &times;
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default VideoModal;
