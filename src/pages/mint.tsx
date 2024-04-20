import useMintNft from 'features/nft/hooks/useMintNft';
interface MemeAxisNftItemProps {
  nft: {
    image: string;
  };
  balance: number;
}



const MemeAxisNftItem: React.FC<MemeAxisNftItemProps> = ({ nft, balance, num }: any) => {
  console.log('MemeAxisNftItem:', nft, balance);
  return (
    <div className='max-md:ml-0 max-md:w-full col-span-3 flex flex-col' key={num}>
      <div className='max-md:mt-6 relative flex w-full grow flex-col justify-center whitespace-nowrap rounded-2xl border-2 border-solid border-indigo-500 bg-zinc-900 text-right text-xl font-bold leading-6 tracking-normal text-white'>
        <div className='relative flex aspect-[0.93] w-full flex-col overflow-hidden pt-2.5'>
          <img src={`/assets/imgs/${nft.type}.png`} className='absolute inset-0 object-cover' alt='' />
          <div className='max-md:mr-2.5 relative h-10 w-10 items-center justify-center self-end rounded-lg border-2 border-solid border-indigo-500 bg-zinc-900 px-2.5'>
            {balance.toString()}
          </div>
        </div>
      </div>
    </div>
  );
};

interface MemeNftGridProps {
  memeNftBalances: Array<{
    nft: {
      image: string;
    };
    balance: number;
  }>;
}

const MemeNftGrid: React.FC<MemeNftGridProps> = ({ memeNftBalances }) => {
  return (
    <div className='max-md:max-w-full relative mt-10 w-full'>
      <div className='max-md:flex-col max-md:gap-0 grid grid-cols-12 gap-5'>
        {memeNftBalances.map((item, index) => (
          <MemeAxisNftItem key={index} nft={item.nft} num={index} balance={item.balance} />
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
    <section className='h-[calc(100vh-0px)] w-full overflow-auto bg-dunes bg-cover bg-center pb-[200px]'>
      <div className='mx-auto max-w-[1200px]'>
        <div className='max-md:max-w-full relative flex grow flex-col pt-[100px] tracking-tight'>
          <div className='max-md:max-w-full max-md:text-4xl text-5xl font-black leading-[56.16px] text-white'>
            Mint MEME NFT on Nova
          </div>
          <div className='max-md:max-w-full mt-8 text-base leading-6 text-neutral-400'>
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
