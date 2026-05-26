import { usePage } from '@inertiajs/react';

import { useTranslation } from '@/helpers/global';

import { contact, produk } from '@/routes/landing';

import type { LandingNavItem } from '@/types';

export default function useLandingNavItems() {
    const locale = usePage<any>().props.params.locale;

    const { __ } = useTranslation();

    return [
        {
            key: 'about',
            name: __('Tentang'),
            href: '#home',
        },
        {
            key: 'products',
            name: __('Produk'),
            href: produk({ locale }).url,
        },
        {
            key: 'contact',
            name: __('Kontak'),
            href: contact({ locale }).url,
        },
    ] satisfies LandingNavItem[];
}
