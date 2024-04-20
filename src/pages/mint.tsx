/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable tailwindcss/no-custom-classname */
import { checkMintEligibility } from 'constants/api';
import useMintNft from 'features/nft/hooks/useMemeNft';
import React, { useCallback, useMemo } from 'react';
import classNames from 'classnames';
import { useEffect } from 'react';
import { useAccount } from 'wagmi';
import { cn } from 'lib/utils';
import { Button } from 'components/ui/buttons/button';
import Bridge from 'components/bridge';
import Mint from 'components/mint-view';
import Merge from 'components/merge';
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
//http://3.114.68.110:8097/meme/check/address?address=0x9ff88A1f4f8b06C63e52724d1055e44acEFDa45a
const MemeAxisNftItem: React.FC<MemeAxisNftItemProps> = (item: any) => {
  const { type, balance, hasMint, isEligible } = item.data;
  return (
    <div className='card-container'>
      <div className='card'>
        <div className='card-inner'>
          <div className='card-front'>
            <div className='max-md:ml-0 max-md:w-full col-span-3 flex flex-col'>
              <div className='max-md:mt-6 relative flex w-full grow flex-col justify-center whitespace-nowrap rounded-2xl border-2 border-solid border-indigo-500 bg-zinc-900 text-right text-xl font-bold leading-6 tracking-normal text-white'>
                <div className='relative flex aspect-[0.93] w-full flex-col overflow-hidden pt-2.5'>
                  <img
                    src={`/assets/imgs/${type}.png`}
                    className={cn(
                      'absolute inset-0 object-cover',
                      !isEligible && 'opacity-20 cursor-not-allowed',
                      !hasMint && isEligible && 'cursor-pointer !opacity-80',
                    )}
                    alt=''
                  />
                  <div className='relative mr-4 items-center justify-center self-end rounded-lg border-2 border-solid border-indigo-500 bg-zinc-900 px-2.5'>
                    {!hasMint && isEligible ? 'Mintable' : balance?.toString()}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='card-back'>
            <div className='flex flex-col items-center gap-1 p-[20px]'>
              {/* <Bridge /> */}
              <img src={`/assets/imgs/${type}.png`} className='w-[80px]' alt='' />
              <div className='text-2xl font-bold text-white'>Foxy{/* {nft.name} */}</div>
              <div className='mb-3 flex gap-1 text-xs text-white'>
                0x5FBD....1566
                {/* {nft.address.substring(0,6)}....{nft.address.substring(nft.address.length-5,nft.address.length-1)} */}
                <img
                  src='/assets/copy.svg'
                  alt=''
                  className='mt-[3px] h-[9px] w-[9px] cursor-pointer'
                  // onClick={() => {
                  //   copyAddress(nft.address);
                  // }}
                />
                <img src='/assets/circle.svg' alt='' className='mt-[3px] h-[9px] w-[9px] cursor-pointer' />
                <img src='/assets/dexscreener.svg' alt='' className='mt-[3px] h-[9px] w-[9px] cursor-pointer' />
              </div>
              <div className='mb-2 text-[15px] text-slate-400'>
                Deposit 1 FOXY into Nova Network and mint your NOVA Linea Foxy.
              </div>
              <Bridge />
              <Mint />
              {/* <div className={classNames(false ? 'cursor-pointer backButton' : 'disabled')}>Approve</div> */}
            </div>
          </div>
          {/* <Button className='absolute inset-0' disabled={!isEligible}>
            {hasMint && 'Minted'} Mint {isEligible && 'Eligible to Mint'}
          </Button> */}
        </div>
      </div>
    </div>
  );
};

interface MemeNftGridProps {
  memeNftBalances: Array<{
    nft: {
      image: string;
      name: string;
      address: string;
    };
    balance: number;
  }>;
}
const MemeNftGrid: React.FC<MemeNftGridProps> = ({ memeNftBalances }) => {
  const { address } = useAccount();

  //mintRecord
  const fetchRes = async (_address: string) => {
    const res = await checkMintEligibility(_address);
    console.log(res.result, 'eligibility-res');
  };

  useEffect(() => {
    if (address) fetchRes(address);
  }, [address]);
  return (
    <div className='max-md:max-w-full relative mt-4 w-full md:mt-10'>
      <div className='max-md:flex-col max-md:gap-0 flex flex-wrap gap-5'>
        {memeNftBalances.map((item, index) => (
          <MemeAxisNftItem key={index} data={item} />
        ))}
      </div>
    </div>
  );
};

const Summon: React.FC = () => {
  return (
    <div className='max-md:max-w-full w-full'>
      <div className='max-md:mt-10 max-md:max-w-full max-md:text-4xl relative mb-5 mt-24 self-start text-5xl font-black leading-[56.16px] tracking-tight text-white'>
        Summon The Nova MEMECROSS
      </div>
      <div className='max-md:flex-col max-md:gap-0 flex gap-5'>
        <div className='max-md:ml-0 max-md:w-full flex w-[29%] flex-col'>
          <div className='max-md:mt-8 flex w-full grow flex-col justify-center rounded-2xl border-2 border-solid border-indigo-500 bg-zinc-900'>
            <img loading='lazy' srcSet='...' className='aspect-[0.93] w-full' alt='' />
          </div>
        </div>
        <div className='max-md:ml-0 max-md:w-full ml-5 flex w-[71%] flex-col'>
          <div className='max-md:mt-9 max-md:max-w-full mt-1.5 flex grow flex-col px-5'>
            <div className='max-md:max-w-full text-base leading-6 tracking-tight text-neutral-400'>
              Bridge any amount of the selected meme tokens to Nova chain, then you can mint a special NFT from Nova
              Meme NFTs. You will have different Nova Meme NFT because you bridge different meme coins. Bridge any
              amount of the selected meme tokens to Nova chain, then you can mint a special NFT from Nova Meme NFTs.
            </div>
            <div className='max-md:mt-10 mt-24 flex gap-2 self-start text-base leading-6 tracking-tight text-white'>
              <div className='my-auto flex-auto'>Select 5 NFT to Summon</div>
              <img loading='lazy' src='' className='aspect-square w-4 shrink-0 fill-white' alt='' />
            </div>
            <Merge />
            <div className='max-md:px-5 max-md:max-w-full mt-6 items-center justify-center rounded-lg bg-[linear-gradient(90deg,#6276E7_0%,#E884FE_100%)] px-2.5 py-1 text-2xl font-black leading-[56px] tracking-tight text-white'>
              Summon Now
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Page: React.FC = () => {
  const { memeNftBalances } = useMintNft();

  return (
    <section className='h-[calc(100vh-0px)] w-full overflow-auto bg-dunes bg-cover bg-center px-4 pb-[200px] md:px-40'>
      <div className='mx-auto max-w-[1200px]'>
        <div className='max-md:max-w-full relative flex grow flex-col tracking-tight md:pt-[100px]'>
          <div className='max-md:max-w-full text-3xl font-black leading-[56.16px] text-white md:text-5xl'>
            Mint MEME NFT on Nova
          </div>
          <div className='max-md:max-w-full text-sm leading-6 text-neutral-400 md:mt-8 md:text-base'>
            Bridge any amount of the selected meme tokens to Nova chain, then you can mint a special NFT from Nova Meme
            NFTs. You will have different Nova Meme NFT because you bridge different meme coins.
          </div>
        </div>
        <MemeNftGrid memeNftBalances={memeNftBalances} />
        <Summon />
      </div>
    </section>
  );
};

export default Page;
