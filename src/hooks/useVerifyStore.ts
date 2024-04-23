import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { STORAGE_VERIFY_TX_KEY } from 'constants/zklink-config';

export type VerifyState = {
  txhashes: {
    [address: string]: {
      l1TransactionHash: string;
      l2TransactionHash: string;
      rpcUrl: string;
      coin: string;
      chain: string;
    }[];
  };
  addTxHash: (
    address: string,
    l1TransactionHash: string,
    l2TransactionHash: string,
    rpcUrl: string,
    coin: string,
    chain: string,
  ) => void;
};

export const useVerifyStore = create<VerifyState>()(
  persist(
    (set, get) => ({
      txhashes: {},
      addTxHash: (
        address: string,
        l1TransactionHash: string,
        l2TransactionHash: string,
        rpcUrl: string,
        coin: string,
        chain: string,
      ) => {
        const addressTxhashes = get().txhashes[address] || [];
        addressTxhashes.unshift({ l1TransactionHash, l2TransactionHash, rpcUrl, coin, chain });
        set({ txhashes: { ...get().txhashes, [address]: addressTxhashes } });
      },
    }),
    {
      name: STORAGE_VERIFY_TX_KEY, // name of the item in the storage (must be unique)
    },
  ),
);
