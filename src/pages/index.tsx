import Modal from 'components/ui/modals/modal';
import VideoModal from 'components/ui/modals/video-modal';
import NftGrid from 'features/nft/components/nft-grid';
import Rules from 'features/nft/components/rules';
import Summon from 'features/nft/components/summon';

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
        <NftGrid />
        <Summon />
        <Rules />
      </div>
      <VideoModal />
      <Modal />
    </section>
  );
};

export default Page;
