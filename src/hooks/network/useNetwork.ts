/* eslint-disable import/no-anonymous-default-export */
import type { ZkSyncNetwork } from 'config/network';
import { zkSyncNetworks as defaultEraNetworks } from 'config/network';
import { nexusGoerliNode, nexusNode, nexusSepoliaNode, nodeType, PRIMARY_CHAIN_KEY } from 'config/zklink-networks';
import Hyperchains from 'hyperchains/config.json';
import type { Token } from 'types/token';

export default () => {
  const isCustomNode = !!nodeType;
  const zkSyncNetworks: ZkSyncNetwork[] = [];

  if (nodeType === 'nexus') {
    zkSyncNetworks.push(...nexusNode);
  } else if (nodeType === 'nexus-goerli') {
    zkSyncNetworks.push(...nexusGoerliNode);
  } else if (nodeType === 'nexus-sepolia') {
    zkSyncNetworks.push(...nexusSepoliaNode);
  } else if (nodeType === 'hyperchain') {
    zkSyncNetworks.push(
      ...(Hyperchains as unknown as Array<{ network: ZkSyncNetwork; tokens: Token[] }>).map((e) => ({
        ...e.network,
        getTokens: () => e.tokens,
      })),
    );
  } else {
    zkSyncNetworks.push(...defaultEraNetworks);
  }

  const defaultNetwork = zkSyncNetworks[0];
  const primaryNetwork = zkSyncNetworks.find((e) => e.key === PRIMARY_CHAIN_KEY);
  if (!primaryNetwork) {
    throw new Error('can not find primary chain. nodeType: ' + nodeType);
  }
  const nexusNetworks: Record<string, ZkSyncNetwork> = {};
  for (let index = 0; index < zkSyncNetworks.length; index++) {
    const element = zkSyncNetworks[index];
    nexusNetworks[element.key] = element;
  }
  const isMainnet = nodeType === 'nexus';
  return {
    isCustomNode,
    nexusNetworks,
    zkSyncNetworks,
    defaultNetwork,
    primaryNetwork,
    isMainnet,
  };
};
