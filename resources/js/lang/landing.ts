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
            home: 'Beranda',
            products: 'Produk',
            packages: 'Paket',
            promo: 'Promo',
            contact: 'Kontak',
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
            home: 'Home',
            products: 'Products',
            packages: 'Packages',
            promo: 'Promo',
            contact: 'Contact',
        },
    },
} as const;
