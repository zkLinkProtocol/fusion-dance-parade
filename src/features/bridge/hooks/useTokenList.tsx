import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useMemo, useState } from 'react';
import { useAccount, useBalance, useReadContracts } from 'wagmi';

import { config, nodeType, PRIMARY_CHAIN_KEY } from 'config/zklin-networks';
import IERC20 from 'constants/contracts/abis/IERC20.json';
import { getSupportedTokens } from 'constants/api';
import FromList from 'constants/from-chain-list';
import { findClosestMultiplier, formatBalance, isSameAddress } from 'utils/time';

import { useBridgeNetworkStore } from './useBridgeNetwork';

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
  const [tokenSource, setTokenSource] = useState<Token[]>([]);
  const { networkKey } = useBridgeNetworkStore();
  const { address: walletAddress } = useAccount();
  const [allTokens, setAllTokens] = useState<
    { l1Address: string; iconURL: string; usdPrice: number; symbol: string }[]
  >([]);

  useEffect(() => {
    fetch('https://explorer-api.zklink.io/tokens/tvl?isall=true').then((res) =>
      res.json().then((all) => setAllTokens(all)),
    );
    const timer = setInterval(() => {
      fetch('https://explorer-api.zklink.io/tokens/tvl?isall=true').then((res) =>
        res.json().then((all) => setAllTokens(all)),
      );
    }, 1000 * 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    (async () => {
      if (!networkKey) return;
      const supportedTokens = await getSupportedTokens();
      const index = supportedTokens.findIndex((item) => item.symbol === 'pufETH');
      if (index > -1) {
        const pufETH = { ...supportedTokens[index] };
        supportedTokens.splice(index, 1);
        supportedTokens.splice(2, 0, pufETH);
      }
      const tokens = [];
      for (const token of supportedTokens) {
        if (token.symbol === 'ETH') continue;
        const item = token.address.find((item) => isSameNetwork(networkKey, item.chain));
        if (!item?.l1Address) continue;
        if (item) {
          const imgItem = allTokens.find((at) => isSameAddress(at.l1Address, item.l1Address));
          tokens.push({
            ...token,
            multiplier: findClosestMultiplier(token.multipliers ?? []),
            address: item.l1Address,
            networkKey,
            networkName: item.chain,
            icon: imgItem?.iconURL,
            l2Address: item.l2Address,
          });
        }
        // tokens.push({
        //   ...token,
        //   address: '0xE5af0d8e2A327e9486d44CFaE914D643d54b7529',
        //   decimals: 18,
        //   icon: 'zkt-icon',
        //   multiplier: 2,
        //   networkKey: 'primary',
        //   networkName: 'Linea Goerli',
        //   symbol: 'ZKT',
        //   type: 'Native',
        // })
        tokens.push({
          ...token,
          address: '0xE0DCD8cc7DB8bAB361b2aF2208bA10e3d7a1Ef31',
          decimals: 18,
          icon: 'zkt-icon',
          multiplier: 2,
          networkKey: 'sepolia',
          networkName: 'Ethereum Sepolia Testnet',
          symbol: 'ZKT',
          type: 'Native',
        });
      }
      const filteredArray = tokens.filter(
        (item, index, self) => index === self.findIndex((t) => t.symbol === item.symbol),
      );
      setTokenSource(filteredArray);
    })();
  }, [networkKey, allTokens]);

  const queryClient = useQueryClient();

  const from = useMemo(() => {
    return FromList.find((item) => item.networkKey === (networkKey || FromList[0].networkKey));
  }, [networkKey]);

  const selectedChainId = useMemo(() => {
    return FromList.find((item) => item.networkKey === (networkKey || FromList[0].networkKey))?.chainId;
  }, [networkKey]);

  // const tokens = useMemo(() => {
  //   return Tokens.filter(
  //     (item) => item.networkKey === (networkKey || FromList[0].networkKey)
  //   );
  // }, [networkKey]);
  const { data: nativeTokenBalance } = useBalance({
    config: config,
    address: walletAddress as `0x${string}`,
    chainId: selectedChainId,
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

  console.log('erc20 data: ', selectedChainId, erc20Balances);

  const tokenList = useMemo(() => {
    const erc20BalancesValue = erc20Balances?.map((item) => item.result as bigint);
    const tokenList = [...tokenSource].map((token, index) => ({
      ...token,
      balance: erc20BalancesValue?.[index],
      formatedBalance: formatBalance(erc20BalancesValue?.[index] ?? 0n, token.decimals),
    }));
    console.log('tokenList-omg', tokenSource, tokenList);
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
    nativeTokenBalance: nativeTokenBalance?.value,
  };
};

export default useTokenBalanceList;
