/* eslint-disable @typescript-eslint/ban-ts-comment */
import React from 'react';
import { useRouter } from 'next/router';
interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
}

function withImagePath<T extends Partial<ImageProps>>(WrappedComponent: React.ComponentType<T>) {
  return function WithImagePath(props: T) {
    const { src, ...rest } = props;
    const router = useRouter();
    const isProduction = process.env.NODE_ENV === 'production';
    const basePath = isProduction ? router.basePath : '';
    const imageUrl =
      src?.replace('/assets/imgs/', `${basePath}${isProduction ? '/fusion-dance-parade' : ''}/assets/imgs/`) || '';

    return <WrappedComponent src={imageUrl} {...(rest as T)} />;
  };
}

//@ts-ignore
export const EnhancedImg = withImagePath<ImageProps>('img');


export function useAssetPath() {
  const router = useRouter();
  const isProduction = process.env.NODE_ENV === 'production';
  const basePath = isProduction ? router.basePath : '';

  const getAssetPath = (assetPath: string) => {
    const fullPath = `${basePath}${isProduction ? '/fusion-dance-parade' : ''}${assetPath}`;
    return fullPath;
  };

  return getAssetPath;
}
