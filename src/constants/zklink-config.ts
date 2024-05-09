import { nodeType, PRIMARY_CHAIN_KEY } from 'config/zklink-networks';

export const STORAGE_NETWORK_KEY = 'STORAGE_NETWORK_KEY';

export const STORAGE_VERIFY_TX_KEY = 'STORAGE_VERIFY_TX_KEY';

export const STORAGE_PRE_VERIFY_TX_KEY = 'STORAGE_PRE_VERIFY_TX_KEY';

export const ETH_ADDRESS = '0x0000000000000000000000000000000000000000';

export const L2_ETH_TOKEN_ADDRESS = '0x000000000000000000000000000000000000800a';
//import.meta.env.VITE_NODE_TYPE

export const WRAPPED_MNT =
  nodeType === 'nexus-goerli'
    ? '0xEa12Be2389c2254bAaD383c6eD1fa1e15202b52A'
    : '0x78c1b0C915c4FAA5FffA6CAbf0219DA63d7f4cb8';

export const NOVA_CHAIN_ID = (() => {
  switch (nodeType) {
    case 'nexus':
      return 810180;
    case 'nexus-sepolia':
      return 810181;
    default:
      return 810182;
  }
})();
//NovaInfinityStonesNFT #1155
export const MEME_NFT_CONTRACT = (() => {
  switch (nodeType) {
    case 'nexus':
      return '0xbE0ba296db7aE8E64A7addc444B8BE251cdcea66';
    case 'nexus-sepolia':
      return '0xDBBD57f02DdbC9f1e2B80D8DAcfEC34BC8B287e3';
    default:
      return '0xDBBD57f02DdbC9f1e2B80D8DAcfEC34BC8B287e3';
  }
})();

//NovaChadNFT #721
export const MEME_COMPOSE_NFT_CONTRACT = (() => {
  switch (nodeType) {
    case 'nexus':
      return '0x1631D495B8cF799B760D228bd5A602be5CdC439D';
    case 'nexus-sepolia':
      return '0x3da9282234509DCBE15e4113078DA32f8bE6eDF2';
    default:
      return '0x3da9282234509DCBE15e4113078DA32f8bE6eDF2';
  }
})();

export const NOVA_NFT_CONTRACT =
  nodeType === 'nexus-goerli'
    ? '0x3E4E2F5f1AFce2b048C73bd2C17C361997066716'
    : '0xE310c6595205252C73e9044f6740BA8775bf0Da0';

export const TRADEMARK_NFT_CONTRACT =
  nodeType === 'nexus-goerli'
    ? '0xA594bF8Ec851a7c58a348DF81Bb311cE0BCAD5C4'
    : '0xDeEDf09C48E1284b59f8e7DC4e1fd45243002615';

export const WETH_CONTRACT = nodeType === 'nexus-goerli' ? '' : '0x8280a4e7D5B3B658ec4580d3Bc30f5e50454F169';

export const NOVA_START_TIME = 1710410400000; //1710410400000;

export const NexusEstimateArrivalTimes: Record<string, number> = {
  ethereum: 12.8,
  [PRIMARY_CHAIN_KEY]: 1,
  arbitrum: 1,
  zksync: 1,
  manta: 1,
  mantle: 1,
  blast: 1,
  optimism: 1,
  base: 1,
};

export const NexusGoerliEstimateArrivalTimes = {};

export const IS_MAINNET = nodeType === 'nexus';

export const TWEET_SHARE_TEXT = 'ZkLink Nova Campaign blablablablabla';

export const TRADEMARK_NFT_MARKET_URL =
  'https://alienswap.xyz/collection/zklink-nova/0xdeedf09c48e1284b59f8e7dc4e1fd45243002615';

export const LYNKS_NFT_MARKET_URL = 'https://alienswap.xyz/collection/zklink-nova/nova-lynks-fe69';

export const MYSTERYBOX_NFT_MARKET_URL = 'https://alienswap.xyz/collection/zklink-nova/nova-mystery-box-ac81';

export const enum MintStatus {
  Minting = 'Minting',
  Failed = 'Failed',
  Success = 'Success',
}

export const PUFFER_TOKEN_ADDRESS = '0xdd6105865380984716C6B2a1591F9643e6ED1C48';
