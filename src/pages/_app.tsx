import 'styles/globals.scss';
import 'styles/index.scss';
import '@rainbow-me/rainbowkit/styles.css';
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BaseLayout } from 'components/layouts';
import type { AppContext, AppProps } from 'next/app';
import { default as NextApp } from 'next/app';
import Head from 'next/head';
import { DefaultSeo } from 'next-seo';
import { Toaster as SonnerToast } from 'sonner';

import SEO from '../../next-seo.config';
import RootProvider from 'providers/root-provider';

declare global {
  interface Window {
    dataLayer: Record<string, any>[];
  }
}

function MyApp({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();
  return (
    <>
      <Head>
        <link href='/favicon-32x32.png?v=1' rel='icon' sizes='32x32' type='image/png' />
        <link href='/favicon-16x16.png?v=1' rel='icon' sizes='16x16' type='image/png' />
        <link href='/site.webmanifest?v=1' rel='manifest' />
        <link color='#fa52a0' href='/safari-pinned-tab.svg?v=1' rel='mask-icon' />
        <link href='/favicon.ico?v=1' rel='shortcut icon' />
      </Head>
      <RootProvider dehydratedState={pageProps.dehydratedState} pageProps={pageProps}>
        <QueryClientProvider client={queryClient}>
          <RainbowKitProvider>
            <SonnerToast position='bottom-center' className='w-full sm:min-w-[600px]' />
            <DefaultSeo {...SEO} />
            <BaseLayout>
              <Component {...pageProps} />
            </BaseLayout>
          </RainbowKitProvider>
        </QueryClientProvider>
      </RootProvider>
    </>
  );
}

// getInitialProps disables automatic static optimization for pages that don't
// have getStaticProps. So article, category and home pages still get SSG.
// Hopefully we can replace this with getStaticProps once this issue is fixed:
// https://github.com/vercel/next.js/discussions/10949
MyApp.getInitialProps = async (ctx: AppContext) => {
  // Calls page's `getInitialProps` and fills `appProps.pageProps`
  const appProps = await NextApp.getInitialProps(ctx);

  // Pass the data to our page via props
  return { ...appProps };
};

export default MyApp;
