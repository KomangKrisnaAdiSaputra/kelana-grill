import type { ReactNode } from "react";

import { LanguageProvider } from "@/contexts/language-context";
import { ThemeProvider } from "@/contexts/theme-context";

type AppProviderProps = {
  children: ReactNode;
};

export default function AppProvider({ children }: AppProviderProps) {
  return (
    <LanguageProvider>
      <ThemeProvider>{children}</ThemeProvider>
    </LanguageProvider>
  );
}