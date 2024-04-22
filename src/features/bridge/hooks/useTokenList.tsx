import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useMemo, useState } from 'react';
import { useAccount, useBalance, useReadContracts } from 'wagmi';

import { config, nodeType, PRIMARY_CHAIN_KEY } from 'config/zklin-networks';
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
        //TODO: ADD REAL MEME TOKENS
        tokens.push({
          ...token,
          address: '0x7E3183f43B2c5E2E782f6f9bb7Aab01dB101D4Dc',
          decimals: 18,
          icon: 'omni-icon',
          multiplier: 2,
          networkKey: 'base',
          networkName: 'Base Sepolia Testnet',
          symbol: 'OMNI',
          type: 'MEME',
        });
        tokens.push({
          ...token,
          address: '0x7E3183f43B2c5E2E782f6f9bb7Aab01dB101D4Dc',
          decimals: 18,
          icon: 'degen-icon',
          multiplier: 2,
          networkKey: 'base',
          networkName: 'Base Sepolia Testnet',
          symbol: 'DEGEN',
          type: 'MEME',
        });
        tokens.push({
          ...token,
          address: '0x7E3183f43B2c5E2E782f6f9bb7Aab01dB101D4Dc',
          decimals: 18,
          icon: 'brett-icon',
          multiplier: 2,
          networkKey: 'base',
          networkName: 'Base Sepolia Testnet',
          symbol: 'BRETT',
          type: 'MEME',
        });
        tokens.push({
          ...token,
          address: '0xBadb2cdC5085bf70B085f2c8052cD5A74fbFaEb0',
          decimals: 18,
          icon: 'meow-icon',
          multiplier: 2,
          networkKey: 'zksync',
          networkName: 'Zksync Sepolia Testnet',
          symbol: 'MEOW',
          type: 'MEME',
        });
        tokens.push({
          ...token,
          address: '0x6DA0B20B5Bb2Ff135b6d9A13814dE1240526AE2b',
          decimals: 18,
          icon: 'aidoge-icon',
          multiplier: 2,
          networkKey: 'arbitrum',
          networkName: 'Arbitrum Sepolia Testnet',
          symbol: 'AIDOGE',
          type: 'MEME',
        });
        tokens.push({
          ...token,
          address: '0x6E715cb02d9AFA3Fb95608e75A291e83b8dBf179',
          decimals: 18,
          icon: 'foxy-icon',
          multiplier: 2,
          networkKey: PRIMARY_CHAIN_KEY,
          networkName: 'Linea Sepolia Testnet',
          symbol: 'FOXY',
          type: 'MEME',
        });
        // tokens.push({
        //   ...token,
        //   address: '0xE0DCD8cc7DB8bAB361b2aF2208bA10e3d7a1Ef31',
        //   decimals: 18,
        //   icon: 'zkt-icon',
        //   multiplier: 2,
        //   networkKey: 'sepolia',
        //   networkName: 'Ethereum Sepolia Testnet',
        //   symbol: 'ZKT',
        //   type: 'MEME',
        // });
      }
      // const filteredArray = tokens.filter(
      //   (item, index, self) => index === self.findIndex((t) => t.symbol === item.symbol),
      // );
      const whitelist = ['ETH', 'ZKT', 'BRETT', 'OMNI', 'MEOW', 'DEGEN', 'AIDOGE', 'FOXY'];

      const filteredArray = tokens.filter(
        (item, index, self) =>
          whitelist.includes(item.symbol) && index === self.findIndex((t) => t.symbol === item.symbol),
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

  console.log(selectedChainId, 'selectedChainId');

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

  console.log(nativeTokenBalance, 'nativeTokenBalance');

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
  // const novaTestArray = [
  //   {
  //     address: '0x9a97593259201eA35036fD1c168BEE39fe33929f',
  //     symbol: 'OMNI',
  //     decimals: 18,
  //     type: 'MEME',
  //   },
  // ];

  const { data: nativeTokenBalanceTest } = useBalance({
    config,
    address: '0x9ff88A1f4f8b06C63e52724d1055e44acEFDa45a',
    chainId: NOVA_CHAIN_ID,
    token: '0x9a97593259201eA35036fD1c168BEE39fe33929f',
  });

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
