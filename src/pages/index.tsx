/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable tailwindcss/no-custom-classname */
import { create } from 'zustand';
import useMemeNft, { useBatchBalancesStore } from '../features/nft/hooks/useMemeNft';
import { useMemo, useState } from 'react';
import { cn } from 'lib/utils';
import Bridge from 'components/bridge';
import Merge, { useMintLimitStore } from 'components/merge';
import Carousel from 'components/carousel';
import { shortenAddress } from 'utils/format';
import { Button } from 'components/ui/buttons/button';
import { useBridgeTx } from 'features/bridge/hooks/useBridge';

import { motion, AnimatePresence } from 'framer-motion';
import { useVerifyStore } from 'hooks/useVerifyStore';
import { useAccount } from 'wagmi';
import { usePreCheckTxStore } from 'hooks/usePreCheckTxStore';

const VideoModal = () => {
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
          className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75'
        >
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.8 }}
            transition={{ duration: 0.3 }}
            className='relative w-full'
          >
            <video autoPlay muted onEnded={handleVideoEnd} className='h-auto w-full'>
              <source src='/assets/videos/intro-video.mp4' type='video/mp4' />
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
// Define the stagger animation variant
const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (index) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: index * 0.1,
      duration: 0.5,
      ease: 'easeOut',
    },
  }),
};
interface MemeAxisNftItemProps {
  data: any;
}
const copyAddress = (address: string) => {
  navigator.clipboard
    .writeText(address)
    .then(() => {
      console.log('Text copied to clipboard: ' + address);
    })
    .catch((error) => {
      console.error('Unable to copy text to clipboard: ', error);
    });
};
const MemeAxisNftItem: React.FC<MemeAxisNftItemProps> = (item: any) => {
  const { address: walletAddr } = useAccount();
  const { mintNovaNft, isMinting, fetchMemeNftBalances } = useMemeNft();
  const { txhashes } = useVerifyStore();
  const { precheckTxhashes } = usePreCheckTxStore();
  const { sendDepositTx, loading } = useBridgeTx();
  const { tokenId, balance, hasMint, isEligible, coin, chainTokenAddress, chain } = item.data;
  const hasMatchingCoin = useMemo(() => {
    if (!walletAddr || !txhashes[walletAddr] || !!balance) return false;
    return txhashes[walletAddr]?.some((tx) => tx.coin === coin);
  }, [walletAddr, txhashes, coin, balance]);

  const hasPreTxPendingTx = useMemo(() => {
    if (!walletAddr || !precheckTxhashes[walletAddr]) return false;
    return precheckTxhashes[walletAddr]?.some((tx) => tx.coin === coin);
  }, [walletAddr, precheckTxhashes, coin]);
  // card-bcak loading style

  return (
    <motion.div
      className='card-container'
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.3 }}
    >
      <div className='card  h-[480px]'>
        <div
          className={cn('', hasMint ? 'disTranform' : 'card-inner', {
            'card-bcak': loading || isMinting || (hasMatchingCoin && !hasMint) || (hasPreTxPendingTx && !hasMint),
          })}
        >
          <div className='card-front card-wrapper'>
            <div className='card-content h-full w-full'>
              <div className='max-md:mt-6 relative flex h-full w-full grow flex-col justify-center whitespace-nowrap rounded-2xl bg-zinc-900 text-right text-xl font-bold leading-6 tracking-normal text-white'>
                <div className='relative flex aspect-[0.93] h-full w-full flex-col overflow-hidden rounded-2xl pt-2.5'>
                  <img
                    src={`/assets/imgs/${tokenId}.png`}
                    className={cn(
                      'absolute inset-0 object-cover rounded-2xl',
                      !isEligible && 'opacity-20 cursor-not-allowed',
                      !hasMint && isEligible && 'cursor-pointer !opacity-80',
                    )}
                    alt=''
                  />
                  <div
                    className={cn(
                      'font-normal mr-2.5 relative self-end rounded-lg border-2 border-solid border-indigo-500 bg-zinc-900 px-2.5',
                      !hasMint && !isEligible && 'hidden',
                    )}
                  >
                    {hasMint ? balance?.toString() : isEligible ? 'Mintable' : ''}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='card-back'>
            <div className='flex flex-col items-center gap-1 p-[20px]'>
              <img src={`/assets/imgs/${tokenId}.png`} className='w-[80px]' alt='' />
              <div className='text-2xl font-bold text-white'>{coin?.toUpperCase() === 'OMNI2' ? 'Omni' : coin}</div>
              <div className='mb-3 flex gap-1 text-xs text-white'>
                {shortenAddress(chainTokenAddress)}
                <img
                  src='/assets/copy.svg'
                  alt=''
                  className='mt-[3px] h-[9px] w-[9px] cursor-pointer'
                  onClick={() => {
                    copyAddress(chainTokenAddress);
                  }}
                />
                <img src='/assets/circle.svg' alt='' className='mt-[3px] h-[9px] w-[9px] cursor-pointer' />
                <img src='/assets/dexscreener.svg' alt='' className='mt-[3px] h-[9px] w-[9px] cursor-pointer' />
              </div>
              <div className='mb-2 h-[70px] text-[15px] text-slate-400'>
                Deposit 1 {coin?.toUpperCase() === 'OMNI2' ? 'OMNI' : coin?.toUpperCase()} into Nova Network and mint
                your NOVA {chain} {coin?.toUpperCase() === 'OMNI2' ? 'OMNI' : coin?.toUpperCase()}.
              </div>
              <Bridge
                mintNovaNft={mintNovaNft}
                isMinting={isMinting}
                fetchMemeNftBalances={fetchMemeNftBalances}
                data={item.data}
                sendDepositTx={sendDepositTx}
                loading={loading}
              />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
interface MemeNftGridProps {}
const MemeNftGrid: React.FC<MemeNftGridProps> = () => {
  const { batchBalances } = useBatchBalancesStore();
  return (
    <motion.div className='max-md:max-w-full relative mt-4 w-full md:mt-10' initial='hidden' animate='visible'>
      <motion.div className='max-md:flex-col max-md:gap-0 hidden flex-wrap gap-5 md:flex'>
        {batchBalances.map((item, index) => (
          <motion.div key={index} custom={index} variants={cardVariants}>
            <MemeAxisNftItem data={item} />
          </motion.div>
        ))}
      </motion.div>
      <Carousel lists={batchBalances}></Carousel>
    </motion.div>
  );
};

const Summon: React.FC = () => {
  const { mintLimit } = useMintLimitStore();
  return (
    <div className='max-md:max-w-full mt-[120px] w-full md:mt-0'>
      <div className='max-md:mt-10 max-md:max-w-full relative mb-5 mt-6 self-start text-2xl font-black leading-[56.16px] tracking-tight text-white md:mt-24 md:text-5xl'>
        Merge and Create your Chad
      </div>
      <div className='max-md:flex-col flex flex-col gap-1 md:flex-row md:gap-5'>
        <div className='max-md:ml-0 max-md:w-full max-md:order-2 flex w-full flex-col md:w-[29%]'>
          <div className='mt-4 flex w-full grow flex-col rounded-2xl md:mt-0 md:justify-center md:border-2 md:border-solid md:border-indigo-500 md:bg-zinc-900'>
            <img loading='lazy' src='/assets/imgs/chad.png' className='aspect-[0.93] w-full' alt='' />
          </div>
        </div>
        <div className='max-md:ml-0 max-md:w-full max-md:order-1 ml-1 flex w-full flex-col md:ml-5 md:w-[71%]'>
          <div className='max-md:mt-9 max-md:max-w-full mt-1.5 flex grow flex-col px-1 md:px-5'>
            <div className='max-md:max-w-full text-base leading-6 tracking-tight text-neutral-400'>
              Gather all the memes, cat, doge, frog, hat to create the ultimate fused (merged) warrior (gigaChad).
            </div>
            <div className='max-md:mt-10 mb-4 mt-6 flex gap-2 self-start text-base leading-6 tracking-tight text-white md:mt-24'>
              <div className='my-auto flex-auto'>Select {mintLimit} NFT to Summon</div>
            </div>
            <Merge />
          </div>
        </div>
      </div>
    </div>
  );
};

const Rules: React.FC = () => {
  return (
    <div className='max-md:max-w-full w-full'>
      <div className='max-md:mt-10 max-md:max-w-full relative mb-5 mt-24 self-start text-2xl  font-black leading-[56.16px] tracking-tight text-white md:text-5xl'>
        Rules
      </div>
      <div className='w-full rounded-lg bg-slate-900 p-8 text-left text-sm text-slate-400'>
        1. Connect your wallet and check your whitelist eligibility.
        <br /> <br />
        2. If you have whitelist qualifications, you can transfer any amount of corresponding meme coins across the
        chain to Nova and mint your "Infinity Stones" NFTs. <br /> <br />
        3. Collect or mint some different "Infinity Stones" NFTs, then merge your "Chad" NFT. The amount of "Infinity
        Stones" NFTs required to merge "Chad" NFT will increase based on the amount of "Chad" NFT that has been merged.
        <br />
        <br />
        4. Bonus：We have a total of “Chad” NFTs and 10,000 Mystery boxes. Users who mint “Chad” NFT and bridges 0.1ETH/
        equivalent to Nova during the course of the campaign will guaranteed a mystery box.
        <br />
        <br />
        5. Recreate “Chad” campaign: Join our community, create and vote for your ideal “Chad” Meme. We will mint the
        most popular Chad meme in the community, and replace all “Chad” NFT with new “Chad” NFT. <br />
        <br />
        Notice: An address can only get at most 1 mystery box. If you want to collect or sell "Chad" NFT or Infinity
        Stones, just trade it on Alienswap. Time: 1st May- 29th May 2024 <br />
        <br />
        zkLink reserved all the rights for this campaign
      </div>
    </div>
  );
};
const Page: React.FC = () => {
  return (
    <section className='h-[calc(100vh-0px)] w-full overflow-auto bg-dunes bg-cover bg-center px-4 pb-[200px] md:px-40'>
      <div className='mx-auto max-w-[1200px]'>
        <div className='max-md:max-w-full relative flex grow flex-col tracking-tight md:pt-[100px]'>
          <div className='max-md:max-w-full text-2xl font-black leading-[56.16px] text-white md:text-5xl'>
            Mint your Nova Infinity Stones
          </div>
          <div className='max-md:max-w-full text-sm leading-6 text-neutral-400 md:mt-8 md:text-base'>
            My brave holders, bridge any amount of the selected meme tokens to Nova, then bright your Nova Infinity
            Stones!
          </div>
        </div>
        <MemeNftGrid />
        <Summon />
        <Rules />
        <Model />
      </div>
      <VideoModal />
    </section>
  );
};

export const useModalStore = create((set) => ({
  isOpen: false,
  toggleModal: () => set((state) => ({ isOpen: !state.isOpen })),
}));

const Model: React.FC = () => {
  const { isOpen, toggleModal } = useModalStore();
  return (
    <div className={cn(!isOpen && '!hidden', 'w-full h-full mask z-50')}>
      <div className='flex flex-col items-center rounded-2xl bg-black p-8'>
        <div className='mb-2 text-center text-5xl font-bold text-white'>Congratulations</div>
        <div className='mb-6 text-center text-2xl text-white'>You’ve summoned</div>
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
export default Page;
