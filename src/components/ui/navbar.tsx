import { ConnectButton, useAccountModal, useChainModal, useConnectModal } from '@rainbow-me/rainbowkit';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAccount } from 'wagmi';
import { cn } from 'lib/utils';

import { logo as Logo } from 'components/svgs';
import { Button } from 'components/ui/buttons/button';
import { SUPPORTED_CHAIN_IDS } from 'constants/evm';
import { showAccount } from 'utils/format';
import { HeaderNetworkSelector } from 'components/header-network-selector';

export const Navbar = () => {
  const { address, isConnected } = useAccount();
  const { openConnectModal } = useConnectModal();
  const { openAccountModal } = useAccountModal();
  const { openChainModal } = useChainModal();
  const router = useRouter();
  return (
    <div className='sticky flex flex-col items-center bg-transparent px-14'>
      <div className='max-md:flex-wrap flex w-full justify-between gap-5 py-3 font-medium'>
        <div className='max-md:max-w-full max-md:flex-wrap my-auto flex items-center gap-5 whitespace-nowrap text-base leading-6 text-slate-500'>
          <Link href='/'>
            <Logo className='flex aspect-[3.7] w-[150px] shrink-0' />
          </Link>
          <div className='max-md:flex-wrap my-auto flex flex-auto items-center gap-7 px-5'>
            <Link className={cn('grow',router.pathname==='/' ? 'text-white' : 'text-zinc-500')} href='/'>
              Overview
            </Link>
            <Link className={cn(router.pathname==='/mint' ? 'text-white' : 'text-zinc-500')} href='/mint'>
              Mint
            </Link>
          </div>
        </div>
        <div className='flex justify-between gap-5 px-5 text-center text-lg leading-5'>
          <HeaderNetworkSelector networks={SUPPORTED_CHAIN_IDS} />
          <ConnectButton.Custom>
            {({ chain }) => (
              <Button
                className='padX btn-default flex items-center justify-center text-white md:gap-3 md:bg-[#1D4138] md:px-4 md:text-[#03D498]'
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
                <div className={`text-white md:text-[#03d498] ${isConnected ? 'ml-2 md:ml-0' : ''}`}>
                  {isConnected ? showAccount(address) : <span className='hidden md:block'>Connect Wallet</span>}
                </div>
              </Button>
            )}
          </ConnectButton.Custom>
        </div>
      </div>
    </div>
  );
};
