import Link from 'next/link';
import type { AnchorHTMLAttributes, FC } from 'react';

const LinkInternal = Link;
const LinkExternal: FC<AnchorHTMLAttributes<HTMLAnchorElement>> = ({
  target = '_blank',
  rel = 'noopener noreferrer',
  ...props
}) => {
  return <a {...props} target={target} rel={rel} className='text-blue cursor-pointer hover:underline' />;
};

export { LinkExternal, LinkInternal };
