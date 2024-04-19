import * as PopoverPrimitive from '@radix-ui/react-popover';
import classNames from 'classnames';
import * as React from 'react';

const Popover = PopoverPrimitive.Root;

const PopoverTrigger = PopoverPrimitive.Trigger;

const PopoverContent = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>
>(({ children, className = '', align = 'center', collisionPadding = 8, sideOffset = 8, ...props }, ref) => (
  <PopoverPrimitive.Portal>
    <PopoverPrimitive.Content
      ref={ref}
      align={align}
      collisionPadding={collisionPadding}
      sideOffset={sideOffset}
      className={classNames(
        className,
        'border-accent paper animate-in data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 max-h-[var(--radix-popper-available-height)] w-72 rounded-md rounded-xl border bg-white/50 p-4 shadow-md outline-none dark:bg-slate-800/50',
      )}
      {...props}
    >
      {children}
    </PopoverPrimitive.Content>
  </PopoverPrimitive.Portal>
));
PopoverContent.displayName = PopoverPrimitive.Content.displayName;

export { Popover, PopoverContent, PopoverPrimitive, PopoverTrigger };
