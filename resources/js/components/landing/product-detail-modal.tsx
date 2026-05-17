import { formatPrice } from "@/helpers/global";
import type { ThemeMode } from "@/types";
import type {
  LocalizedProductItem,
  LocalizedProductVariant,
} from "@/types/product";

type ProductDetailModalText = {
  modalTitle: string;
  categoriesLabel: string;
  badgesLabel: string;
  variantsLabel: string;
  selectedVariantLabel: string;
  closeLabel: string;
  noDataLabel: string;
};

type ProductDetailModalProps = {
  theme: ThemeMode;
  product: LocalizedProductItem;
  selectedVariant: LocalizedProductVariant;
  text: ProductDetailModalText;
  onClose: () => void;
  onSelectVariant?: (variant: LocalizedProductVariant) => void;
};

export default function ProductDetailModal({
  theme,
  product,
  text,
  onClose,
}: ProductDetailModalProps) {
  const isDark = theme === "dark";

  return (
    <div
      className="
        fixed inset-0 z-50 flex items-stretch justify-center
        bg-black/70 backdrop-blur-sm
        md:items-center md:px-6 md:py-6
      "
      onClick={onClose}
    >
      <div
        onClick={(event) => event.stopPropagation()}
        className={`
          flex h-[100dvh] w-full flex-col overflow-hidden border shadow-2xl
          md:h-auto md:max-h-[92vh] md:max-w-4xl md:rounded-[34px]
          ${isDark
            ? "border-white/10 bg-zinc-950 text-white"
            : "border-orange-100 bg-white text-zinc-950"
          }
        `}
      >
        <div className="relative h-[34dvh] min-h-[260px] overflow-hidden md:h-80">
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/10" />

          <button
            type="button"
            onClick={onClose}
            aria-label={text.closeLabel}
            className="
              absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center
              rounded-full bg-black/45 text-2xl font-semibold text-white
              ring-1 ring-white/15 backdrop-blur-xl transition hover:bg-black/65
            "
          >
            ×
          </button>

          <div className="absolute bottom-0 left-0 right-0 p-5 md:p-7">
            <div className="mb-3 flex flex-wrap gap-2">
              {product.categories.map((category) => (
                <span
                  key={category.key}
                  className="rounded-full bg-orange-500 px-3 py-1.5 text-xs font-semibold text-white shadow-lg shadow-orange-500/20"
                >
                  {category.label}
                </span>
              ))}

              {product.badges.map((badge) => (
                <span
                  key={badge.key}
                  className="rounded-full bg-white/15 px-3 py-1.5 text-xs font-semibold text-white ring-1 ring-white/15 backdrop-blur-xl"
                >
                  {badge.label}
                </span>
              ))}
            </div>

            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-orange-300">
              {text.modalTitle}
            </p>

            <h3 className="mt-2 text-2xl font-bold leading-tight text-white md:text-4xl">
              {product.name}
            </h3>

            <p className="mt-2 line-clamp-2 max-w-3xl text-sm leading-6 text-white/80 md:text-base">
              {product.desc}
            </p>
          </div>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto">
          <div className="space-y-5 p-5 md:p-7">
            <div
              className={`
                rounded-[28px] border p-5
                ${isDark
                  ? "border-white/10 bg-white/[0.04]"
                  : "border-orange-100 bg-orange-50"
                }
              `}
            >
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p
                    className={`text-xs font-semibold uppercase tracking-[0.2em] ${isDark ? "text-zinc-400" : "text-zinc-500"
                      }`}
                  >
                    {text.variantsLabel}
                  </p>

                  <h4 className="mt-2 text-lg font-semibold">
                    Harga Paket
                  </h4>
                </div>

                <div className="hidden rounded-full bg-orange-500/10 px-4 py-2 text-xs font-semibold text-orange-500 md:block">
                  {product.variants.length} opsi
                </div>
              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {product.variants.length > 0 ? (
                  product.variants.map((variant) => (
                    <div
                      key={variant.key}
                      className={`
                        rounded-2xl border p-4
                        ${isDark
                          ? "border-white/10 bg-black/20"
                          : "border-orange-100 bg-white"
                        }
                      `}
                    >
                      <p
                        className={`text-sm font-semibold ${isDark ? "text-white" : "text-zinc-950"
                          }`}
                      >
                        {variant.label}
                      </p>

                      {typeof variant.originalPrice === "number" &&
                        variant.originalPrice > variant.price && (
                          <p
                            className={`mt-2 text-sm line-through ${isDark ? "text-zinc-500" : "text-zinc-400"
                              }`}
                          >
                            {formatPrice(variant.originalPrice)}
                          </p>
                        )}

                      <p className="mt-1 text-2xl font-bold text-orange-400">
                        {formatPrice(variant.price)}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-zinc-500">
                    {text.noDataLabel}
                  </p>
                )}
              </div>
            </div>

            {product.details.length > 0 ? (
              <div className="space-y-4">
                {product.details.map((detail, detailIndex) => (
                  <div
                    key={`${detail.group}-${detailIndex}`}
                    className={`
                      rounded-[28px] border p-5
                      ${isDark
                        ? "border-white/10 bg-white/[0.04]"
                        : "border-zinc-100 bg-white"
                      }
                    `}
                  >
                    <div className="flex items-center justify-between gap-4">
                      <h4 className="text-base font-semibold">
                        {detail.group}
                      </h4>

                      <span
                        className={`
                          rounded-full px-3 py-1 text-xs font-semibold
                          ${isDark
                            ? "bg-white/10 text-zinc-300"
                            : "bg-zinc-100 text-zinc-500"
                          }
                        `}
                      >
                        {detail.items.length} item
                      </span>
                    </div>

                    <div className="mt-4 grid gap-2">
                      {detail.items.map((item, itemIndex) => (
                        <div
                          key={`${item.name}-${itemIndex}`}
                          className={`
                            flex items-start justify-between gap-4 rounded-2xl px-4 py-3 text-sm
                            ${isDark
                              ? "bg-black/20 text-zinc-300"
                              : "bg-zinc-50 text-zinc-700"
                            }
                          `}
                        >
                          <span>{item.name}</span>

                          {item.qty && (
                            <span
                              className={`shrink-0 font-semibold ${isDark ? "text-zinc-400" : "text-zinc-500"
                                }`}
                            >
                              {item.qty}
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div
                className={`
                  rounded-[28px] border p-5 text-sm
                  ${isDark
                    ? "border-white/10 bg-white/[0.04] text-zinc-400"
                    : "border-zinc-100 bg-zinc-50 text-zinc-500"
                  }
                `}
              >
                {text.noDataLabel}
              </div>
            )}
          </div>
        </div>

        <div
          className={`
            border-t p-4 md:p-5
            ${isDark
              ? "border-white/10 bg-zinc-950/95"
              : "border-zinc-100 bg-white/95"
            }
          `}
        >
          <button
            type="button"
            onClick={onClose}
            className={`
              w-full rounded-2xl px-5 py-3 text-sm font-semibold transition
              ${isDark
                ? "bg-white text-zinc-950 hover:bg-orange-100"
                : "bg-zinc-950 text-white hover:bg-orange-500"
              }
            `}
          >
            {text.closeLabel}
          </button>
        </div>
      </div>
    </div>
  );
}