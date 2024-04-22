import { create } from 'zustand';

import { nodeType } from 'config/zklin-networks';
import { STORAGE_NETWORK_KEY } from 'constants/zklink-config';

export type NetworkStore = {
  networkKey?: string;
  setNetworkKey: (networkKey: string) => void;
};

const getNetworkKey = () => {
  if (typeof window === 'undefined') {
    return 'ethereum';
  }

  const storedNetworkKey = localStorage.getItem(STORAGE_NETWORK_KEY);
  if (storedNetworkKey) {
    return storedNetworkKey;
  }

  return nodeType === 'nexus-sepolia' ? 'sepolia' : 'ethereum';
};
console.log('getNetworkKey', getNetworkKey());

export const useBridgeNetworkStore = create<NetworkStore>()((set) => ({
  networkKey: getNetworkKey(),
  setNetworkKey: (networkKey: string) => {
    localStorage.setItem(STORAGE_NETWORK_KEY, networkKey);
    set({
      networkKey,
    });
  },
}));
