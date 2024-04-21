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
    tokenAddress: '0x9a97593259201eA35036fD1c168BEE39fe33929f',
  },
  '2': {
    name: 'Base-Degen',
    chain: 'Base',
    coin: 'Degen',
    chainId: baseSepolia.id,
    tokenAddress: '0x9a97593259201eA35036fD1c168BEE39fe33929f',
  },
  '3': {
    name: 'Base-Brett',
    chain: 'Base',
    coin: 'Brett',
    chainId: baseSepolia.id,
    tokenAddress: '0x9a97593259201eA35036fD1c168BEE39fe33929f',
  },
  '4': {
    name: 'Base-Omni',
    chain: 'Base',
    coin: 'Omni',
    chainId: baseSepolia.id,
    tokenAddress: '0x9a97593259201eA35036fD1c168BEE39fe33929f',
  },
  '5': {
    name: 'ZkSync-Meow',
    chain: 'ZkSync',
    coin: 'Meow',
    chainId: zkSyncSepoliaTestnet.id,
    tokenAddress: '0x9a97593259201eA35036fD1c168BEE39fe33929f',
  },
  '6': {
    name: 'Arbitrum-AIdoge',
    chain: 'Arbitrum',
    coin: 'AIdoge',
    chainId: arbitrumSepolia.id,
    tokenAddress: '0x9a97593259201eA35036fD1c168BEE39fe33929f',
  },
  '7': {
    name: 'Arbitrum-Omni',
    chain: 'Arbitrum',
    coin: 'Omni',
    chainId: arbitrumSepolia.id,
    tokenAddress: '0x9a97593259201eA35036fD1c168BEE39fe33929f',
  },
};

const useMemeNft = () => {
  const publicClient = usePublicClient({ config, chainId: NOVA_CHAIN_ID });
  const { data: walletClient } = useWalletClient();
  const [novaNft, setNovaNft] = useState<NovaNft>();
  const { address } = useAccount();
  const [isMinting, setIsMinting] = useState(false);
  const [isFetchingNfts, setIsFetchingNfts] = useState(false);
  const [memeNftBalances, setMemeNftBalances] = useState<any[]>([]);
  const [composeNftInfo, setComposeNftInfo] = useState<any>({});

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
        const tokenURI = await getTokenURIByTokenId(parseInt(tokenId));
        const hasMint = await getMintRecordByTokenId(address, tokenId);
        const nft = await fetchMetadataByURI(tokenURI, tokenId);

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
          tokenId,
          balance,
          hasMint,
          tokenBalance: tokeBalance_nova,
          hasMemeTokenBalance: tokeBalance_nova > 0,
          name: nft.name,
          description: nft.description,
          image: nft.image,
          type: nft.type,
        };
      }),
    );
    return balances;
  };

  const getMemeComposeNftBalance = async (address: string) => {
    const balance = await readContract(config, {
      address: MEME_COMPOSE_NFT_CONTRACT as Hash,
      abi: NovaComposeNFT,
      functionName: 'balanceOf',
      args: [address],
      chainId: NOVA_CHAIN_ID,
    });
    return balance;
  };

  const getComposeTokenIdByIndex = useCallback(async (address: string) => {
    const tokenId = await readContract(config, {
      address: MEME_COMPOSE_NFT_CONTRACT as Hash,
      abi: NovaComposeNFT,
      functionName: 'tokenOfOwnerByIndex',
      args: [address, 0],
      chainId: NOVA_CHAIN_ID,
    });
    return tokenId as number;
  }, []);

  const getComposeTokenURIByTokenId = useCallback(async (tokenId: number) => {
    const tokenURI = await readContract(config, {
      address: MEME_COMPOSE_NFT_CONTRACT as Hash,
      abi: NovaComposeNFT,
      functionName: 'tokenURI',
      args: [tokenId],
      chainId: NOVA_CHAIN_ID,
    });
    return tokenURI as string;
  }, []);

  const fetchComposeNftInfo = async (address: string) => {
    try {
      setIsFetchingNfts(true);
      const tokenId = await getComposeTokenIdByIndex(address);
      const tokenURI = await getComposeTokenURIByTokenId(tokenId);
      const balance = await getMemeComposeNftBalance(address);
      const nft = await fetchMetadataByURI(tokenURI, tokenId.toString());
      const composeNftInfo = { tokenId, balance, info: nft };
      setComposeNftInfo(composeNftInfo);
    } catch (error) {
      console.error('Error fetching compose NFT info:', error);
    } finally {
      setIsFetchingNfts(false);
    }
  };

  const fetchMemeNftBalances = async (address: string) => {
    try {
      setIsFetchingNfts(true);
      const tokenIds = ['1', '2', '3', '4', '5', '6', '7'];
      const balances = await getAddressBalancesForTokenIds(address, tokenIds);
      console.log('Meme NFT balances:', balances);
      setMemeNftBalances(balances);
    } catch (error) {
      console.error('Error fetching Meme NFT balances:', error);
    } finally {
      setIsFetchingNfts(false);
    }
  };

  const fetchNovaNft = useCallback(
    async (address: string): Promise<NovaNft | undefined> => {
      try {
        setIsFetchingNfts(true);
        const balance = await getMemeNftBalance(address);
        if (BigNumber.from(balance).eq(0)) {
          return;
        }
        const tokenId = 4;
        const tokenURI = await getTokenURIByTokenId(tokenId);
        const nft = await fetchMetadataByURI(tokenURI, tokenId.toString());
        setNovaNft(nft);
        return nft;
      } catch (error) {
        console.error('Error fetching Nova NFT:', error);
      } finally {
        setIsFetchingNfts(false);
      }
    },
    [getMemeNftBalance, getTokenIdByIndex, getTokenURIByTokenId],
  );

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
      await fetchNovaNft(address);
    } catch (error) {
      console.error('Error minting Nova NFT:', error);
      if (error.message && error.message?.includes('not found')) {
        // View not found. Try fetchNovaNft again.
        await fetchNovaNft(address);
        return;
      }
      throw error;
    } finally {
      setIsMinting(false);
    }
  };

  useEffect(() => {
    if (address) {
      fetchMemeNftBalances(address);
    }
  }, [address]);

  useEffect(() => {
    if (address) {
      fetchNovaNft(address);
      fetchComposeNftInfo(address);
    }
  }, [address, fetchNovaNft]);

  return {
    getMemeNftBalance,
    fetchNovaNft,
    mintNovaNft,
    novaNft,
    composeNftInfo,
    memeNftBalances,
    isMinting,
    isFetchingNfts,
  };
};

export default useMemeNft;
