import { LazyMotion, domAnimation } from 'framer-motion';
import { ThemeProvider } from 'next-themes';
import { Provider as RWBProvider } from 'react-wrap-balancer';
import QueryProvider from './react-query-provider';
import { StoreProvider } from './zustand-store-provider';
import { WagmiConfig } from './wagmi';

const RootProvider: React.FC<
  React.PropsWithChildren<{ children: React.ReactNode; dehydratedState: any; pageProps: any }>
> = ({ children, dehydratedState, pageProps }) => {
  return (
    <StoreProvider {...pageProps?.initialZustandState}>
      <QueryProvider dehydratedState={dehydratedState}>
        <WagmiConfig>
          <RWBProvider>
            <ThemeProvider enableSystem={false}>
              <LazyMotion features={domAnimation}>{children}</LazyMotion>
            </ThemeProvider>
          </RWBProvider>
        </WagmiConfig>
      </QueryProvider>
    </StoreProvider>
  );
};

export default RootProvider;
