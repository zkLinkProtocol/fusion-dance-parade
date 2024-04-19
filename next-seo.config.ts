import type { DefaultSeoProps } from 'next-seo';

const seo = {
  titleTemplate: '%s | Meme',
  title: 'zkLink Meme: Aggregated Layer 3 zkEVM network Aggregation Parade',
  defaultTitle: 'zkLink Meme: Aggregated Layer 3 zkEVM network Aggregation Parade',
  description:
    'zkLink Meme: A general-purpose Aggregated Layer 3 zkEVM network that allows seamless Ethereum-compatible DApp deployment.',
  twitter: {
    handle: '@zkLink_Official',
    site: '@zkLink_Official',
    cardType: 'summary_large_image',
  },
  openGraph: {
    type: 'website',
    title: 'zkLink Meme',
    description:
      'zkLink Meme: A general-purpose Aggregated Layer 3 zkEVM network that allows seamless Ethereum-compatible DApp deployment.',
    images: [
      {
        url: 'https://app.zklink.io/img/preview.png',
        width: 400,
        height: 432,
        alt: 'MeMe',
      },
    ],
    site_name: 'MeMe',
    // locale: 'en_IE',
  },
} as const satisfies DefaultSeoProps;

export default seo;
