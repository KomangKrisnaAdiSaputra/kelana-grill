import { usePage } from '@inertiajs/react';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import type { Product, ProductItem, ProductVariant } from '@/types/product';
import QuestionDialog from './partials/modal-question';

export type CartPackageInstance = {
  items?: (ProductItem & {
    marinadeItems: {
      id: string;
      name: string;
    }[];
    choiceItems: {
      id: string;
      name: string;
    }[];
  })[];

  productMarinade?: {
    id: string;
    name: string;
  } | null;
};

export type CartItem = {
  id: string;
  name: string;
  descrption: string;
  variant: {
    name: string;
    description: string;
  } | null;
  qty: number;
  rate: number;
  type: string;
  image: string;

  packageInstances: CartPackageInstance[];
};

type CartContextType = {
  cartItems: CartItem[];
  totalQty: number;
  addToCart: (product: Product, variant: ProductVariant) => void;
  increaseQty: (id: string) => void;
  decreaseQty: (id: string) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  getItemQty: (id: string, variant?: boolean) => number;
  getItemQtyVariant: (ids: string[]) => Record<string, number>;
};

const CartContext = createContext<CartContextType | null>(null);
const STORAGE_KEY = 'kelana-grill-cart';

export function CartProvider({ children }: { children: React.ReactNode }) {
  const { marinades } = usePage<{
    marinades: {
      id: string;
      name: string;
    }[];
  }>().props;

  const [pendingProduct, setPendingProduct] = useState<Product | null>(null);
  const [pendingVariant, setPendingVariant] = useState<ProductVariant | null>(null);
  const [openMarinadeModal, setOpenMarinadeModal] = useState(false);
  const [selectedMarinades, setSelectedMarinades] = useState<Record<string, string[]>>({});
  const [selectedChoices, setSelectedChoices] = useState<Record<string, string[]>>({});
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
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product: Product, variant: ProductVariant) => {
    const withQuestion = variant?.marinade ?? product?.marinade ?? false;

    if (withQuestion) {
      setPendingProduct(product);
      setPendingVariant(variant);
      setOpenMarinadeModal(true);

      return;
    }

    insertCart(product, variant);
  };


  const insertCart = (
    product: Product,
    variant: ProductVariant | null,
    items?: CartPackageInstance['items'],
    productMarinade?: {
      id: string;
      name: string;
    } | null,
  ) => {
    const itemId = (product?.variants ?? []).length <= 0 ? `${product.id}` : `${product.id}-${variant?.id ?? ''}`;

    setCartItems((current) => {
      const exists = current.find((item) => item.id === itemId);

      if (exists) {
        return current.map((cartItem) => {
          if (cartItem.id !== itemId) {
            return cartItem;
          }

          return {
            ...cartItem,
            qty: cartItem.qty + 1,

            packageInstances: [
              ...cartItem.packageInstances,
              {
                items,
                productMarinade,
              },
            ],
          };
        });
      }

      return [
        ...current,
        {
          id: itemId,
          name: product.name ?? '',
          descrption: product.description ?? '',
          variant: variant
            ? {
              name: variant.name ?? '',
              description: variant.description ?? '',
            }
            : null,
          qty: 1,
          rate: variant?.rate ?? product.rate ?? 0,
          type: product.type ?? '',
          image: product.image ?? '',

          packageInstances: [
            {
              items,
              productMarinade,
            },
          ],
        },
      ];
    });
  };

  const increaseQty = (id: string) => {
    setCartItems((current) =>
      current.map((item) => {
        if (item.id !== id) {
          return item;
        }

        const lastPackage =
          item.packageInstances[
          item.packageInstances.length - 1
          ];

        return {
          ...item,
          qty: item.qty + 1,

          packageInstances: [
            ...item.packageInstances,

            structuredClone(lastPackage),
          ],
        };
      }),
    );
  };

  const decreaseQty = (id: string) => {
    setCartItems((current) =>
      current
        .map((item) => {
          if (item.id !== id) {
            return item;
          }

          const packageInstances = [
            ...item.packageInstances,
          ];

          packageInstances.pop();

          return {
            ...item,
            qty: packageInstances.length,
            packageInstances,
          };
        })
        .filter((item) => item.qty > 0),
    );
  };

  const removeItem = (id: string) => {
    setCartItems((current) => current.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getItemQtyVariant = (ids: string[]) => {
    return ids.reduce(
      (result, id) => {
        result[id] = cartItems
          .filter((item) => item.id.includes(id))
          .reduce((total, item) => total + Number(item.qty || 0), 0);

        return result;
      },
      {} as Record<string, number>,
    );
  };

  const getItemQty = (id: string, variant: boolean = false) => {
    let total = 0;

    if (variant) {
      const findId = id.split('-')[0] ?? null;
      total += cartItems
        .filter((item) => item.id.includes(findId))
        .reduce((sum, item) => sum + Number(item.qty || 0), 0);
    } else {
      total += cartItems.find((item) => item.id === id)?.qty ?? 0;
    }

    return total;
  };

  const totalQty = useMemo(() => {
    return cartItems.reduce((total, item) => total + item.qty, 0);
  }, [cartItems]);
  console.log(cartItems);

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
        getItemQtyVariant,
      }}
    >
      {children}

      <QuestionDialog
        open={openMarinadeModal}
        onOpenChange={setOpenMarinadeModal}
        product={pendingProduct}
        variant={pendingVariant}
        marinades={marinades}
        selectedMarinades={selectedMarinades}
        selectedChoices={selectedChoices}
        setSelectedMarinades={setSelectedMarinades}
        setSelectedChoices={setSelectedChoices}
        onCancel={() => {
          setSelectedMarinades({});
          setSelectedChoices({});
          setPendingProduct(null);
          setPendingVariant(null);
        }}
        onSubmit={(items, productMarinade) => {
          insertCart(
            pendingProduct!,
            pendingVariant,
            items,
            productMarinade,
          );

          setSelectedMarinades({});
          setSelectedChoices({});
          setPendingProduct(null);
          setPendingVariant(null);
          setOpenMarinadeModal(false);
        }}
      />
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('useCart must be used inside CartProvider');
  }

  return context;
}
