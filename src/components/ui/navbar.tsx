import { ConnectButton, useAccountModal, useChainModal, useConnectModal } from '@rainbow-me/rainbowkit';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAccount } from 'wagmi';
import { cn } from 'lib/utils';

// import { logo as Logo } from 'components/svgs';
import { Button } from 'components/ui/buttons/button';
import { showAccount } from 'utils/format';
import Image from 'next/image';

export const Navbar = () => {
  const { address, isConnected } = useAccount();
  const { openConnectModal } = useConnectModal();
  const { openAccountModal } = useAccountModal();
  const { openChainModal } = useChainModal();
  return (
    <div className='sticky flex flex-col items-center bg-transparent px-4 md:px-14'>
      <div className='max-md:flex-wrap flex w-full justify-between gap-5 py-3 font-medium'>
        <div className='max-md:max-w-full max-md:flex-wrap my-auto flex items-center gap-5 whitespace-nowrap text-base leading-6 text-slate-500'>
          <Link href='/'>
            <Image src='/assets/imgs/nova-logo.png' alt='logo' width={150} height={50} />
          </Link>
        </div>
        <div className='flex justify-between gap-5 px-5 text-center text-lg leading-5'>
          {/* <HeaderNetworkSelector networks={SUPPORTED_CHAIN_IDS} /> */}
          <ConnectButton.Custom>
            {({ chain }) => (
              <Button
                className='flex items-center justify-center bg-[#1D4138] px-4 text-[#03D498] md:gap-3'
                onClick={() => {
                  if (chain?.unsupported) {
                    openChainModal?.();
                  } else if (isConnected && address) {
                    openAccountModal?.();
                  } else {
                    openConnectModal?.();
                  }
                }}
              >
                <div className={`text-[#03d498] ${isConnected ? 'ml-2 md:ml-0' : ''}`}>
                  {isConnected ? showAccount(address) : <span className=''>Connect Wallet</span>}
                </div>
              </Button>
            )}
          </ConnectButton.Custom>
        </div>
      </div>
    </div>
  );
};
