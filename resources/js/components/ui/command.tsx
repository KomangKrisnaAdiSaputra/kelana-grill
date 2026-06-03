import * as React from 'react';
import { Command as CommandPrimitive } from 'cmdk';
import { Search } from 'lucide-react';

import { cn } from '@/lib/utils';

function Command({
    className,
    ...props
}: React.ComponentProps<typeof CommandPrimitive>) {
    return (
        <CommandPrimitive
            className={cn(
                'bg-popover text-popover-foreground flex h-full w-full flex-col overflow-hidden rounded-md',
                className,
            )}
            {...props}
        />
    );
}

function CommandInput({
    className,
    ...props
}: React.ComponentProps<typeof CommandPrimitive.Input>) {
    return (
        <div className="flex items-center border-b px-3">
            <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
            <CommandPrimitive.Input
                className={cn(
                    'placeholder:text-muted-foreground flex h-10 w-full bg-transparent py-3 text-sm outline-none',
                    className,
                )}
                {...props}
            />
        </div>
    );
}

function CommandList({
    className,
    ...props
}: React.ComponentProps<typeof CommandPrimitive.List>) {
    return (
        <CommandPrimitive.List
            className={cn('max-h-64 overflow-y-auto', className)}
            {...props}
        />
    );
}

function CommandEmpty(props: React.ComponentProps<typeof CommandPrimitive.Empty>) {
    return (
        <CommandPrimitive.Empty
            className="py-6 text-center text-sm"
            {...props}
        />
    );
}

function CommandGroup(props: React.ComponentProps<typeof CommandPrimitive.Group>) {
    return <CommandPrimitive.Group {...props} />;
}

function CommandItem({
    className,
    ...props
}: React.ComponentProps<typeof CommandPrimitive.Item>) {
    return (
        <CommandPrimitive.Item
            className={cn(
                'relative flex cursor-pointer select-none items-center gap-2 rounded-sm px-2 py-2 text-sm outline-none data-[selected=true]:bg-accent',
                className,
            )}
            {...props}
        />
    );
}

export {
    Command,
    CommandInput,
    CommandList,
    CommandEmpty,
    CommandGroup,
    CommandItem,
};