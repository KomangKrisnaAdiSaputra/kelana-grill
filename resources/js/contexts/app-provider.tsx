import type { ReactNode } from "react";

import { ThemeProvider } from "@/contexts/theme-context";
import { CartProvider } from "./cart-context";

type AppProviderProps = {
  children: ReactNode;
};

export default function AppProvider({ children }: AppProviderProps) {
  return (
    <ThemeProvider>
      <CartProvider>
        {children}
      </CartProvider>
    </ThemeProvider>
  );
}