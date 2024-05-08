import { useMemo } from 'react';
import { cn } from 'lib/utils';
import Bridge from 'components/bridge';

import { shortenAddress } from 'utils/format';
import { useBridgeTx } from 'features/bridge/hooks/useBridge';
import { motion } from 'framer-motion';
import { useVerifyStore } from 'hooks/useVerifyStore';
import { useAccount } from 'wagmi';
import { usePreCheckTxStore } from 'hooks/usePreCheckTxStore';
import useNft from '../hooks/useNft';
import { EnhancedImg } from 'hoc/withImagePath';

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

interface NftItemProps {
  data: any;
}

const NftItem: React.FC<NftItemProps> = (item: any) => {
  const { address: walletAddr } = useAccount();
  const { mintNovaNft, isMinting, fetchMemeNftBalances } = useNft();
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
                  <EnhancedImg
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
              <EnhancedImg src={`/assets/imgs/${tokenId}.png`} className='w-[80px]' alt='' />
              <div className='text-2xl font-bold text-white'>{coin?.toUpperCase() === 'OMNI2' ? 'Omni' : coin}</div>
              <div className='mb-3 flex gap-1 text-xs text-white'>
                {shortenAddress(chainTokenAddress)}
                <EnhancedImg
                  src='/assets/copy.svg'
                  alt=''
                  className='mt-[3px] h-[9px] w-[9px] cursor-pointer'
                  onClick={() => {
                    copyAddress(chainTokenAddress);
                  }}
                />
              </div>
              <div className='mb-2 h-[70px] text-[15px] text-slate-400'>
                Deposit any amount of {coin?.toUpperCase() === 'OMNI2' ? 'OMNI' : coin?.toUpperCase()} into Nova Network
                and mint your NOVA {chain} {coin?.toUpperCase() === 'OMNI2' ? 'OMNI' : coin?.toUpperCase()}.
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

export default NftItem;
