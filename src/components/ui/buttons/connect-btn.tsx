import { ChevronDoubleDownIcon } from '@heroicons/react/24/outline';
import { FrameIcon } from 'lucide-react';
import Link from 'next/link';
import type { FC } from 'react';
import React, { useCallback, useMemo } from 'react';
import { useConnect } from 'wagmi';

import type { ButtonProps } from './button';
import { Button } from './button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../dropdown-menu';
import {
  CoinbaseWalletIcon,
  GnosisSafeIcon,
  LedgerIcon,
  MetamaskIcon,
  RabbyIcon,
  TrustWalletIcon,
  WalletConnectIcon,
  XDEFIWalletIcon,
} from '../icons';

const Icons: Record<string, React.ElementType> = {
  Injected: ChevronDoubleDownIcon,
  MetaMask: MetamaskIcon,
  'Trust Wallet': TrustWalletIcon,
  WalletConnect: WalletConnectIcon,
  WalletConnectLegacy: WalletConnectIcon,
  'Coinbase Wallet': CoinbaseWalletIcon,
  Safe: GnosisSafeIcon,
  Rabby: RabbyIcon,
  Frame: FrameIcon,
  Ledger: LedgerIcon,
  'XDEFI Wallet': XDEFIWalletIcon,
};

export const ConnectButton: FC<ButtonProps> = ({ children: _children, ...props }) => {
  const { connectors, connect, pending } = useConnect();

  const onSelect = useCallback(
    (connectorId: string) => {
      const connector = connectors.find((el) => el.id === connectorId);

      if (!connector) throw new Error('Connector not found');

      return connect({
        connector,
      });
    },
    [connect, connectors],
  );

  const _connectors = useMemo(() => {
    const conns = [...connectors];

    console.log('conns', conns);

    const injected = conns.find((el) => el.id === 'injected');

    if (injected) {
      return [injected, ...conns.filter((el) => el.id !== 'injected' && el.name !== injected.name)];
    }

    return conns;
  }, [connectors]);

  // Pending confirmation state
  // Awaiting wallet confirmation
  if (pending) {
    return (
      <Button loading {...props}>
        Authorize Wallet
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button {...props} testId='connect'>
          <span className='hidden sm:block'>Connect Wallet</span>
          <span className='block sm:hidden'>Connect</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-56'>
        <DropdownMenuGroup>
          {_connectors.map((connector) => {
            const Icon = connector.name in Icons ? Icons[connector.name] : Icons.Injected;
            return (
              <DropdownMenuItem onClick={() => onSelect(connector.id)} key={connector.id}>
                <Icon className='mr-2 h-4 w-4' />
                {connector.name === 'Safe'
                  ? 'Gnosis Safe'
                  : connector.name === 'WalletConnectLegacy'
                  ? 'WalletConnect'
                  : connector.name}
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuGroup>
        <DropdownMenuGroup>
          <div className='px-2 py-1 text-justify text-xs text-neutral-800 dark:text-neutral-400'>
            <span>{`Connecting a wallet means you accept Sushi Labs' `}</span>
            <Link href='/terms-of-service' className='font-semibold hover:text-neutral-500' target='_blank'>
              Terms
            </Link>
            <span>{` and `}</span>
            <Link href='/privacy-policy' className='font-semibold hover:text-neutral-500' target='_blank'>
              Privacy Policy
            </Link>
            <span>{`. (03.26.2024)`}</span>
          </div>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
