import { formatPrice } from "@/helpers/global";
import type { ThemeMode } from "@/types";
import type {
  Product,
  ProductVariant,
} from "@/types/product";

type ProductCardProps = {
  theme: ThemeMode;
  product: Product;
  qty?: number;
  selectedVariantId?: string;
  addButtonLabel?: string;
  detailButtonLabel?: string;
  onSelectVariant?: (variant: ProductVariant) => void;
  onDetail?: (
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
      (variant) => variant.id === selectedVariantId,
    ) ?? product.variants[0]
  );
}

export default function ProductCard({
  theme,
  product,
  selectedVariantId,
  detailButtonLabel = "Detail",
  onSelectVariant,
  onDetail,
}: ProductCardProps) {
  const selectedVariant = getDefaultVariant(
    product,
    selectedVariantId,
  );

  const category = product.categories?.[0];

  return (
    <article
      className={`
        group overflow-hidden rounded-[30px] border transition duration-300
        hover:-translate-y-1 hover:shadow-2xl hover:shadow-orange-500/10
        ${theme === "dark"
          ? "border-white/10 bg-white/[0.04] hover:bg-white/[0.07]"
          : "border-orange-100 bg-white/80 hover:bg-white"
        }
      `}
    >
      <div className="relative h-56 overflow-hidden">
        <img
          src={product.image}
          alt={product.name ?? "Product Image"}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

        <div className="absolute left-4 top-4 flex flex-wrap gap-2">
          {category && (
            <span className="rounded-full bg-orange-500 px-3 py-1.5 text-xs font-semibold text-white">
              {category.name}
            </span>
          )}

          {product.new && (
            <span
              className="
                rounded-full bg-red-500 px-3 py-1.5
                text-xs font-semibold text-white
              "
            >
              New
            </span>
          )}

          {product.featured && (
            <span
              className="
                rounded-full bg-black/40 px-3 py-1.5
                text-xs font-semibold text-white backdrop-blur-xl
              "
            >
              Featured
            </span>
          )}

          {product.badges?.map((badge) => (
            <span
              key={badge.id}
              className="
                rounded-full bg-black/40 px-3 py-1.5
                text-xs font-semibold text-white backdrop-blur-xl
              "
            >
              {badge.name}
            </span>
          ))}
        </div>
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0 flex-1">
            <h3
              className={`line-clamp-1 text-xl font-semibold ${theme === "dark"
                  ? "text-white"
                  : "text-zinc-950"
                }`}
            >
              {product.name}
            </h3>

            <p
              className={`mt-2 line-clamp-2 text-sm leading-6 ${theme === "dark"
                  ? "text-zinc-400"
                  : "text-zinc-600"
                }`}
            >
              {product.description}
            </p>
          </div>
        </div>

        {product.variants.length > 1 && (
          <div
            className="
              mt-5 flex gap-2 overflow-x-auto pb-1
              [-ms-overflow-style:none]
              [scrollbar-width:none]
              [&::-webkit-scrollbar]:hidden
            "
          >
            {product.variants.map((variant) => {
              const isActive =
                selectedVariant?.id === variant.id;

              return (
                <button
                  key={variant.id}
                  type="button"
                  onClick={() => onSelectVariant?.(variant)}
                  className={`
                    shrink-0 rounded-full border px-3 py-1.5
                    text-xs font-semibold transition
                    ${isActive
                      ? "border-orange-400 bg-orange-500 text-white"
                      : theme === "dark"
                        ? "border-white/10 bg-white/5 text-zinc-300 hover:bg-white/10"
                        : "border-orange-100 bg-orange-50 text-zinc-700 hover:bg-orange-100"
                    }
                  `}
                >
                  {variant.name}
                </button>
              );
            })}
          </div>
        )}

        <div className="mt-5 flex items-end justify-between gap-4">
          <div>
            <p className="text-2xl font-bold text-orange-400">
              {formatPrice(
                selectedVariant?.rate ?? product.rate,
              )}
            </p>

            {(selectedVariant?.minPerson ||
              selectedVariant?.maxPerson) && (
                <p
                  className={`mt-1 text-xs ${theme === "dark"
                      ? "text-zinc-500"
                      : "text-zinc-500"
                    }`}
                >
                  {selectedVariant.minPerson}-
                  {selectedVariant.maxPerson} orang
                </p>
              )}
          </div>

          {onDetail && selectedVariant && (
            <button
              type="button"
              onClick={() =>
                onDetail(product, selectedVariant)
              }
              className={`
                rounded-2xl px-4 py-3 text-sm font-semibold transition
                ${theme === "dark"
                  ? "bg-white/10 text-white ring-1 ring-white/10 hover:bg-white/15"
                  : "bg-orange-50 text-orange-600 ring-1 ring-orange-100 hover:bg-orange-100"
                }
              `}
            >
              {detailButtonLabel}
            </button>
          )}
        </div>
      </div>
    </article>
  );
}