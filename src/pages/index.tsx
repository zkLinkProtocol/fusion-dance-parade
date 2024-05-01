/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable tailwindcss/no-custom-classname */
import useMemeNft, { useBatchBalancesStore } from '../features/nft/hooks/useMemeNft';
import { useMemo } from 'react';
import { cn } from 'lib/utils';
import Bridge from 'components/bridge';
import Carousel from 'components/carousel';
import { shortenAddress } from 'utils/format';
import { useBridgeTx } from 'features/bridge/hooks/useBridge';

import { motion } from 'framer-motion';
import { useVerifyStore } from 'hooks/useVerifyStore';
import { useAccount } from 'wagmi';
import { usePreCheckTxStore } from 'hooks/usePreCheckTxStore';
import Modal from 'components/ui/modals/modal';
import VideoModal from 'components/ui/modals/video-modal';
import Rules from 'features/nft/components/rules';
import Summon from 'features/nft/components/summon';

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
        <Modal />
      </div>
      <VideoModal />
    </section>
  );
};

export default Page;
