import Merge, { useMintLimitStore } from 'components/merge';
import { EnhancedImg } from 'hoc/withImagePath';

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
            <EnhancedImg loading='lazy' src='/assets/imgs/chad.png' className='aspect-[0.93] w-full' alt='' />
          </div>
        </div>
        <div className='max-md:ml-0 max-md:w-full max-md:order-1 ml-1 flex w-full flex-col md:ml-5 md:w-[71%]'>
          <div className='max-md:mt-9 max-md:max-w-full mt-1.5 flex grow flex-col px-1 md:px-5'>
            <div className='max-md:max-w-full text-base leading-6 tracking-tight text-neutral-400'>
              Gather all the memes, cat, doge, frog, hat to create the ultimate fused (merged) warrior (gigaChad).
            </div>
            <div className='max-md:mt-10 mb-4 mt-6 flex gap-2 self-start text-base leading-6 tracking-tight text-white md:mt-24'>
              <div className='my-auto flex-auto'>Select {mintLimit !== null ? mintLimit : 0} NFT to Summon</div>
            </div>
            <Merge />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Summon;
