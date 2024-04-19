import classNames from 'classnames';
import type { FC, ReactNode } from 'react';

import { Card } from '../card';

export interface ListControlProps {
  children: ReactNode;
  className?: string;
}

export const ListControl: FC<ListControlProps> = ({ children, className }) => {
  return (
    <Card
      className={classNames('dark:!bg-secondary overflow-hidden rounded-xl !border-none bg-white shadow-sm', className)}
    >
      {children}
    </Card>
  );
};
