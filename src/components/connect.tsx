import { useIsMounted } from 'hooks/common';
import type { FC } from 'react';
import { useAccount } from 'wagmi';

import type { ButtonProps } from './ui/buttons/button';
import { Button } from './ui/buttons/button';
import { ConnectButton } from './ui/buttons/connect-btn';
import { Dots } from './ui/dots';

const Connect: FC<ButtonProps> = ({ children, fullWidth = true, size = 'xl', ...props }) => {
  const isMounted = useIsMounted();

  const { isDisconnected, isConnecting, isReconnecting } = useAccount();

  if (!isMounted)
    return (
      <Button fullWidth={fullWidth} size={size} {...props}>
        <div className='h-[1ch]' />
      </Button>
    );

  if (isConnecting || isReconnecting) {
    return (
      <Button fullWidth={fullWidth} size={size} disabled {...props}>
        <Dots>Checking Wallet</Dots>
      </Button>
    );
  }

  if (isDisconnected)
    return (
      <ConnectButton fullWidth={fullWidth} size={size} {...props}>
        Connect Wallet
      </ConnectButton>
    );

  return <>{children}</>;
};

export { Connect };
