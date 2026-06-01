import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';

import type { ThemeMode } from '@/types';

type ThemeContextValue = {
    theme: ThemeMode;
    setTheme: (theme: ThemeMode) => void;
    toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

type ThemeProviderProps = {
    children: ReactNode;
};

export function ThemeProvider({ children }: ThemeProviderProps) {
    const [theme, setTheme] = useState<ThemeMode>(() => {
        if (typeof window === 'undefined') {
            return 'light';
        }

        const savedTheme = localStorage.getItem(
            'appearance',
        ) as ThemeMode | null;

        return savedTheme === 'dark' || savedTheme === 'light'
            ? savedTheme
            : 'light';
    });

    const toggleTheme = () => {
        setTheme((currentTheme) =>
            currentTheme === 'dark' ? 'light' : 'dark',
        );
    };

    useEffect(() => {
        localStorage.setItem('appearance', theme);

        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [theme]);

    const value = useMemo(
        () => ({
            theme,
            setTheme,
            toggleTheme,
        }),
        [theme],
    );

    return (
        <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
    );
}

export function useTheme() {
    const context = useContext(ThemeContext);

    if (!context) {
        throw new Error('useTheme must be used inside ThemeProvider');
    }

    return context;
}
