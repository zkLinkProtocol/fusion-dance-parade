import { chains } from 'config/zklink-networks';
import { memoize } from 'lodash';

// const { chains, provider } = configureChains(CHAINS, chainRpcProviders as ChainProviderFn<any>[]);

export const CHAIN_IDS: number[] = chains.map((c) => c.id);
export const isChainSupported = memoize((chainId: number) => CHAIN_IDS.includes(chainId));
