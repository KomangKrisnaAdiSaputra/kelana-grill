import { usePage } from "@inertiajs/react";
import { CheckCircle2, MessageCircle, ShieldCheck, Star } from "lucide-react";
import { useEffect, useState } from "react";

import AmbientBackground from "@/components/landing/ambient-background";
import Breadcrumb from "@/components/landing/breadcrumb";
import Footer from "@/components/landing/footer";
import MobileNavbar from "@/components/landing/mobile-navbar";
import Navbar from "@/components/landing/navbar";

import ProductImagePlaceholder from "@/components/product-image-placeholder";
import AppProvider from "@/contexts/app-provider";
import { useTheme } from "@/contexts/theme-context";

import { formatPrice, useTranslation } from "@/helpers/global";
import type { Product, ProductVariant } from "@/types/product";

type ProductDetailPageProps = {
  products: Product[];
  product: Product;
  breadcrumbs: {
    label: string;
    url: string;
  }[];
};

function DetailContent() {
  const { product = null, breadcrumbs = [] } = usePage<ProductDetailPageProps>().props;

  const { __ } = useTranslation();
  const { theme, toggleTheme } = useTheme();

  const [scrolled, setScrolled] = useState(false);
  const [activeImage, setActiveImage] = useState<string | null>(() => {
    if (product?.image) {
      return product.image;
    }

    if (product?.images && product.images.length > 0) {
      return product.images[0];
    }

    return null;
  });
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(() => {
    if (product?.variants && product.variants.length > 0) {
      return product.variants[0];
    }

    return null;
  });
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isDark = theme === "dark";
  const category = product?.categories?.[0] ?? null;

  // Tentukan gambar utama yang ditampilkan
  const currentDisplayImage = activeImage || product?.image;

  // Tentukan harga yang ditampilkan (utamakan varian terpilih)
  const displayPrice = selectedVariant?.rate ?? product?.price ?? 0;

  // Daftar semua gambar untuk galeri thumbnail
  const galleryImages = [
    ...(product?.image ? [product.image] : []),
    ...(product?.images ?? []),
  ].filter((v, i, a) => a.indexOf(v) === i); // Unique images

  return (
    <>
      <Navbar theme={theme} scrolled={scrolled} onToggleTheme={toggleTheme} />

      <div
        className={`relative min-h-screen overflow-hidden transition-colors duration-300 ${isDark ? 'bg-theme-dark' : 'bg-theme-light'
          }`}
      >
        <AmbientBackground theme={theme} />

        <main className="relative z-10">
          <section className="container mx-auto px-4 sm:px-6 pt-28 sm:pt-32 pb-20">
            <Breadcrumb items={breadcrumbs} className="mb-8" />

            {/* Main Product Display Area */}
            <div className="grid lg:grid-cols-12 gap-8 items-start">

              {/* Left Column: Image Gallery */}
              <div className="lg:col-span-7 lg:sticky lg:top-28">
                <div
                  className={`rounded-3xl border p-4 sm:p-6 shadow-sm backdrop-blur-sm transition-all ${isDark
                    ? "border-zinc-800 bg-zinc-900/80"
                    : "border-zinc-200/80 bg-white/90"
                    }`}
                >
                  <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-zinc-100 dark:bg-zinc-800">
                    {imageError || !currentDisplayImage ? (
                      <ProductImagePlaceholder
                        theme={theme}
                        className="h-full w-full object-cover transition duration-500"
                      />
                    ) : (
                      <img
                        src={currentDisplayImage}
                        alt={product?.name ?? "Product Image"}
                        onError={() => setImageError(true)}
                        className="h-full w-full object-cover object-center transition duration-500 hover:scale-105"
                      />
                    )}

                    {category && (
                      <span className="absolute left-4 top-4 rounded-full bg-orange-500/90 backdrop-blur-md px-3.5 py-1 text.xs font-bold uppercase tracking-wider text-white shadow-lg">
                        {category.name ?? ""}
                      </span>
                    )}
                  </div>

                  {/* Thumbnail Strip */}
                  {galleryImages.length > 1 && (
                    <div className="mt-4 flex gap-3 overflow-x-auto pb-1 scrollbar-thin">
                      {galleryImages.map((imgUrl, index) => {
                        const isActive = currentDisplayImage === imgUrl;

                        return (
                          <button
                            key={index}
                            type="button"
                            onClick={() => {
                              setActiveImage(imgUrl);
                              setImageError(false);
                            }}
                            className={`relative h-20 w-20 shrink-0 overflow-hidden rounded-xl border-2 transition-all ${isActive
                              ? "border-orange-500 scale-95 shadow-md"
                              : isDark
                                ? "border-zinc-800 hover:border-zinc-600"
                                : "border-zinc-200 hover:border-zinc-300"
                              }`}
                          >
                            <img
                              src={imgUrl}
                              alt={`Thumbnail ${index + 1}`}
                              className="h-full w-full object-cover"
                            />
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>

              {/* Right Column: Product Overview & Quick Actions */}
              <div className="lg:col-span-5 lg:sticky lg:top-28">
                <div
                  className={`rounded-3xl border p-6 sm:p-8 shadow-sm backdrop-blur-sm transition-all ${isDark
                    ? "border-zinc-800 bg-zinc-900/80"
                    : "border-zinc-200/80 bg-white/90"
                    }`}
                >
                  {/* Category Badges */}
                  {(product?.categories ?? []).length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-3">
                      {(product?.categories ?? []).map((item, idx) => (
                        <span
                          key={idx}
                          className="inline-flex rounded-full bg-orange-500/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-orange-500"
                        >
                          {item?.name ?? ""}
                        </span>
                      ))}
                    </div>
                  )}

                  <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                    {product?.name}
                  </h1>

                  <div className="mt-3 flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1.5 rounded-full bg-amber-500/10 px-3 py-1 text-amber-500">
                      <Star size={15} className="fill-amber-400 text-amber-400" />
                      <span className="font-bold">5.0</span>
                    </div>

                    {product?.code && (
                      <span className={isDark ? "text-zinc-400" : "text-zinc-500"}>
                        SKU: <strong className="font-mono">{product.code}</strong>
                      </span>
                    )}
                  </div>

                  {/* Price Header */}
                  <div className="mt-6 border-t border-b border-zinc-100 dark:border-zinc-800/80 py-4">
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl sm:text-4xl font-black text-orange-500">
                        IDR {formatPrice(displayPrice)}
                      </span>
                    </div>
                    <p className={`mt-1 text-xs ${isDark ? "text-zinc-400" : "text-zinc-500"}`}>
                      Harga sewa / {product?.qty ?? 1} {product?.unit?.code ?? "Hari"}
                    </p>
                  </div>

                  <p className={`mt-5 text-sm leading-relaxed ${isDark ? "text-zinc-300" : "text-zinc-600"}`}>
                    {product?.description}
                  </p>

                  {/* Value Highlights */}
                  <div className="mt-6 space-y-2.5">
                    <div className={`flex items-center gap-3 rounded-xl px-3.5 py-3 text-sm font-medium ${isDark ? "bg-zinc-800/50 text-zinc-300" : "bg-zinc-50 text-zinc-700"
                      }`}>
                      <ShieldCheck size={18} className="text-orange-500 shrink-0" />
                      <span>Produk premium berkualitas & terjamin</span>
                    </div>

                    <div className={`flex items-center gap-3 rounded-xl px-3.5 py-3 text-sm font-medium ${isDark ? "bg-zinc-800/50 text-zinc-300" : "bg-zinc-50 text-zinc-700"
                      }`}>
                      <CheckCircle2 size={18} className="text-orange-500 shrink-0" />
                      <span>Dibersihkan & disterilkan sebelum dikirim</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="mt-8 grid grid-cols-2 gap-3">
                    <button className="flex items-center justify-center gap-2 rounded-xl bg-orange-500 hover:bg-orange-600 py-3.5 px-4 text-sm font-bold text-white transition-all shadow-md hover:shadow-orange-500/25">
                      <MessageCircle size={18} />
                      <span>WhatsApp</span>
                    </button>

                    <button className={`rounded-xl border py-3.5 px-4 text-sm font-bold transition-all ${isDark
                      ? "border-zinc-700 hover:bg-zinc-800 text-zinc-200"
                      : "border-zinc-300 hover:bg-zinc-50 text-zinc-800"
                      }`}>
                      Tambah Keranjang
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Variant Package Selection Section */}
            {(product?.variants ?? []).length > 0 && (
              <section className="mt-16 sm:mt-24">
                <div
                  className={`rounded-3xl border p-6 sm:p-8 backdrop-blur-sm ${isDark
                    ? "border-zinc-800 bg-zinc-900/50"
                    : "border-zinc-200/80 bg-white/60"
                    }`}
                >
                  <div className="mb-6">
                    <span className="text-xs font-bold uppercase tracking-widest text-orange-500">
                      Choose Package
                    </span>
                    <h2 className="mt-1 text-2xl sm:text-3xl font-extrabold">
                      Pilihan Paket / Variansi
                    </h2>
                    <p className={`mt-1 text-sm ${isDark ? "text-zinc-400" : "text-zinc-500"}`}>
                      Pilih paket yang paling sesuai dengan skala dan kebutuhan acara Anda.
                    </p>
                  </div>

                  {/* Selected Variant Summary */}
                  {selectedVariant && (
                    <div className={`mb-6 rounded-2xl border p-4 sm:p-5 flex flex-wrap items-center justify-between gap-4 ${isDark ? "border-orange-500/30 bg-orange-500/10" : "border-orange-200 bg-orange-50/50"
                      }`}>
                      <div>
                        <p className="text-xs font-bold uppercase tracking-wider text-orange-500">
                          {__("Pilihan Saat Ini")}
                        </p>
                        <h3 className="text-lg font-bold mt-0.5">
                          {selectedVariant.name}
                        </h3>
                        {selectedVariant.description && (
                          <p className={`mt-1 text-xs max-w-xl ${isDark ? "text-zinc-400" : "text-zinc-600"}`}>
                            {selectedVariant.description}
                          </p>
                        )}
                      </div>

                      <div className="text-left sm:text-right">
                        <p className="text-xl sm:text-2xl font-black text-orange-500">
                          IDR {formatPrice(selectedVariant.rate)}
                        </p>
                        {(selectedVariant.minPerson || selectedVariant.maxPerson) && (
                          <p className={`mt-0.5 text-xs font-medium ${isDark ? "text-zinc-400" : "text-zinc-500"}`}>
                            Kapasitas: {selectedVariant.minPerson ?? 0} - {selectedVariant.maxPerson ?? 0} orang
                          </p>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Variant Selection Cards */}
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {(product?.variants ?? []).map((variant) => {
                      const isSelected = selectedVariant?.id === variant.id;

                      return (
                        <div
                          key={variant.id}
                          onClick={() => setSelectedVariant(variant)}
                          className={`group cursor-pointer rounded-2xl border p-5 transition-all duration-200 ${isSelected
                            ? "border-orange-500 bg-orange-500/10 shadow-sm ring-1 ring-orange-500"
                            : isDark
                              ? "border-zinc-800 bg-zinc-900/80 hover:border-zinc-700 hover:bg-zinc-800/80"
                              : "border-zinc-200 bg-white hover:border-zinc-300 hover:shadow-sm"
                            }`}
                        >
                          <div className="flex items-start justify-between gap-2">
                            <h4 className="font-bold text-base group-hover:text-orange-500 transition-colors">
                              {variant.name}
                            </h4>
                            {isSelected && (
                              <span className="shrink-0 rounded-full bg-orange-500 px-2.5 py-0.5 text-[10px] font-bold text-white uppercase tracking-wider">
                                Aktif
                              </span>
                            )}
                          </div>

                          {variant.description && (
                            <p className={`mt-2 text-xs line-clamp-2 ${isDark ? "text-zinc-400" : "text-zinc-500"}`}>
                              {variant.description}
                            </p>
                          )}

                          <div className="mt-4 pt-3 border-t border-zinc-100 dark:border-zinc-800/60 flex items-baseline justify-between">
                            <span className="text-xs text-zinc-400">Tarif</span>
                            <span className="text-lg font-black text-orange-500">
                              IDR {formatPrice(variant.rate)}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </section>
            )}

            {/* Included Items Section */}
            <section className="mt-16 sm:mt-24">

              {(product?.items ?? []).length > 0 ? (
                <>
                  <div className="mb-8">
                    <span className="text-xs font-bold uppercase tracking-widest text-orange-500">
                      What's Included
                    </span>
                    <h2 className="mt-1 text-3xl font-black">
                      Yang Akan Anda Dapatkan
                    </h2>
                  </div>
                  <div
                    className={`rounded-3xl border p-6 sm:p-8 backdrop-blur-sm ${isDark
                      ? "border-zinc-800 bg-zinc-900/50"
                      : "border-zinc-200/80 bg-white/60"
                      }`}
                  >
                    <div className="flex items-center justify-between gap-4 mb-6">
                      <h3 className="text-lg font-bold">Daftar Kelengkapan</h3>
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${isDark ? "bg-zinc-800 text-zinc-300" : "bg-zinc-100 text-zinc-600"
                          }`}
                      >
                        {(product?.items ?? []).length} Item Terkait
                      </span>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                      {(product?.items ?? []).map((item, index) => (
                        <div
                          key={item.id ?? item.name ?? index}
                          className={`flex items-center justify-between gap-4 rounded-2xl border p-4 text-sm transition-all ${isDark
                            ? "border-zinc-800 bg-zinc-900/80 text-zinc-200"
                            : "border-zinc-200/80 bg-white text-zinc-800 shadow-xs"
                            }`}
                        >
                          <div className="min-w-0 flex-1">
                            <p className="font-semibold truncate">{item.name}</p>
                            {item.description && (
                              <p className={`mt-0.5 text-xs truncate ${isDark ? "text-zinc-400" : "text-zinc-500"}`}>
                                {item.description}
                              </p>
                            )}
                          </div>

                          <span className="shrink-0 rounded-xl bg-orange-500/10 px-2.5 py-1 text-xs font-bold text-orange-500">
                            {Number(item.qty ?? 1) * Number(item.qtyItem ?? 1)} {item.unit?.code ?? "Pcs"}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                <div
                  className={`rounded-3xl border p-8 text-center text-sm ${isDark
                    ? "border-zinc-800 bg-zinc-900/30 text-zinc-400"
                    : "border-zinc-200/80 bg-zinc-50 text-zinc-500"
                    }`}
                >
                  {__("Tidak ada rincian item tambahan untuk produk ini.")}
                </div>
              )}
            </section>
          </section>
        </main>

        <MobileNavbar theme={theme} />

        <div className="h-24 xl:hidden" />

        <Footer theme={theme} />
      </div>
    </>
  );
}

export default function DetailPage() {
  return (
    <AppProvider>
      <DetailContent />
    </AppProvider>
  );
}