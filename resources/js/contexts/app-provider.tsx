import type { ReactNode } from "react";

import { ThemeProvider } from "@/contexts/theme-context";

type AppProviderProps = {
  children: ReactNode;
};

export default function AppProvider({ children }: AppProviderProps) {
  return (
    <ThemeProvider>{children}</ThemeProvider>
  );
}