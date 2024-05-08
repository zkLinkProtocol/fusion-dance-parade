import { nexusGoerliNode, nexusNode, nexusSepoliaNode, nodeType } from 'config/zklink-networks';
import { ethers } from 'ethers';
import { useCallback, useMemo } from 'react';
import type { WalletClient } from 'viem';
import { Provider } from 'zksync-web3';
import { useBridgeNetworkStore } from '../hooks/useBridgeNetwork';

export const l1EthDepositAbi = {
  inputs: [
    {
      internalType: 'address',
      name: '_contractL2',
      type: 'address',
    },
    {
      internalType: 'uint256',
      name: '_l2Value',
      type: 'uint256',
    },
    {
      internalType: 'bytes',
      name: '_calldata',
      type: 'bytes',
    },
    {
      internalType: 'uint256',
      name: '_l2GasLimit',
      type: 'uint256',
    },
    {
      internalType: 'uint256',
      name: '_l2GasPerPubdataByteLimit',
      type: 'uint256',
    },
    {
      internalType: 'bytes[]',
      name: '_factoryDeps',
      type: 'bytes[]',
    },
    {
      internalType: 'address',
      name: '_refundRecipient',
      type: 'address',
    },
  ],
  name: 'requestL2Transaction',
  outputs: [
    {
      internalType: 'bytes32',
      name: 'canonicalTxHash',
      type: 'bytes32',
    },
  ],
  stateMutability: 'payable',
  type: 'function',
};

export const nodeConfig = (() => {
  switch (nodeType) {
    case 'nexus-goerli':
      return nexusGoerliNode;
    case 'nexus-sepolia':
      return nexusSepoliaNode;
    default:
      return nexusNode;
  }
})();

export const defaultNetwork = nodeConfig[0];

export function walletClientToProvider(walletClient: WalletClient) {
  const { chain, transport } = walletClient;
  const network = {
    chainId: chain!.id,
    name: chain!.name,
    ensAddress: chain!.contracts?.ensRegistry?.address,
  };
  const provider = new ethers.providers.Web3Provider(transport, network);
  return provider;
}

export const useZksyncProvider = () => {
  const networkKey = useBridgeNetworkStore.getState().networkKey;
  const eraNetwork = nodeConfig.find((item) => item.key === networkKey) ?? defaultNetwork;

  const provider = useMemo(() => {
    if (!networkKey) return;
    return new Provider(eraNetwork.rpcUrl);
  }, [eraNetwork.rpcUrl, networkKey]);

  const getDefaultBridgeAddresses = useCallback(async () => {
    return {
      erc20L1: eraNetwork.erc20BridgeL1,
      erc20L2: eraNetwork.erc20BridgeL2,
    };
  }, [eraNetwork.erc20BridgeL1, eraNetwork.erc20BridgeL2]);

  return { provider, getDefaultBridgeAddresses };
};
