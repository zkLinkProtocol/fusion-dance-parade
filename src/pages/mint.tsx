import { checkMintEligibility } from 'constants/api';
import useMintNft from 'features/nft/hooks/useMintNft';
import React, { useCallback, useMemo } from 'react';
import classNames from 'classnames';
import { useEffect } from 'react';
import { useAccount } from 'wagmi';
import { cn } from 'lib/utils';
import { Button } from 'components/ui/buttons/button';
interface MemeAxisNftItemProps {
  data: any;
}
const copyAddress = (address:string)=>{
  navigator.clipboard.writeText(address)
    .then(() => {
      console.log('Text copied to clipboard: ' + address);
    })
    .catch((error) => {
      console.error('Unable to copy text to clipboard: ', error);
    });
}
//http://3.114.68.110:8097/meme/check/address?address=0x9ff88A1f4f8b06C63e52724d1055e44acEFDa45a
const MemeAxisNftItem: React.FC<MemeAxisNftItemProps> = (item: any) => {
  const { type, balance, hasMint, isEligible } = item.data;
  console.log(item, 'item');
  return (
    <div className="card-container">
      <div className="card">
        <div className="card-inner">
          <div className="card-front">
            <div className='max-md:ml-0 max-md:w-full col-span-3 flex flex-col'>
              <div className='max-md:mt-6 relative flex w-full grow flex-col justify-center whitespace-nowrap rounded-2xl border-2 border-solid border-indigo-500 bg-zinc-900 text-right text-xl font-bold leading-6 tracking-normal text-white'>
                <div className='relative flex aspect-[0.93] w-full flex-col overflow-hidden pt-2.5'>
                <img
                    src={`/assets/imgs/${type}.png`}
                    className={cn('absolute inset-0 object-cover', hasMint && 'opacity-20 cursor-not-allowed')}
                    alt=''
                  />
                  <div className='max-md:mr-2.5 relative h-10 w-10 items-center justify-center self-end rounded-lg border-2 border-solid border-indigo-500 bg-zinc-900 px-2.5'>
                    {balance?.toString()}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <div className="card-back">
            <div className='flex flex-col items-center p-[20px] gap-1'>
              <img src={nft.image} className='w-[80px]' alt='' />
              <div className='text-white text-2xl font-bold'>
                {nft.name}
              </div>
              <div className='text-white text-xs flex gap-1 mb-3'>
                {nft.address.substring(0,6)}....{nft.address.substring(nft.address.length-5,nft.address.length-1)}
                <img src="/assets/copy.svg" alt="" className='w-[9px] h-[9px] mt-[3px] cursor-pointer' onClick={()=>{copyAddress(nft.address)}}/>
                <img src="/assets/circle.svg" alt="" className='w-[9px] h-[9px] mt-[3px] cursor-pointer'/>
                <img src="/assets/dexscreener.svg" alt="" className='w-[9px] h-[9px] mt-[3px] cursor-pointer'/>
              </div>
              <div className='text-slate-400 text-[15px] mb-2'>Deposit 1 FOXY into Nova Network and mint your NOVA Linea Foxy.</div>
              <div className={classNames(false ? 'cursor-pointer backButton' : 'disabled')}>Approve</div>
              
            </div>
          </div> */}
          {hasMint && 'Minted'}
          {isEligible && 'Eligible to Mint'}
          <Button className='absolute inset-0' disabled={!isEligible}>
            Mint
          </Button>
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
  // const test = [
  //   {
  //     chain: 'Base',
  //     coin: 'Omni',
  //   },
  //   {
  //     chain: 'Linea',
  //     coin: 'Foxy',
  //   },
  //   {
  //     chain: 'Base',
  //     coin: 'Degen',
  //   },
  //   {
  //     chain: 'Base',
  //     coin: 'Brett',
  //   },
  //   {
  //     chain: 'ZkSync',
  //     coin: 'Meow',
  //   },
  //   {
  //     chain: 'Arbitrum',
  //     coin: 'AIdoge',
  //   },
  //   {
  //     chain: 'Arbitrum',
  //     coin: 'Omni',
  //   },
  // ];
  // const test2 = [
  //   {
  //     balance: 0n,
  //     tokenId: '1',
  //     nft: {
  //       name: 'Nova Booster Phase II - 50',
  //       description: 'The zkLink Nova Booster Phase II NFT',
  //       image: 'https://ipfs.io/ipfs/QmfJEDNsdPzBh5yXZfD1Yezgj1TKFTmKt3akxJDXwL1ffW/+50.png',
  //       type: '1',
  //     },
  //   },
  // ];

  function assignTokenIds(memeNfts, objectArray) {
    return objectArray.map((obj) => {
      const matchingNft = memeNfts.find((nft) => nft.name === `${obj.chain}-${obj.coin}`);
      if (matchingNft) {
        return {
          ...obj,
          tokenId: matchingNft.tokenId,
        };
      }
      return obj;
    });
  }

  // Usage
  const test_intro = [
    { chain: 'Base', coin: 'Omni' },
    { chain: 'Linea', coin: 'Foxy' },
    { chain: 'Base', coin: 'Degen' },
    { chain: 'Base', coin: 'Brett' },
    { chain: 'ZkSync', coin: 'Meow' },
    { chain: 'Arbitrum', coin: 'AIdoge' },
    { chain: 'Arbitrum', coin: 'Omni' },
  ];

  // const shit = [
  //   {
  //     balance: 1n,
  //     description: 'The zkLink Nova Booster Phase II NFT',
  //     hasMint: true,
  //     image: 'https://ipfs.io/ipfs/QmfJEDNsdPzBh5yXZfD1Yezgj1TKFTmKt3akxJDXwL1ffW/+1000.png',
  //     name: 'Nova Booster Phase II - 1000',
  //     tokenId: '7',
  //     type: 7,
  //   },
  // ];

  const memeNftBalances_intro = [
    {
      name: 'Linea-Foxy',
      address: '0x5FBDF89403270a1846F5ae7D113A989F850d1566',
      tokenId: '1',
      balance: 0,
      nft: null,
    },
    {
      name: 'Base-Degen',
      address: '0x4ed4E862860beD51a9570b96d89aF5E1B0Efefed',
      tokenId: '2',
      balance: 0,
      nft: null,
    },
    {
      name: 'Base-Brett',
      address: '0x532f27101965dd16442E59d40670FaF5eBB142E4',
      tokenId: '3',
      balance: 0,
      nft: null,
    },
    {
      name: 'Base-Omni',
      address: '0xC48E605c7b722a57277e087a6170B9E227e5AC0A',
      tokenId: '4',
      balance: 0,
      nft: null,
    },
    {
      name: 'ZkSync-Meow',
      address: '0x79db8c67d0c33203da4Efb58F7D325E1e0d4d692',
      tokenId: '5',
      balance: 0,
      nft: null,
    },
    {
      name: 'Arbitrum-AIdoge',
      address: '0x09E18590E8f76b6Cf471b3cd75fE1A1a9D2B2c2b',
      tokenId: '6',
      balance: 0,
      nft: null,
    },
    {
      name: 'Arbitrum-Omni',
      address: '0x9e20461bc2c4c980f62f1B279D71734207a6A356',
      tokenId: '7',
      balance: 0,
      nft: null,
    },
  ];

  const updatedTest = assignTokenIds(memeNftBalances_intro, test_intro);
  console.log(updatedTest, 'updatedTest');

  // const test5 = [
  //   {
  //     balance: 0n,
  //     tokenId: '1',
  //     nft: {
  //       name: 'Nova Booster Phase II - 50',
  //       description: 'The zkLink Nova Booster Phase II NFT',
  //       image: 'https://ipfs.io/ipfs/QmfJEDNsdPzBh5yXZfD1Yezgj1TKFTmKt3akxJDXwL1ffW/+50.png',
  //       type: '1',
  //     },
  //   },
  // ];

  //mintRecord

  useEffect(() => {
    if (address) fetchRes(address);
  }, [address]);
  return (
    <div className='max-md:max-w-full relative md:mt-10 mt-4 w-full'>
      <div className='max-md:flex-col max-md:gap-0 flex gap-5 flex-wrap'>
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
            <div className='mt-5 flex gap-5 self-start'>
              <img loading='lazy' srcSet='...' className='aspect-[0.93] w-[72px] shrink-0' alt='' />
              <img loading='lazy' srcSet='...' className='aspect-[0.93] w-[72px] shrink-0' alt='' />
              <img loading='lazy' srcSet='...' className='aspect-[0.93] w-[72px] shrink-0' alt='' />
              <img loading='lazy' srcSet='...' className='aspect-[0.93] w-[72px] shrink-0' alt='' />
            </div>
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
    <section className='h-[calc(100vh-0px)] w-full overflow-auto bg-dunes bg-cover bg-center pb-[200px] md:px-[10rem] px-[1rem]'>
      <div className='mx-auto max-w-[1200px]'>
        <div className='max-md:max-w-full relative flex grow flex-col md:pt-[100px] tracking-tight'>
          <div className='max-md:max-w-full text-3xl md:text-5xl font-black leading-[56.16px] text-white'>
            Mint MEME NFT on Nova
          </div>
          <div className='max-md:max-w-full md:mt-8 md:text-base text-sm leading-6 text-neutral-400'>
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
