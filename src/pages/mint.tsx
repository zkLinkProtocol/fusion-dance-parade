/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable tailwindcss/no-custom-classname */
import { checkMintEligibility } from 'constants/api';
import useMintNft from '../features/nft/hooks/useMemeNft';
import { useEffect } from 'react';
import { useAccount } from 'wagmi';
import { cn } from 'lib/utils';
import Bridge from 'components/bridge';
import Merge from 'components/merge';
import Carousel from 'components/carousel';
import { shortenAddress } from 'utils/format';

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
  const { tokenId, balance, hasMint, isEligible, coin, chainTokenAddress } = item.data;
  console.log(item.data, 'item-data');
  return (
    <div className='card-container'>
      <div className='card'>
        <div className={cn(hasMint ? 'disTranform' : 'card-inner')}>
          <div className='card-front'>
            <div className='h-full w-full'>
              <div className='max-md:mt-6 relative flex h-full w-full grow flex-col justify-center whitespace-nowrap rounded-2xl border-2 border-solid border-indigo-500 bg-zinc-900 text-right text-xl font-bold leading-6 tracking-normal text-white'>
                <div className='relative flex aspect-[0.93] h-full w-full flex-col overflow-hidden pt-2.5'>
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
              <div className='text-2xl font-bold text-white'>{coin}</div>
              <div className='mb-3 flex gap-1 text-xs text-white'>
                {shortenAddress(chainTokenAddress)}
                {/* {nft.address.substring(0,6)}....{nft.address.substring(nft.address.length-5,nft.address.length-1)} */}
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
              <div className='mb-2 text-[15px] text-slate-400'>
                Deposit 1 FOXY into Nova Network and mint your NOVA Linea Foxy.
              </div>
              <Bridge data={item.data} />
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
      <div className='max-md:flex-col max-md:gap-0 hidden flex-wrap gap-5 md:flex'>
        {memeNftBalances.map((item, index) => (
          <MemeAxisNftItem key={index} data={item} />
        ))}
      </div>
      <Carousel lists={memeNftBalances}></Carousel>
    </div>
  );
};

const Summon: React.FC = () => {
  return (
    <div className='max-md:max-w-full w-full'>
      <div className='max-md:mt-10 max-md:max-w-full relative mb-5 mt-6 self-start text-2xl font-black leading-[56.16px] tracking-tight text-white md:mt-24 md:text-5xl'>
        Summon The Nova MEMECROSS
      </div>
      <div className='max-md:flex-col flex gap-1 md:gap-5'>
        <div className='max-md:ml-0 max-md:w-full flex w-2/5 flex-col md:w-[29%]'>
          <div className='max-md:mt-8 flex w-full grow flex-col justify-center rounded-2xl bg-zinc-900 md:border-2 md:border-solid md:border-indigo-500'>
            <img loading='lazy' src='/assets/ball.svg' className='aspect-[0.93] w-full' alt='' />
          </div>
        </div>
        <div className='max-md:ml-0 max-md:w-full ml-1 flex w-3/5 flex-col md:ml-5 md:w-[71%]'>
          <div className='max-md:mt-9 max-md:max-w-full mt-1.5 flex grow flex-col px-1 md:px-5'>
            <div className='max-md:max-w-full text-base leading-6 tracking-tight text-neutral-400'>
              Bridge any amount of the selected meme tokens to Nova chain, then you can mint a special NFT from Nova
              Meme NFTs. You will have different Nova Meme NFT because you bridge different meme coins.
            </div>
            <div className='max-md:mt-10 mb-4 mt-6 flex gap-2 self-start text-base leading-6 tracking-tight text-white md:mt-24'>
              <div className='my-auto flex-auto'>Select 2 NFT to Summon</div>
              <img loading='lazy' src='/assets/Shape.svg' className='aspect-square w-4 shrink-0 fill-white' alt='' />
            </div>
            <Merge />
            {/* <div className='max-md:px-5 max-md:max-w-full mt-6 items-center justify-center rounded-lg bg-[linear-gradient(90deg,#6276E7_0%,#E884FE_100%)] px-2.5 py-1 text-2xl font-black leading-[56px] tracking-tight text-white'>
              Summon Now
            </div> */}
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
      <div className='w-full rounded-lg bg-slate-900 p-8 text-sm text-slate-400'>
        Upon collecting your SBT, you can upgrade it into an ERC7221 NFT through collecting 4 different types of
        trademark NFT through our referral program.  You will get a trademark NFT airdrop for each 3 referrals Top 50 on
        the referral leader-board will be airdrop a Mystery Box. Upon collecting your SBT, you can upgrade it into an
        ERC7221 NFT through collecting 4 different types of trademark NFT through our referral program.  You will get a
        trademark NFT airdrop for each 3 referrals Top 50 on the referral leader-board will be airdrop a Mystery Box.
        Upon collecting your SBT, you can upgrade it into an ERC7221 NFT through collecting 4 different types of
        trademark NFT through our referral program.  You will get a trademark NFT airdrop for each 3 referrals Top 50 on
        the referral leader-board will be airdrop a Mystery Box.
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
          <div className='max-md:max-w-full text-2xl font-black leading-[56.16px] text-white md:text-5xl'>
            Mint MEME NFT on Nova
          </div>
          <div className='max-md:max-w-full text-sm leading-6 text-neutral-400 md:mt-8 md:text-base'>
            Bridge any amount of the selected meme tokens to Nova chain, then you can mint a special NFT from Nova Meme
            NFTs. You will have different Nova Meme NFT because you bridge different meme coins.
          </div>
        </div>
        <MemeNftGrid memeNftBalances={memeNftBalances} />
        <Summon />
        <Rules />
      </div>
    </section>
  );
};

export default Page;
