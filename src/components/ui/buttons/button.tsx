import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import classNames from 'classnames';
import { Loader2 } from 'lucide-react';
import * as React from 'react';
import type { IconComponent } from 'types';

const buttonVariants = cva(
  'ring-blue inline-flex cursor-pointer items-center justify-center gap-2 whitespace-nowrap font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-blue text-white hover:bg-blue-600 focus:bg-blue-700 active:bg-blue-600',
        destructive: 'bg-red text-white hover:bg-red-600 focus:bg-red-700 active:bg-red-600',
        warning: 'bg-amber-400 text-amber-900 hover:bg-amber-500 focus:bg-amber-600 active:bg-amber-500',
        outline: '!border border-accent bg-background hover:bg-muted hover:text-accent-foreground',
        secondary: 'bg-secondary hover:bg-muted focus:bg-accent',
        ghost: 'hover:bg-secondary focus:bg-accent',
        link: 'text-blue !h-[unset] !min-h-[unset] !p-0 font-semibold hover:text-blue-700 hover:underline',
      },
      size: {
        xs: 'h-[26px] min-h-[26px] rounded-lg px-2 text-xs',
        sm: 'h-[36px] min-h-[36px] rounded-xl px-3 text-sm',
        default: 'h-[40px] min-h-[40px] rounded-xl px-4 py-2 text-sm',
        lg: 'h-[44px] min-h-[44px] rounded-xl px-4',
        xl: 'h-[52px] min-h-[52px] rounded-xl px-4',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

const buttonLoaderVariants = cva('animate-spin', {
  variants: {
    size: {
      xs: 'h-4 w-4',
      sm: 'h-[18px] w-[18px]',
      default: 'h-5 w-5',
      lg: 'h-5 w-5 stroke-[2px]',
      xl: 'h-5 w-5 stroke-[2px]',
    },
  },
  defaultVariants: {
    size: 'default',
  },
});

const buttonIconVariants = cva('', {
  variants: {
    size: {
      xs: 'h-4 w-4',
      sm: 'h-[18px] w-[18px]',
      default: 'h-5 w-5',
      lg: 'h-5 w-5',
      xl: 'h-5 w-5',
    },
  },
  defaultVariants: {
    size: 'default',
  },
});

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  icon?: IconComponent;
  iconProps?: Omit<React.ComponentProps<'svg'>, 'width' | 'height'>;
  iconPosition?: 'start' | 'end';
  asChild?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  testId?: string;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      fullWidth,
      icon: Icon,
      iconProps,
      iconPosition = 'start',
      disabled = false,
      className,
      variant,
      size,
      children,
      asChild = false,
      loading = false,
      testId,
      id,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        disabled={loading ? true : disabled}
        className={classNames(
          buttonVariants({
            variant,
            size,
            className: classNames(className, fullWidth ? 'w-full flex-1' : ''),
          }),
        )}
        ref={ref}
        {...props}
        testdata-id={`${testId || id}-button`}
      >
        <ButtonContent asChild={asChild}>
          {loading ? (
            <Loader2 className={buttonLoaderVariants({ size })} />
          ) : Icon && iconPosition === 'start' ? (
            <Icon
              {...iconProps}
              className={buttonIconVariants({
                size,
                className: iconProps?.className,
              })}
            />
          ) : null}
          {children}
          {Icon && iconPosition === 'end' ? (
            <Icon
              {...iconProps}
              className={buttonIconVariants({
                size,
                className: iconProps?.className,
              })}
            />
          ) : null}
        </ButtonContent>
      </Comp>
    );
  },
);

Button.displayName = 'Button';

interface ButtonContentProps extends React.HTMLAttributes<HTMLDivElement> {
  asChild?: boolean;
}

const ButtonContent = React.forwardRef<HTMLDivElement, ButtonContentProps>(function Button(
  { asChild, children, ...props },
  ref,
) {
  if (asChild) {
    return (
      <div className='inline-flex gap-1' ref={ref} {...props}>
        {children}
      </div>
    );
  }

  return <>{children}</>;
});

export { Button, buttonIconVariants, buttonLoaderVariants, buttonVariants };
