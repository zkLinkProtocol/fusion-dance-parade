/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { readContract } from '@wagmi/core';
import { config, nodeType } from 'config/zklin-networks';
import NovaMeMeAxisNft from 'constants/contracts/abis/NovaMemeAxisNFT.json';
import NovaComposeNFT from 'constants/contracts/abis/NovaMemeCrossNFT.json';
import NovaNFT from 'constants/contracts/abis/NovaNFT.json';
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

export type NOVA_NFT_TYPE = 'ISTP' | 'ESFJ' | 'INFJ' | 'ENTP';
export type NOVA_NFT = {
  name: string;
  description: string;
  image: string;
};
const useMintNft = () => {
  const publicClient = usePublicClient({ config, chainId: NOVA_CHAIN_ID });
  const { data: walletClient } = useWalletClient();
  const [nft, setNFT] = useState<NOVA_NFT>();
  const { address } = useAccount();
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(false);
  const [resultArr, setResultArr] = useState<any[]>([]);
  const [composeNftInfo, setComposeNftInfo] = useState<any>({});

  const getNFTBalance = useCallback(async (address: string) => {
    const balance = await readContract(config, {
      abi: NovaMeMeAxisNft,
      address: MEME_NFT_CONTRACT as `0x${string}`,
      functionName: 'balanceOf',
      args: [address, 4],
      chainId: NOVA_CHAIN_ID,
    });

    const balance2 = await readContract(config, {
      abi: NovaMeMeAxisNft,
      address: MEME_NFT_CONTRACT as `0x${string}`,
      functionName: 'balanceOfBatch',
      args: [
        [address, address, address, address, address, address, address],
        [1, 2, 3, 4, 5, 6, 7],
      ],
      chainId: NOVA_CHAIN_ID,
    });

    console.log('meme nft balance: ', balance, balance2);
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
    console.log('tokenId: ', tokenId);
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
    console.log('tokenURI: ', tokenURI);
    return tokenURI as string;
  }, []);

  //ipfs://QmYY5RWPzGEJEjRYhGvBhycYhZxRMxCSkHNTxtVrrjUzQf/ISTP
  const fetchMetadataByURI = async (uri: string) => {
    //fix: some user may fail for access IPFS fail
    if (uri.startsWith('ipfs://')) {
      uri = uri.substring(7);
    }
    const res = await fetch(`https://ipfs.io/ipfs/${uri}`);
    const json = await res.json();
    const result = {
      name: json.name,
      description: json.description,
      image: `https://ipfs.io/ipfs/${json.image.substring(7)}`,
    };
    console.log(json.image.substring(7), 'result');
    return result;
  };

  //meme-nft
  const getMemeNFTBalance = async (address: string, tokenId: string) => {
    const balance = await readContract(config, {
      abi: NovaMeMeAxisNft,
      address: MEME_NFT_CONTRACT as `0x${string}`,
      functionName: 'balanceOf',
      args: [address, tokenId],
      chainId: NOVA_CHAIN_ID,
    });
    return balance;
  };

  const getAddressBalancesForTokenIds = async (address: string, tokenIds: string[]) => {
    const balances = await Promise.all(
      map(tokenIds, async (tokenId) => {
        const balance = await getMemeNFTBalance(address, tokenId);
        const tokenURI = await getTokenURIByTokenId(tokenId);
        const nft = await fetchMetadataByURI(tokenURI);
        return { tokenId, balance, nft };
      }),
    );
    const nonZeroBalances = balances.filter((item) => Number(item.balance) !== 0);
    return nonZeroBalances;
  };
  //meme-compose-nft
  const getMemeComposeNFTBalance = async (address: string) => {
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

  const getComposeNftArray = async (address) => {
    try {
      setFetchLoading(true);
      const tokenId = await getComposeTokenIdByIndex(address);
      const tokenURI = await getComposeTokenURIByTokenId(tokenId);
      const balance = await getMemeComposeNFTBalance(address);
      const nft = await fetchMetadataByURI(tokenURI);
      const final = { tokenId, balance, info: nft };
      setComposeNftInfo(final);
    } catch (e) {
      console.error(e);
    } finally {
      setFetchLoading(false);
    }
  };

  const fetchNftCollections = async (address) => {
    try {
      setFetchLoading(true);
      const tokenIds = [1, 2, 3, 4, 5, 6, 7];
      const balances = await getAddressBalancesForTokenIds(address, tokenIds);
      setResultArr(balances);
    } catch (e) {
      console.error(e);
    } finally {
      setFetchLoading(false);
    }
  };

  const getNFT = useCallback(
    async (address: string): Promise<NOVA_NFT | undefined> => {
      try {
        setFetchLoading(true);
        const balance = await getNFTBalance(address);
        if (BigNumber.from(balance).eq(0)) {
          return;
        }
        const tokenId = 4;
        //await getTokenIdByIndex(address)
        const tokenURI = await getTokenURIByTokenId(tokenId);
        const nft = await fetchMetadataByURI(tokenURI);
        setNFT(nft);
        return nft as NOVA_NFT;
      } catch (e) {
        console.error(e);
      } finally {
        setFetchLoading(false);
      }
    },
    [getNFTBalance, getTokenIdByIndex, getTokenURIByTokenId],
  );

  const sendMintTx = async (address: string, type: NOVA_NFT_TYPE) => {
    if (!address) return;
    try {
      setLoading(true);
      const params = await getMemeMintSignature(address);
      const amount = 1;
      const signature = params.result?.signature;
      if (!signature) return Promise.reject(new Error('You are not authorized, please contact us for help.'));
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
      console.log('zksync chain fee for ETH', fee);

      tx.maxFeePerGas = fee.maxFeePerGas.toBigInt();
      tx.maxPriorityFeePerGas = fee.maxPriorityFeePerGas.toBigInt();
      tx.gas = fee.gasLimit.toBigInt();
      const hash = (await walletClient?.writeContract(tx)) as `0x${string}`;
      await sleep(1000); //wait to avoid waitForTransactionReceipt failed
      const res = await publicClient?.waitForTransactionReceipt({
        hash,
      });
      console.log(res);
      await getNFT(address);
    } catch (e) {
      console.error(e);
      if (e.message && e.message?.includes('not found')) {
        //viewm not found. try getNFT again
        await getNFT(address);
        return;
      }
      return Promise.reject(e);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (address) {
      fetchNftCollections(address);
    }
  }, [address]);

  useEffect(() => {
    if (address) {
      getNFT(address);
      getComposeNftArray(address);
    }
  }, [address, getNFT]);

  return {
    getNFTBalance,
    getNFT,
    sendMintTx,
    nft,
    composeNftInfo,
    resultArr,
    loading,
    fetchLoading,
  };
};

export default useMintNft;
