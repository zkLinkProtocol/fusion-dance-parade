import { memoize } from 'lodash';
import { arbitrumSepolia } from 'viem/chains';
import { arbitrum, mainnet, sepolia } from 'wagmi/chains';
import { PLATFORM } from 'config/setting';

export enum Connector {
  Web3Auth = 'web3auth',
  Metamask = 'metaMask',
  Coinbase = 'coinbaseWallet',
  WalletConnect = 'walletConnect',
  WalletConnectLegacy = 'walletConnectLegacy',
  Ledger = 'ledger',
  Safe = 'safe',
  Injected = 'injected',
}

export const CHAINS = [mainnet, sepolia, arbitrum, arbitrumSepolia];

export enum ChainId {
  ETHEREUM = 1,
  ARBITRUM_ONE = 42161,
  ARBITRUM_SEPOLIA = 421614,
  SEPOLIA = 11155111,
}

export const chainNames: Record<ChainId, string> = {
  [ChainId.ETHEREUM]: 'eth',
  [ChainId.ARBITRUM_ONE]: 'arb',
  [ChainId.ARBITRUM_SEPOLIA]: 'arbSepolia',
  [ChainId.SEPOLIA]: 'sepolia',
};

export const chainNameToChainId = Object.entries(chainNames).reduce(
  (acc, [chainId, chainName]) => {
    return {
      [chainName]: chainId as unknown as ChainId,
      ...acc,
    };
  },
  {} as Record<string, ChainId>,
);

export const CHAIN_QUERY_NAME = chainNames;

const CHAIN_QUERY_NAME_TO_ID = Object.entries(CHAIN_QUERY_NAME).reduce(
  (acc, [chainId, chainName]) => {
    return {
      [chainName.toLowerCase()]: chainId as unknown as ChainId,
      ...acc,
    };
  },
  {} as Record<string, ChainId>,
);

export const getChainId = memoize((chainName: string) => {
  if (!chainName) return undefined;
  return CHAIN_QUERY_NAME_TO_ID[chainName.toLowerCase()] ? +CHAIN_QUERY_NAME_TO_ID[chainName.toLowerCase()] : undefined;
});

export const getWalletName = (id: string) => {
  switch (id) {
    case Connector.Metamask:
      return 'MetaMask';
    case Connector.WalletConnect:
      return 'WalletConnect';
    case Connector.WalletConnectLegacy:
      return 'WalletConnect';
    case Connector.Coinbase:
      return 'Coinbase Wallet';
    case Connector.Safe:
      return 'Gnosis Safe';
    case Connector.Ledger:
      return 'Ledger';
    case Connector.Injected:
      return 'OKX';
    default:
      break;
  }
};

export const connectorIdByName = {
  [Connector.Metamask]: 'metaMask',
  [Connector.WalletConnect]: 'walletConnect',
  [Connector.Coinbase]: 'coinbaseWallet',
  [Connector.Safe]: 'safe',
  // TODO: add Ledger connector
};

export const SCAN_URLS = {
  [ChainId.ETHEREUM]: 'https://etherscan.io',
  [ChainId.SEPOLIA]: 'https://sepolia.etherscan.io',
  [ChainId.ARBITRUM_ONE]: 'https://arbiscan.io',
  [ChainId.ARBITRUM_SEPOLIA]: 'https://sepolia.arbiscan.io/',
};

export interface Config {
  apiUrl: string;
}

export const API_ENDPOINT_URLS = {
  [ChainId.ETHEREUM]: 'https://staging-gw.openeden.com',
  [ChainId.SEPOLIA]: 'https://staging-gw.openeden.com',
  [ChainId.ARBITRUM_ONE]: 'https://staging-gw.openeden.com',
  [ChainId.ARBITRUM_SEPOLIA]: 'https://staging-gw.openeden.com',
};

export const LEVERAGE_API_ENDPOINT_URLS = {
  [ChainId.ETHEREUM]: '',
  [ChainId.SEPOLIA]: 'https://dev-lev-api.riverapp.io',
  [ChainId.ARBITRUM_ONE]: 'https://dev-lev-api.riverapp.io',
  [ChainId.ARBITRUM_SEPOLIA]: 'https://dev-lev-api.riverapp.io',
} satisfies Record<ChainId, string>;

export const PUBLIC_NODES = {
  [ChainId.ETHEREUM]: [
    process.env.NEXT_PUBLIC_NODE_PRODUCTION || '',
    'https://ethereum.publicnode.com',
    'https://eth.llamarpc.com',
    'https://cloudflare-eth.com',
  ].filter(Boolean),
  [ChainId.SEPOLIA]: [
    `https://eth-sepolia.g.alchemy.com/v2/${PLATFORM.ALCHEMY_RPC_ID}`,
    `https://sepolia.infura.io/v3/${PLATFORM.INFURA_RPC_ID}`,
  ].filter(Boolean),
  [ChainId.ARBITRUM_ONE]: [`https://arbitrum-mainnet.infura.io/v3/${PLATFORM.INFURA_RPC_ID}`].filter(Boolean),
  [ChainId.ARBITRUM_SEPOLIA]: [`https://arbitrum-sepolia.infura.io/v3/${PLATFORM.INFURA_RPC_ID}`].filter(Boolean),
} satisfies Record<ChainId, readonly string[]>;

export const LEVERAGE_SUBGRAPH_CLIENT_URLS = {
  [ChainId.ETHEREUM]: 'https://api.studio.thegraph.com/query/60646/leverage-subgraph/version/latest',
  [ChainId.SEPOLIA]: 'https://api.studio.thegraph.com/query/60646/leverage-subgraph/version/latest',
  [ChainId.ARBITRUM_ONE]: 'https://api.studio.thegraph.com/query/60646/leverage-subgraph/version/latest',
  [ChainId.ARBITRUM_SEPOLIA]: 'https://api.studio.thegraph.com/query/60646/leverage-subgraph/version/latest',
} satisfies Record<ChainId, string>;

export const SUBGRAPH_CLIENT_URLS = {
  [ChainId.ETHEREUM]: 'https://api.thegraph.com/subgraphs/name/river-fi/river',
  [ChainId.ARBITRUM_ONE]: 'https://api.thegraph.com/subgraphs/name/river-fi/river-arbitrum',
  [ChainId.ARBITRUM_SEPOLIA]: 'https://api.thegraph.com/subgraphs/name/yp010/river-arbsepolia',
  [ChainId.SEPOLIA]: 'https://api.thegraph.com/subgraphs/name/yp010/river-sepolia',
} satisfies Record<ChainId, string>;

export enum LEVERAGE_FACTOR_ENUM {
  TEN = 10,
  FIFTEEN = 15,
}

export const LEVERAGE_FACTOR_LISTS = {
  [LEVERAGE_FACTOR_ENUM.TEN]: 0.09,
  [LEVERAGE_FACTOR_ENUM.FIFTEEN]: 0.09333,
} satisfies Record<LEVERAGE_FACTOR_ENUM, number>;
