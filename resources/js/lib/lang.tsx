import { usePage } from "@inertiajs/react";

type ReplaceValues = Record<string, string | number>;

type PageProps = {
    language?: Record<string, string>;
};

export function useTranslation() {
    const { language = {} } = usePage<PageProps>().props;

    const __ = (key: string, replace: ReplaceValues = {}): string => {
        let translation = language[key] ?? key;

        Object.entries(replace).forEach(([replaceKey, value]) => {
            translation = translation.replaceAll(`:${replaceKey}`, String(value));
        });

        return translation;
    };

    return { __ };
}