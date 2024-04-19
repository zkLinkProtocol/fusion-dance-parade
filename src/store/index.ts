import { createContext, useContext } from 'react';
import { createStore, useStore as useZustandStore } from 'zustand';
import { combine } from 'zustand/middleware';
import { isChainSupported } from 'config/connectors';
import { getChainId } from 'config/chain_dep';

type ColorModeStore = {
  mode: string;
  setMode: (newStr: string) => void;
  toggleMode: () => void;
};

export type StoreType = ReturnType<typeof initializeStore>;
type StoreInteface = ReturnType<StoreType['getState']>;

const getDefaultInitialState = () => ({
  lastUpdate: Date.now(),
  light: false,
  switchNetworkLoading: false,
  sessionChainId: 0,
  count: 0,
  queryChainId: -1, // -1 unload, 0 no chainId on query
  mode: typeof window !== 'undefined' ? window.localStorage.getItem('theme') || 'light' : 'light',
});

const zustandContext = createContext<StoreType | null>(null);
export const Provider = zustandContext.Provider;

export const useStore = <T>(selector: (state: StoreInteface) => T) => {
  const store = useContext(zustandContext);
  if (!store) throw new Error('Store is missing the provider');
  return useZustandStore(store, selector);
};

export const initializeStore = (preloadedState = {}) => {
  return createStore(
    combine({ ...getDefaultInitialState(), ...preloadedState }, (set, get) => ({
      setMode: (newStr: string) => {
        set({ mode: newStr });
        localStorage.setItem('theme', newStr);
      },
      toggleMode: (state: ColorModeStore) => {
        set({ mode: state.mode === 'light' ? 'dark' : 'light' });
      },
      onQueryChainMount: () => {
        if (typeof window !== 'undefined') {
          const params = new URL(window.location.href).searchParams;
          let chainId: any;
          const c = params.get('chain');
          if (!c) {
            chainId = params.get('chainId');
          } else {
            chainId = getChainId(c);
          }
          if (isChainSupported(+chainId)) {
            set({ queryChainId: +chainId });
          } else {
            set({ queryChainId: 0 });
          }
        }
      },
      setSessionChainId: (chainId: number) => set({ sessionChainId: chainId }),
      setSwitchNetworkLoading: (value: boolean) => set({ switchNetworkLoading: value }),
      tick: (lastUpdate: number, light: boolean) => {
        set({
          lastUpdate,
          light: !!light,
        });
      },
      reset: () => {
        set({
          count: getDefaultInitialState().count,
        });
      },
    })),
  );
};
