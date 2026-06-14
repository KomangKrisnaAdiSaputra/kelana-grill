import { usePage } from '@inertiajs/react';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import DynamicSelect from '@/components/dynamic-select';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';

import type { Product, ProductItem, ProductVariant } from '@/types/product';

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
  const [pendingVariant, setPendingVariant] = useState<ProductVariant | null>(
    null,
  );
  const [openMarinadeModal, setOpenMarinadeModal] = useState(false);
  const [selectedMarinades, setSelectedMarinades] = useState<
    Record<string, string[]>
  >({});
  const [selectedChoices, setSelectedChoices] = useState<
    Record<string, string[]>
  >({});

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
    const withMarinade = variant?.marinade ?? product?.marinade ?? false;

    if (withMarinade) {
      setPendingProduct(product);
      setPendingVariant(variant);
      setOpenMarinadeModal(true);

      return;
    }

    insertCart(product, variant);
  };

  const insertCart = (
    product: Product,
    variant: ProductVariant,
    items?: CartItem['items'],
  ) => {
    const itemId =
      (product?.variants ?? []).length <= 0
        ? `${product.id}`
        : `${product.id}-${variant.id}`;

    setCartItems((current) => {
      const exists = current.find((item) => item.id === itemId);

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
          items,
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

      <Dialog
        open={openMarinadeModal}
        onOpenChange={setOpenMarinadeModal}
      >
        <DialogContent className="max-w-lg p-0">
          <div className="flex max-h-[80vh] flex-col">
            {/* Header */}
            <DialogHeader className="border-b px-6 py-4">
              <DialogTitle>Pertanyaan</DialogTitle>
            </DialogHeader>
            <DialogDescription />
            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              <div className="space-y-8">
                {/* MARINASI */}
                {(pendingProduct?.items ?? []).some(
                  (item) => item.marinade,
                ) && (
                    <section className="space-y-4">
                      <div>
                        <h3 className="text-sm font-semibold">
                          Marinasi
                        </h3>

                        <p className="text-xs text-muted-foreground">
                          Pilih jenis marinasi untuk
                          setiap item.
                        </p>
                      </div>

                      <div className="space-y-4">
                        {pendingProduct?.items
                          ?.filter(
                            (item) => item.marinade,
                          )
                          .map((item) => (
                            <div
                              key={item.name}
                              className="rounded-xl border bg-card p-4"
                            >
                              <div className="mb-4 flex items-start justify-between gap-4">
                                <div>
                                  <p className="font-medium">
                                    {item.name}
                                  </p>

                                  {item.description && (
                                    <p className="mt-1 text-sm text-muted-foreground">
                                      {
                                        item.description
                                      }
                                    </p>
                                  )}
                                </div>

                                <div className="rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                                  Qty {item.qty}
                                </div>
                              </div>

                              <div className="grid gap-3 md:grid-cols-2">
                                {Array.from({
                                  length: Number(
                                    item.qty ??
                                    0,
                                  ),
                                }).map((_, idx) => (
                                  <div
                                    key={idx}
                                    className="space-y-2"
                                  >
                                    <Label>
                                      Marinasi
                                      #
                                      {idx +
                                        1}
                                    </Label>

                                    <DynamicSelect
                                      options={
                                        marinades
                                      }
                                      value={
                                        selectedMarinades[
                                        item
                                          .name
                                        ]?.[
                                        idx
                                        ] ??
                                        ''
                                      }
                                      onChange={(
                                        value,
                                      ) => {
                                        setSelectedMarinades(
                                          (
                                            prev,
                                          ) => {
                                            const values =
                                              [
                                                ...(prev[
                                                  item
                                                    .name
                                                ] ??
                                                  []),
                                              ];

                                            values[
                                              idx
                                            ] =
                                              value as string;

                                            return {
                                              ...prev,
                                              [item.name]:
                                                values,
                                            };
                                          },
                                        );
                                      }}
                                      getValue={(
                                        item,
                                      ) =>
                                        item.id
                                      }
                                      getLabel={(
                                        item,
                                      ) =>
                                        item.name
                                      }
                                      placeholder="Pilih Marinasi"
                                    />
                                  </div>
                                ))}
                              </div>
                            </div>
                          ))}
                      </div>
                    </section>
                  )}

                {/* PILIHAN */}
                {(pendingProduct?.items ?? []).some(
                  (item) => item.type === 'CHOICE',
                ) && (
                    <section className="space-y-4">
                      <div>
                        <h3 className="text-sm font-semibold">
                          Pilihan Tambahan
                        </h3>

                        <p className="text-xs text-muted-foreground">
                          Pilih opsi yang tersedia untuk
                          produk ini.
                        </p>
                      </div>

                      <div className="space-y-4">
                        {pendingProduct?.items
                          ?.filter(
                            (item) =>
                              item.type === 'CHOICE',
                          )
                          .map((item) => (
                            <div
                              key={item.name}
                              className="rounded-xl border bg-card p-4"
                            >
                              <div className="mb-4 flex items-start justify-between gap-4">
                                <div>
                                  <p className="font-medium">
                                    {item.name}
                                  </p>

                                  {item.description && (
                                    <p className="mt-1 text-sm text-muted-foreground">
                                      {
                                        item.description
                                      }
                                    </p>
                                  )}
                                </div>

                                <div className="rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                                  Qty {item.qty}
                                </div>
                              </div>

                              <div className="grid gap-3 md:grid-cols-2">
                                {Array.from({
                                  length: Number(
                                    item.qty ??
                                    0,
                                  ),
                                }).map((_, idx) => (
                                  <div
                                    key={idx}
                                    className="space-y-2"
                                  >
                                    <Label>
                                      Pilihan
                                      #
                                      {idx +
                                        1}
                                    </Label>

                                    <DynamicSelect
                                      options={
                                        item?.choices ??
                                        []
                                      }
                                      value={
                                        selectedChoices[
                                        item
                                          .name
                                        ]?.[
                                        idx
                                        ] ??
                                        ''
                                      }
                                      onChange={(
                                        value,
                                      ) => {
                                        setSelectedChoices(
                                          (
                                            prev,
                                          ) => {
                                            const values =
                                              [
                                                ...(prev[
                                                  item
                                                    .name
                                                ] ??
                                                  []),
                                              ];

                                            values[
                                              idx
                                            ] =
                                              value as string;

                                            return {
                                              ...prev,
                                              [item.name]:
                                                values,
                                            };
                                          },
                                        );
                                      }}
                                      getValue={(
                                        item,
                                      ) =>
                                        item.id
                                      }
                                      getLabel={(
                                        item,
                                      ) =>
                                        item.name
                                      }
                                      placeholder="Pilih Opsi"
                                    />
                                  </div>
                                ))}
                              </div>
                            </div>
                          ))}
                      </div>
                    </section>
                  )}
              </div>
            </div>

            {/* Footer */}
            <DialogFooter className="border-t px-6 py-4">
              <Button
                variant="outline"
                onClick={() => {
                  setOpenMarinadeModal(false);
                  setSelectedMarinades({});
                  setSelectedChoices({});
                  setPendingProduct(null);
                  setPendingVariant(null);
                }}
              >
                Batal
              </Button>

              <Button
                onClick={() => {
                  if (!pendingProduct || !pendingVariant) {
                    return;
                  }

                  const allMarinadesSelected =
                    pendingProduct.items
                      ?.filter((item) => item.marinade)
                      .every((item) => {
                        const selected =
                          selectedMarinades[
                          item.name
                          ] ?? [];

                        return (
                          selected.length ===
                          item.qty &&
                          selected.every(Boolean)
                        );
                      });

                  const allChoicesSelected =
                    pendingProduct.items
                      ?.filter(
                        (item) =>
                          item.type === 'CHOICE',
                      )
                      .every((item) => {
                        const selected =
                          selectedChoices[
                          item.name
                          ] ?? [];

                        return (
                          selected.length ===
                          item.qty &&
                          selected.every(Boolean)
                        );
                      });

                  if (!allMarinadesSelected) {
                    alert(
                      'Silakan pilih semua marinade terlebih dahulu',
                    );

                    return;
                  }

                  if (!allChoicesSelected) {
                    alert(
                      'Silakan pilih semua pilihan terlebih dahulu',
                    );

                    return;
                  }

                  const items =
                    pendingProduct.items?.map((item) => {
                      const result: ProductItem & {
                        marinadeItems: {
                          id: string;
                          name: string;
                        }[];
                        choiceItems: {
                          id: string;
                          name: string;
                        }[];
                      } = {
                        ...item,
                        marinadeItems: [] as {
                          id: string;
                          name: string;
                        }[],
                        choiceItems: [] as {
                          id: string;
                          name: string;
                        }[],
                      };

                      if (item.marinade) {
                        const selectedIds =
                          selectedMarinades[
                          item.name
                          ] ?? [];

                        result.marinadeItems =
                          selectedIds
                            .map((id) =>
                              marinades.find(
                                (m) =>
                                  String(
                                    m.id,
                                  ) ===
                                  String(id),
                              ),
                            )
                            .filter(Boolean)
                            .map((marinade) => ({
                              id: marinade!.id,
                              name: marinade!
                                .name,
                            }));
                      }

                      if (item.type === 'CHOICE') {
                        const selectedIds =
                          selectedChoices[
                          item.name
                          ] ?? [];

                        result.choiceItems = selectedIds
                          .map((id) =>
                            (
                              item?.choices ?? []
                            ).find(
                              (c) =>
                                String(c.id) ===
                                String(id),
                            ),
                          )
                          .filter(Boolean)
                          .map((choice) => ({
                            id: choice!.id,
                            name: choice!.name,
                          }));
                      }

                      return result;
                    }) ?? [];

                  insertCart(
                    pendingProduct,
                    pendingVariant,
                    items,
                  );

                  setSelectedMarinades({});
                  setSelectedChoices({});
                  setPendingProduct(null);
                  setPendingVariant(null);
                  setOpenMarinadeModal(false);
                }}
              >
                Tambah ke Cart
              </Button>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>
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
