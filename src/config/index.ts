import { connectorsForWallets } from '@rainbow-me/rainbowkit';
import {
  gateWallet,
  injectedWallet,
  metaMaskWallet,
  okxWallet,
  walletConnectWallet,
} from '@rainbow-me/rainbowkit/wallets';
import { cookieStorage, createConfig, createStorage, http } from 'wagmi';
import type { Writeable } from 'zod';

import { BinanceWallet } from 'constants/wallet/binanceWallet';

import { ChainId } from './chain';
import { publicTransports } from './viem';
import { publicWagmiConfig } from './wagmi';
import { projectId } from './zklin-networks';

const metadata = {
  name: 'zkLink Nova App',
  description: 'zkLink Nova App - Aggregated Layer 3 zkEVM network Aggregation Parade',
  url: 'https://app.zklink.io',
  icons: ['../../public/img/favicon.png'],
};
okxWallet({
  projectId,
  walletConnectParameters: {
    metadata,
  },
});
BinanceWallet({
  projectId,
  walletConnectParameters: {
    metadata,
  },
});
gateWallet({
  projectId,
  walletConnectParameters: {
    metadata,
  },
});
injectedWallet();
metaMaskWallet({
  projectId,
});
walletConnectWallet({
  projectId,
  options: {
    metadata,
  },
});
const connectors = connectorsForWallets(
  [
    {
      groupName: 'Recommended',
      wallets: [injectedWallet, metaMaskWallet, walletConnectWallet, okxWallet, BinanceWallet],
    },
  ],
  {
    appName: 'zklink Nova App',
    projectId: projectId,
  },
);

export const DEFAULT_POLLING_INTERVAL = 4_000;

// Allow for custom polling intervals for each chain with a default
const pollingInterval = new Proxy(
  {
    [ChainId.ETHEREUM]: 8000, // BT is 12s
    [ChainId.POLYGON_ZKEVM]: 8000, // BT is 13s
    [ChainId.FILECOIN]: 20000, // BT is 30s
  } as Partial<Record<ChainId, number>>,
  {
    get: (target, name) => {
      return Object.hasOwn(target, name) ? target[Number(name) as keyof typeof target] : DEFAULT_POLLING_INTERVAL;
    },
  },
);

export const createProductionConfig = () => {
  const transports = Object.entries(publicTransports).reduce(
    (acc, [chainId, transport]) => {
      const transportUrl = transport({ chain: undefined }).value?.url!;

      acc[Number(chainId) as ChainId] = http(transportUrl, {
        onFetchResponse(_res) {
          if (typeof window !== 'undefined' && transportUrl.includes('drpc')) {
            let fallback = 'undefined';
            if (typeof window.isFallback !== 'undefined') {
              fallback = window.isFallback ? 'true' : 'false';
            }

            // gtagEvent('drpc-response', {
            //   pathname: window.location.pathname,
            //   href: window.location.href,
            //   fallback,
            //   chainId,
            // })
          }
        },
      });
      return acc;
    },
    {} as Writeable<typeof publicTransports>,
  );

  return createConfig({
    ...publicWagmiConfig,
    transports,
    pollingInterval,
    connectors,
    multiInjectedProviderDiscovery: true,
    storage: createStorage({
      storage: cookieStorage,
    }),
    ssr: true,
  });
};

export const config = createProductionConfig();
