import classNames from 'classnames';
import { config } from 'config/zklin-networks';
import NovaMeMeNft from 'constants/contracts/abis/NovaMemeAxisNFT.json';
import NovaComposeNFT from 'constants/contracts/abis/NovaMemeCrossNFT.json';
import { getRemainDrawCount } from 'constants/api';
import {
  IS_MAINNET,
  LYNKS_NFT_MARKET_URL,
  MEME_COMPOSE_NFT_CONTRACT,
  MEME_NFT_CONTRACT,
  MintStatus,
  NOVA_CHAIN_ID,
  TRADEMARK_NFT_MARKET_URL,
} from 'constants/zklink-config';
// import type { NOVA_NFT_TYPE } from 'hooks/nft/useNft';
// import useNovaNFT from 'hooks/nft/useNft';
// import { useMintStatus } from 'hooks/useMintStatus';
import { zkSyncProvider } from 'providers/zksync-provider';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { toast } from 'sonner';
import { formatBalance } from 'utils/time';
import type { Hash, WriteContractParameters } from 'viem';
import { encodeFunctionData, getContract } from 'viem';
import { useAccount, useBalance, usePublicClient, useSwitchChain, useWalletClient } from 'wagmi';
import { sleep } from 'zksync-web3/build/src/utils';

import MultiSelectContent from './multi-select-content';
import { useMintStatus } from 'features/nft/hooks/useMintStatus';
import { Button } from './ui/buttons/button';
import useMemeNft from 'features/nft/hooks/useMemeNft';
import { Toast } from './ui/toast';
// import { Button } from './ui/button';

//tokenId from api => image id of frontend
const TRADEMARK_TOKEN_ID_MAP: Record<number, string> = {
  1: 'Oak Tree Roots',
  2: 'Magnifying Glass',
  3: 'Chess Knight',
  4: 'Binary Code Metrix Cube',
  6: '+1 Nova points',
  7: '+5 Nova points',
  8: '+10 Nova points',
  9: '+50 Nova points',
  88: 'Lynks',
};

const getDrawIndexWithPrizeTokenId = (tokenId: number) => {
  return Object.keys(TRADEMARK_TOKEN_ID_MAP).findIndex((key) => Number(key) === tokenId);
};
export default function Merge({sendStatus}) {
  // const mintModal = useDisclosure();
  // const drawModal = useDisclosure();
  // const trademarkMintModal = useDisclosure();
  // const upgradeModal = useDisclosure();
  const { address, chainId } = useAccount();
  // const chainId = useChainId({ config });
  const { switchChain } = useSwitchChain();

  const { refreshBalanceId, updateRefreshBalanceId } = useMintStatus();

  const { memeNftBalances, composeNftInfo } = useMemeNft();

  const [mintType, setMintType] = useState<any>('ISTP');
  const [remainDrawCount, setRemainDrawCount] = useState<number>(0);
  const [update, setUpdate] = useState(0);
  const [trademarkMintStatus, setTrademarkMintStatus] = useState<MintStatus | undefined>();
  const [drawedNftId, setDrawedNftId] = useState<number>();
  const [drawing, setDrawing] = useState(false);
  const drawRef = useRef<{ start: (target: number) => void }>();
  const [failMessage, setFailMessage] = useState('');
  const [upgradable, setUpgradable] = useState(false);
  const [mintResult, setMintResult] = useState<{ name: string; img: string }>();
  const [lynksBalance, setLynksBalance] = useState(0);

  const [isTrademarkApproved, setIsTrademarkApproved] = useState(false);
  const [isApproving, setIsApproving] = useState(false);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const publicClient = usePublicClient({ config, chainId: NOVA_CHAIN_ID });
  const { data: walletClient } = useWalletClient();
  // useEffect(() => {
  //   console.log('nft: ', nft);
  //   console.log('upgradable: ', upgradable);
  // }, [nft, upgradable]);

  useEffect(() => {
    if (address) {
      getRemainDrawCount(address).then((res) => {
        console.log('remain draw count: ', res);
        const { remainNumber, tokenId } = res.result;
        tokenId && setDrawedNftId(Number(tokenId));
        setRemainDrawCount(remainNumber);
      });
    }
  }, [address, update]);

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
        abi: NovaMeMeNft,
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
    console.log('tokenIds', tokenIds);
    try {
      setLoading(true);
      const tx: WriteContractParameters = {
        address: MEME_COMPOSE_NFT_CONTRACT as Hash,
        abi: NovaComposeNFT,
        functionName: 'safeMint',
        args: [address, [...tokenIds]],
      };
      console.log('tx', tx);
      await insertEstimateFee(tx);
      const hash = (await walletClient?.writeContract(tx)) as `0x${string}`;
      await sleep(1000); //wait to avoid waitForTransactionReceipt failed
      const res = await publicClient?.waitForTransactionReceipt({
        hash,
      });
      console.log(res);
    } catch (e) {
      console.error(e);
      return Promise.reject(e);
    } finally {
      setLoading(false);
    }
  };

  const handleUpgrade = useCallback(async () => {
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
      setTrademarkMintStatus(MintStatus.Minting);
      if (!isTrademarkApproved) {
        await sendTrademarkApproveTx(address);
        toast.success('Congrats! Approve completed!');
      }
      await sendUpgradeSBTTx(address);
      setTrademarkMintStatus(MintStatus.Success);
      updateRefreshBalanceId();
      setUpdate((update) => update + 1);
      sendStatus(true)
    } catch (e: any) {
      console.log(e);
      setTrademarkMintStatus(MintStatus.Failed);

      if (e?.message.includes('User rejected the request')) {
        // toast.error('Request rejected');
        toast.custom((t) => <Toast type='error' id={t} title='Failed' description='User rejected the request' />);
        return;
      }
      toast.custom((t) => <Toast type='error' id={t} title='Failed' description='Upgrade Nft failed' />);
    } finally {
      toast.dismiss();
    }
  }, [
    address,
    isInvaidChain,
    isTrademarkApproved,
    sendTrademarkApproveTx,
    sendUpgradeSBTTx,
    switchChain,
    updateRefreshBalanceId,
  ]);

  const maxAllowed = 2;
  const tags = memeNftBalances;
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
      abi: NovaMeMeNft,
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

  return (
    <>
      <div className='flex md:gap-4 gap-2 flex-wrap'>
        <MultiSelectContent tags={tags} onClick={handleClickTag} isSelectedTag={isSelectedTag} />
      </div>
      <div className='flex flex-col items-center'>
        <div className='flex w-full items-center'>
          <Button
            className={classNames(
              'w-full max-md:px-5 max-md:max-w-full mt-6 items-center justify-center rounded-lg bg-[linear-gradient(90deg,#6276E7_0%,#E884FE_100%)] px-2.5 py-1 text-2xl font-black leading-[56px] tracking-tight text-white',
              {
                'opacity-50 cursor-not-allowed': isInvaidChain || !isReachedLimit || loading,
              },
            )}
            onClick={handleUpgrade}
            disabled={isInvaidChain || !isReachedLimit || loading}
            loading={loading}
          >
            Upgrade
          </Button>
        </div>
      </div>
    </>
  );
}
