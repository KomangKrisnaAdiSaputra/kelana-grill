import {
  Minus,
  Plus,
  Trash2,
  X,
} from "lucide-react";

import { useMemo } from "react";

import { useCart } from "@/contexts/cart-context";

export default function CartDrawer({
  open,
  onClose,
}: any) {
  const {
    cartItems,
    increaseQty,
    decreaseQty,
    removeItem,
    clearCart,
  } = useCart();

  const total = useMemo(() => {
    return cartItems.reduce(
      (sum, item) =>
        sum +
        item.qty *
        (item.variant.rate ?? 0),
      0,
    );
  }, [cartItems]);

  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[999]">
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      />

      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white p-5">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">
            Keranjang
          </h2>

          <button onClick={onClose}>
            <X />
          </button>
        </div>

        <div className="mt-6 space-y-4">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="rounded-2xl border p-4"
            >
              <div className="flex justify-between">
                <div>
                  <h3 className="font-bold">
                    {
                      item.product
                        .name
                    }
                  </h3>

                  <p className="text-sm opacity-70">
                    {
                      item.variant
                        .name
                    }
                  </p>
                </div>

                <button
                  onClick={() =>
                    removeItem(
                      item.id,
                    )
                  }
                >
                  <Trash2 size={18} />
                </button>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <div className="font-bold text-orange-500">
                  Rp{" "}
                  {(
                    item.variant
                      .rate ??
                    0
                  ).toLocaleString()}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() =>
                      decreaseQty(
                        item.id,
                      )
                    }
                  >
                    <Minus />
                  </button>

                  <span>
                    {item.qty}
                  </span>

                  <button
                    onClick={() =>
                      increaseQty(
                        item.id,
                      )
                    }
                  >
                    <Plus />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 border-t pt-5">
          <div className="flex justify-between text-lg font-bold">
            <span>Total</span>

            <span>
              Rp{" "}
              {total.toLocaleString()}
            </span>
          </div>

          <button
            onClick={clearCart}
            className="mt-4 w-full rounded-2xl bg-red-500 py-3 font-bold text-white"
          >
            Kosongkan
          </button>
        </div>
      </div>
    </div>
  );
}