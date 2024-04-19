import { useRef, type PropsWithChildren } from 'react';
import { Provider, initializeStore, type StoreType } from 'store';

export const StoreProvider = ({ children, ...props }: PropsWithChildren) => {
  const storeRef = useRef<StoreType>();

  if (!storeRef.current) {
    storeRef.current = initializeStore(props);
  }

  return <Provider value={storeRef.current}>{children}</Provider>;
};
