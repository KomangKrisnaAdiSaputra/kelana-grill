import { ShoppingBag } from "lucide-react";

import { formatPrice } from "@/helpers/global";

import type { ThemeMode } from "@/types";

import type {
  Product,
  ProductVariant,
} from "@/types/product";

type ProductCardProps = {
  theme: ThemeMode;

  product: Product;

  selectedVariantId?: string;

  onSelectVariant?: (
    variant: ProductVariant,
  ) => void;

  onDetail?: (
    product: Product,
    variant: ProductVariant,
  ) => void;

  cartQty?: number;

  onAddToCart?: (
    product: Product,
    variant: ProductVariant,
  ) => void;
};

function getDefaultVariant(
  product: Product,
  selectedVariantId?: string,
) {
  return (
    product.variants.find(
      (variant) =>
        String(variant.id) ===
        String(selectedVariantId),
    ) ?? product.variants[0]
  );
}

export default function ProductCard({
  theme,
  product,
  selectedVariantId,
  onSelectVariant,
  onDetail,
  onAddToCart,
  cartQty = 0,
}: ProductCardProps) {
  const selectedVariant =
    getDefaultVariant(
      product,
      selectedVariantId,
    );

  const category =
    product.categories?.[0];

  return (
    <article
      className={`
        group overflow-hidden rounded-[30px]
        border transition-all duration-300
        hover:-translate-y-1
        hover:shadow-2xl
        hover:shadow-orange-500/10
        ${theme === "dark"
          ? "border-white/10 bg-white/[0.04]"
          : "border-orange-100 bg-white"
        }
      `}
    >
      <div className="relative h-56 overflow-hidden">
        <img
          src={product.image}
          alt={product.name ?? "Product Image"}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />

        {category && (
          <div className="absolute left-4 top-4">
            <span className="rounded-full bg-orange-500 px-3 py-1 text-xs font-semibold text-white">
              {category.name}
            </span>
          </div>
        )}
      </div>

      <div className="p-5">
        <h3 className="text-xl font-semibold">
          {product.name}
        </h3>

        <p className="mt-2 line-clamp-2 text-sm opacity-70">
          {product.description}
        </p>

        {product.variants.length > 1 && (
          <div className="mt-5 flex flex-wrap gap-2">
            {product.variants.map(
              (variant) => {
                const isActive =
                  selectedVariant?.id ===
                  variant.id;

                return (
                  <button
                    key={
                      variant.id
                    }
                    onClick={() =>
                      onSelectVariant?.(
                        variant,
                      )
                    }
                    className={`
                      rounded-full border px-3 py-1 text-xs
                      ${isActive
                        ? "bg-orange-500 text-white"
                        : "bg-zinc-100"
                      }
                    `}
                  >
                    {
                      variant.name
                    }
                  </button>
                );
              },
            )}
          </div>
        )}

        <div className="mt-5 flex items-center justify-between">
          <div>
            <p className="text-2xl font-bold text-orange-500">
              {formatPrice(
                selectedVariant?.rate ??
                0,
              )}
            </p>
          </div>

          <button
            onClick={() =>
              onDetail?.(
                product,
                selectedVariant,
              )
            }
            className="rounded-xl bg-orange-50 px-4 py-2 text-sm font-semibold text-orange-600"
          >
            Detail
          </button>
        </div>

        <button
          onClick={() =>
            onAddToCart?.(
              product,
              selectedVariant,
            )
          }
          className="
            mt-5 flex h-12 w-full items-center justify-center gap-2
            rounded-2xl bg-gradient-to-r from-orange-500 to-amber-400
            text-sm font-semibold text-white
          "
        >
          <ShoppingBag size={16} />

          Tambah

          {cartQty > 0 && (
            <div className="rounded-full bg-white/20 px-2 py-0.5 text-xs">
              {cartQty}
            </div>
          )}
        </button>
      </div>
    </article>
  );
}