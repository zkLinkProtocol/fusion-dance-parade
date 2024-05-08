/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { readContract } from '@wagmi/core';
import { config, nodeType, tokenMap } from 'config/zklink-networks';
import NovaInfinityStonesNFT from 'constants/contracts/abis/NovaInfinityStonesNFT.json';
import IERC20 from 'constants/contracts/abis/IERC20.json';
import { getMemeMintSignature } from 'constants/api';
import { MEME_NFT_CONTRACT, NOVA_CHAIN_ID } from 'constants/zklink-config';
import { map } from 'lodash';
import { zkSyncProvider } from 'providers/zksync-provider';
import { useCallback, useEffect, useState } from 'react';
import type { WriteContractParameters } from 'viem';
import { encodeFunctionData } from 'viem';
import { useAccount, usePublicClient, useWalletClient } from 'wagmi';
import { sleep } from 'zksync-web3/build/src/utils';
import { checkMintEligibility } from 'constants/api';
import { create } from 'zustand';

export type NovaNftType = 'ISTP' | 'ESFJ' | 'INFJ' | 'ENTP';
export type NovaNft = {
  name: string;
  description: string;
  image: string;
  type: number;
};


interface ActiveIndexState {
  batchBalances: any[];
  setBatchBalances: (value: any[]) => void;
}

export const useBatchBalancesStore = create<ActiveIndexState>((set) => ({
  batchBalances: [], // Set the default value here
  setBatchBalances: (value: any) => set({ batchBalances: value }),
}));

const useNft = () => {
  const publicClient = usePublicClient({ config, chainId: NOVA_CHAIN_ID });
  const { data: walletClient } = useWalletClient();
  const { address } = useAccount();

  const [isMinting, setIsMinting] = useState(false);
  const [isFetchingNfts, setIsFetchingNfts] = useState(false);
  const { setBatchBalances, batchBalances } = useBatchBalancesStore();

  const getMemeNftBalance = useCallback(async (address: string) => {
    const balance = await readContract(config, {
      abi: NovaInfinityStonesNFT,
      address: MEME_NFT_CONTRACT as `0x${string}`,
      functionName: 'balanceOf',
      args: [address, 4],
      chainId: NOVA_CHAIN_ID,
    });

    return balance;
  }, []);

  const getMemeNftBalanceForTokenId = async (address: string, tokenId: string) => {
    const balance = await readContract(config, {
      abi: NovaInfinityStonesNFT,
      address: MEME_NFT_CONTRACT as `0x${string}`,
      functionName: 'balanceOf',
      args: [address, tokenId],
      chainId: NOVA_CHAIN_ID,
    });
    return balance;
  };

  const getMintRecordByTokenId = async (address: string, tokenId: string) => {
    const balance = await readContract(config, {
      abi: NovaInfinityStonesNFT,
      address: MEME_NFT_CONTRACT as `0x${string}`,
      functionName: 'mintRecord',
      args: [address, tokenId],
      chainId: NOVA_CHAIN_ID,
    });
    return balance;
  };

  const getAddressBalancesForTokenIds = async (address: string, tokenIds: string[]) => {
    if (!address) {
      // 如果 address 為空或 undefined，回傳預設的陣列
      return tokenIds.map((tokenId) => ({
        isEligible: false,
        chain: tokenMap[tokenId].chain,
        chainId: tokenMap[tokenId].chainId,
        coin: tokenMap[tokenId].coin,
        chainTokenAddress: tokenMap[tokenId].chainTokenAddress,
        tokenId,
        balance: '0',
        hasMint: false,
        tokenBalance: '0',
        hasMemeTokenBalance: false,
      }));
    }
    const eligibilityRes = await checkMintEligibility(address);
    const eligibileChainData = eligibilityRes.result || [];
    const balances = await Promise.all(
      map(tokenIds, async (tokenId) => {
        const balance = await getMemeNftBalanceForTokenId(address, tokenId);
        const hasMint = await getMintRecordByTokenId(address, tokenId);

        const tokeBalance_nova = await readContract(config, {
          abi: IERC20.abi,
          address: tokenMap[tokenId].tokenAddress as `0x${string}`,
          functionName: 'balanceOf',
          args: [address as `0x${string}`],
          chainId: NOVA_CHAIN_ID,
        });
        Object.keys(tokenMap).forEach((key) => {
          const token = tokenMap[key];
          token.eligible = eligibileChainData.some((obj: any) => token.name === `${obj.chain}-${obj.coin}`);
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
        };
      }),
    );
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
        abi: NovaInfinityStonesNFT,
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
        abi: NovaInfinityStonesNFT,
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
    fetchMemeNftBalances(address);
  }, [address]);

  return {
    fetchMemeNftBalances,
    getMemeNftBalance,
    mintNovaNft,
    isMinting,
    isFetchingNfts,
  };
};

export default useNft;
