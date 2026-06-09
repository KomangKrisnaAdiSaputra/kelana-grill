import { Check, ChevronDown, ChevronUp, ChevronsUpDown, X } from 'lucide-react';
import * as React from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from '@/components/ui/command';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';

interface DynamicSelectProps<T> {
    options: T[];
    value: string | string[];
    onChange: (value: string | string[]) => void;

    getValue: (item: T) => string;
    getLabel: (item: T) => string;

    placeholder?: string;
    searchPlaceholder?: string;

    multiple?: boolean;
    disabled?: boolean;

    error?: string;
    className?: string;
}

export default function DynamicSelect<T>({
    options,
    value,
    onChange,
    getValue,
    getLabel,
    placeholder = 'Select option',
    searchPlaceholder = 'Search...',
    multiple = false,
    disabled = false,
    error,
    className,
}: DynamicSelectProps<T>) {
    const [open, setOpen] = React.useState(false);
    const [showSelected, setShowSelected] = React.useState(false);

    const selectedValues = React.useMemo(() => {
        if (multiple) {
            return Array.isArray(value) ? value : [];
        }

        return typeof value === 'string' && value ? [value] : [];
    }, [value, multiple]);

    const selectedItems = React.useMemo(
        () => options.filter((item) => selectedValues.includes(getValue(item))),
        [options, selectedValues, getValue],
    );

    const availableItems = React.useMemo(
        () =>
            options.filter((item) => !selectedValues.includes(getValue(item))),
        [options, selectedValues, getValue],
    );

    const handleSelect = (selectedValue: string) => {
        if (!multiple) {
            onChange(selectedValue);
            setOpen(false);

            return;
        }

        if (!selectedValues.includes(selectedValue)) {
            onChange([...selectedValues, selectedValue]);
        }
    };

    const removeSelected = (selectedValue: string) => {
        if (!multiple) {
            onChange('');

            return;
        }

        onChange(selectedValues.filter((item) => item !== selectedValue));
    };

    const removeBadge = (e: React.MouseEvent, selectedValue: string) => {
        e.stopPropagation();
        removeSelected(selectedValue);
    };

    const MAX_VISIBLE_BADGES = 2;

    const visibleItems = selectedItems.slice(0, MAX_VISIBLE_BADGES);

    const remainingCount = Math.max(
        0,
        selectedItems.length - MAX_VISIBLE_BADGES,
    );

    return (
        <div className="space-y-1">
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        type="button"
                        variant="outline"
                        disabled={disabled}
                        className={cn(
                            'min-h-10 w-full justify-between rounded-xl',
                            error && 'border-destructive',
                            className,
                        )}
                    >
                        <div className="flex flex-1 items-center gap-1 overflow-hidden">
                            {selectedItems.length > 0 ? (
                                multiple ? (
                                    <>
                                        {visibleItems.map((item) => (
                                            <Badge
                                                key={getValue(item)}
                                                variant="secondary"
                                                className="gap-1"
                                                onClick={(e) =>
                                                    removeBadge(
                                                        e,
                                                        getValue(item),
                                                    )
                                                }
                                            >
                                                {getLabel(item)}

                                                <span className="cursor-pointer">
                                                    <X className="h-3 w-3" />
                                                </span>
                                            </Badge>
                                        ))}

                                        {remainingCount > 0 && (
                                            <Badge variant="outline">
                                                +{remainingCount}
                                            </Badge>
                                        )}
                                    </>
                                ) : (
                                    <span className="truncate">
                                        {getLabel(selectedItems[0])}
                                    </span>
                                )
                            ) : (
                                <span className="text-muted-foreground">
                                    {placeholder}
                                </span>
                            )}
                        </div>

                        <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                </PopoverTrigger>

                <PopoverContent
                    align="start"
                    className="w-[var(--radix-popover-trigger-width)] p-0 overflow-hidden"
                    onWheel={(e) => e.stopPropagation()}
                >
                    <Command>
                        <CommandInput placeholder={searchPlaceholder} />

                        <CommandList className="max-h-64 overflow-y-auto" onWheel={(e) => e.stopPropagation()}>
                            <CommandEmpty>No data found.</CommandEmpty>

                            {multiple && selectedItems.length > 0 && (
                                <>
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowSelected((prev) => !prev)
                                        }
                                        className="flex w-full items-center justify-between bg-muted/50 px-3 py-2 text-xs font-semibold"
                                    >
                                        <span>
                                            Selected ({selectedItems.length})
                                        </span>

                                        {showSelected ? (
                                            <ChevronUp className="h-3 w-3" />
                                        ) : (
                                            <ChevronDown className="h-3 w-3" />
                                        )}
                                    </button>

                                    {showSelected && (
                                        <CommandGroup>
                                            {selectedItems.map((item) => {
                                                const itemValue =
                                                    getValue(item);

                                                return (
                                                    <CommandItem
                                                        key={`selected-${itemValue}`}
                                                        value={getLabel(item)}
                                                        onSelect={() =>
                                                            removeSelected(
                                                                itemValue,
                                                            )
                                                        }
                                                        className="text-primary"
                                                    >
                                                        <Check className="h-4 w-4" />

                                                        {getLabel(item)}
                                                    </CommandItem>
                                                );
                                            })}
                                        </CommandGroup>
                                    )}
                                </>
                            )}

                            {multiple && (
                                <div className="bg-muted/50 px-3 py-2 text-xs font-semibold">
                                    Available
                                </div>
                            )}

                            <CommandGroup>
                                {(multiple ? availableItems : options).map(
                                    (item) => {
                                        const itemValue = getValue(item);

                                        const isSelected =
                                            selectedValues.includes(itemValue);

                                        return (
                                            <CommandItem
                                                key={itemValue}
                                                value={getLabel(item)}
                                                onSelect={() =>
                                                    handleSelect(itemValue)
                                                }
                                            >
                                                {!multiple && (
                                                    <Check
                                                        className={cn(
                                                            'h-4 w-4',
                                                            isSelected
                                                                ? 'opacity-100'
                                                                : 'opacity-0',
                                                        )}
                                                    />
                                                )}

                                                {getLabel(item)}
                                            </CommandItem>
                                        );
                                    },
                                )}
                            </CommandGroup>
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>

            {error && <p className="text-sm text-destructive">{error}</p>}
        </div>
    );
}
