import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import type {
  Product,
  ProductVariant,
} from "@/types/product";

export type CartItem = {
  id: string;
  product: Product;
  variant: ProductVariant;
  qty: number;
};

type CartContextType = {
  cartItems: CartItem[];

  totalQty: number;

  addToCart: (
    product: Product,
    variant: ProductVariant,
  ) => void;

  increaseQty: (id: string) => void;

  decreaseQty: (id: string) => void;

  removeItem: (id: string) => void;

  clearCart: () => void;

  getItemQty: (id: string) => number;
};

const CartContext =
  createContext<CartContextType | null>(null);

const STORAGE_KEY = "kelana-grill-cart";

export function CartProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);

      if (!raw) {

        return [];
      }

      return JSON.parse(raw) as CartItem[];
    } catch {
      localStorage.removeItem(STORAGE_KEY);

      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(cartItems),
    );
  }, [cartItems]);

  const addToCart = (
    product: Product,
    variant: ProductVariant,
  ) => {
    const itemId = `${product.id}-${variant.id}`;

    setCartItems((current) => {
      const exists = current.find(
        (item) => item.id === itemId,
      );

      if (exists) {
        return current.map((item) =>
          item.id === itemId
            ? {
              ...item,
              qty: item.qty + 1,
            }
            : item,
        );
      }

      return [
        ...current,
        {
          id: itemId,
          product,
          variant,
          qty: 1,
        },
      ];
    });
  };

  const increaseQty = (id: string) => {
    setCartItems((current) =>
      current.map((item) =>
        item.id === id
          ? {
            ...item,
            qty: item.qty + 1,
          }
          : item,
      ),
    );
  };

  const decreaseQty = (id: string) => {
    setCartItems((current) =>
      current
        .map((item) =>
          item.id === id
            ? {
              ...item,
              qty: item.qty - 1,
            }
            : item,
        )
        .filter((item) => item.qty > 0),
    );
  };

  const removeItem = (id: string) => {
    setCartItems((current) =>
      current.filter(
        (item) => item.id !== id,
      ),
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getItemQty = (id: string) => {
    return (
      cartItems.find(
        (item) => item.id === id,
      )?.qty ?? 0
    );
  };

  const totalQty = useMemo(() => {
    return cartItems.reduce(
      (total, item) => total + item.qty,
      0,
    );
  }, [cartItems]);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        totalQty,
        addToCart,
        increaseQty,
        decreaseQty,
        removeItem,
        clearCart,
        getItemQty,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error(
      "useCart must be used inside CartProvider",
    );
  }

  return context;
}