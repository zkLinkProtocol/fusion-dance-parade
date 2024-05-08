import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { connectorsForWallets } from '@rainbow-me/rainbowkit';
import {
  gateWallet,
  injectedWallet,
  metaMaskWallet,
  okxWallet,
  rabbyWallet,
  walletConnectWallet,
} from '@rainbow-me/rainbowkit/wallets';
import type { Chain } from '@wagmi/core/chains';
import {
  arbitrum,
  arbitrumSepolia,
  base,
  goerli,
  linea,
  lineaTestnet,
  mainnet,
  manta,
  mantaTestnet,
  mantle,
  mantleTestnet,
  optimism,
  sepolia,
  zkSync,
  zkSyncSepoliaTestnet,
} from '@wagmi/core/chains';
import { BinanceWallet } from 'constants/wallet/binanceWallet';
import Hyperchains from 'hyperchains/config.json';
import type { Token } from 'types/token';
import { createClient } from 'viem';
import { defineChain } from 'viem';
import { baseSepolia, blastSepolia, lineaGoerli, lineaSepolia, optimismSepolia } from 'viem/chains';
import { createConfig, http } from 'wagmi';
import { walletConnect } from 'wagmi/connectors';

import type { ZkSyncNetwork } from './network';

export const mantaSepolia = /*#__PURE__*/ defineChain({
  id: 3441006,
  name: 'Manta Pacific Sepolia Testnet',
  network: 'manta-sepolia',
  nativeCurrency: {
    decimals: 18,
    name: 'ETH',
    symbol: 'ETH',
  },
  rpcUrls: {
    default: { http: ['https://pacific-rpc.sepolia-testnet.manta.network/http'] },
  },
  blockExplorers: {
    default: {
      name: 'Manta Pacific Sepolia',
      url: 'https://pacific-explorer.sepolia-testnet.manta.network',
    },
  },
  contracts: {
    multicall3: {
      address: '0x5Be4F807e0ae836Fc754dDEDDd72c0F4A28C8d43',
      blockCreated: 468626,
    },
  },
  contracts: {
    multicall3: {
      address: '0xcA11bde05977b3631167028862bE2a173976CA11',
      blockCreated: 212929,
    },
  },
});

const sourceId = 1; // mainnet

export const blast = /*#__PURE__*/ defineChain({
  id: 81457,
  name: 'Blast',
  nativeCurrency: {
    decimals: 18,
    name: 'Ether',
    symbol: 'ETH',
  },
  rpcUrls: {
    default: { http: ['https://rpc.blast.io'] },
  },
  blockExplorers: {
    default: { name: 'Blastscan', url: 'https://blastscan.io' },
  },
  contracts: {
    multicall3: {
      address: '0xcA11bde05977b3631167028862bE2a173976CA11',
      blockCreated: 212929,
    },
  },
  sourceId,
});

export const l1Networks = {
  mainnet: {
    ...mainnet,
    name: 'Ethereum',
    network: 'mainnet',
  },
  goerli: {
    ...goerli,
    name: 'Ethereum Goerli Testnet',
  },
  sepolia: {
    ...sepolia,
    name: 'Ethereum Sepolia Testnet',
  },
  linea: {
    ...linea,
    name: 'Linea Mainnet',
  },
  lineaGoerliTestnet: {
    ...lineaGoerli,
    name: 'Linea Goerli Testnet',
  },
  lineaSepoliaTestnet: {
    ...lineaSepolia,
    name: 'Linea Sepolia Testnet',
  },
  mantle: {
    ...mantle,
    name: 'Mantle Mainnet',
  },
  mantleGoerliTestnet: {
    ...mantleTestnet,
    name: 'Mantle Goerli Testnet',
  },
  manta: {
    ...manta,
    name: 'Manta Mainnet',
  },
  mantaGoerliTestnet: {
    ...mantaTestnet,
    name: 'Manta Goerli Testnet',
  },
  mantaSepoliaTestnet: {
    ...mantaSepolia,
    name: 'Manta Sepolia Testnet',
  },
  arbitrum: {
    ...arbitrum,
    name: 'Arbitrum Mainnet',
  },
  arbitrumSepolia: {
    ...arbitrumSepolia,
    name: 'Arbitrum Sepolia Testnet',
    blockExplorers: {
      default: {
        name: 'Arbiscan',
        url: 'https://sepolia.arbiscan.io',
      },
    },
  },
  zkSync: {
    ...zkSync,
    name: 'zkSync Mainnet',
  },
  zkSyncSepoliaTestnet: {
    ...zkSyncSepoliaTestnet,
    name: 'zkSync Sepolia Testnet',
  },
  blast: {
    ...blast,
    name: 'Blast Mainnet',
  },
  blastSepoliaTestnet: {
    ...blastSepolia,
    name: 'Blast Sepolia Testnet',
  },
  optimism: {
    ...optimism,
    name: 'Optimism Mainnet',
  },
  optimismSepoliaTestnet: {
    ...optimismSepolia,
    name: 'Optimism Sepolia Testnet',
  },
  base: {
    ...base,
    name: 'Base Mainnet',
  },
  baseSepoliaTestnet: {
    ...baseSepolia,
    name: 'Base Sepolia Testnet',
  },
} as const;
export type L1Network = Chain;

export const PRIMARY_CHAIN_KEY = 'primary';
export const nexusNode: ZkSyncNetwork[] = [
  {
    id: 810180,
    key: 'ethereum',
    name: 'zkLink Nova',
    rpcUrl: 'https://rpc.zklink.io',
    logoUrl: '/img/ethereum.svg',
    blockExplorerUrl: 'https://explorer.zklink.io',
    blockExplorerApi: 'https://explorer-api.zklink.io',
    withdrawalFinalizerApi: 'https://withdrawal-api.zklink.io',
    mainContract: '0x5fD9F73286b7E8683Bab45019C94553b93e015Cf',
    erc20BridgeL1: '0xAd16eDCF7DEB7e90096A259c81269d811544B6B6',
    erc20BridgeL2: '0x36CaABbAbfB9C09B722d9C3697C3Cb4A93650ea7',
    l1Gateway: '0x83Bc7394738A7A084081aF22EEC0051908c0055c',
    isEthGasToken: true,
    l1Network: l1Networks.mainnet,
  },
  {
    id: 810180,
    key: PRIMARY_CHAIN_KEY, //"primary"
    name: 'zkLink Nova',
    rpcUrl: 'https://rpc.zklink.io',
    logoUrl: '/img/linea.svg',
    blockExplorerUrl: 'https://explorer.zklink.io',
    blockExplorerApi: 'https://explorer-api.zklink.io',
    withdrawalFinalizerApi: 'https://withdrawal-api.zklink.io',
    mainContract: '0x5Cb18b6e4e6F3b46Ce646b0f4704D53724C5Df05',
    erc20BridgeL1: '0x62cE247f34dc316f93D3830e4Bf10959FCe630f8',
    erc20BridgeL2: '0x01c3f51294494e350AD69B999Db6B382b3B510b9',
    isEthGasToken: true,
    l1Network: l1Networks.linea,
  },
  {
    id: 810180,
    key: 'zksync',
    name: 'zkLink Nova',
    rpcUrl: 'https://rpc.zklink.io',
    logoUrl: '/img/zksync.svg',
    blockExplorerUrl: 'https://explorer.zklink.io',
    blockExplorerApi: 'https://explorer-api.zklink.io',
    withdrawalFinalizerApi: 'https://withdrawal-api.zklink.io',
    mainContract: '0xaFe8C7Cf33eD0fee179DFF20ae174C660883273A',
    erc20BridgeL1: '0xaB3DDB86072a35d74beD49AA0f9210098ebf2D08',
    erc20BridgeL2: '0x7187DB8AB8F65450a74dD40474bE778CF468C44a',
    l1Gateway: '0xeCD189e0f390826E137496a4e4a23ACf76c942Ab',
    isEthGasToken: true,
    l1Network: l1Networks.zkSync,
  },
  {
    id: 810180,
    key: 'arbitrum',
    name: 'zkLink Nova',
    rpcUrl: 'https://rpc.zklink.io',
    logoUrl: '/img/arbitrum-arb-logo.svg',
    blockExplorerUrl: 'https://explorer.zklink.io',
    blockExplorerApi: 'https://explorer-api.zklink.io',
    withdrawalFinalizerApi: 'https://withdrawal-api.zklink.io',
    mainContract: '0xFF73a1a1d27951A005eb23276dc99CB7F8d5420A',
    erc20BridgeL1: '0xfB0Ad0B3C2605A7CA33d6badd0C685E11b8F5585',
    erc20BridgeL2: '0x6B7551DBbaE2fb728cF851baee5c3A52DF6F60a4',
    l1Gateway: '0x273D59aed2d793167c162E64b9162154B07583C0',
    isEthGasToken: true,
    l1Network: l1Networks.arbitrum,
  },
  // {
  //   id: 810180,
  //   key: 'mantle',
  //   name: 'zkLink Nova',
  //   rpcUrl: 'https://rpc.zklink.io',
  //   logoUrl: '/img/mantle.svg',
  //   blockExplorerUrl: 'https://explorer.zklink.io',
  //   blockExplorerApi: 'https://explorer-api.zklink.io',
  //   withdrawalFinalizerApi: 'https://withdrawal-api.zklink.io',
  //   mainContract: '0xD784d7128B46B60Ca7d8BdC17dCEC94917455657',
  //   erc20BridgeL1: '0x62351b47e060c61868Ab7E05920Cb42bD9A5f2B2',
  //   erc20BridgeL2: '0x321Ce902eDFC6466B224ce5D9A7Bc16858855272',
  //   l1Gateway: '0xdE1Ce751405Fe6D836349226EEdCDFFE1C3BE269',
  //   isEthGasToken: false,
  //   l1Network: l1Networks.mantle,
  // },
  // {
  //   id: 810180,
  //   key: 'manta',
  //   name: 'zkLink Nova',
  //   rpcUrl: 'https://rpc.zklink.io',
  //   logoUrl: '/img/manta.jpg',
  //   blockExplorerUrl: 'https://explorer.zklink.io',
  //   blockExplorerApi: 'https://explorer-api.zklink.io',
  //   withdrawalFinalizerApi: 'https://withdrawal-api.zklink.io',
  //   mainContract: '0xD784d7128B46B60Ca7d8BdC17dCEC94917455657',
  //   erc20BridgeL1: '0x44a65dc12865A1e5249b45b4868f32b0E37168FF',
  //   erc20BridgeL2: '0xa898E175CfDE9C6ABfCF5948eEfBA1B852eE5B09',
  //   l1Gateway: '0x649Dfa2c4d09D877419fA1eDC4005BfbEF7CD82D',
  //   isEthGasToken: true,
  //   l1Network: l1Networks.manta,
  // },
  // {
  //   id: 810180,
  //   key: 'blast',
  //   name: 'zkLink Nova',
  //   rpcUrl: 'https://rpc.zklink.io',
  //   logoUrl: '/img/blast.svg',
  //   blockExplorerUrl: 'https://explorer.zklink.io',
  //   blockExplorerApi: 'https://explorer-api.zklink.io',
  //   withdrawalFinalizerApi: 'https://withdrawal-api.zklink.io',
  //   mainContract: '0x29BA92Fe724beD5c5EBfd0099F2F64a6DC5078FD',
  //   erc20BridgeL1: '0x8Df0c2bA3916bF4789c50dEc5A79b2fc719F500b',
  //   erc20BridgeL2: '0x17887788E01A1192a26F636Cfcfc033c7Bb42348',
  //   l1Gateway: '0x41FaF46Ca4Dfd912B65B66D29BdD432782BB1158',
  //   isEthGasToken: true,
  //   l1Network: l1Networks.blast,
  // },
  // {
  //   id: 810180,
  //   key: 'optimism',
  //   name: 'zkLink Nova',
  //   rpcUrl: 'https://rpc.zklink.io',
  //   logoUrl: '/img/optimism.svg',
  //   blockExplorerUrl: 'https://explorer.zklink.io',
  //   blockExplorerApi: 'https://explorer-api.zklink.io',
  //   withdrawalFinalizerApi: 'https://withdrawal-api.zklink.io',
  //   mainContract: '0x46C8D02E93d5a03899dFa7Cf8A40A07589A3fA1b',
  //   erc20BridgeL1: '0x5Bd51296423A9079b931414C1De65e7057326EaA',
  //   erc20BridgeL2: '0x6aAdaA7Bf9F5283cAF3eb2E40573D1A4d02C8B15',
  //   l1Gateway: '0x668e8F67adB8219e1816C2E5bBEa055A78AF3026',
  //   isEthGasToken: true,
  //   l1Network: l1Networks.optimism,
  // },
  {
    id: 810180,
    key: 'base',
    name: 'zkLink Nova',
    rpcUrl: 'https://rpc.zklink.io',
    logoUrl: '/img/base.svg',
    blockExplorerUrl: 'https://explorer.zklink.io',
    blockExplorerApi: 'https://explorer-api.zklink.io',
    withdrawalFinalizerApi: 'https://withdrawal-api.zklink.io',
    mainContract: '0xE473ce141b1416Fe526eb63Cf7433b7B8d7264Dd',
    erc20BridgeL1: '0x80d12A78EfE7604F00ed07aB2f16F643301674D5',
    erc20BridgeL2: '0xa03248B029b4e348F156f4b1d93CB433a4e1361e',
    l1Gateway: '0x4eEA93966AA5cd658225E0D43b665A5a491d2b7E',
    isEthGasToken: true,
    l1Network: l1Networks.base,
  },
];

export const nexusSepoliaNode: ZkSyncNetwork[] = [
  {
    id: 810181,
    key: 'sepolia',
    name: 'zkLink Nova Testnet',
    rpcUrl: 'https://sepolia.rpc.zklink.io',
    logoUrl: '/img/ethereum.svg',
    blockExplorerUrl: 'https://sepolia.explorer.zklink.io',
    blockExplorerApi: 'https://sepolia.explorer-api.zklink.io',
    withdrawalFinalizerApi: 'https://sepolia.withdrawal-api.zklink.io',
    mainContract: '0x9719cD314BBf84B18aAEDEF56DF88E2267aA01e3',
    erc20BridgeL1: '0x63e059BDEDeA829c22EfA31CbaDb9bea5E86c3Cd',
    erc20BridgeL2: '0xcc43208B28B1eC25F000EfC0D2c2aF044715F888',
    l1Gateway: '0xc6EbbD78E8f81626Bc62570f3C5949221F87b3Ee',
    isEthGasToken: true,
    l1Network: l1Networks.sepolia,
  },
  {
    id: 810181,
    key: PRIMARY_CHAIN_KEY, //"primary"
    name: 'zkLink Nova Testnet',
    rpcUrl: 'https://sepolia.rpc.zklink.io',
    logoUrl: '/img/linea.svg',
    blockExplorerUrl: 'https://sepolia.explorer.zklink.io',
    blockExplorerApi: 'https://sepolia.explorer-api.zklink.io',
    withdrawalFinalizerApi: 'https://sepolia.withdrawal-api.zklink.io',
    mainContract: '0x16393A77e1d5C2D285BDad9079afC5942f255407',
    erc20BridgeL1: '0xea05Fad671D93aF9472D747866019991DF183F0f',
    erc20BridgeL2: '0x6336D1DfE362a84933e526588A0fa20dd87736aE',
    isEthGasToken: true,
    l1Network: l1Networks.lineaSepoliaTestnet,
  },
  {
    id: 810181,
    key: 'zksync',
    name: 'zkLink Nova Testnet',
    rpcUrl: 'https://sepolia.rpc.zklink.io',
    logoUrl: '/img/zksync.svg',
    blockExplorerUrl: 'https://sepolia.explorer.zklink.io',
    blockExplorerApi: 'https://sepolia.explorer-api.zklink.io',
    withdrawalFinalizerApi: 'https://sepolia.withdrawal-api.zklink.io',
    mainContract: '0x02627EFACfc2B000E77132fE9346C543eB980bAb',
    erc20BridgeL1: '0xBf145DfdE964213246A4fcB8003621E8b0F11ffc',
    erc20BridgeL2: '0xEbEAf62E4bCb4FdeC35100838c86c84B8134ADE0',
    l1Gateway: '0x67ba43eD3860D155D16f82D12cA93A7B2e77bF2F',
    isEthGasToken: true,
    l1Network: l1Networks.zkSyncSepoliaTestnet,
  },
  {
    id: 810181,
    key: 'arbitrum',
    name: 'zkLink Nova Testnet',
    rpcUrl: 'https://sepolia.rpc.zklink.io',
    logoUrl: '/img/arbitrum-arb-logo.svg',
    blockExplorerUrl: 'https://sepolia.explorer.zklink.io',
    blockExplorerApi: 'https://sepolia.explorer-api.zklink.io',
    withdrawalFinalizerApi: 'https://sepolia.withdrawal-api.zklink.io',
    mainContract: '0xaE1875112Ae010A9fe755418B206AfB33Ee0b1fA',
    erc20BridgeL1: '0xFC31fF38e24901052b813DcEBEF5A9A10EaF25Ec',
    erc20BridgeL2: '0x7e1B152f25D2ff0771026067B5c8B5A1C8457478',
    l1Gateway: '0xd75F08D0E513a072799C510d04D9AddC3a28Bd9A',
    isEthGasToken: true,
    l1Network: l1Networks.arbitrumSepolia,
  },
  {
    id: 810181,
    key: 'optimism',
    name: 'zkLink Nova Testnet',
    rpcUrl: 'https://sepolia.rpc.zklink.io',
    logoUrl: '/img/optimism.svg',
    blockExplorerUrl: 'https://sepolia.explorer.zklink.io',
    blockExplorerApi: 'https://sepolia.explorer-api.zklink.io',
    withdrawalFinalizerApi: 'https://sepolia.withdrawal-api.zklink.io',
    mainContract: '0xbaC8EF345C684B0871dF390f44273160Ba3E6bc1',
    erc20BridgeL1: '0x70194e2400eb89fA22E3bd0DaFa097CA09DAE76C',
    erc20BridgeL2: '0x07476D10A8B3c614DC92a698cCeC34Aa9B844B92',
    l1Gateway: '0x2f24331ddFB2D582079C200d1c233F168901a4e1',
    isEthGasToken: true,
    l1Network: l1Networks.optimismSepoliaTestnet,
  },
  {
    id: 810181,
    key: 'base',
    name: 'zkLink Nova Testnet',
    rpcUrl: 'https://sepolia.rpc.zklink.io',
    logoUrl: '/img/base.svg',
    blockExplorerUrl: 'https://sepolia.explorer.zklink.io',
    blockExplorerApi: 'https://sepolia.explorer-api.zklink.io',
    withdrawalFinalizerApi: 'https://sepolia.withdrawal-api.zklink.io',
    mainContract: '0x8c4b80A5D5374Ff2Dc07310EF9Fdbc44e487b6C2',
    erc20BridgeL1: '0xeA6232604C847d14638a30c1D261AF6C321AAB05',
    erc20BridgeL2: '0x7c3c5C8528D55Af0C641846fF4756200DEFDC513',
    l1Gateway: '0x4E2d5bAaF470028fE48a23bd5b680f4EC7A06f85',
    isEthGasToken: true,
    l1Network: l1Networks.baseSepoliaTestnet,
  },
  {
    id: 810181,
    key: 'manta',
    name: 'zkLink Nova Testnet',
    rpcUrl: 'https://sepolia.rpc.zklink.io',
    logoUrl: '/img/manta.jpg',
    blockExplorerUrl: 'https://sepolia.explorer.zklink.io',
    blockExplorerApi: 'https://sepolia.explorer-api.zklink.io',
    withdrawalFinalizerApi: 'https://sepolia.withdrawal-api.zklink.io',
    mainContract: '0xEe5aFbd53D661968d13315f6960BBb103C2a1eCc',
    erc20BridgeL1: '0x4C58CbF4e9594898e2cC66FdA3F435Cd3622Fe9f',
    erc20BridgeL2: '0x1F282e46d75622C5B26921094b4ebF7D58D83CE2',
    l1Gateway: '0xC8a31aA097c8D1dCF588C425415E4e5A0E250e67',
    isEthGasToken: true,
    l1Network: l1Networks.mantaSepoliaTestnet,
  },
  {
    id: 810181,
    key: 'blast',
    name: 'zkLink Nova Testnet',
    rpcUrl: 'https://sepolia.rpc.zklink.io',
    logoUrl: '/img/blast.svg',
    blockExplorerUrl: 'https://sepolia.explorer.zklink.io',
    blockExplorerApi: 'https://sepolia.explorer-api.zklink.io',
    withdrawalFinalizerApi: 'https://sepolia.withdrawal-api.zklink.io',
    mainContract: '0x27CBbE82447a0C188eBD7Bc5fd706d140c7B0642',
    erc20BridgeL1: '0xD74c6452Ec4c73E4E2050C6B3f4e675B96dFFC15',
    erc20BridgeL2: '0x4E5622E4A41985C29028d92e1Cc2EdF02012c82E',
    l1Gateway: '0x83d3f5Db3eea3dD7a30aAF71A32D244386d00C53',
    isEthGasToken: true,
    l1Network: l1Networks.blastSepoliaTestnet,
  },
];

export const nexusGoerliNode: ZkSyncNetwork[] = [
  {
    id: 810182,
    key: 'goerli',
    name: 'zkLink Nova Testnet',
    rpcUrl: 'https://goerli.rpc.zklink.io',
    logoUrl: '/img/ethereum.svg',
    blockExplorerUrl: 'https://goerli.explorer.zklink.io',
    blockExplorerApi: 'https://goerli.explorer-api.zklink.io',
    withdrawalFinalizerApi: 'https://goerli.withdrawal-api.zklink.io',
    mainContract: '0x80e41d1801E5b7F9a9f4e55Fd37bF2F3e797aC64',
    erc20BridgeL1: '0xa403d1A5B552BC17132aAD864F90472794678712',
    erc20BridgeL2: '0x369181F0724D485c2F50E918b1beCEc078C7077C',
    l1Gateway: '0x00546F01728048Af108223C41C4FaD7b124a476f',
    isEthGasToken: true,
    //TODO
    l1Network: l1Networks.goerli,
  },
  {
    id: 810182,
    key: PRIMARY_CHAIN_KEY, //"primary"
    name: 'zkLink Nova Testnet',
    rpcUrl: 'https://goerli.rpc.zklink.io',
    logoUrl: '/img/linea.svg',
    blockExplorerUrl: 'https://goerli.explorer.zklink.io',
    blockExplorerApi: 'https://goerli.explorer-api.zklink.io',
    withdrawalFinalizerApi: 'https://goerli.withdrawal-api.zklink.io',
    mainContract: '0xF51bdDCC3401572B193140B5326a9dEF03c56198',
    erc20BridgeL1: '0xF58Da74B65544C86F5E16A0c898Ff20718C1cb7d',
    erc20BridgeL2: '0x7cB4A4fCF09dfF32f7f6557b966a942e803C7FAD',
    isEthGasToken: true,
    //TODO
    l1Network: l1Networks.lineaGoerliTestnet,
  },
  {
    id: 810182,
    key: 'mantle',
    name: 'zkLink Nova Testnet',
    rpcUrl: 'https://goerli.rpc.zklink.io',
    logoUrl: '/img/ethereum.svg',
    blockExplorerUrl: 'https://goerli.explorer.zklink.io',
    blockExplorerApi: 'https://goerli.explorer-api.zklink.io',
    withdrawalFinalizerApi: 'https://goerli.withdrawal-api.zklink.io',
    mainContract: '0x8fC6d9dE787C4299684B7b307feF44AB3D317e20',
    erc20BridgeL1: '0x0857FDf217E54954c0f4A77B62c04b246ef504CD',
    erc20BridgeL2: '0xD1b7DD1B30b218901d035C951852ae0D97834b68',
    l1Gateway: '0x7bf83D15C8f5a491B36506652A26d4bA0b6cC289',
    isEthGasToken: false,
    //TODO
    l1Network: l1Networks.mantleGoerliTestnet,
  },
];

export const projectId = process.env.NEXT_PUBLIC_PROJECT_ID || '';
if (!projectId) {
  throw new Error('VITE_PROJECT_ID is not set');
}
const createEraChain = (network: ZkSyncNetwork) => {
  return {
    id: network.id,
    name: network.name,
    network: network.key,
    nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
    rpcUrls: {
      default: { http: [network.rpcUrl] },
      public: { http: [network.rpcUrl] },
    },
    blockExplorers: {
      default: { url: network.blockExplorerUrl, name: 'zklink nova explorer' },
    },
  };
};

export const nodeType = process.env.NEXT_PUBLIC_NEXUS_NODE_TYPE || 'nexus';

export const NetworkConfig = (() => {
  switch (nodeType) {
    case 'nexus-goerli':
      return nexusGoerliNode;
    case 'nexus-sepolia':
      return nexusSepoliaNode;
    default:
      return nexusNode;
  }
})();

const tokenMapSepolia = {
  '1': {
    name: 'Linea-Foxy',
    chain: 'Linea',
    coin: 'Foxy',
    chainId: lineaSepolia.id,
    tokenAddress: '0x5f728Ab5E5860b4951AFaF865e9bE27043f407ec',
    chainTokenAddress: '0x6E715cb02d9AFA3Fb95608e75A291e83b8dBf179',
  },
  '2': {
    name: 'Base-Degen',
    chain: 'Base',
    coin: 'Degen',
    chainId: baseSepolia.id,
    tokenAddress: '0x1b7b96405BD6C0c9265072D27fb1810e9FC2e456',
    chainTokenAddress: '0x7E3183f43B2c5E2E782f6f9bb7Aab01dB101D4Dc',
  },
  '3': {
    name: 'Base-Brett',
    chain: 'Base',
    coin: 'Brett',
    chainId: baseSepolia.id,
    tokenAddress: '0x1b7b96405BD6C0c9265072D27fb1810e9FC2e456',
    chainTokenAddress: '0x7E3183f43B2c5E2E782f6f9bb7Aab01dB101D4Dc',
  },
  '4': {
    name: 'Base-Omni',
    chain: 'Base',
    coin: 'Omni',
    chainId: baseSepolia.id,
    tokenAddress: '0x1b7b96405BD6C0c9265072D27fb1810e9FC2e456',
    chainTokenAddress: '0x7E3183f43B2c5E2E782f6f9bb7Aab01dB101D4Dc',
  },
  '5': {
    name: 'ZkSync-Meow',
    chain: 'ZkSync',
    coin: 'Meow',
    chainId: zkSyncSepoliaTestnet.id,
    tokenAddress: '0xA126F1a0bC5f5AC8c7b349e39b4b62623e8EFC4D',
    chainTokenAddress: '0xBadb2cdC5085bf70B085f2c8052cD5A74fbFaEb0',
  },
  '6': {
    name: 'Arbitrum-AIdoge',
    chain: 'Arbitrum',
    coin: 'AIdoge',
    chainId: arbitrumSepolia.id,
    tokenAddress: '0x8310551a5d200F9bc7fa2E0F08E2915156A1FBD0',
    chainTokenAddress: '0x6DA0B20B5Bb2Ff135b6d9A13814dE1240526AE2b',
  },
  '7': {
    name: 'Arbitrum-Omni',
    chain: 'Arbitrum',
    coin: 'Omni2',
    chainId: arbitrumSepolia.id,
    tokenAddress: '0x8310551a5d200F9bc7fa2E0F08E2915156A1FBD0',
    chainTokenAddress: '0x6DA0B20B5Bb2Ff135b6d9A13814dE1240526AE2b',
  },
};

const tokenMapMainnet = {
  '1': {
    name: 'Linea-Foxy',
    chain: 'Linea',
    coin: 'Foxy',
    chainId: linea.id,
    tokenAddress: '0x005c01670f834FDE0E38Ddd982ba07C2F13EaCfD',
    chainTokenAddress: '0x5FBDF89403270a1846F5ae7D113A989F850d1566',
  },
  '2': {
    name: 'Base-Degen',
    chain: 'Base',
    coin: 'Degen',
    chainId: base.id,
    tokenAddress: '0x6871b5DD593634efa1058e875169Aa30Db674194',
    chainTokenAddress: '0x4ed4e862860bed51a9570b96d89af5e1b0efefed',
  },
  '3': {
    name: 'Base-Brett',
    chain: 'Base',
    coin: 'Brett',
    chainId: base.id,
    tokenAddress: '0xf2F3091DEC5430199259C2c81EAC3D46aa6634D6',
    chainTokenAddress: '0x532f27101965dd16442e59d40670faf5ebb142e4',
  },
  '4': {
    name: 'Base-Omni',
    chain: 'Base',
    coin: 'Omni',
    chainId: base.id,
    tokenAddress: '0xFb98607b87Dbf2184CEb3AFA93E25213a06ec23F',
    chainTokenAddress: '0xc48e605c7b722a57277e087a6170b9e227e5ac0a',
  },
  '5': {
    name: 'ZkSync-Meow',
    chain: 'ZkSync',
    coin: 'Meow',
    chainId: zkSync.id,
    tokenAddress: '0x89bdC5D68DEc480d8e5F2Af692Dff1b84599fe64',
    chainTokenAddress: '0x79db8c67d0c33203da4Efb58F7D325E1e0d4d692',
  },
  '6': {
    name: 'Arbitrum-AIdoge',
    chain: 'Arbitrum',
    coin: 'AIdoge',
    chainId: arbitrum.id,
    tokenAddress: '0x3c7e4A27998B8de30458Ab73Bd3B6C08a0EA65Ce',
    chainTokenAddress: '0x09e18590e8f76b6cf471b3cd75fe1a1a9d2b2c2b',
  },
  '7': {
    name: 'Arbitrum-Omni',
    chain: 'Arbitrum',
    coin: 'Omni2',
    chainId: arbitrum.id,
    tokenAddress: '0x7F926F0Ed7A9ce9c66C0A3cD4cCB81A295331feD',
    chainTokenAddress: '0x9e20461bc2c4c980f62f1B279D71734207a6A356',
  },
};

export const tokenMap = (() => {
  switch (nodeType) {
    case 'nexus-sepolia':
      return tokenMapSepolia;
    default:
      return tokenMapMainnet;
  }
})();

const memeTokenListSepolia = [
  {
    address: '0x7E3183f43B2c5E2E782f6f9bb7Aab01dB101D4Dc',
    decimals: 18,
    icon: 'omni-icon',
    multiplier: 2,
    networkKey: 'base',
    networkName: 'Base Sepolia Testnet',
    symbol: 'OMNI',
    type: 'MEME',
  },
  {
    address: '0x6DA0B20B5Bb2Ff135b6d9A13814dE1240526AE2b',
    decimals: 18,
    icon: 'omni2-icon',
    multiplier: 2,
    networkKey: 'arbitrum',
    networkName: 'Arbitrum Sepolia Testnet',
    symbol: 'OMNI2',
    type: 'MEME',
  },
  {
    address: '0x7E3183f43B2c5E2E782f6f9bb7Aab01dB101D4Dc',
    decimals: 18,
    icon: 'degen-icon',
    multiplier: 2,
    networkKey: 'base',
    networkName: 'Base Sepolia Testnet',
    symbol: 'DEGEN',
    type: 'MEME',
  },
  {
    address: '0x7E3183f43B2c5E2E782f6f9bb7Aab01dB101D4Dc',
    decimals: 18,
    icon: 'brett-icon',
    multiplier: 2,
    networkKey: 'base',
    networkName: 'Base Sepolia Testnet',
    symbol: 'BRETT',
    type: 'MEME',
  },
  {
    address: '0xBadb2cdC5085bf70B085f2c8052cD5A74fbFaEb0',
    decimals: 18,
    icon: 'meow-icon',
    multiplier: 2,
    networkKey: 'zksync',
    networkName: 'Zksync Sepolia Testnet',
    symbol: 'MEOW',
    type: 'MEME',
  },
  {
    address: '0x6DA0B20B5Bb2Ff135b6d9A13814dE1240526AE2b',
    decimals: 18,
    icon: 'aidoge-icon',
    multiplier: 2,
    networkKey: 'arbitrum',
    networkName: 'Arbitrum Sepolia Testnet',
    symbol: 'AIDOGE',
    type: 'MEME',
  },
  {
    address: '0x6E715cb02d9AFA3Fb95608e75A291e83b8dBf179',
    decimals: 18,
    icon: 'foxy-icon',
    multiplier: 2,
    networkKey: PRIMARY_CHAIN_KEY,
    networkName: 'Linea Sepolia Testnet',
    symbol: 'FOXY',
    type: 'MEME',
  },
];
const memeTokenListMainnet = [
  {
    address: '0x5FBDF89403270a1846F5ae7D113A989F850d1566',
    decimals: 18,
    icon: 'foxy-icon',
    multiplier: 2,
    networkKey: PRIMARY_CHAIN_KEY,
    networkName: 'Linea',
    symbol: 'FOXY',
    type: 'MEME',
  },
  {
    address: '0x4ed4e862860bed51a9570b96d89af5e1b0efefed',
    decimals: 18,
    icon: 'degen-icon',
    multiplier: 2,
    networkKey: 'base',
    networkName: 'Base',
    symbol: 'DEGEN',
    type: 'MEME',
  },
  {
    address: '0x532f27101965dd16442e59d40670faf5ebb142e4',
    decimals: 18,
    icon: 'brett-icon',
    multiplier: 2,
    networkKey: 'base',
    networkName: 'Base',
    symbol: 'BRETT',
    type: 'MEME',
  },
  {
    address: '0xc48e605c7b722a57277e087a6170b9e227e5ac0a',
    decimals: 18,
    icon: 'omni-icon',
    multiplier: 2,
    networkKey: 'base',
    networkName: 'Base',
    symbol: 'OMNI',
    type: 'MEME',
  },
  {
    address: '0x79db8c67d0c33203da4Efb58F7D325E1e0d4d692',
    decimals: 18,
    icon: 'meow-icon',
    multiplier: 2,
    networkKey: 'zksync',
    networkName: 'Zksync',
    symbol: 'MEOW',
    type: 'MEME',
  },
  {
    address: '0x09e18590e8f76b6cf471b3cd75fe1a1a9d2b2c2b',
    decimals: 18,
    icon: 'aidoge-icon',
    multiplier: 2,
    networkKey: 'arbitrum',
    networkName: 'Arbitrum',
    symbol: 'AIDOGE',
    type: 'MEME',
  },
  {
    address: '0x9e20461bc2c4c980f62f1B279D71734207a6A356',
    decimals: 18,
    icon: 'omni2-icon',
    multiplier: 2,
    networkKey: 'arbitrum',
    networkName: 'Arbitrum',
    symbol: 'OMNI2',
    type: 'MEME',
  },
];

export const memeTokenList = (() => {
  switch (nodeType) {
    case 'nexus-sepolia':
      return memeTokenListSepolia;
    default:
      return memeTokenListMainnet;
  }
})();


// Create wagmiConfig

// export const NetworkConfig = nodeType === 'nexus-goerli' ? nexusGoerliNode : nexusNode
// export const chains: readonly [Chain, ...Chain[]] =
//   nodeType === 'nexus-goerli'
//     ? [goerli, lineaTestnet, mantleTestnet, createEraChain(nexusGoerliNode[0]) as Chain]
//     : [mainnet, arbitrum, linea, zkSync, manta, mantle, createEraChain(nexusNode[0]) as Chain, blast, optimism, base]

export const chains: readonly [Chain, ...Chain[]] = (() => {
  switch (nodeType) {
    case 'nexus-goerli':
      return [goerli, lineaTestnet, mantleTestnet, createEraChain(nexusGoerliNode[0]) as Chain];
    case 'nexus-sepolia':
      return [
        sepolia,
        arbitrumSepolia,
        baseSepolia,
        lineaSepolia,
        zkSyncSepoliaTestnet,
        createEraChain(nexusSepoliaNode[0]) as Chain,
      ];
    default:
      return [
        mainnet,
        arbitrum,
        linea,
        zkSync,
        manta,
        mantle,
        createEraChain(nexusNode[0]) as Chain,
        blast,
        optimism,
        base,
      ];
  }
})();

// export const wagmiConfig = defaultWagmiConfig({
//   chains: chains,
//   projectId,
//   metadata: {
//     name: "zkLink Nova Portal",
//     description:
//       "zkLink Nova Portal - view balances, transfer and bridge tokens",
//     url: "https://app.zklink.io/",
//     icons: ["../public/img/icon.png"],
//   },

//   enableCoinbase: false,
//   enableWalletConnect: false,
//   enableEIP6963: true,
// });
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
rabbyWallet();
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
      wallets: [
        injectedWallet,
        // rainbowWallet,
        gateWallet, // hide gate for now
        okxWallet,
        BinanceWallet,
        // rabbyWallet,
        metaMaskWallet,
        walletConnectWallet,
      ],
    },
  ],
  {
    appName: 'zklink Nova App',
    projectId: projectId,
  },
);

export const config = getDefaultConfig({
  appName: 'zklink Nova App',
  projectId: projectId,
  chains: chains,
  // ssr: false, // If your dApp uses server side rendering (SSR)
});

export const wagmiDefaultConfig = createConfig({
  chains: chains,
  connectors: [...connectors],
  multiInjectedProviderDiscovery: true,
  client: ({ chain }) => {
    return createClient({ chain, transport: http() });
  },
});

const determineChainList = (): ZkSyncNetwork[] => {
  const zkSyncNetworks: ZkSyncNetwork[] = [];
  // if (!nodeType) {
  //   throw new Error("NODE_TYPE is not set. ");
  // }
  if (nodeType === 'nexus') {
    zkSyncNetworks.push(...nexusNode);
  } else if (nodeType === 'nexus-goerli') {
    zkSyncNetworks.push(...nexusGoerliNode);
  } else if (nodeType === 'nexus-sepolia') {
    zkSyncNetworks.push(...nexusSepoliaNode);
  } else if (nodeType === 'hyperchain') {
    zkSyncNetworks.push(
      ...(Hyperchains as unknown as Array<{ network: ZkSyncNetwork; tokens: Token[] }>).map((e) => ({
        ...e.network,
        getTokens: () => e.tokens,
      })),
    );
  } else {
    zkSyncNetworks.push(...zkSyncNetworks);
  }
  return zkSyncNetworks;
};

export const chainList: ZkSyncNetwork[] = determineChainList();
