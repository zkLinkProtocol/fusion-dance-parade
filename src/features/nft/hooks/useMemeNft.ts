/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { readContract } from '@wagmi/core';
import { config, nodeType } from 'config/zklin-networks';
import NovaMeMeAxisNft from 'constants/contracts/abis/NovaMemeAxisNFT.json';
import NovaComposeNFT from 'constants/contracts/abis/NovaMemeCrossNFT.json';
import NovaNFT from 'constants/contracts/abis/NovaNFT.json';
import IERC20 from 'constants/contracts/abis/IERC20.json';
import { getMemeMintSignature } from 'constants/api';
import {
  MEME_COMPOSE_NFT_CONTRACT,
  MEME_NFT_CONTRACT,
  NOVA_CHAIN_ID,
  NOVA_NFT_CONTRACT,
} from 'constants/zklink-config';
import { BigNumber } from 'ethers';
import { map } from 'lodash';
import { zkSyncProvider } from 'providers/zksync-provider';
import { useCallback, useEffect, useState } from 'react';
import type { Hash, WriteContractParameters } from 'viem';
import { encodeFunctionData } from 'viem';
import { useAccount, usePublicClient, useWalletClient } from 'wagmi';
import { sleep } from 'zksync-web3/build/src/utils';
import { checkMintEligibility } from 'constants/api';
import { arbitrumSepolia, baseSepolia, lineaSepolia, zkSyncSepoliaTestnet } from 'viem/chains';
import { create } from 'zustand';

export type NovaNftType = 'ISTP' | 'ESFJ' | 'INFJ' | 'ENTP';
export type NovaNft = {
  name: string;
  description: string;
  image: string;
  type: number;
};

const tokenMap = {
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

interface ActiveIndexState {
  batchBalances: any[];
  setBatchBalances: (value: any[]) => void;
}

export const useBatchBalancesStore = create<ActiveIndexState>((set) => ({
  batchBalances: [], // Set the default value here
  setBatchBalances: (value: any) => set({ batchBalances: value }),
}));

const useMemeNft = () => {
  const publicClient = usePublicClient({ config, chainId: NOVA_CHAIN_ID });
  const { data: walletClient } = useWalletClient();
  const { address } = useAccount();
  const [isMinting, setIsMinting] = useState(false);
  const [isFetchingNfts, setIsFetchingNfts] = useState(false);
  const { setBatchBalances } = useBatchBalancesStore();

  const getMemeNftBalance = useCallback(async (address: string) => {
    const balance = await readContract(config, {
      abi: NovaMeMeAxisNft,
      address: MEME_NFT_CONTRACT as `0x${string}`,
      functionName: 'balanceOf',
      args: [address, 4],
      chainId: NOVA_CHAIN_ID,
    });

    return balance;
  }, []);

  const getTokenIdByIndex = useCallback(async (address: string) => {
    const tokenId = await readContract(config, {
      abi: NovaNFT.abi,
      address: NOVA_NFT_CONTRACT as `0x${string}`,
      functionName: 'tokenOfOwnerByIndex',
      args: [address, 0],
      chainId: NOVA_CHAIN_ID,
    });
    console.log('Token ID:', tokenId);
    return tokenId as number;
  }, []);

  const getTokenURIByTokenId = useCallback(async (tokenId: number) => {
    const tokenURI = await readContract(config, {
      abi: NovaMeMeAxisNft,
      address: MEME_NFT_CONTRACT as `0x${string}`,
      functionName: 'uri',
      args: [tokenId],
      chainId: NOVA_CHAIN_ID,
    });
    console.log('Token URI:', tokenURI);
    return tokenURI as string;
  }, []);

  const fetchMetadataByURI = async (uri: string, tokenId: string) => {
    if (uri.startsWith('ipfs://')) {
      uri = uri.substring(7);
    }
    const response = await fetch(`https://ipfs.io/ipfs/${uri}`);
    console.log(`https://ipfs.io/ipfs/${uri}`, 'ipfs');
    const json = await response.json();
    const result: NovaNft = {
      name: json.name,
      description: json.description,
      image: `https://ipfs.io/ipfs/${json.image.substring(7)}`,
      type: Number(tokenId),
    };
    console.log('Metadata:', result);
    return result;
  };

  const getMemeNftBalanceForTokenId = async (address: string, tokenId: string) => {
    const balance = await readContract(config, {
      abi: NovaMeMeAxisNft,
      address: MEME_NFT_CONTRACT as `0x${string}`,
      functionName: 'balanceOf',
      args: [address, tokenId],
      chainId: NOVA_CHAIN_ID,
    });
    return balance;
  };

  const getMintRecordByTokenId = async (address: string, tokenId: string) => {
    const balance = await readContract(config, {
      abi: NovaMeMeAxisNft,
      address: MEME_NFT_CONTRACT as `0x${string}`,
      functionName: 'mintRecord',
      args: [address, tokenId],
      chainId: NOVA_CHAIN_ID,
    });
    return balance;
  };

  //  const getTokenURIByTokenId = useCallback(async (tokenId: number) => {
  //    const tokenURI = await readContract(config, {
  //      abi: NovaNFT.abi,
  //      address: NOVA_NFT_CONTRACT as `0x${string}`,
  //      functionName: 'tokenURI',
  //      args: [tokenId],
  //      chainId: NOVA_CHAIN_ID,
  //    });
  //    console.log('tokenURI: ', tokenURI);
  //    return tokenURI as string;
  //  }, []);

  const getAddressBalancesForTokenIds = async (address: string, tokenIds: string[]) => {
    const eligibilityRes = await checkMintEligibility(address);
    const eligibileChainData = eligibilityRes.result || [];
    const balances = await Promise.all(
      map(tokenIds, async (tokenId) => {
        const balance = await getMemeNftBalanceForTokenId(address, tokenId);
        // const tokenURI = await getTokenURIByTokenId(parseInt(tokenId));
        const hasMint = await getMintRecordByTokenId(address, tokenId);
        // const nft = await fetchMetadataByURI(tokenURI, tokenId);

        const tokeBalance_nova = await readContract(config, {
          abi: IERC20.abi,
          address: tokenMap[tokenId].tokenAddress as `0x${string}`,
          functionName: 'balanceOf',
          args: [address as `0x${string}`],
          chainId: NOVA_CHAIN_ID,
        });
        Object.keys(tokenMap).forEach((key) => {
          const token = tokenMap[key];
          token.eligible = eligibileChainData.some((obj: any) => token.name.includes(obj.coin));
        });
        return {
          isEligible: tokenMap[tokenId].eligible,
          chain: tokenMap[tokenId].chain,
          chainId: tokenMap[tokenId].chainId,
          coin: tokenMap[tokenId].coin,
          chainTokenAddress: tokenMap[tokenId].chainTokenAddress,
          tokenId,
          balance,
          hasMint,
          tokenBalance: tokeBalance_nova,
          hasMemeTokenBalance: tokeBalance_nova > 0,
          // name: nft.name,
          // description: nft.description,
          // image: nft.image,
          // type: nft.type,
        };
      }),
    );
    console.log('fetching.....________________________________', balances);
    return balances;
  };

  const fetchMemeNftBalances = async (address: string) => {
    try {
      setIsFetchingNfts(true);
      const tokenIds = ['1', '2', '3', '4', '5', '6', '7'];
      const balances = await getAddressBalancesForTokenIds(address, tokenIds);
      console.log('Meme NFT balances:', balances);
      setBatchBalances(balances);
    } catch (error) {
      console.error('Error fetching Meme NFT balances:', error);
    } finally {
      setIsFetchingNfts(false);
    }
  };

  const mintNovaNft = async (address: string, chain: string, coin: string) => {
    if (!address) return;
    try {
      setIsMinting(true);
      const params = await getMemeMintSignature({ address, chain, coin });
      const amount = 1;
      const signature = params.result?.signature;
      if (!signature) {
        throw new Error('You are not authorized. Please contact us for help.');
      }
      const tx: WriteContractParameters = {
        address: MEME_NFT_CONTRACT,
        abi: NovaMeMeAxisNft,
        functionName: 'safeMint',
        args: [
          address,
          params.result.nonce,
          params.result.tokenId,
          amount,
          params.result.expiry,
          params.result.mintType,
          params.result.signature,
        ],
      };

      const txData = encodeFunctionData({
        abi: NovaMeMeAxisNft,
        functionName: 'safeMint',
        args: [
          address,
          params.result.nonce,
          params.result.tokenId,
          amount,
          params.result.expiry,
          params.result.mintType,
          params.result.signature,
        ],
      });

      const fee = await zkSyncProvider.attachEstimateFee(
        nodeType === 'nexus-sepolia' ? 'https://sepolia.rpc.zklink.io' : 'https://rpc.zklink.io',
      )({
        from: address as `0x${string}`,
        to: MEME_NFT_CONTRACT,
        value: '0x00',
        data: txData,
      });
      console.log('ZkSync chain fee for ETH:', fee);

      tx.maxFeePerGas = fee.maxFeePerGas.toBigInt();
      tx.maxPriorityFeePerGas = fee.maxPriorityFeePerGas.toBigInt();
      tx.gas = fee.gasLimit.toBigInt();
      const hash = (await walletClient?.writeContract(tx)) as `0x${string}`;
      await sleep(1000); // Wait to avoid waitForTransactionReceipt failure
      const receipt = await publicClient?.waitForTransactionReceipt({
        hash,
      });
      console.log('Transaction receipt:', receipt);
      await fetchMemeNftBalances(address);
    } catch (error) {
      console.error('Error minting Nova NFT:', error);
      if (error.message && error.message?.includes('not found')) {
        // View not found. Try fetchNovaNft again.
        await fetchMemeNftBalances(address);
        return;
      }
      throw error;
    } finally {
      setIsMinting(false);
      fetchMemeNftBalances(address);
    }
  };

  useEffect(() => {
    if (address) {
      fetchMemeNftBalances(address);
    }
  }, [address]);

  return {
    fetchMemeNftBalances,
    getMemeNftBalance,
    mintNovaNft,
    isMinting,
    isFetchingNfts,
  };
};

export default useMemeNft;
