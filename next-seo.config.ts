import type { DefaultSeoProps } from 'next-seo';

const seo = {
  title:
    'Fusion Dance Parade | Gather all the memes, fox, cat, aidoge, dragon  (Infinity stones) to create the ultimate fused (merged) warrior (gigaChad).',
  defaultTitle: 'Fusion Dance Parade',
  description:
    'Gather all the memes, fox, cat, aidoge, dragon  (Infinity stones) to create the ultimate fused (merged) warrior (gigaChad).',
  twitter: {
    handle: '@zkLink_Official',
    site: '@zkLink_Official',
    cardType: 'summary_large_image',
  },
  openGraph: {
    type: 'website',
    title: 'Fusion Dance Parade',
    description:
      'Gather all the memes, fox, cat, aidoge, dragon  (Infinity stones) to create the ultimate fused (merged) warrior (gigaChad).',
    images: [
      {
        url: '/assets/imgs/preview.png',
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
