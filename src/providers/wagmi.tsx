import { type FC, type ReactNode, useMemo } from 'react';
import { WagmiProvider } from 'wagmi';

import { createProductionConfig } from '../config';
import { createTestConfig } from '../config/test';
import type { PublicWagmiConfig } from '../config/wagmi';

const isTest = process.env.NEXT_PUBLIC_APP_ENV === 'test';

export const WagmiConfig: FC<{ children: ReactNode }> = ({ children }) => {
  const config = useMemo(() => {
    if (isTest) {
      return createTestConfig() as unknown as PublicWagmiConfig;
    }
    return createProductionConfig();
  }, []);

  return <WagmiProvider config={config}>{children}</WagmiProvider>;
};
