import { create } from 'zustand';

import { nodeType } from 'config/zklin-networks';
import { STORAGE_NETWORK_KEY } from 'constants/zklink-config';

export type NetworkStore = {
  networkKey?: string;
  setNetworkKey: (networkKey: string) => void;
};

export const useBridgeNetworkStore = create<NetworkStore>()((set) => ({
  networkKey:
    typeof window !== 'undefined'
      ? localStorage.getItem(STORAGE_NETWORK_KEY)
        ? localStorage.getItem(STORAGE_NETWORK_KEY)!
        : nodeType === 'nexus-sepolia'
        ? 'sepolia'
        : 'ethereum'
      : 'ethereum',
  setNetworkKey: (networkKey: string) => {
    localStorage.setItem(STORAGE_NETWORK_KEY, networkKey);
    set({
      networkKey,
    });
  },
}));
