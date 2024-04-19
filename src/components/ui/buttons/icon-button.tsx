import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import type { IconComponent } from 'types';

import type { buttonVariants } from './button';
import { buttonIconVariants } from './button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../tooltip';

const iconButtonVariants = cva(
  'ring-blue inline-flex cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-full font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-blue text-white hover:bg-blue-600 focus:bg-blue-700 active:bg-blue-600',
        destructive: 'bg-red text-white hover:bg-red-600 focus:bg-red-700 active:bg-red-600',
        warning: 'bg-amber-400 text-amber-900 hover:bg-amber-500 focus:bg-amber-600 active:bg-amber-500',
        outline: 'border border-gray-900/5 hover:bg-muted focus:bg-accent dark:border-slate-200/5',
        secondary: 'bg-secondary hover:bg-muted focus:bg-accent',
        ghost: 'hover:bg-secondary focus:bg-accent',
        link: 'text-blue !h-[unset] !min-h-[unset] !p-0 font-semibold hover:text-blue-700',
      },
      size: {
        xs: 'h-[26px] min-h-[26px] w-[26px] min-w-[26px] text-xs',
        sm: 'h-[36px] min-h-[36px] w-[36px] min-w-[36px] text-sm',
        default: 'h-[40px] min-h-[40px] w-[40px] min-w-[40px] text-sm',
        lg: 'w-[44px h-[44px] min-h-[44px] min-w-[44px]',
        xl: 'h-[52px] min-h-[52px] w-[52px] min-w-[52px]',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

export interface IconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  icon: IconComponent | string;
  iconProps?: Omit<React.ComponentProps<'svg'>, 'width' | 'height'>;
  name: string;
  description?: string;
  testId?: string;
  asChild?: boolean;
  children?: React.ReactNode;
}

const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    {
      className,
      children,
      asChild,
      icon: Icon,
      iconProps,
      description,
      size,
      variant = 'secondary',
      name: _name,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : 'span';

    const button = (
      <Comp role='button' className={iconButtonVariants({ variant, size, className })} ref={ref} {...props}>
        {typeof Icon === 'string' ? (
          <span
            className={buttonIconVariants({
              size,
              className: iconProps?.className,
            })}
          >
            {Icon}
          </span>
        ) : (
          <Icon
            {...iconProps}
            className={buttonIconVariants({
              size,
              className: iconProps?.className,
            })}
          />
        )}
        {children ? children : null}
      </Comp>
    );

    if (description) {
      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>{button}</TooltipTrigger>
            <TooltipContent side='bottom'>
              <p>{description}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    }

    return button;
  },
);
IconButton.displayName = 'ButtonNew';

export { IconButton, iconButtonVariants };
