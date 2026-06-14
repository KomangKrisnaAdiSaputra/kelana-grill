import { usePage } from '@inertiajs/react';
type ReplaceValues = Record<string, string | number>;

type PageProps = {
    language?: Record<string, string>;
};

export function formatPrice(price?: number, prefix = 'IDR') {
    if (!price) {
        return '-';
    }

    const formattedPrice = new Intl.NumberFormat('id-ID', {
        maximumFractionDigits: 0,
    }).format(price);

    return `${prefix} ${formattedPrice}`;
}

export function useTranslation() {
    const { language = {} } = usePage<PageProps>().props;

    const __ = (key: string, replace: ReplaceValues = {}): string => {
        let translation = language[key] ?? key;

        Object.entries(replace).forEach(([replaceKey, value]) => {
            translation = translation.replaceAll(
                `:${replaceKey}`,
                String(value),
            );
        });

        return translation;
    };

    return { __ };
}

export function groupMarinades(
    marinades: { id: string; name: string }[],
): Record<string, number> {
    const grouped: Record<string, number> = {};

    marinades.forEach((item) => {
        grouped[item.name] = (grouped[item.name] ?? 0) + 1;
    });

    return grouped;
}
