import type { DefaultSeoProps } from 'next-seo';

const seo = {
  title:
    'Fusion Dance Parade | Gather Nova Infinity Stones, cats, doges, frogs, and hats to create the ultimate fused (merged) warrior (Chad).',
  defaultTitle: 'Fusion Dance Parade',
  description:
    'Gather Nova Infinity Stones, cats, doges, frogs, and hats to create the ultimate fused (merged) warrior (Chad).',
  twitter: {
    handle: '@zkLink_Official',
    site: '@zkLink_Official',
    cardType: 'summary_large_image',
  },
  openGraph: {
    type: 'website',
    title: 'Fusion Dance Parade',
    description:
      'Gather Nova Infinity Stones, cats, doges, frogs, and hats to create the ultimate fused (merged) warrior (Chad).',
    images: [
      {
        url: 'https://zklink.io/fusion-dance-parade/assets/imgs/preview.png',
        width: 400,
        height: 432,
        alt: 'Fusion Dance Parade',
      },
    ],
    site_name: 'Fusion Dance Parade',
    // locale: 'en_IE',
  },
} as const satisfies DefaultSeoProps;

export default seo;
