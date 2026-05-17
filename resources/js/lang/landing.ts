export type LanguageMode = 'id' | 'en';

export const landingTexts = {
    id: {
        navbar: {
            brandSubtitle: 'Premium BBQ Rental',

            light: 'Light',
            dark: 'Dark',

            cart: 'Keranjang',
            cartShort: 'Cart',
            selectedItem: 'item dipilih',

            emptyCartTitle: 'Keranjang masih kosong',
            emptyCartDescription:
                'Pilih produk atau paket grill terlebih dahulu untuk dimasukkan ke keranjang.',
            seeProducts: 'Lihat Produk',

            subtotal: 'Subtotal',
            total: 'Total',
            clearCart: 'Kosongkan',
            checkout: 'Pesan',
        },

        nav: {
            about: 'Tentang',
            products: 'Produk',
            packages: 'Paket',
            promo: 'Promo',
            contact: 'Kontak',
        },

        hero: {
            eyebrow: 'Pengalaman BBQ Premium',
            titlePrefix: 'Sewa Grill',
            titleHighlight: ' Premium',
            titleSuffix: 'untuk BBQ Party Modern',
            description:
                'Rental grill modern untuk party, gathering, camping, dan event dengan setup premium.',
            primaryButton: 'Sewa Sekarang',
            secondaryButton: 'Lihat Paket',
            customers: 'Pelanggan',
            events: 'Event',
            rating: 'Rating',
            review: '“Setup cepat & grill bersih.”',
            fallbackLabel: 'Paket Paling Populer',
            fallbackProductName: 'Family BBQ Set',
            promoLabel: 'Promo',
        },
    },

    en: {
        navbar: {
            brandSubtitle: 'Premium BBQ Rental',

            light: 'Light',
            dark: 'Dark',

            cart: 'Cart',
            cartShort: 'Cart',
            selectedItem: 'items selected',

            emptyCartTitle: 'Your cart is empty',
            emptyCartDescription:
                'Choose a grill product or package first to add it to your cart.',
            seeProducts: 'View Products',

            subtotal: 'Subtotal',
            total: 'Total',
            clearCart: 'Clear',
            checkout: 'Checkout',
        },

        nav: {
            about: 'About',
            products: 'Products',
            packages: 'Packages',
            promo: 'Promo',
            contact: 'Contact',
        },

        hero: {
            eyebrow: 'Premium BBQ Experience',
            titlePrefix: 'Premium Grill',
            titleHighlight: ' Rental',
            titleSuffix: 'for Modern BBQ Party',
            description:
                'Modern grill rental for parties, gatherings, camping, and events with premium setup.',
            primaryButton: 'Rent Now',
            secondaryButton: 'View Packages',
            customers: 'Customers',
            events: 'Events',
            rating: 'Rating',
            review: '“Fast setup & clean grill.”',
            fallbackLabel: 'Most Popular Package',
            fallbackProductName: 'Family BBQ Set',
            promoLabel: 'Promo',
        },
    },
} as const;
