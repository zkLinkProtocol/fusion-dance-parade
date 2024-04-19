import classNames from 'classnames';
import type { FC, ReactNode } from 'react';
import React from 'react';

export interface ListLabelProps {
  children: ReactNode;
  className?: string;
}

export const ListLabel: FC<ListLabelProps> = ({ children, className }) => {
  return (
    <span
      className={classNames(className, 'flex justify-start px-2 text-xs font-medium text-gray-500 dark:text-slate-400')}
    >
      {children}
    </span>
  );
};
