import { Tab } from '@headlessui/react';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/20/solid';
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
import type { Token } from 'types/token';
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

export default function Bridge(props: IBridgeComponentProps) {
  const { onClose, bridgeToken } = props;
  const { openConnectModal } = useConnectModal();

  const { isConnected, address, chainId } = useAccount();
  // const fromModal = useDisclosure();
  // const tokenModal = useDisclosure();
  // const transLoadModal = useDisclosure();
  // const transSuccModal = useDisclosure();
  // const transFailModal = useDisclosure();
  const [failMessage, setFailMessage] = useState('');
  // const chainId = useChainId();
  const { switchChainAsync } = useSwitchChain();
  const { sendDepositTx, loading } = useBridgeTx();
  const [amount, setAmount] = useState('0.01');

  const [url, setUrl] = useState('');
  // const { isActiveUser } = useSelector((store: RootState) => store.airdrop)
  const isActiveUser = false;

  const isFirstDeposit = useMemo(() => {
    return !isActiveUser;
  }, [isActiveUser]);

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

  useEffect(() => {
    if (bridgeToken && !bridgeTokenInited) {
      const token = tokenList.find((item) =>
        bridgeToken.indexOf('0x') > -1 ? isSameAddress(item.address, bridgeToken) : item.symbol === bridgeToken,
      );
      if (token) {
        const _tokenList = tokenList.filter((item) => item.networkKey === token.networkKey);
        let index = 0;
        let fromIndex = fromList.findIndex((item) => item.networkKey === token.networkKey);
        if (fromIndex < 0) {
          fromIndex = 0;
        }
        const from = fromList[fromIndex];
        if (token.address !== ETH_ADDRESS) {
          index = _tokenList.findIndex((item) => item.address === token.address);
          setTokenActive(index);
        }
        setFromActive(fromIndex);
        setNetworkKey(from.networkKey);
      } else {
        setFromActive(0);
        setTokenActive(0);
        setNetworkKey(fromList[0].networkKey);
      }
      if (tokenList.length > 1) {
        setBridgeTokenInited(true);
      }
    } else {
      const network = localStorage.getItem(STORAGE_NETWORK_KEY);
      if (network) {
        setNetworkKey(network);
        if (fromList[0].networkKey !== network) {
          const index = fromList.findIndex((item) => item.networkKey === network);
          if (index > -1) {
            setFromActive(index);
          }
        }
      } else if (!network) {
        setNetworkKey(fromList[0].networkKey);
      }
    }
  }, [setNetworkKey, isFirstDeposit, bridgeToken, tokenList, bridgeTokenInited]);

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

  const handleAction = useCallback(async () => {
    //TODO: add custom chain selection & token selection
    handleFrom(0);
    if (!address || !nativeTokenBalance) return;
    if (invalidChain) {
      try {
        setSwitchLoading(true);
        await switchChainAsync({ chainId: fromList[fromActive].chainId });
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
      // transLoadModal.onClose()
      // dispatch(setDepositStatus(""));

      if (e.message) {
        if (e.message.includes('Insufficient Gas Token Balance')) {
          setFailMessage(e.message);
        } else if (e.message.includes('User rejected the request' || e.message.includes('OKX Wallet Reject'))) {
          setFailMessage('User rejected the request');
        } else if (e.message.includes('Internal JSON-RPC error ')) {
          setFailMessage('Internal JSON-RPC error. Please try again');
        } else {
          setFailMessage(e.message);
        }
      }

      // transFailModal.onOpen();
      // setTimeout(() => {
      //   transFailModal.onClose();
      // }, 10000);
      return;
    }

    refreshTokenBalanceList();

    onClose?.();
  }, [
    address,
    nativeTokenBalance,
    invalidChain,
    amount,
    // transLoadModal,
    refreshTokenBalanceList,
    onClose,
    switchChainAsync,
    fromActive,
    sendDepositTx,
    tokenFiltered,
    tokenActive,
    isMergeSelected,
    addTxHash,
    // transSuccModal,
    networkKey,
    // transFailModal,
  ]);

  console.log(tokenFiltered, fromList, 'fromList');

  return (
    <>
      <>
        {isConnected ? (
          <>
            <Button
              className='backButton cursor-pointer'
              style={{ display: 'flex', alignItems: 'center' }}
              size='lg'
              onClick={handleAction}
              loading={loading}
              disabled={actionBtnDisabled}
            >
              {btnText}
            </Button>
          </>
        ) : (
          <Button className='backButton cursor-pointer' size='lg' color='primary' onClick={() => openConnectModal?.()}>
            Connect Wallet
          </Button>
        )}
        {unsupportedChainWithConnector && (
          <p className='mt-4 text-[14px] text-[#C57D10]'>{unsupportedChainWithConnector}</p>
        )}
      </>
      {/* <Modal
        classNames={{ closeButton: 'text-[1.5rem]' }}
        style={{ minHeight: '600px', backgroundColor: 'rgb(38, 43, 51)' }}
        size='2xl'
        isOpen={fromModal.isOpen}
        onOpenChange={fromModal.onOpenChange}
        scrollBehavior='inside'
      >
        <ModalContent className='mb-[3.75rem]'>
          <ModalHeader className='flex flex-col gap-1 text-[1.25rem] md:text-3xl'>From</ModalHeader>
          <ModalBody className='pb-8'>
            {fromList.map((item, index) => (
              <div
                className='flex cursor-pointer items-center justify-between p-4'
                key={index}
                onClick={() => handleFrom(index)}
              >
                <div className='flex items-center'>
                  <Avatar src={item.icon} className='h-8 w-8 md:h-12 md:w-12' />
                  <span className='ml-4 text-xl'>{item.label}</span>
                </div>
              </div>
            ))}
          </ModalBody>
        </ModalContent>
      </Modal>

      <Modal
        classNames={{ closeButton: 'text-[1.5rem]' }}
        style={{ minHeight: '600px', backgroundColor: 'rgb(38, 43, 51)' }}
        size='2xl'
        isOpen={tokenModal.isOpen}
        onOpenChange={tokenModal.onOpenChange}
      >
        <ModalContent className='mb-[3.75rem]'>
          <ModalHeader className='flex flex-col gap-1 text-[1.25rem] md:text-3xl'>Choose Token</ModalHeader>
          <ModalBody className='pb-8'>
            <p>Category</p>
            <Tabs
              aria-label='Options'
              classNames={{ tabList: 'w-full', tab: 'w-auto' }}
              selectedKey={category}
              onSelectionChange={(key: React.Key) => setCategory(key as string)}
            >
              {AssetTypes.map((item) => (
                <Tab key={item.value} title={item.label}></Tab>
              ))}
            </Tabs>
            <div className='h-[370px] overflow-scroll md:h-[500px]'>
              {tokenFiltered.map((item, index) => (
                <div
                  className='flex cursor-pointer items-center justify-between p-4'
                  key={index}
                  onClick={() => handeToken(index)}
                >
                  <div className='flex items-center'>
                    <Avatar src={item?.icon} className='h-12 w-12' />
                    <div className='ml-4 text-xl '>
                      <span>{item?.symbol}</span>
                    </div>
                  </div>

                  <span className='text-base'>{item?.formatedBalance}</span>
                </div>
              ))}
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
      <Modal
        classNames={{ closeButton: 'text-[1.5rem]' }}
        style={{ minHeight: '300px', backgroundColor: 'rgb(38, 43, 51)' }}
        size='xl'
        isOpen={transLoadModal.isOpen}
        onOpenChange={transLoadModal.onOpenChange}
        className='trans'
      >
        <ModalContent className='mb-[3.75rem]'>
          <ModalBody className='pb-8'>
            <>
              <Button className='statusBut' size='lg' loading={loading} disabled={actionBtnDisabled}></Button>
              <div className='title'>{!isDepositErc20 ? 'Depositing' : 'Sending Transaction'}</div>
              <div className='inner'>
                <p>Please sign the transaction in your wallet.</p>
                <p className='mt-2'>
                  If the transaction doesn't show up in your wallet after a minute or if the deposit keeps pending,
                  please refresh the page and try again.
                </p>
              </div>
            </>
          </ModalBody>
        </ModalContent>
      </Modal>
      <Modal
        classNames={{ closeButton: 'text-[1.5rem]' }}
        style={{ minHeight: '300px', backgroundColor: 'rgb(38, 43, 51)' }}
        size='xl'
        isOpen={transSuccModal.isOpen}
        onOpenChange={transSuccModal.onOpenChange}
        className='trans'
      >
        <ModalContent className='mb-[3.75rem]'>
          <ModalBody className='pb-8'>
            <>
              <img src='/img/transSuccess.png' alt='' className='statusImg' />
              <div className='title'>Transaction Submitted</div>
              <div className='inner'>Please allow a few minutes for your deposit to be confirmed on zkLink Nova.</div>
              <a href={url} target='_blank' className='view' onClick={transSuccModal.onClose}>
                View in explorer
              </a>
            </>
          </ModalBody>
        </ModalContent>
      </Modal>
      <Modal
        classNames={{ closeButton: 'text-[1.5rem]' }}
        style={{ minHeight: '300px', backgroundColor: 'rgb(38, 43, 51)' }}
        size='xl'
        isOpen={transFailModal.isOpen}
        onOpenChange={transFailModal.onOpenChange}
      >
        <ModalContent className='mb-[3.75rem]'>
          <ModalBody className='pb-8'>
            <>
              <img src='/img/transFail.png' alt='' className='statusImg' />
              <div className='title'>Transaction Failed</div>
              <div className='title'>
                {failMessage.toLowerCase().includes('missing or invalid parameters')
                  ? 'User rejected signature'
                  : failMessage}
              </div>
              {failMessage.includes('Insufficient Gas Token Balance') && (
                <p className='inner'>
                  If you do have enough gas tokens in your wallet, you could try using a
                  <a href='https://chainlist.org/' target='_blank' className='view inline'>
                    VPN
                  </a>
                  or switching to a different RPC in your wallet.
                </p>
              )}
              <div className='inner'>
                If you have any questions regarding this transaction, please{' '}
                <a
                  href='https://discord.com/invite/zklink'
                  target='_blank'
                  className='view inline'
                  onClick={transFailModal.onClose}
                >
                  contact us
                </a>
                for help
              </div>
            </>
          </ModalBody>
        </ModalContent>
      </Modal> */}
    </>
  );
}
