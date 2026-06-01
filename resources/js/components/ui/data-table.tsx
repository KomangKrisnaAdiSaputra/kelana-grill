import * as React from 'react';
import { cn } from '@/lib/utils';

export function DataTable({
    children,
    className,
}: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div
            className={cn(
                'overflow-hidden rounded-3xl border bg-background shadow-sm',
                className,
            )}
        >
            {children}
        </div>
    );
}

export function DataTableToolbar({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex flex-col gap-4 border-b p-6 md:flex-row md:items-center md:justify-between">
            {children}
        </div>
    );
}

export function DataTableTitle({
    title,
    description,
}: {
    title: string;
    description?: string;
}) {
    return (
        <div>
            <h3 className="font-semibold">{title}</h3>

            {description && (
                <p className="mt-1 text-sm text-muted-foreground">
                    {description}
                </p>
            )}
        </div>
    );
}

export function DataTableContent({
    children,
}: {
    children: React.ReactNode;
}) {
    return <div className="overflow-x-auto">{children}</div>;
}

export function DataTableEmpty({
    title = 'No Data Found',
    description = 'There is no data available.',
}: {
    title?: string;
    description?: string;
}) {
    return (
        <div className="flex flex-col items-center justify-center py-20">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
                📦
            </div>

            <h3 className="text-lg font-semibold">{title}</h3>

            <p className="mt-2 text-center text-sm text-muted-foreground">
                {description}
            </p>
        </div>
    );
}