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

        features: {
            eyebrow: 'Pengalaman',
            title: 'BBQ Jadi Lebih Praktis.',
            description:
                'Pilih paket BBQ dan perlengkapan sesuai kebutuhan acara kamu dengan proses booking yang mudah.',
            items: [
                {
                    key: 'readyToUse',
                    title: 'Peralatan Siap Pakai',
                    description:
                        'Peralatan grill praktis dan mudah digunakan untuk acara BBQ bersama teman atau keluarga.',
                },
                {
                    key: 'valuePackages',
                    title: 'Paket Hemat',
                    description:
                        'Pilihan paket BBQ dengan isi yang lengkap dan harga yang lebih praktis.',
                },
                {
                    key: 'flexibleMenu',
                    title: 'Pilihan Menu Fleksibel',
                    description:
                        'Pilih paket atau tambahan ala carte sesuai kebutuhan acara kamu.',
                },
                {
                    key: 'easyBooking',
                    title: 'Booking Mudah',
                    description:
                        'Pilih produk, masukkan ke keranjang, lalu lanjutkan pemesanan dengan mudah.',
                },
            ],
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

        features: {
            eyebrow: 'Experience',
            title: 'Make BBQ More Practical.',
            description:
                'Choose BBQ packages and equipment based on your event needs with an easy booking process.',
            items: [
                {
                    key: 'readyToUse',
                    title: 'Ready-to-Use Equipment',
                    description:
                        'Practical grill equipment that is easy to use for BBQ with friends or family.',
                },
                {
                    key: 'valuePackages',
                    title: 'Value Packages',
                    description:
                        'BBQ package options with complete items and practical pricing.',
                },
                {
                    key: 'flexibleMenu',
                    title: 'Flexible Menu Options',
                    description:
                        'Choose packages or ala carte add-ons based on your event needs.',
                },
                {
                    key: 'easyBooking',
                    title: 'Easy Booking',
                    description:
                        'Choose products, add them to your cart, and continue your order easily.',
                },
            ],
        },
    },
} as const;
