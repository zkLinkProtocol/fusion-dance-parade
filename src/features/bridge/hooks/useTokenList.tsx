import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useMemo, useState } from 'react';
import { useAccount, useBalance, useReadContracts } from 'wagmi';

import { config, memeTokenList, nodeType, PRIMARY_CHAIN_KEY } from 'config/zklink-networks';
import IERC20 from 'constants/contracts/abis/IERC20.json';
import { getSupportedTokens } from 'constants/api';
import FromList from 'constants/from-chain-list';
import { findClosestMultiplier, formatBalance, isSameAddress } from 'utils/time';

import { useBridgeNetworkStore } from './useBridgeNetwork';
import { NOVA_CHAIN_ID } from 'constants/zklink-config';

export type Token = {
  address: string;
  networkKey: string;
  symbol: string;
  networkName: string;
  decimals: number;
  icon?: string;
  balance?: number | bigint;
  formatedBalance?: number | string;
  type: string;
  yieldType: string[];
  multiplier: number;
  l2Address: string;
};

const nativeToken = {
  address: '0x0000000000000000000000000000000000000000',
  symbol: 'ETH',
  decimals: 18,
  icon: 'eth-Icon',
  multiplier: 2,
  type: 'Native',
};
const isSameNetwork = (networkKey: string, chain: string) => {
  if (nodeType === 'nexus-sepolia' && networkKey === 'sepolia' && chain === 'Ethereum') {
    return true;
  } else if (networkKey === PRIMARY_CHAIN_KEY && chain === 'Linea') {
    return true;
  } else if (networkKey.toLowerCase() === chain.toLowerCase()) {
    return true;
  } else {
    return false;
  }
};
export const useTokenBalanceList = () => {
  // const [tokenSource, setTokenSource] = useState<Token[]>([]);
  const { networkKey } = useBridgeNetworkStore();
  const { address: walletAddress } = useAccount();
  const [allTokens, setAllTokens] = useState<
    { l1Address: string; iconURL: string; usdPrice: number; symbol: string }[]
  >([]);

  const whitelist = ['ETH', 'ZKT', 'BRETT', 'OMNI', 'MEOW', 'DEGEN', 'AIDOGE', 'FOXY', 'OMNI2'];

  const tokenSource = memeTokenList.filter(
    (item, index, self) => whitelist.includes(item.symbol) && index === self.findIndex((t) => t.symbol === item.symbol),
  );

  const queryClient = useQueryClient();

  const from = useMemo(() => {
    return FromList.find((item) => item.networkKey === (networkKey || FromList[0].networkKey));
  }, [networkKey]);

  const selectedChainId = useMemo(() => {
    return FromList.find((item) => item.networkKey === (networkKey || FromList[0].networkKey))?.chainId;
  }, [networkKey]);

  const { data: nativeTokenBalance } = useBalance({
    config: config,
    address: walletAddress as `0x${string}`,
    chainId: selectedChainId,
    token: undefined,
    query: { queryClient: queryClient },
  });

  const { data: novaNativeTokenBalance } = useBalance({
    config,
    address: walletAddress as `0x${string}`,
    chainId: NOVA_CHAIN_ID,
    token: undefined,
    query: { queryClient: queryClient },
  });

  const erc20Contracts = useMemo(() => {
    return tokenSource.map(({ address }) => ({
      abi: IERC20.abi,
      functionName: 'balanceOf',
      address: address as `0x${string}`,
      args: [walletAddress as `0x${string}`],
      chainId: selectedChainId,
      // chainId
    }));
  }, [tokenSource, walletAddress, selectedChainId]);

  const { data: erc20Balances } = useReadContracts({
    config: config,
    contracts: erc20Contracts,
    query: {
      queryClient: queryClient,
      // refetchInterval: 5000, //not working
      // select: (data) => data.map((item) => item.result),
    },
  });

  const tokenList = useMemo(() => {
    const erc20BalancesValue = erc20Balances?.map((item) => item.result as bigint);
    const tokenList = [...tokenSource].map((token, index) => ({
      ...token,
      balance: erc20BalancesValue?.[index],
      formatedBalance: formatBalance(erc20BalancesValue?.[index] ?? 0n, token.decimals),
    }));
    const native = {
      ...nativeToken,
      networkKey: networkKey ?? FromList[0].networkKey,
      networkName: from?.chainName,
      balance: nativeTokenBalance?.value ?? 0n,
      formatedBalance: formatBalance(nativeTokenBalance?.value ?? 0n, 18),
    };
    if (networkKey === 'mantle') {
      //for mantle
      native.symbol = 'MNT';
      // native.icon = mantleIcon
    }
    tokenList.unshift(native);
    return tokenList;
  }, [nativeTokenBalance, erc20Balances, from, tokenSource, networkKey]);

  const refreshTokenBalanceList = () => {
    queryClient.invalidateQueries();
  };
  return {
    loading: queryClient.isFetching,
    tokenList,
    refreshTokenBalanceList,
    allTokens,
    novaNativeTokenBalance: formatBalance(novaNativeTokenBalance?.value ?? 0n, 18),
    nativeTokenBalance: nativeTokenBalance?.value,
  };
};

export default useTokenBalanceList;
