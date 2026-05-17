export type * from './auth';
export type * from './navigation';
export type * from './ui';

export type ThemeMode = 'dark' | 'light';

export type LandingPackageItem = {
    title: string;
    price: string;
    desc: string;
    features: string[];
    highlight?: boolean;
};

export type LandingFaqItem = {
    key: string;
    translations: {
        id: {
            question: string;
            answer: string;
        };
        en: {
            question: string;
            answer: string;
        };
    };
};

export type LandingNavItem = {
    key?: 'home' | 'about' | 'products' | 'packages' | 'promo' | 'contact';
    name?: string;
    label?: string;
    href: string;
};
