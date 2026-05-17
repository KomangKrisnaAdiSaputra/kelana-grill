import type { LanguageMode } from '@/lang/landing';

export const supportedLanguages = ['id', 'en'] as const;

export const defaultLanguage: LanguageMode = 'id';

export const languageStorageKey = 'language';

export const isSupportedLanguage = (value?: string): value is LanguageMode => {
    return supportedLanguages.includes(value as LanguageMode);
};

export const getLanguageFromUrl = (): LanguageMode | null => {
    if (typeof window === 'undefined') {
        return null;
    }

    const firstSegment = window.location.pathname.split('/').filter(Boolean)[0];

    return isSupportedLanguage(firstSegment) ? firstSegment : null;
};

export const getSavedLanguage = (): LanguageMode => {
    if (typeof window === 'undefined') {
        return defaultLanguage;
    }

    const savedLanguage = localStorage.getItem(languageStorageKey) ?? undefined;

    return isSupportedLanguage(savedLanguage) ? savedLanguage : defaultLanguage;
};

export const saveLanguage = (language: LanguageMode) => {
    if (typeof window === 'undefined') {
        return;
    }

    localStorage.setItem(languageStorageKey, language);
};

export const getInitialLanguage = (): LanguageMode => {
    return getLanguageFromUrl() ?? getSavedLanguage();
};

export const getUrlWithLanguage = (targetLanguage: LanguageMode) => {
    if (typeof window === 'undefined') {
        return '/';
    }

    const currentPath = window.location.pathname;
    const currentSearch = window.location.search;
    const currentHash = window.location.hash;

    const segments = currentPath.split('/').filter(Boolean);
    const firstSegment = segments[0];

    if (segments.length === 0) {
        return `/${targetLanguage}${currentSearch}${currentHash}`;
    }

    if (isSupportedLanguage(firstSegment)) {
        segments[0] = targetLanguage;
    } else {
        segments.unshift(targetLanguage);
    }

    return `/${segments.join('/')}${currentSearch}${currentHash}`;
};

export const replaceUrlLanguage = (targetLanguage: LanguageMode) => {
    if (typeof window === 'undefined') {
        return;
    }

    window.history.replaceState({}, '', getUrlWithLanguage(targetLanguage));
};

export const pushUrlLanguage = (targetLanguage: LanguageMode) => {
    if (typeof window === 'undefined') {
        return;
    }

    window.history.pushState({}, '', getUrlWithLanguage(targetLanguage));
};

export const ensureUrlHasLanguage = (language: LanguageMode) => {
    if (typeof window === 'undefined') {
        return;
    }

    if (getLanguageFromUrl()) {
        return;
    }

    window.history.replaceState({}, '', getUrlWithLanguage(language));
};

export const getLocalizedHrefByLanguage = (
    href: string,
    language: LanguageMode,
) => {
    if (href.startsWith('#')) {
        return `/${language}${href}`;
    }

    if (href.startsWith('/')) {
        const segments = href.split('/').filter(Boolean);
        const firstSegment = segments[0];

        if (isSupportedLanguage(firstSegment)) {
            segments[0] = language;
        } else {
            segments.unshift(language);
        }

        return `/${segments.join('/')}`;
    }

    return href;
};

export const scrollToLocalizedHref = (localizedHref: string) => {
    if (typeof window === 'undefined') {
        return;
    }

    const hash = localizedHref.includes('#')
        ? localizedHref.substring(localizedHref.indexOf('#'))
        : '';

    if (hash) {
        const targetElement = document.querySelector(hash);

        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
            });

            return;
        }
    }

    window.scrollTo({
        top: 0,
        behavior: 'smooth',
    });
};
