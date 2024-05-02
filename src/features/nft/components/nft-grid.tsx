import { useBatchBalancesStore } from '../hooks/useNft';
import { motion } from 'framer-motion';
import NftItem from './nft-item';
import Carousel from 'components/carousel';

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: index * 0.1,
      duration: 0.5,
      ease: 'easeOut',
    },
  }),
};
const NftGrid: React.FC = () => {
  const { batchBalances } = useBatchBalancesStore();
  return (
    <motion.div className='max-md:max-w-full relative mt-4 w-full md:mt-10' initial='hidden' animate='visible'>
      <motion.div className='max-md:flex-col max-md:gap-0 hidden flex-wrap gap-5 md:flex'>
        {batchBalances.map((item, index) => (
          <motion.div key={index} custom={index} variants={cardVariants}>
            <NftItem data={item} />
          </motion.div>
        ))}
      </motion.div>
      <Carousel lists={batchBalances}></Carousel>
    </motion.div>
  );
};

export default NftGrid;
