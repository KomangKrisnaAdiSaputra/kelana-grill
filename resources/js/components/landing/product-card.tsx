import { formatPrice } from "@/helpers/global";
import type { ThemeMode } from "@/types";
import type {
  LocalizedProductItem,
  LocalizedProductVariant,
} from "@/types/product";

type ProductCardProps = {
  theme: ThemeMode;
  product: LocalizedProductItem;
  qty?: number;
  selectedVariantKey?: string;
  addButtonLabel?: string;
  detailButtonLabel?: string;
  onSelectVariant?: (variant: LocalizedProductVariant) => void;
  onPlus?: (
    product: LocalizedProductItem,
    variant: LocalizedProductVariant,
  ) => void;
  onMinus?: (
    product: LocalizedProductItem,
    variant: LocalizedProductVariant,
  ) => void;
  onClick?: (product: LocalizedProductItem) => void;
  onDetail?: (
    product: LocalizedProductItem,
    variant: LocalizedProductVariant,
  ) => void;
};

type QtyButtonProps = {
  qty: number;
  onPlus: () => void;
  onMinus: () => void;
};

function QtyButton({ qty, onPlus, onMinus }: QtyButtonProps) {
  if (qty <= 0) {
    return (
      <button
        type="button"
        onClick={onPlus}
        className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-xl font-semibold text-zinc-950 transition hover:bg-orange-100"
      >
        +
      </button>
    );
  }

  return (
    <div className="flex items-center rounded-2xl bg-white/10 p-1 ring-1 ring-white/10 backdrop-blur-xl">
      <button
        type="button"
        onClick={onMinus}
        className="flex h-9 w-9 items-center justify-center rounded-xl text-lg font-semibold text-white transition hover:bg-white/10"
      >
        -
      </button>

      <span className="min-w-8 text-center text-sm font-semibold text-white">
        {qty}
      </span>

      <button
        type="button"
        onClick={onPlus}
        className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-lg font-semibold text-zinc-950 transition hover:bg-orange-100"
      >
        +
      </button>
    </div>
  );
}

function getDefaultVariant(
  product: LocalizedProductItem,
  selectedVariantKey?: string,
) {
  return (
    product.variants.find((variant) => variant.key === selectedVariantKey) ??
    product.variants.find((variant) => variant.isDefault) ??
    product.variants[0]
  );
}

function getCategoryClass(type: string) {
  if (type === "package") {
    return "bg-orange-500 text-white";
  }

  if (type === "alacarte") {
    return "bg-white/20 text-white backdrop-blur-xl";
  }

  if (type === "promo") {
    return "bg-red-500 text-white";
  }

  return "bg-black/40 text-white backdrop-blur-xl";
}

export default function ProductCard({
  theme,
  product,
  qty = 0,
  selectedVariantKey,
  addButtonLabel = "Tambah",
  detailButtonLabel = "Detail",
  onSelectVariant,
  onPlus,
  onMinus,
  onClick,
  onDetail,
}: ProductCardProps) {
  const selectedVariant = getDefaultVariant(product, selectedVariantKey);

  const hasPromoPrice =
    typeof selectedVariant?.originalPrice === "number" &&
    typeof selectedVariant?.price === "number" &&
    selectedVariant.originalPrice > selectedVariant.price;

  const category = product.categories[0];

  const canChangeQty = Boolean(onPlus && onMinus && selectedVariant);

  const handlePlus = () => {
    if (!selectedVariant || !onPlus) {
      return;
    }

    onPlus(product, selectedVariant);
  };

  const handleMinus = () => {
    if (!selectedVariant || !onMinus) {
      return;
    }

    onMinus(product, selectedVariant);
  };

  const handleDetail = () => {
    if (!selectedVariant || !onDetail) {
      return;
    }

    onDetail(product, selectedVariant);
  };

  return (
    <article
      onClick={() => onClick?.(product)}
      className={`
        group overflow-hidden rounded-[30px] border transition duration-300
        hover:-translate-y-1 hover:shadow-2xl hover:shadow-orange-500/10
        ${onClick ? "cursor-pointer" : ""}
        ${theme === "dark"
          ? "border-white/10 bg-white/[0.04] hover:bg-white/[0.07]"
          : "border-orange-100 bg-white/80 hover:bg-white"
        }
      `}
    >
      <div className="relative h-56 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

        <div className="absolute left-4 top-4 flex flex-wrap gap-2">
          {category && (
            <span
              className={`rounded-full px-3 py-1.5 text-xs font-semibold ${getCategoryClass(
                product.type,
              )}`}
            >
              {category.label}
            </span>
          )}

          {product.badges.map((badge) => (
            <span
              key={badge.key}
              className={`
                rounded-full px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-xl
                ${badge.key === "promo"
                  ? "bg-red-500"
                  : badge.key === "bestSelling"
                    ? "bg-orange-500"
                    : "bg-black/40"
                }
              `}
            >
              {badge.label}
            </span>
          ))}
        </div>
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h3
              className={`line-clamp-1 text-xl font-semibold ${theme === "dark" ? "text-white" : "text-zinc-950"
                }`}
            >
              {product.name}
            </h3>

            <p
              className={`mt-2 line-clamp-2 text-sm leading-6 ${theme === "dark" ? "text-zinc-400" : "text-zinc-600"
                }`}
            >
              {product.desc}
            </p>
          </div>

          {canChangeQty && (
            <div onClick={(event) => event.stopPropagation()}>
              <QtyButton qty={qty} onPlus={handlePlus} onMinus={handleMinus} />
            </div>
          )}
        </div>

        {product.variants.length > 1 && (
          <div
            onClick={(event) => event.stopPropagation()}
            className="
              mt-5 flex gap-2 overflow-x-auto pb-1
              [-ms-overflow-style:none] [scrollbar-width:none]
              [&::-webkit-scrollbar]:hidden
            "
          >
            {product.variants.map((variant) => {
              const isActive = selectedVariant?.key === variant.key;

              return (
                <button
                  key={variant.key}
                  type="button"
                  onClick={() => onSelectVariant?.(variant)}
                  className={`
                    shrink-0 rounded-full border px-3 py-1.5 text-xs font-semibold transition
                    ${isActive
                      ? "border-orange-400 bg-orange-500 text-white"
                      : theme === "dark"
                        ? "border-white/10 bg-white/5 text-zinc-300 hover:bg-white/10"
                        : "border-orange-100 bg-orange-50 text-zinc-700 hover:bg-orange-100"
                    }
                  `}
                >
                  {variant.label}
                </button>
              );
            })}
          </div>
        )}

        <div className="mt-5 flex items-end justify-between gap-4">
          <div className="min-w-0">
            {hasPromoPrice && (
              <p
                className={`text-sm line-through ${theme === "dark" ? "text-zinc-500" : "text-zinc-400"
                  }`}
              >
                {formatPrice(selectedVariant.originalPrice)}
              </p>
            )}

            <p className="text-2xl font-bold text-orange-400">
              {formatPrice(selectedVariant?.price)}
            </p>

            {selectedVariant?.label && (
              <p
                className={`mt-1 text-xs ${theme === "dark" ? "text-zinc-500" : "text-zinc-500"
                  }`}
              >
                {selectedVariant.label}
              </p>
            )}
          </div>

          <div
            onClick={(event) => event.stopPropagation()}
            className="flex shrink-0 items-center gap-2"
          >
            {onDetail && selectedVariant && (
              <button
                type="button"
                onClick={handleDetail}
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

            {onPlus && selectedVariant && (
              <button
                type="button"
                onClick={handlePlus}
                className={`
                  hidden rounded-2xl px-4 py-3 text-sm font-semibold transition sm:block
                  ${theme === "dark"
                    ? "bg-white text-zinc-950 hover:bg-orange-100"
                    : "bg-zinc-950 text-white hover:bg-orange-500"
                  }
                `}
              >
                {addButtonLabel}
              </button>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}