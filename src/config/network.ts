import type { Chain } from '@wagmi/core/chains';
import type { Address } from 'viem';

import { l1Networks } from './zklin-networks';
import { Token } from 'types/token';

export type L1Network = Chain;
export type ZkSyncNetwork = {
  id: number;
  key: string;
  name: string;
  rpcUrl: string;
  hidden?: boolean; // If set to true, the network will not be shown in the network selector
  l1Network?: L1Network;
  blockExplorerUrl?: string;
  blockExplorerApi?: string;
  withdrawalFinalizerApi?: string;
  logoUrl?: string;
  displaySettings?: {
    showPartnerLinks?: boolean;
  };
  mainContract?: Address;
  erc20BridgeL1?: Address;
  erc20BridgeL2?: Address;
  l1Gateway?: Address;
  isEthGasToken?: boolean;
  getTokens?: () => Token[] | Promise<Token[]>; // If blockExplorerApi is specified, tokens will be fetched from there. Otherwise, this function will be used.
};
export const zkSyncNetworks: ZkSyncNetwork[] = [
  {
    id: 324,
    key: 'mainnet',
    name: 'zkSync',
    rpcUrl: 'https://mainnet.era.zksync.io',
    blockExplorerUrl: 'https://explorer.zksync.io',
    blockExplorerApi: 'https://block-explorer-api.mainnet.zksync.io',
    withdrawalFinalizerApi: 'https://withdrawal-finalizer-api.zksync.io',
    displaySettings: {
      showPartnerLinks: true,
    },
    l1Network: l1Networks.mainnet,
  },
  {
    id: 300,
    key: 'sepolia',
    name: 'zkSync Sepolia Testnet',
    rpcUrl: 'https://sepolia.era.zksync.dev',
    blockExplorerUrl: 'https://sepolia.explorer.zksync.io',
    blockExplorerApi: 'https://block-explorer-api.sepolia.zksync.dev',
    withdrawalFinalizerApi: 'https://withdrawal-finalizer-api.sepolia.zksync.dev',
    displaySettings: {
      showPartnerLinks: true,
    },
    l1Network: l1Networks.sepolia,
  },
  {
    id: 280,
    key: 'goerli',
    name: 'zkSync Goerli Testnet',
    rpcUrl: 'https://testnet.era.zksync.dev',
    blockExplorerUrl: 'https://goerli.explorer.zksync.io',
    blockExplorerApi: 'https://block-explorer-api.testnets.zksync.dev',
    withdrawalFinalizerApi: 'https://withdrawal-finalizer-api.testnets.zksync.dev',
    displaySettings: {
      showPartnerLinks: true,
    },
    l1Network: l1Networks.goerli,
  },
  {
    id: 270,
    key: 'stage',
    name: 'zkSync Stage',
    rpcUrl: 'https://z2-dev-api.zksync.dev',
    blockExplorerUrl: 'https://goerli-beta.staging-scan-v2.zksync.dev',
    blockExplorerApi: 'https://block-explorer-api.stage.zksync.dev',
    withdrawalFinalizerApi: 'https://withdrawal-finalizer-api.stage.zksync.dev',
    l1Network: l1Networks.sepolia,
    hidden: true,
  },
];
