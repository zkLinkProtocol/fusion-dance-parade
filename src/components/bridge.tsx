/* eslint-disable no-dupe-else-if */
import { useConnectModal } from '@rainbow-me/rainbowkit';
import BigNumber from 'bignumber.js';
import fromList from 'constants/from-chain-list';
import FromList from 'constants/from-chain-list';
import { useBridgeTx } from 'features/bridge/hooks/useBridge';
import { useBridgeNetworkStore } from 'features/bridge/hooks/useBridgeNetwork';
import useTokenBalanceList from 'features/bridge/hooks/useTokenList';
import { useVerifyStore } from 'hooks/useVerifyStore';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { parseUnits } from 'viem';
import { useAccount, usePublicClient, useSwitchChain } from 'wagmi';
import { ETH_ADDRESS } from 'zksync-web3/build/src/utils';
import { Button } from './ui/buttons/button';
import { toast } from 'sonner';
import { NOVA_CHAIN_ID } from 'constants/zklink-config';
import { Toast } from './ui/toast';
import { usePreCheckTxStore } from 'hooks/usePreCheckTxStore';

import { config } from 'config/zklink-networks';
import { formatBalance } from 'utils/time';
export interface IBridgeComponentProps {
  onClose?: () => void;
  bridgeToken?: string;
}

export default function Bridge({ data, mintNovaNft, isMinting, fetchMemeNftBalances, sendDepositTx, loading }: any) {
  const { openConnectModal } = useConnectModal();
  const novaClient = usePublicClient({ config: config, chainId: NOVA_CHAIN_ID });
  const { isConnected, address, chainId } = useAccount();
  const [amount, setAmount] = useState('1');
  const {
    chain,
    coin,
    chainId: selectedChainId,
    tokenBalance,
    hasMemeTokenBalance,
    isEligible,
    hasMint,
    balance,
  } = data;
  const { getDepositL2TxHash } = useBridgeTx();
  const { switchChain, switchChainAsync } = useSwitchChain();
  const isInvaidChain = useMemo(() => {
    return chainId !== NOVA_CHAIN_ID;
  }, [chainId]);

  const [fromActive, setFromActive] = useState(0);
  const [tokenActive, setTokenActive] = useState(0);
  const { setNetworkKey, networkKey } = useBridgeNetworkStore();
  const { tokenList, refreshTokenBalanceList, nativeTokenBalance, novaNativeTokenBalance } = useTokenBalanceList();

  const tokenFiltered = tokenList;

  const { precheckTxhashes, removePrecheckTxHash } = usePreCheckTxStore();
  const { addTxHash, txhashes } = useVerifyStore();

  const invalidChain = useMemo(() => {
    return chainId !== fromList[fromActive]?.chainId;
  }, [chainId, fromActive]);

  const actionBtnDisabled = useMemo(() => {
    if (!isEligible) return true;
    if (!invalidChain) {
      return true;
    } else if (!invalidChain && (!nativeTokenBalance || new BigNumber(nativeTokenBalance.toString()).eq(0))) {
      return true;
    } else if (
      !invalidChain &&
      tokenFiltered[tokenActive] &&
      (!tokenFiltered[tokenActive].balance ||
        tokenFiltered[tokenActive].balance! <= 0 ||
        Number(tokenFiltered[tokenActive].formatedBalance) < Number(amount) ||
        Number(amount) <= 0)
    ) {
      return true;
    }
    return false;
  }, [nativeTokenBalance, invalidChain, tokenFiltered, tokenActive, amount, isEligible]);

  const isDepositErc20 = useMemo(() => {
    return tokenFiltered[tokenActive] && tokenFiltered[tokenActive].address !== ETH_ADDRESS;
  }, [tokenActive, tokenFiltered]);
  const btnText = useMemo(() => {
    if (!isEligible) {
      return 'Unqualified';
    }
    if (invalidChain) {
      return 'Switch Network';
    } else if (!invalidChain && (!nativeTokenBalance || new BigNumber(nativeTokenBalance.toString()).eq(0))) {
      return 'Insufficient Gas Token';
    } else if (amount && tokenFiltered[tokenActive]) {
      if (Number(amount) > Number(tokenFiltered[tokenActive].formatedBalance)) {
        return `Lack of ${tokenFiltered[tokenActive].symbol} token`;
      }
    } else if (isDepositErc20) {
      return 'Approve and Deposit';
    }
    return 'Deposit to Mint';
  }, [invalidChain, amount, tokenActive, tokenFiltered, isDepositErc20, isEligible]);

  useEffect(() => {
    if (selectedChainId) {
      setFromActive(fromList.findIndex((item) => item.chainId === selectedChainId));
    }
  }, [fromActive, selectedChainId, fromList, chain]);

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
    setNetworkKey(fromList[fromActive]?.networkKey);
    if (invalidChain) {
      try {
        await switchChainAsync({ chainId: fromList[fromActive].chainId });
        return;
      } catch (e: any) {
        console.log(e);
        if (e.message && e.message.includes('the method now not support')) {
          // imported wallet in binance not support some chain
          return;
        }
      }
      return;
    }
    if (!amount) {
      return;
    }
    try {
      const rpcUrl = FromList.find((item) => item.networkKey === networkKey)?.rpcUrl;
      toast.custom(
        (t) => (
          <Toast
            type='loading'
            id={t}
            title='Pending Transaction'
            description='It will take about  2 minutes to deposit fund......'
          />
        ),
        { duration: Infinity },
      );
      const { l1TransactionHash, l2TransactionHash } = await sendDepositTx(
        tokenFiltered[tokenActive]?.address as `0x${string}`,
        // utils.parseEther(String(amount))
        parseUnits(String(amount), tokenFiltered[tokenActive]?.decimals),
        nativeTokenBalance,
        false,
        coin,
        chain,
        rpcUrl!,
      );
      if (!l1TransactionHash) {
        return;
      }
      //save tx hash
      addTxHash(address, l1TransactionHash, l2TransactionHash, rpcUrl!, coin, chain);
      toast.custom((t) => <Toast type='success' id={t} title='Success' description='Successfully deposit to Nova' />);
      fetchMemeNftBalances(address);
    } catch (e: any) {
      if (e.message) {
        if (e.message.includes('Insufficient Gas Token Balance')) {
          toast.custom((t) => (
            <Toast type='error' id={t} title='Failed' description='Insufficient Gas Token Balance' />
          ));
        } else if (e.message.includes('User rejected the request' || e.message.includes('OKX Wallet Reject'))) {
          toast.custom((t) => <Toast type='error' id={t} title='Failed' description='User rejected the request' />);
        } else if (e.message.includes('Internal JSON-RPC error ')) {
          toast.custom((t) => <Toast type='error' id={t} title='Failed' description='Internal JSON-RPC error' />);
        } else {
          toast.custom((t) => <Toast type='error' id={t} title='Failed' description={e.message} />);
        }
      }
      // return;
    } finally {
      fetchMemeNftBalances(address);
      refreshTokenBalanceList();
      toast.dismiss();
    }
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
      const filterCoin = coin?.toUpperCase() === 'OMNI2' ? 'Omni' : coin;
      await mintNovaNft(address, chain, filterCoin);
      await fetchMemeNftBalances(address);
      toast.custom((t) => <Toast type='success' id={t} title='Success' description='Successfully minted NFT!' />);
    } catch (e: any) {
      console.log(e);
      if (e.message) {
        if (e.message.includes('User rejected the request')) {
          toast.custom((t) => <Toast type='error' id={t} title='Failed' description='User rejected the request' />);
        } else if (e.message.includes('You already have a character')) {
          // toast.error('You can mint SBT only once.');
          toast.custom((t) => <Toast type='error' id={t} title='Failed' description='You can mint NFT only once.' />);
        } else {
          toast.custom((t) => <Toast type='error' id={t} title='Failed' description={e.message} />);
        }
      } else {
        toast.custom((t) => <Toast type='error' id={t} title='Failed' description='Mint NFT failed' />);
        // toast.error('Mint SBT failed');
      }
    }
  }, [address, isInvaidChain, switchChain, mintNovaNft]);

  const getBalanceOnAnotherChain = async (address: string): Promise<BigNumber> => {
    const balance = await novaClient?.getBalance({ address, chainId: NOVA_CHAIN_ID });
    return formatBalance(balance ?? 0n, 18);
  };

  const waitForBalanceChange = async (
    address: string,
    initialBalance: BigNumber,
    // anotherChainRpcUrl: string,
  ): Promise<void> => {
    let currentBalance = initialBalance;
    console.log('Initial balance:', currentBalance.toString());

    while (true) {
      await new Promise((resolve) => setTimeout(resolve, 5000)); // Wait for 5 seconds before checking again
      currentBalance = await getBalanceOnAnotherChain(address);
      console.log('Pre Current balance:', currentBalance.toString());

      if (currentBalance.toString() !== initialBalance.toString()) {
        console.log('Pre Balance changed!', currentBalance.toString(), initialBalance.toString());
        break;
      }
    }
  };

  const hasNativeTokenBalance = novaNativeTokenBalance && novaNativeTokenBalance > 0.00001;
  const hasMatchingCoin = txhashes[address]?.some((item) => item.coin === coin);
  const hasEligbleForMint =
    (hasNativeTokenBalance && hasMatchingCoin && !hasMint && isEligible) ||
    (novaNativeTokenBalance && !hasMint && isEligible && hasMemeTokenBalance);
  const l1matchedTx = precheckTxhashes[address]?.find((item) => item.coin === coin);

  useEffect(() => {
    if (!address || !precheckTxhashes[address]?.length || !novaClient) return;
    let intervalId: NodeJS.Timeout | null = null;

    const checkStatus = async () => {
      if (!l1matchedTx?.l1TransactionHash) {
        // updateRefreshBalanceId('');
        return;
      }

      const l2hash = await getDepositL2TxHash(l1matchedTx.l1TransactionHash as `0x${string}`);

      if (l2hash) {
        //TODO: record & compare status

        await waitForBalanceChange(address, l1matchedTx?.balance);
        removePrecheckTxHash(address, l1matchedTx.l1TransactionHash);
        if (intervalId) {
          clearInterval(intervalId);
        }
      }
    };

    // updateRefreshBalanceId('pending');
    intervalId = setInterval(checkStatus, 3000); // Check status every 5 seconds

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [l1matchedTx, address, novaClient]);
  return (
    <>
      <>
        {isConnected ? (
          <>
            {hasEligbleForMint ? (
              <Button
                onClick={handleMint}
                loading={isMinting}
                className='backButton cursor-pointer'
                disabled={!isEligible || (hasMint && !isInvaidChain)}
              >
                <span>
                  {isInvaidChain ? 'Switch to Nova network' : !isEligible ? 'Unqualified' : hasMint ? 'Minted' : 'Mint'}
                </span>
              </Button>
            ) : (
              <Button
                className='backButton cursor-pointer'
                style={{ display: 'flex', alignItems: 'center' }}
                size='lg'
                onClick={handleAction}
                loading={loading || (l1matchedTx?.coin === coin && l1matchedTx?.chain === chain)}
                disabled={actionBtnDisabled || hasMint}
              >
                {hasMint ? 'Minted' : btnText}
              </Button>
            )}
          </>
        ) : (
          <Button className='backButton cursor-pointer' size='lg' color='primary' onClick={() => openConnectModal?.()}>
            Connect Wallet
          </Button>
        )}
      </>
    </>
  );
}
