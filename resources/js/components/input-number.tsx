import * as React from 'react';
import { Input } from '@/components/ui/input';
import { formatPrice } from '@/helpers/global';

interface InputNumberProps
    extends Omit<
        React.InputHTMLAttributes<HTMLInputElement>,
        'value' | 'onChange' | 'prefix' | 'suffix'
    > {
    value?: number | null;
    onChange: (value: number) => void;

    currency?: boolean;

    prefix?: React.ReactNode;
    suffix?: React.ReactNode;

    error?: string | null;
}

export function InputNumber({
    value,
    onChange,
    currency = false,
    prefix,
    suffix,
    className,
    error = null,
    ...props
}: InputNumberProps) {
    const displayValue = React.useMemo(() => {
        if (value === null || value === undefined) {
            return '';
        }

        return currency
            ? formatPrice(value, '')
            : new Intl.NumberFormat('id-ID').format(value);
    }, [value, currency]);

    const hasPrefix = !!prefix;
    const hasSuffix = !!suffix;

    return (
        <div className="space-y-1">
            <div
                className={`flex overflow-hidden rounded-md border bg-background ${error ? 'border-destructive' : 'border-input'
                    }`}
            >
                {hasPrefix && (
                    <div className="flex shrink-0 items-center border-r bg-muted px-3 text-sm text-muted-foreground">
                        {prefix}
                    </div>
                )}

                <Input
                    {...props}
                    inputMode="numeric"
                    value={displayValue}
                    className={`flex-1 border-0 text-right shadow-none focus-visible:ring-0 ${className ?? ''}`}
                    onChange={(e) => {
                        const raw = e.target.value.replace(/[^\d]/g, '');
                        onChange(raw ? Number(raw) : 0);
                    }}
                />

                {hasSuffix && (
                    <div className="flex shrink-0 items-center border-l bg-muted px-3 text-sm text-muted-foreground">
                        {suffix}
                    </div>
                )}
            </div>

            {error && (
                <p className="text-sm text-destructive">
                    {error}
                </p>
            )}
        </div>
    );
}