/* eslint-disable @typescript-eslint/ban-ts-comment */
import React from 'react';

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
}

function withImagePath<T extends Partial<ImageProps>>(WrappedComponent: React.ComponentType<T>) {
  return function WithImagePath(props: T) {
    const { src, ...rest } = props;
    const imageUrl = src?.replace('/assets/imgs/', 'https://preview.zklink.io/fusion-dance-parade/assets/imgs/') || '';

    return <WrappedComponent src={imageUrl} {...(rest as T)} />;
  };
}

//@ts-ignore
export const EnhancedImg = withImagePath<ImageProps>('img');
