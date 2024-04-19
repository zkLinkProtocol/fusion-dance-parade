import { ChainId } from 'config/chain';
import { useBreakpoint, useIsMounted } from 'hooks/common';
import type { FC } from 'react';
import { shortenAddress } from 'utils/format';
import { useAccount, useEnsAvatar, useEnsName } from 'wagmi';

import { ConnectView } from './connect-view';
import { Button } from './ui/buttons/button';
import { ConnectButton } from './ui/buttons/connect-btn';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
interface ProfileProps {
  networks: ChainId[];
}

export const UserProfile: FC<ProfileProps> = () => {
  const isMounted = useIsMounted();
  const { isSm } = useBreakpoint('sm');
  // const [view, setView] = useState<ProfileView>(ProfileView.Default)
  const { address, chain, isConnected } = useAccount();

  const { data: name } = useEnsName({
    chainId: ChainId.ETHEREUM,
    address,
  });

  const { data: avatar } = useEnsAvatar({
    name: name || undefined,
    chainId: ChainId.ETHEREUM,
  });

  const chainId = (chain?.id as ChainId) || ChainId.ETHEREUM;

  if (!address || !isMounted) return <ConnectButton variant='secondary' />;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant='secondary' className='text-white'>
          {
            avatar ? <img alt='ens-avatar' src={avatar} width={20} height={20} className='rounded-full' /> : null
            // <JazzIcon diameter={20} address={address} />
          }
          <span>{shortenAddress(address, isSm ? 3 : 2)}</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-80' onOpenAutoFocus={(e) => e.preventDefault()}>
        {!isConnected && <ConnectView onSelect={close} />}
        {/* {view === ProfileView.Default && address && (
          <DefaultView chainId={chainId} address={address} setView={setView} />
        )}
        {view === ProfileView.Settings && <SettingsView setView={setView} />}
        {view === ProfileView.Transactions && address && <TransactionsView setView={setView} address={address} />} */}
      </PopoverContent>
    </Popover>
  );
};
