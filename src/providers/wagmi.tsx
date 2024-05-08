import { type FC, type ReactNode } from 'react';
import { WagmiProvider } from 'wagmi';
import { wagmiDefaultConfig } from 'config/zklink-networks';

export const WagmiConfig: FC<{ children: ReactNode }> = ({ children }) => {
  return <WagmiProvider config={wagmiDefaultConfig}>{children}</WagmiProvider>;
};
