import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { STORAGE_PRE_VERIFY_TX_KEY } from 'constants/zklink-config';

export type VerifyState = {
  precheckTxhashes: {
    [address: string]: {
      l1TransactionHash: string;
      rpcUrl: string;
      coin: string;
      chain: string;
    }[];
  };
  addPrecheckTxHash: (address: string, l1TransactionHash: string, rpcUrl: string, coin: string, chain: string) => void;
  removePrecheckTxHash: (address: string, l1TransactionHash: string) => void;
};

export const usePreCheckTxStore = create<VerifyState>()(
  persist(
    (set, get) => ({
      precheckTxhashes: {},
      addPrecheckTxHash: (address: string, l1TransactionHash: string, rpcUrl: string, coin: string, chain: string) => {
        const addressTxhashes = get().precheckTxhashes[address] || [];
        addressTxhashes.unshift({ l1TransactionHash, rpcUrl, coin, chain });
        set({ precheckTxhashes: { ...get().precheckTxhashes, [address]: addressTxhashes } });
      },
      removePrecheckTxHash: (address: string, l1TransactionHash: string) => {
        const addressTxhashes = get().precheckTxhashes[address] || [];
        const updatedTxhashes = addressTxhashes.filter((txhash) => txhash.l1TransactionHash !== l1TransactionHash);
        set({
          precheckTxhashes: {
            ...get().precheckTxhashes,
            [address]: updatedTxhashes,
          },
        });
      },
    }),
    {
      name: STORAGE_PRE_VERIFY_TX_KEY, // name of the item in the storage (must be unique)
    },
  ),
);
