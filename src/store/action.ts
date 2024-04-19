import { useStore } from 'store';


export const useQueryChainStore = () => {
  const { queryChainId, onQueryChainMount } = useStore((store) => ({
    queryChainId: store.queryChainId,
    onQueryChainMount: store.onQueryChainMount,
  }));
  return { queryChainId, onQueryChainMount };
};

export const useSessionChainId = () => {
  const { sessionChainId, setSessionChainId } = useStore((store) => ({
    sessionChainId: store.sessionChainId,
    setSessionChainId: store.setSessionChainId,
  }));
  return {sessionChainId, setSessionChainId };
};

export const useSwitchNetworkLoading = () => {
  const { switchNetworkLoading, setSwitchNetworkLoading } = useStore((store) => ({
    switchNetworkLoading: store.switchNetworkLoading,
    setSwitchNetworkLoading: store.setSwitchNetworkLoading,
  }));
  return { switchNetworkLoading, setSwitchNetworkLoading };
};