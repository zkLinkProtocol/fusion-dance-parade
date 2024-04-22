import { useConnectModal } from '@rainbow-me/rainbowkit';
import BigNumber from 'bignumber.js';
import { getDepositETHThreshold } from 'constants/api';
import fromList from 'constants/from-chain-list';
import FromList from 'constants/from-chain-list';
import { STORAGE_NETWORK_KEY } from 'constants/zklink-config';
import { useBridgeTx } from 'features/bridge/hooks/useBridge';
import { useBridgeNetworkStore } from 'features/bridge/hooks/useBridgeNetwork';
import useTokenBalanceList from 'features/bridge/hooks/useTokenList';
import { SourceTokenInfo, useMergeToken } from 'features/nft/hooks/useMergeToken';
import { useVerifyStore } from 'hooks/useVerifyStore';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { isSameAddress } from 'utils/time';
import { parseUnits } from 'viem';
import { useAccount, useSwitchChain } from 'wagmi';
import { useConnections } from 'wagmi';
import { ETH_ADDRESS } from 'zksync-web3/build/src/utils';
import { Button } from './ui/buttons/button';
import useMemeNft from 'features/nft/hooks/useMemeNft';
import type { Token } from 'types/token';
import { toast } from 'sonner';
import { NOVA_CHAIN_ID } from 'constants/zklink-config';
import { config } from 'config/zklin-networks';
import { Toast } from './ui/toast';

const AssetTypes = [
  { label: 'ALL', value: 'ALL' },
  {
    label: 'Native',
    value: 'NATIVE',
  },
  {
    label: 'Stable',
    value: 'Stablecoin',
  },
  {
    label: 'Synthetic',
    value: 'Synthetic',
  },
  {
    label: 'RWA',
    value: 'RWA',
  },
  {
    label: 'LST',
    value: 'LST',
  },
  {
    label: 'LRT',
    value: 'LRT',
  },
];
export interface IBridgeComponentProps {
  onClose?: () => void;
  bridgeToken?: string;
}

export default function Bridge({ data }: { data: any }) {
  const { openConnectModal } = useConnectModal();
  const { isConnected, address, chainId } = useAccount();
  const [failMessage, setFailMessage] = useState('');
  // const chainId = useChainId();
  // const { switchChainAsync } = useSwitchChain();
  const { sendDepositTx, loading } = useBridgeTx();
  const [amount, setAmount] = useState('0.001');

  const [url, setUrl] = useState('');
  const { chain, coin, chainId: selectedChainId, tokenBalance, hasMemeTokenBalance } = data;
  const { switchChain, switchChainAsync } = useSwitchChain();
  const { mintNovaNft, isMinting } = useMemeNft();
  const isInvaidChain = useMemo(() => {
    return chainId !== NOVA_CHAIN_ID;
  }, [chainId]);

  const [fromActive, setFromActive] = useState(0);
  const [tokenActive, setTokenActive] = useState(0);
  const { setNetworkKey, networkKey } = useBridgeNetworkStore();
  const { tokenList, refreshTokenBalanceList, allTokens, nativeTokenBalance } = useTokenBalanceList();

  const [minDepositValue, setMinDepositValue] = useState(0.1);
  const [category, setCategory] = useState(AssetTypes[0].value);
  const [tokenFiltered, setTokenFiltered] = useState<Token[]>([]);
  const [bridgeTokenInited, setBridgeTokenInited] = useState(false);
  const connections = useConnections();
  const [connectorName, setConnectorName] = useState('');
  const [switchLoading, setSwitchLoading] = useState(false);
  const [switchChainError, setSwitchChainError] = useState('');

  // const dispatch = useDispatch()

  const { addTxHash, txhashes } = useVerifyStore();

  const inputRef1 = useRef<HTMLInputElement>(null);
  const inputRef2 = useRef<HTMLInputElement>(null);
  const [isMergeSelected, setIsMergeSelected] = useState(true);
  const [mergeTokenInfo, setMergeTokenInfo] = useState<SourceTokenInfo>();

  const { fetchMergeTokenInfo } = useMergeToken();

  useEffect(() => {
    //https://github.com/ant-design/ant-design-mobile/issues/5174
    inputRef1.current?.addEventListener(
      'wheel',
      (event) => {
        event.preventDefault();
      },
      { passive: false },
    );
    inputRef2.current?.addEventListener(
      'wheel',
      (event) => {
        event.preventDefault();
      },
      { passive: false },
    );
  }, []);

  // useEffect(() => {
  //   const timer = setInterval(() => {
  //     refreshTokenBalanceList();
  //   }, 5000);
  //   return () => clearInterval(timer);
  // }, [refreshTokenBalanceList]);

  useEffect(() => {
    (async () => {
      const token = tokenFiltered[tokenActive];
      if (token && token.l2Address) {
        const info = await fetchMergeTokenInfo(token.l2Address);
        console.log('mergeInfo: ', info);
        setMergeTokenInfo(info);
      } else {
        setMergeTokenInfo(undefined);
      }
    })();
  }, [fetchMergeTokenInfo, tokenActive, tokenFiltered]);

  const mergeSupported = useMemo(() => {
    return mergeTokenInfo?.isSupported && !mergeTokenInfo?.isLocked;
  }, [mergeTokenInfo]);

  const mergeLimitExceeds = useMemo(() => {
    if (!amount) return false;
    const amountVal = parseUnits(String(amount), tokenFiltered[tokenActive]?.decimals);
    const exceeds = new BigNumber(amountVal.toString())
      .plus(mergeTokenInfo?.balance.toString() ?? 0)
      .gt(mergeTokenInfo?.depositLimit.toString() ?? 0);
    console.log('exceeds: ', exceeds);
    return mergeSupported && isMergeSelected && exceeds;
  }, [
    amount,
    tokenFiltered,
    tokenActive,
    mergeTokenInfo?.balance,
    mergeTokenInfo?.depositLimit,
    mergeSupported,
    isMergeSelected,
  ]);

  const unsupportedChainWithConnector = useMemo(() => {
    if (connectorName && fromList[fromActive]) {
      if (connectorName.toLowerCase().includes('binance') && fromList[fromActive].networkKey === 'mantle') {
        return 'Binance wallet may not support Mantle Network.';
      } else if (
        connectorName.toLowerCase().includes('gate') &&
        !['ethereum', 'arbitrum', 'zksync', 'optimism'].includes(fromList[fromActive].networkKey)
      ) {
        return `Gate wallet may not support ${fromList[fromActive].chainName} Network.`;
      }
    }
    return '';
  }, [fromActive, connectorName]);

  useEffect(() => {
    if (category === 'ALL') {
      const arr = [...tokenList];
      const ezEthIndex = arr.findIndex((item) => item.symbol === 'ezETH');
      const ezEthItem = arr.splice(ezEthIndex, 1);
      arr.splice(4, 0, ezEthItem[0]);

      console.log(tokenList, 'all token list');

      setTokenFiltered(arr);
    } else {
      const tokens = tokenList.filter((item) => item.type?.toUpperCase() === category.toUpperCase());
      setTokenFiltered(tokens);
    }
  }, [tokenList, category]);

  useEffect(() => {
    (async () => {
      const minDeposit = await getDepositETHThreshold();
      console.log('minDeposit: ', minDeposit);
      setMinDepositValue(minDeposit.ethAmount || 0.1);
    })();
  }, []);

  const errorInputMsg = useMemo(() => {
    if (mergeLimitExceeds) {
      return 'Input amount exceeds the merge limit.';
    }
    const token = tokenFiltered[tokenActive];
    const [_, decimals] = amount.split('.');
    if (token && decimals && decimals.length > token.decimals) {
      return `Max decimal length for ${token.symbol} is ${token.decimals}`;
    }
    return '';
  }, [tokenActive, tokenFiltered, amount, mergeLimitExceeds]);

  // useEffect(() => {
  //   if (bridgeToken && !bridgeTokenInited) {
  //     const token = tokenList.find((item) =>
  //       bridgeToken.indexOf('0x') > -1 ? isSameAddress(item.address, bridgeToken) : item.symbol === bridgeToken,
  //     );
  //     if (token) {
  //       const _tokenList = tokenList.filter((item) => item.networkKey === token.networkKey);
  //       let index = 0;
  //       let fromIndex = fromList.findIndex((item) => item.networkKey === token.networkKey);
  //       if (fromIndex < 0) {
  //         fromIndex = 0;
  //       }
  //       const from = fromList[fromIndex];
  //       if (token.address !== ETH_ADDRESS) {
  //         index = _tokenList.findIndex((item) => item.address === token.address);
  //         setTokenActive(index);
  //       }
  //       setFromActive(fromIndex);
  //       setNetworkKey(from.networkKey);
  //     } else {
  //       setFromActive(0);
  //       setTokenActive(0);
  //       setNetworkKey(fromList[0].networkKey);
  //     }
  //     if (tokenList.length > 1) {
  //       setBridgeTokenInited(true);
  //     }
  //   } else {
  //     const network = localStorage.getItem(STORAGE_NETWORK_KEY);
  //     if (network) {
  //       setNetworkKey(network);
  //       if (fromList[0].networkKey !== network) {
  //         const index = fromList.findIndex((item) => item.networkKey === network);
  //         if (index > -1) {
  //           setFromActive(index);
  //         }
  //       }
  //     } else if (!network) {
  //       setNetworkKey(fromList[0].networkKey);
  //     }
  //   }
  // }, [setNetworkKey, isFirstDeposit, bridgeToken, tokenList, bridgeTokenInited]);

  const handleFrom = (index: number) => {
    setFromActive(index);
    setTokenActive(0);
    setNetworkKey(fromList[index]?.networkKey);
    // fromModal.onClose();
  };

  const handeToken = (index: number) => {
    setTokenActive(index);
    // tokenModal.onClose();
  };

  const invalidChain = useMemo(() => {
    return chainId !== fromList[fromActive]?.chainId;
  }, [chainId, fromActive]);

  const actionBtnDisabled = useMemo(() => {
    if (!invalidChain && mergeLimitExceeds) {
      return true;
    } else if (!invalidChain && (!nativeTokenBalance || new BigNumber(nativeTokenBalance.toString()).eq(0))) {
      return true;
    } else if (unsupportedChainWithConnector) {
      return true;
    } else if (
      !invalidChain &&
      tokenFiltered[tokenActive] &&
      (!tokenFiltered[tokenActive].balance ||
        tokenFiltered[tokenActive].balance! <= 0 ||
        Number(tokenFiltered[tokenActive].formatedBalance) < Number(amount) ||
        Number(amount) <= 0 ||
        errorInputMsg)
    ) {
      return true;
    }
    return false;
  }, [
    nativeTokenBalance,
    unsupportedChainWithConnector,
    invalidChain,
    tokenFiltered,
    tokenActive,
    amount,
    errorInputMsg,
    mergeLimitExceeds,
  ]);

  const isDepositErc20 = useMemo(() => {
    return tokenFiltered[tokenActive] && tokenFiltered[tokenActive].address !== ETH_ADDRESS;
  }, [tokenActive, tokenFiltered]);
  const btnText = useMemo(() => {
    if (invalidChain) {
      return 'Switch Network';
    } else if (amount && tokenFiltered[tokenActive] && tokenFiltered[tokenActive].formatedBalance) {
      if (Number(amount) > Number(tokenFiltered[tokenActive].formatedBalance)) {
        return 'Insufficient balance';
      }
    } else if (isDepositErc20) {
      return 'Approve and Deposit';
    }
    return 'Deposit to Mint';
  }, [invalidChain, amount, tokenActive, tokenFiltered, isDepositErc20]);

  const handleInputValue = (v: string) => {
    if (!v) {
      setAmount(v);
    } else if (/^[0-9]*\.?[0-9]*$/.test(v)) {
      setAmount(v);
    }
  };

  useEffect(() => {
    setSwitchChainError('');
  }, [fromActive]);

  useEffect(() => {
    if (selectedChainId) {
      // const filterdIndex = fromList.findIndex((item) => item.chainId === selectedChainId);
      setFromActive(fromList.findIndex((item) => item.chainId === selectedChainId));
      // console.log(fromList[filterdIndex]?.networkKey, selectedChainId, 'networkKey-test');
      // setNetworkKey(fromList[filterdIndex]?.networkKey);
    }
  }, [fromActive, selectedChainId, fromList, chain]);

  //const selectedToken = tokenFiltered.filter((item) => item.symbol === coin?.toUpperCase());

  useEffect(() => {
    if (coin) {
      const index = tokenFiltered.findIndex((item) => item.symbol === coin.toUpperCase());
      if (index > -1) {
        setTokenActive(index);
      }
    }
  }, [coin, tokenFiltered]);

  const handleAction = useCallback(async () => {
    // TODO: remove || !nativeTokenBalance first, add button to notfiy user about their balance
    if (!address || !fromList[fromActive].chainId) return;
    if (invalidChain) {
      try {
        setSwitchLoading(true);
        await switchChainAsync({ chainId: fromList[fromActive].chainId });
        setNetworkKey(fromList[fromActive]?.networkKey);
        setSwitchChainError('');
        return;
      } catch (e: any) {
        console.log(e);
        if (e.message && e.message.includes('the method now not support')) {
          // imported wallet in binance not support some chain
          setSwitchChainError(
            `The Binance Web3 wallet may not be support ${fromList[fromActive].chainName} if you're using an imported wallet.`,
          );
          return;
        }
        setSwitchChainError('Switch network failed. Please refresh page and try again.');
      } finally {
        setSwitchLoading(false);
      }
      return;
    }
    if (!amount) {
      return;
    }

    // transLoadModal.onOpen()
    const time = setTimeout(() => {}, 100);
    for (let i = 0; i <= Number(time); i++) {
      clearTimeout(i);
    }
    try {
      const hash = await sendDepositTx(
        tokenFiltered[tokenActive]?.address as `0x${string}`,
        // utils.parseEther(String(amount))
        parseUnits(String(amount), tokenFiltered[tokenActive]?.decimals),
        nativeTokenBalance,
        mergeSupported && isMergeSelected,
      );
      if (!hash) {
        return;
      }
      //save tx hash
      const rpcUrl = FromList.find((item) => item.networkKey === networkKey)?.rpcUrl;
      addTxHash(address, hash, rpcUrl!);

      setUrl(`${fromList[fromActive].explorerUrl}/tx/${hash}`);
      // dispatch(setDepositL1TxHash(hash!))
      // transLoadModal.onClose()
      // dispatch(setDepositStatus("pending"));
      // transSuccModal.onOpen();
      // setTimeout(() => {
      //   transSuccModal.onClose();
      // }, 5000);
    } catch (e: any) {
      if (e.message) {
        if (e.message.includes('Insufficient Gas Token Balance')) {
          setFailMessage(e.message);
        } else if (e.message.includes('User rejected the request' || e.message.includes('OKX Wallet Reject'))) {
          setFailMessage('User rejected the request');
          toast.custom((t) => <Toast type='error' id={t} title='Failed' description='User rejected the request' />);
        } else if (e.message.includes('Internal JSON-RPC error ')) {
          setFailMessage('Internal JSON-RPC error. Please try again');
        } else {
          setFailMessage(e.message);
        }
      }
      return;
    }

    refreshTokenBalanceList();
  }, [
    address,
    nativeTokenBalance,
    invalidChain,
    amount,
    refreshTokenBalanceList,
    switchChainAsync,
    fromActive,
    sendDepositTx,
    tokenFiltered,
    tokenActive,
    isMergeSelected,
    addTxHash,
    networkKey,
  ]);

  const handleMint = useCallback(async () => {
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
      await mintNovaNft(address, chain, coin);
      toast.success('Successfully minted SBT!');
    } catch (e: any) {
      console.log(e);
      if (e.message) {
        if (e.message.includes('User rejected the request')) {
          toast.custom((t) => <Toast type='error' id={t} title='Failed' description='User rejected the request' />);
        } else if (e.message.includes('You already have a character')) {
          toast.error('You can mint SBT only once.');
        } else {
          toast.error(e.message);
        }
      } else {
        toast.error('Mint SBT failed');
      }
    }
  }, [address, isInvaidChain, switchChain, mintNovaNft]);

  //TODO: deposit-> check meme user balance & gas balance -> mint
  //TODO: chain token list

  console.log(fromList, fromActive, networkKey, 'networkKey-test');
  return (
    <>
      <>
        {isConnected ? (
          <>
            {hasMemeTokenBalance ? (
              <Button onClick={handleMint} loading={isMinting} className='backButton cursor-pointer'>
                <span>{isInvaidChain ? 'Switch to Nova network' : 'Mint'}</span>
              </Button>
            ) : (
              <Button
                className='backButton cursor-pointer'
                style={{ display: 'flex', alignItems: 'center' }}
                size='lg'
                onClick={handleAction}
                loading={loading}
                // disabled={actionBtnDisabled}
              >
                {btnText}
              </Button>
            )}
          </>
        ) : (
          <Button className='backButton cursor-pointer' size='lg' color='primary' onClick={() => openConnectModal?.()}>
            Connect Wallet
          </Button>
        )}
        {/* {unsupportedChainWithConnector && (
          <p className='mt-4 text-[14px] text-[#C57D10]'>{unsupportedChainWithConnector}</p>
        )} */}
      </>
    </>
  );
}


