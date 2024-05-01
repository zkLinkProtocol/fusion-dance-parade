import classNames from 'classnames';
import { config } from 'config/zklin-networks';
import NovaInfinityStonesNFT from 'constants/contracts/abis/NovaInfinityStonesNFT.json';
import NovaChadNFT from 'constants/contracts/abis/NovaChadNFT.json';
import { getMemeMintChadNumber, getMergeSignature } from 'constants/api';
import { IS_MAINNET, MEME_COMPOSE_NFT_CONTRACT, MEME_NFT_CONTRACT, NOVA_CHAIN_ID } from 'constants/zklink-config';
import { zkSyncProvider } from 'providers/zksync-provider';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { toast } from 'sonner';
import { formatBalance } from 'utils/time';
import type { Hash, WriteContractParameters } from 'viem';
import { encodeFunctionData, getContract } from 'viem';
import { useAccount, useBalance, usePublicClient, useSwitchChain, useWalletClient } from 'wagmi';

import MultiSelectContent from './multi-select-content';
import { Button } from './ui/buttons/button';
import useMemeNft, { useBatchBalancesStore } from 'features/nft/hooks/useMemeNft';
import { Toast } from './ui/toast';
import { useModalStore } from 'pages';
import { motion, AnimatePresence } from 'framer-motion';
import { create } from 'zustand';

interface MintLimitState {
  mintLimit: number | null;
  setMintLimit: (limit: number | null) => void;
}

export const useMintLimitStore = create<MintLimitState>((set) => ({
  mintLimit: null,
  setMintLimit: (limit: number | null) => set({ mintLimit: limit }),
}));

export default function Merge() {
  const { address, chainId } = useAccount();
  // const chainId = useChainId({ config });
  const { switchChain, isPending } = useSwitchChain();

  const { batchBalances } = useBatchBalancesStore();

  const { fetchMemeNftBalances } = useMemeNft();
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const { mintLimit, setMintLimit } = useMintLimitStore();

  const [isTrademarkApproved, setIsTrademarkApproved] = useState(false);
  const [isApproving, setIsApproving] = useState(false);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const publicClient = usePublicClient({ config, chainId: NOVA_CHAIN_ID });
  const { data: walletClient } = useWalletClient();
  const isInvaidChain = useMemo(() => {
    return chainId !== NOVA_CHAIN_ID;
  }, [chainId]);

  const { data: nativeTokenBalance } = useBalance({
    config,
    address: address as `0x${string}`,
    chainId: NOVA_CHAIN_ID,
    token: undefined,
  });

  const novaBalance = useMemo(() => {
    if (nativeTokenBalance) {
      return formatBalance(nativeTokenBalance?.value ?? 0n, 18);
    }
    return 0;
  }, [nativeTokenBalance]);
  console.log('nativeTokenBalance: ', nativeTokenBalance);

  const sendTrademarkApproveTx = async (address: string) => {
    if (!address) return;
    try {
      setIsApproving(true);
      const tx: WriteContractParameters = {
        address: MEME_NFT_CONTRACT as Hash,
        abi: NovaInfinityStonesNFT,
        functionName: 'setApprovalForAll',
        args: [MEME_COMPOSE_NFT_CONTRACT, true],
      };
      const hash = (await walletClient?.writeContract(tx)) as `0x${string}`;
      const res = await publicClient?.waitForTransactionReceipt({
        hash,
      });
      console.log(res, 'approval-res');
      setIsTrademarkApproved(true);
    } catch (e) {
      console.error(e);
      return Promise.reject(e);
    } finally {
      setIsApproving(false);
    }
  };

  //nodeType === 'nexus-sepolia' ? 'https://sepolia.rpc.zklink.io' :
  const insertEstimateFee = async (tx: WriteContractParameters) => {
    const txData = encodeFunctionData({
      abi: tx.abi,
      functionName: tx.functionName,
      args: tx.args,
    });
    const fee = await zkSyncProvider.attachEstimateFee(
      IS_MAINNET ? 'https://rpc.zklink.io' : 'https://sepolia.rpc.zklink.io',
    )({
      from: address as `0x${string}`,
      to: tx.address,
      value: '0x00',
      data: txData,
    });
    console.log('zksync chain fee for ETH', fee);

    tx.maxFeePerGas = fee.maxFeePerGas.toBigInt();
    tx.maxPriorityFeePerGas = fee.maxPriorityFeePerGas.toBigInt();
    tx.gas = fee.gasLimit.toBigInt();
  };

  const sendUpgradeSBTTx = async (address: string) => {
    if (!address) return;

    const tokenIds = selectedTags.map((tag) => tag.tokenId);
    try {
      setLoading(true);
      const formattedIds = tokenIds.map((id) => parseInt(id, 10));
      const params = await getMergeSignature(address, formattedIds);
      const signature = params.result?.signature;
      if (!signature) {
        throw new Error('You are not authorized. Please contact us for help.');
      }
      const tx: WriteContractParameters = {
        address: MEME_COMPOSE_NFT_CONTRACT as Hash,
        abi: NovaChadNFT,
        functionName: 'compositeWithAuth',
        args: [
          address,
          params.result.nonce,
          params.result.tokenIds,
          Array.from({ length: params.result.tokenIds.length }, () => 1),
          params.result.expiry,
          params.result.mintType,
          params.result.signature,
        ],
      };
      await insertEstimateFee(tx);
      const hash = (await walletClient?.writeContract(tx)) as `0x${string}`;
      await publicClient?.waitForTransactionReceipt({
        hash,
      });
      fetchMemeNftBalances(address);
    } catch (e) {
      console.error(e);
      return Promise.reject(e);
    } finally {
      setLoading(false);
    }
  };

  const handleUpgrade = useCallback(async () => {
    await getMemeMintChadNumber();
    if (!address) return;
    if (isInvaidChain) {
      switchChain(
        { chainId: NOVA_CHAIN_ID },
        {
          onError: (e) => {
            console.log(e);
          },
        },
      );
      return;
    }
    try {
      toast.custom(
        (t) => <Toast type='loading' id={t} title='Pending Transaction' description='Summoning selected Axis Nft...' />,
        { duration: Infinity },
      );
      if (!isTrademarkApproved) {
        await sendTrademarkApproveTx(address);
        toast.custom((t) => <Toast type='success' id={t} title='Success' description='Congrats! Approve completed!' />);
      }
      await sendUpgradeSBTTx(address);
      toast.custom((t) => <Toast type='success' id={t} title='Success' description='Congrats! Upgrade completed!' />);
      setIsVideoModalOpen(true);
    } catch (e: any) {
      console.log(e);

      if (e?.message.includes('User rejected the request')) {
        // toast.error('Request rejected');
        toast.custom((t) => <Toast type='error' id={t} title='Failed' description='User rejected the request' />);
        return;
      }
      toast.custom((t) => <Toast type='error' id={t} title='Failed' description='Upgrade Nft failed' />);
    } finally {
      await getMemeMintChadNumber();
      setSelectedTags([]);
      toast.dismiss();
    }
  }, [address, isInvaidChain, isTrademarkApproved, sendTrademarkApproveTx, sendUpgradeSBTTx, switchChain]);

  const maxAllowed = mintLimit !== null ? mintLimit : 0;
  const tags = batchBalances;
  const isReachedLimit = selectedTags?.length >= maxAllowed;

  const isSelectedTag = (t: any) => !!selectedTags?.find((sTag) => sTag.tokenId === t.tokenId);
  const handleClickTag = (t: any) => {
    if (isSelectedTag(t)) {
      setSelectedTags((prev) => prev.filter((current) => current.tokenId !== t.tokenId));
      return;
    }

    if (isReachedLimit) {
      return;
    }

    setSelectedTags([...selectedTags, t]);
  };

  const memeNFTContractInstance = useMemo(() => {
    if (!publicClient) return null;
    return getContract({
      address: MEME_NFT_CONTRACT as Hash,
      abi: NovaInfinityStonesNFT,
      client: {
        public: publicClient,
        wallet: walletClient,
      },
    });
  }, [publicClient, walletClient]);

  useEffect(() => {
    (async () => {
      if (address && memeNFTContractInstance) {
        const isApproved = (await memeNFTContractInstance.read.isApprovedForAll([
          address,
          MEME_COMPOSE_NFT_CONTRACT,
        ])) as boolean;
        setIsTrademarkApproved(isApproved);
      }
    })();
  }, [address, memeNFTContractInstance]);

  useEffect(() => {
    (async () => {
      await getMemeMintChadNumber().then((res) => {
        if (res.result === null) {
          console.log('Minting limit reached: 10000');
          setMintLimit(null);
        } else {
          console.log('Chad number: ', res);
          const mintNumber = res.result;
          setMintLimit(mintNumber);
        }
      });
    })();
  }, []);
  return (
    <>
      <div className='flex flex-wrap gap-2 md:gap-4'>
        <MultiSelectContent tags={tags} onClick={handleClickTag} isSelectedTag={isSelectedTag} />
      </div>
      <div className='flex flex-col items-center'>
        <div className='flex w-full items-center'>
          <Button
            className={classNames(
              'w-full max-md:px-5 max-md:max-w-full mt-6 items-center justify-center rounded-lg bg-[linear-gradient(90deg,#6276E7_0%,#E884FE_100%)] px-2.5 py-1 text-2xl font-black leading-[56px] tracking-tight text-white',
              {
                'opacity-50 cursor-not-allowed': !isReachedLimit || loading,
              },
            )}
            onClick={handleUpgrade}
            disabled={!isReachedLimit || loading || isApproving}
            loading={loading || isPending || isApproving}
          >
            {isInvaidChain ? 'Switch to Nova Chain' : isApproving ? 'Approving' : 'Merge Now'}
          </Button>
        </div>
      </div>
      <MergeVideoModal toggleModal={setIsVideoModalOpen} isModalOpen={isVideoModalOpen} />
    </>
  );
}

const MergeVideoModal = ({
  isModalOpen,
  toggleModal,
}: {
  isModalOpen: boolean;
  toggleModal: (isOpen: boolean) => void;
}) => {
  const { toggleModal: toggleMergeModal } = useModalStore();

  const handleVideoEnd = () => {
    toggleModal(false);
    toggleMergeModal(true);
  };

  return (
    <AnimatePresence>
      {isModalOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75'
        >
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.8 }}
            transition={{ duration: 0.3 }}
            className='relative w-full'
          >
            <video autoPlay muted onEnded={handleVideoEnd} className='h-auto w-full'>
              <source src='/assets/videos/intro-video.mp4' type='video/mp4' />
            </video>
            <button onClick={() => toggleModal(false)} className='absolute right-4 top-4 text-2xl font-bold text-white'>
              &times;
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
