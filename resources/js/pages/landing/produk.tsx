import { Head } from "@inertiajs/react";
import {
  Minus,
  Plus,
  Search,
  ShoppingBag,
  SlidersHorizontal,
  X,
} from "lucide-react";
import { useMemo, useState } from "react";

type ProductType = "promo" | "paket" | "ala-carte";

type Product = {
  id: number;
  name: string;
  type: ProductType;
  category: string;
  price: number;
  originalPrice?: number;
  desc: string;
  image: string;
  badge?: string;
};

type MainFilterKey = "all" | ProductType;
type AlaCarteCategoryFilter = "all" | string;

type FilterItem = {
  label: string;
  value: MainFilterKey;
};

const whatsappNumber = "6281234567890";

const products: Product[] = [
  {
    id: 1,
    name: "Promo BBQ Hemat",
    type: "promo",
    category: "Promo",
    price: 299000,
    originalPrice: 399000,
    desc: "Paket promo BBQ hemat untuk acara kecil bersama teman.",
    image:
      "https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?q=80&w=1400&auto=format&fit=crop",
    badge: "Promo",
  },
  {
    id: 2,
    name: "Paket Basic BBQ",
    type: "paket",
    category: "Paket",
    price: 350000,
    desc: "Paket grill basic dengan perlengkapan utama untuk BBQ santai.",
    image:
      "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=1400&auto=format&fit=crop",
    badge: "Starter",
  },
  {
    id: 3,
    name: "Paket Family BBQ",
    type: "paket",
    category: "Paket",
    price: 599000,
    desc: "Paket lengkap untuk keluarga dengan setup yang lebih praktis.",
    image:
      "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1400&auto=format&fit=crop",
    badge: "Best Seller",
  },
  {
    id: 4,
    name: "Paket Event BBQ",
    type: "paket",
    category: "Paket",
    price: 1200000,
    desc: "Paket untuk gathering, ulang tahun, dan acara outdoor.",
    image:
      "https://images.unsplash.com/photo-1558030006-450675393462?q=80&w=1400&auto=format&fit=crop",
    badge: "Event",
  },
  {
    id: 5,
    name: "Beef Slice Premium",
    type: "ala-carte",
    category: "Meat",
    price: 75000,
    desc: "Daging slice premium yang cocok untuk tambahan menu grill.",
    image:
      "https://images.unsplash.com/photo-1603048297172-c92544798d5a?q=80&w=1400&auto=format&fit=crop",
  },
  {
    id: 6,
    name: "Sosis BBQ",
    type: "ala-carte",
    category: "Meat",
    price: 35000,
    desc: "Sosis BBQ gurih untuk pelengkap acara bakaran.",
    image:
      "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?q=80&w=1400&auto=format&fit=crop",
  },
  {
    id: 7,
    name: "Seafood Mix",
    type: "ala-carte",
    category: "Seafood",
    price: 85000,
    desc: "Campuran seafood untuk variasi menu BBQ yang lebih premium.",
    image:
      "https://images.unsplash.com/photo-1615141982883-c7ad0e69fd62?q=80&w=1400&auto=format&fit=crop",
  },
  {
    id: 8,
    name: "Jagung Manis",
    type: "ala-carte",
    category: "Side Dish",
    price: 20000,
    desc: "Jagung manis segar untuk dibakar dengan butter.",
    image:
      "https://images.unsplash.com/photo-1551754655-cd27e38d2076?q=80&w=1400&auto=format&fit=crop",
  },
  {
    id: 9,
    name: "Arang Tambahan",
    type: "ala-carte",
    category: "Add-on",
    price: 25000,
    desc: "Tambahan arang untuk durasi BBQ yang lebih panjang.",
    image:
      "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?q=80&w=1400&auto=format&fit=crop",
  },
  {
    id: 10,
    name: "Chicken Wings BBQ",
    type: "ala-carte",
    category: "Chicken",
    price: 45000,
    desc: "Sayap ayam berbumbu BBQ yang cocok untuk tambahan menu.",
    image:
      "https://images.unsplash.com/photo-1527477396000-e27163b481c2?q=80&w=1400&auto=format&fit=crop",
  },
  {
    id: 11,
    name: "Iced Lemon Tea",
    type: "ala-carte",
    category: "Drink",
    price: 18000,
    desc: "Minuman segar untuk menemani acara BBQ.",
    image:
      "https://images.unsplash.com/photo-1556679343-c7306c1976bc?q=80&w=1400&auto=format&fit=crop",
  },
];

const mainFilters: FilterItem[] = [
  {
    label: "Semua",
    value: "all",
  },
  {
    label: "Promo",
    value: "promo",
  },
  {
    label: "Paket",
    value: "paket",
  },
  {
    label: "Ala Carte",
    value: "ala-carte",
  },
];

const formatIDR = (value: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);
};

export default function ProductCatalogPage() {
  const [activeFilter, setActiveFilter] = useState<MainFilterKey>("all");
  const [activeAlaCarteCategory, setActiveAlaCarteCategory] =
    useState<AlaCarteCategoryFilter>("all");
  const [query, setQuery] = useState("");
  const [cart, setCart] = useState<Record<number, number>>({});
  const [cartOpen, setCartOpen] = useState(false);

  const alaCarteCategories = useMemo(() => {
    const categories = products
      .filter((product) => product.type === "ala-carte")
      .map((product) => product.category);

    return ["all", ...Array.from(new Set(categories))];
  }, []);

  const filteredProducts = useMemo(() => {
    const keyword = query.trim().toLowerCase();

    return products.filter((product) => {
      const matchMainFilter =
        activeFilter === "all" || product.type === activeFilter;

      const matchAlaCarteCategory =
        activeAlaCarteCategory === "all" ||
        (product.type === "ala-carte" &&
          product.category === activeAlaCarteCategory);

      const searchableText = [
        product.name,
        product.category,
        product.desc,
        product.badge,
        product.type,
        product.type === "ala-carte" ? "ala carte alacarte" : "",
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      const matchQuery = keyword === "" || searchableText.includes(keyword);

      return matchMainFilter && matchAlaCarteCategory && matchQuery;
    });
  }, [activeFilter, activeAlaCarteCategory, query]);

  const cartItems = useMemo(() => {
    return Object.entries(cart)
      .map(([id, qty]) => {
        const product = products.find((item) => item.id === Number(id));

        if (!product || qty <= 0) return null;

        return {
          ...product,
          qty,
          subtotal: product.price * qty,
        };
      })
      .filter(Boolean) as Array<Product & { qty: number; subtotal: number }>;
  }, [cart]);

  const totalQty = cartItems.reduce((sum, item) => sum + item.qty, 0);
  const totalPrice = cartItems.reduce((sum, item) => sum + item.subtotal, 0);

  const handleMainFilter = (value: MainFilterKey) => {
    setActiveFilter(value);

    if (value !== "ala-carte") {
      setActiveAlaCarteCategory("all");
    }
  };

  const handleAlaCarteCategory = (category: AlaCarteCategoryFilter) => {
    setActiveAlaCarteCategory(category);

    if (category !== "all") {
      setActiveFilter("ala-carte");
    }
  };

  const resetFilter = () => {
    setActiveFilter("all");
    setActiveAlaCarteCategory("all");
    setQuery("");
  };

  const updateQty = (id: number, action: "plus" | "minus") => {
    setCart((prev) => {
      const currentQty = prev[id] || 0;
      const nextQty =
        action === "plus" ? currentQty + 1 : Math.max(currentQty - 1, 0);

      if (nextQty <= 0) {
        const updated = { ...prev };
        delete updated[id];
        return updated;
      }

      return {
        ...prev,
        [id]: nextQty,
      };
    });
  };

  const checkoutWhatsApp = () => {
    if (!cartItems.length) return;

    const detail = cartItems
      .map((item) => {
        return `- ${item.name} x${item.qty} = ${formatIDR(item.subtotal)}`;
      })
      .join("\n");

    const message = `Halo, saya mau order:\n\n${detail}\n\nTotal: ${formatIDR(
      totalPrice
    )}\n\nMohon info ketersediaannya ya.`;

    const encodedMessage = encodeURIComponent(message);

    window.open(
      `https://wa.me/${whatsappNumber}?text=${encodedMessage}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <>
      <Head title="Produk & Paket" />

      <main className="min-h-screen bg-[#10100f] text-white">
        <section className="border-b border-white/10 bg-[#10100f]/90 backdrop-blur-xl">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-5 md:px-6">
            <a href="/" className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500 to-amber-400 font-bold shadow-lg shadow-orange-500/25">
                G
              </div>

              <div>
                <h1 className="text-lg font-semibold leading-tight">
                  Grill<span className="text-orange-400">Haus</span>
                </h1>
                <p className="text-xs text-zinc-500">Produk & Paket BBQ</p>
              </div>
            </a>

            <button
              type="button"
              onClick={() => setCartOpen(true)}
              className="relative flex h-11 items-center gap-2 rounded-2xl bg-white px-4 text-sm font-semibold text-zinc-950 transition hover:bg-orange-100"
            >
              <ShoppingBag size={18} />
              <span className="hidden sm:inline">Keranjang</span>

              {totalQty > 0 && (
                <span className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-orange-500 text-xs font-bold text-white">
                  {totalQty}
                </span>
              )}
            </button>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-8 md:px-6 md:py-10">
          <div className="grid gap-6 lg:grid-cols-[1fr_380px] lg:items-end">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-orange-400/20 bg-orange-500/10 px-4 py-2 text-sm text-orange-200">
                <SlidersHorizontal size={16} />
                Semua produk dalam satu halaman
              </div>

              <h2 className="max-w-3xl text-4xl font-semibold tracking-tight md:text-6xl">
                Pilih Produk,
                <span className="bg-gradient-to-r from-orange-400 to-amber-300 bg-clip-text text-transparent">
                  {" "}
                  Paket,{" "}
                </span>
                atau Promo.
              </h2>

              <p className="mt-4 max-w-2xl leading-8 text-zinc-400">
                Semua produk dan paket ditampilkan langsung di halaman ini.
                Customer tinggal filter, cari produk, lalu checkout via
                WhatsApp.
              </p>
            </div>

            <div className="rounded-[28px] border border-white/10 bg-white/[0.04] p-4">
              <div className="flex items-center gap-3 rounded-2xl bg-black/30 px-4 py-3">
                <Search size={18} className="text-zinc-500" />

                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Cari produk, paket, kategori..."
                  className="w-full bg-transparent text-sm outline-none placeholder:text-zinc-500"
                />
              </div>
            </div>
          </div>

          <div className="sticky top-0 z-30 mt-8 border-y border-white/10 bg-[#10100f]/90 py-4 backdrop-blur-xl">
            <div className="flex gap-2 overflow-x-auto">
              {mainFilters.map((filter) => (
                <button
                  key={filter.value}
                  type="button"
                  onClick={() => handleMainFilter(filter.value)}
                  className={`shrink-0 rounded-2xl px-5 py-3 text-sm font-semibold transition ${activeFilter === filter.value
                      ? "bg-gradient-to-r from-orange-500 to-amber-400 text-white shadow-lg shadow-orange-500/20"
                      : "bg-white/[0.06] text-zinc-300 hover:bg-white/[0.1]"
                    }`}
                >
                  {filter.label}
                </button>
              ))}

              {(activeFilter !== "all" ||
                activeAlaCarteCategory !== "all" ||
                query) && (
                  <button
                    type="button"
                    onClick={resetFilter}
                    className="shrink-0 rounded-2xl border border-white/10 px-5 py-3 text-sm font-semibold text-zinc-300 transition hover:bg-white/[0.08]"
                  >
                    Reset
                  </button>
                )}
            </div>

            <div className="mt-3 flex gap-2 overflow-x-auto">
              {alaCarteCategories.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => handleAlaCarteCategory(category)}
                  className={`shrink-0 rounded-full px-4 py-2 text-xs font-semibold transition ${activeAlaCarteCategory === category
                      ? "bg-white text-zinc-950"
                      : "bg-white/[0.06] text-zinc-400 hover:bg-white/[0.1]"
                    }`}
                >
                  {category === "all" ? "Semua Ala Carte" : category}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-8 flex items-center justify-between gap-4">
            <div>
              <p className="text-sm text-zinc-500">Menampilkan</p>
              <h3 className="text-2xl font-semibold">
                {filteredProducts.length} Produk
              </h3>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-zinc-400">
              {activeAlaCarteCategory !== "all"
                ? activeAlaCarteCategory
                : activeFilter === "all"
                  ? "Semua Kategori"
                  : mainFilters.find((item) => item.value === activeFilter)
                    ?.label}
            </div>
          </div>

          <div className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  qty={cart[product.id] || 0}
                  onPlus={() => updateQty(product.id, "plus")}
                  onMinus={() => updateQty(product.id, "minus")}
                />
              ))
            ) : (
              <div className="col-span-full rounded-[32px] border border-white/10 bg-white/[0.04] p-10 text-center">
                <p className="text-lg font-semibold">Produk tidak ditemukan</p>
                <p className="mt-2 text-sm text-zinc-500">
                  Coba ubah kata pencarian atau kategori.
                </p>
              </div>
            )}
          </div>
        </section>

        {totalQty > 0 && (
          <div className="fixed bottom-4 left-1/2 z-40 w-[calc(100%-24px)] max-w-xl -translate-x-1/2 lg:hidden">
            <button
              type="button"
              onClick={() => setCartOpen(true)}
              className="flex w-full items-center justify-between rounded-[26px] bg-gradient-to-r from-orange-500 to-amber-400 px-5 py-4 shadow-2xl shadow-orange-500/30"
            >
              <div className="text-left">
                <p className="text-xs text-white/80">{totalQty} item</p>
                <p className="font-semibold">{formatIDR(totalPrice)}</p>
              </div>

              <span className="rounded-full bg-white/20 px-4 py-2 text-sm font-semibold">
                Checkout
              </span>
            </button>
          </div>
        )}

        {cartOpen && (
          <CartDrawer
            cartItems={cartItems}
            totalQty={totalQty}
            totalPrice={totalPrice}
            onClose={() => setCartOpen(false)}
            onCheckout={checkoutWhatsApp}
            onPlus={(id) => updateQty(id, "plus")}
            onMinus={(id) => updateQty(id, "minus")}
          />
        )}
      </main>
    </>
  );
}

function ProductCard({
  product,
  qty,
  onPlus,
  onMinus,
}: {
  product: Product;
  qty: number;
  onPlus: () => void;
  onMinus: () => void;
}) {
  const isPromo = product.type === "promo";

  return (
    <article className="group overflow-hidden rounded-[30px] border border-white/10 bg-white/[0.04] transition duration-300 hover:-translate-y-1 hover:bg-white/[0.07] hover:shadow-2xl hover:shadow-orange-500/10">
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="h-56 w-full object-cover transition duration-500 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

        <div className="absolute left-4 top-4 flex gap-2">
          <span
            className={`rounded-full px-3 py-1.5 text-xs font-semibold ${isPromo
                ? "bg-red-500 text-white"
                : product.type === "paket"
                  ? "bg-orange-500 text-white"
                  : "bg-white/20 text-white backdrop-blur-xl"
              }`}
          >
            {product.category}
          </span>

          {product.badge && (
            <span className="rounded-full bg-black/40 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-xl">
              {product.badge}
            </span>
          )}
        </div>
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h3 className="line-clamp-1 text-xl font-semibold">
              {product.name}
            </h3>

            <p className="mt-2 line-clamp-2 text-sm leading-6 text-zinc-400">
              {product.desc}
            </p>
          </div>

          <QtyButton qty={qty} onPlus={onPlus} onMinus={onMinus} />
        </div>

        <div className="mt-5 flex items-end justify-between gap-4">
          <div>
            {product.originalPrice && (
              <p className="text-sm text-zinc-500 line-through">
                {formatIDR(product.originalPrice)}
              </p>
            )}

            <p className="text-2xl font-bold text-orange-400">
              {formatIDR(product.price)}
            </p>
          </div>

          <button
            type="button"
            onClick={onPlus}
            className="hidden rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-zinc-950 transition hover:bg-orange-100 sm:block"
          >
            Tambah
          </button>
        </div>
      </div>
    </article>
  );
}

function QtyButton({
  qty,
  onPlus,
  onMinus,
}: {
  qty: number;
  onPlus: () => void;
  onMinus: () => void;
}) {
  if (qty <= 0) {
    return (
      <button
        type="button"
        onClick={onPlus}
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-r from-orange-500 to-amber-400 text-white shadow-lg shadow-orange-500/20 transition hover:scale-105"
      >
        <Plus size={18} />
      </button>
    );
  }

  return (
    <div className="flex shrink-0 items-center gap-2 rounded-2xl border border-white/10 bg-black/30 p-1.5">
      <button
        type="button"
        onClick={onMinus}
        className="flex h-8 w-8 items-center justify-center rounded-xl bg-white/10 transition hover:bg-white/20"
      >
        <Minus size={14} />
      </button>

      <span className="min-w-6 text-center text-sm font-semibold">{qty}</span>

      <button
        type="button"
        onClick={onPlus}
        className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-r from-orange-500 to-amber-400 text-white transition hover:scale-105"
      >
        <Plus size={14} />
      </button>
    </div>
  );
}

function CartDrawer({
  cartItems,
  totalQty,
  totalPrice,
  onClose,
  onCheckout,
  onPlus,
  onMinus,
}: {
  cartItems: Array<Product & { qty: number; subtotal: number }>;
  totalQty: number;
  totalPrice: number;
  onClose: () => void;
  onCheckout: () => void;
  onPlus: (id: number) => void;
  onMinus: (id: number) => void;
}) {
  return (
    <div className="fixed inset-0 z-50" onClick={onClose}>
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      <aside
        onClick={(e) => e.stopPropagation()}
        className="absolute bottom-0 right-0 w-full rounded-t-[34px] border border-white/10 bg-[#151515] p-5 shadow-2xl md:bottom-5 md:right-5 md:top-5 md:max-w-md md:rounded-[34px]"
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-orange-400">Order Summary</p>
            <h3 className="text-2xl font-semibold">Keranjang</h3>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition hover:bg-white/20"
          >
            <X size={18} />
          </button>
        </div>

        <div className="mt-6 max-h-[52vh] space-y-4 overflow-y-auto pr-1">
          {cartItems.length === 0 ? (
            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 text-center text-zinc-400">
              Keranjang masih kosong.
            </div>
          ) : (
            cartItems.map((item) => (
              <div
                key={item.id}
                className="rounded-3xl border border-white/10 bg-white/[0.04] p-4"
              >
                <div className="flex gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-20 w-20 rounded-2xl object-cover"
                  />

                  <div className="min-w-0 flex-1">
                    <h4 className="truncate font-semibold">{item.name}</h4>

                    <p className="mt-1 text-sm text-orange-400">
                      {formatIDR(item.price)}
                    </p>

                    <div className="mt-3 flex items-center justify-between">
                      <QtyButton
                        qty={item.qty}
                        onPlus={() => onPlus(item.id)}
                        onMinus={() => onMinus(item.id)}
                      />

                      <p className="font-semibold">
                        {formatIDR(item.subtotal)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="mt-6 rounded-3xl border border-white/10 bg-white/[0.04] p-4">
          <div className="flex items-center justify-between text-sm text-zinc-400">
            <span>Total item</span>
            <span>{totalQty}</span>
          </div>

          <div className="mt-3 flex items-center justify-between">
            <span className="text-lg font-semibold">Total</span>
            <span className="text-2xl font-bold text-orange-400">
              {formatIDR(totalPrice)}
            </span>
          </div>

          <button
            type="button"
            disabled={cartItems.length === 0}
            onClick={onCheckout}
            className="mt-5 w-full rounded-2xl bg-gradient-to-r from-orange-500 to-amber-400 px-6 py-4 font-semibold text-white shadow-xl shadow-orange-500/20 transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-50"
          >
            Checkout WhatsApp
          </button>
        </div>
      </aside>
    </div>
  );
}