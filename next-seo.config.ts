import type { DefaultSeoProps } from 'next-seo';

const seo = {
  titleTemplate: '%s | Meme',
  title: 'Nova MEMECROSS：Exclusive badge for brave meme holders on the Nova',
  defaultTitle: 'Nova MEMECROSS：Exclusive badge for brave meme holders on the Nova',
  description:
    'MEMECROSS is an exclusive badge for brave meme holders on the Nova. You explored extensively in the vast L2 ecosystem and hold firmly through the prices up and down. Then, Nova is discovered , the world’s first ZK Aggregated Layer 3, the bridge of the ETH ecosystem.',
  twitter: {
    handle: '@zkLink_Official',
    site: '@zkLink_Official',
    cardType: 'summary_large_image',
  },
  openGraph: {
    type: 'website',
    title: 'zkLink Meme',
    description:
      'MEMECROSS is an exclusive badge for brave meme holders on the Nova. You explored extensively in the vast L2 ecosystem and hold firmly through the prices up and down. Then, Nova is discovered , the world’s first ZK Aggregated Layer 3, the bridge of the ETH ecosystem.',
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
