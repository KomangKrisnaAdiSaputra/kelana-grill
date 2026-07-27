import { usePage } from "@inertiajs/react";
import { CheckCircle2, FileText, MessageCircle, ShieldCheck, ShoppingBag, Star, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import AmbientBackground from "@/components/landing/ambient-background";
import Breadcrumb from "@/components/landing/breadcrumb";
import Footer from "@/components/landing/footer";
import MobileNavbar from "@/components/landing/mobile-navbar";
import Navbar from "@/components/landing/navbar";

import ProductImagePlaceholder from "@/components/product-image-placeholder";
import AppProvider from "@/contexts/app-provider";
import { useCart } from "@/contexts/cart-context";
import { useTheme } from "@/contexts/theme-context";

import { formatPrice, useTranslation } from "@/helpers/global";
import type { BreadcrumbItem } from "@/types";
import type { Product, ProductVariant } from "@/types/product";

type ProductDetailPageProps = {
  products: Product[];
  product: Product;
  breadcrumbs: BreadcrumbItem[];
  params: any
};

function DetailContent() {
  const { product = null, breadcrumbs = [], params } = usePage<ProductDetailPageProps>().props;
  const addButtonRef = useRef<HTMLButtonElement>(null);

  const { __ } = useTranslation();
  const { theme, toggleTheme } = useTheme();
  const { addToCart, getItemQty, getItemQtyVariant } = useCart();

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
      if (params?.pv) {
        return product?.variants.find((v) => v.slug == params.pv) ?? null;
      }

      return product.variants[0] ?? null;
    }

    return null;
  });
  const [imageError, setImageError] = useState(false);

  // State & Ref untuk Modal Syarat & Ketentuan
  const [isTermsModalOpen, setIsTermsModalOpen] = useState(false);
  const [isAgreed, setIsAgreed] = useState(false);
  const [hasScrolledToBottom, setHasScrolledToBottom] = useState(false);
  const termsContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Mencegah scroll pada background/body ketika modal terbuka
  useEffect(() => {
    if (isTermsModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isTermsModalOpen]);

  // Handle scroll di dalam modal S&K
  const handleTermsScroll = () => {
    if (termsContentRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = termsContentRef.current;
      // Toleransi 10px untuk penentuan jika user sudah mencapai paling bawah

      if (scrollTop + clientHeight >= scrollHeight - 10) {
        setHasScrolledToBottom(true);
      }
    }
  };

  const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER || '-';
  const isDark = theme === "dark";
  const category = product?.categories?.[0] ?? null;
  const idVariants = (product?.variants ?? []).map((variant) => String(variant.id));
  const cartQty = getItemQty(`${product?.id}${selectedVariant ? `-${selectedVariant?.id}` : ''}`, idVariants.length > 0)
  const cartQtyVariant = getItemQtyVariant(idVariants);

  // Tentukan gambar utama yang ditampilkan
  const currentDisplayImage = activeImage || product?.image;

  // Tentukan harga yang ditampilkan (utamakan varian terpilih)
  const displayPrice = selectedVariant?.rate ?? product?.rate ?? 0;

  // Daftar semua gambar untuk galeri thumbnail
  const galleryImages = [
    ...(product?.image ? [product.image] : []),
    ...(product?.images ?? []),
  ].filter((v, i, a) => a.indexOf(v) === i); // Unique images

  // Handler Kirim Pesan ke WhatsApp
  const handleWa = () => {
    const phoneNumber = whatsappNumber; // Ganti dengan nomor WhatsApp tujuan Anda

    const messageLines = [
      "Halo, saya ingin bertanya/memesan produk berikut:",
      `*Nama Produk:* ${product?.name ?? "-"}`,
      selectedVariant ? `*Varian/Paket:* ${selectedVariant.name}` : null,
      product?.code ? `*SKU:* ${product.code}` : null,
      `*Harga:* ${formatPrice(displayPrice)}`,
      `*Link Produk:* ${window.location.href}`,
    ].filter(Boolean);

    const fullMessage = messageLines.join("\n");
    const waUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(fullMessage)}`;

    window.open(waUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <>
      <Navbar theme={theme} scrolled={scrolled} onToggleTheme={toggleTheme} />

      <div
        className={`relative min-h-screen overflow-hidden transition-colors duration-300 ${isDark ? "bg-theme-dark" : "bg-theme-light"
          }`}
      >
        <AmbientBackground theme={theme} />

        <main className="relative z-10">
          <section className="container mx-auto px-4 sm:px-6 pt-28 sm:pt-32 pb-20">
            <Breadcrumb items={breadcrumbs} isDark={isDark} className="mb-8" />

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
                      <span className="absolute left-4 top-4 rounded-full bg-orange-500/90 backdrop-blur-md px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-white shadow-lg">
                        {category.name ?? ""}
                      </span>
                    )}
                  </div>

                  {/* Thumbnail Strip */}
                  {galleryImages.length > 1 && (
                    <div className="mt-4 flex gap-3 overflow-x-auto pb-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
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
                        {formatPrice(displayPrice)}
                      </span>
                    </div>
                    <p className={`mt-1 text-xs ${isDark ? "text-zinc-400" : "text-zinc-500"}`}>
                      Harga / {product?.qty ?? 1} {product?.unit?.code ?? "Hari"}
                    </p>
                  </div>

                  <p className={`mt-5 text-sm leading-relaxed ${isDark ? "text-zinc-300" : "text-zinc-600"}`}>
                    {product?.description}
                  </p>

                  {/* Value Highlights */}
                  <div className="mt-6 space-y-2.5">
                    <div
                      className={`flex items-center gap-3 rounded-xl px-3.5 py-3 text-sm font-medium ${isDark ? "bg-zinc-800/50 text-zinc-300" : "bg-zinc-50 text-zinc-700"
                        }`}
                    >
                      <ShieldCheck size={18} className="text-orange-500 shrink-0" />
                      <span>Produk premium berkualitas & terjamin</span>
                    </div>

                    <div
                      className={`flex items-center gap-3 rounded-xl px-3.5 py-3 text-sm font-medium ${isDark ? "bg-zinc-800/50 text-zinc-300" : "bg-zinc-50 text-zinc-700"
                        }`}
                    >
                      <CheckCircle2 size={18} className="text-orange-500 shrink-0" />
                      <span>Dibersihkan & disterilkan sebelum dikirim</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="mt-8 grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={handleWa}
                      className="flex items-center justify-center gap-2 rounded-xl bg-orange-500 hover:bg-orange-600 py-3.5 px-4 text-sm font-bold text-white transition-all shadow-md hover:shadow-orange-500/25 cursor-pointer"
                    >
                      <MessageCircle size={18} />
                      <span>WhatsApp</span>
                    </button>
                    <button
                      ref={addButtonRef}
                      onClick={() => {
                        if (!addButtonRef.current || !product || !selectedVariant) {
                          return;
                        }

                        addToCart?.(
                          product,
                          selectedVariant,
                          addButtonRef.current
                        );
                      }}
                      className={`relative inline-flex items-center justify-center gap-2 rounded-xl border px-5 py-3.5 text-sm font-semibold transition-all duration-300 cursor-pointer overflow-visible
                        ${isDark ? "border-zinc-700 bg-zinc-900 text-zinc-100 hover:bg-zinc-800"
                          : "border-zinc-300 bg-white text-zinc-800 hover:bg-zinc-50"
                        }`}
                    >
                      <ShoppingBag size={18} />

                      <span>{__("Tambah")}</span>

                      {cartQty > 0 && (
                        <span
                          className="absolute -top-2 -right-2 flex min-w-[22px] h-[22px] items-center justify-center rounded-full bg-orange-500 px-1.5 text-[11px] font-bold text-white shadow-lg ring-2 ring-white"
                        >
                          {cartQty > 99 ? "99+" : cartQty}
                        </span>
                      )}
                    </button>
                  </div>

                  {/* Tombol Syarat & Ketentuan */}
                  <button
                    type="button"
                    onClick={() => setIsTermsModalOpen(true)}
                    className={`mt-4 w-full flex items-center justify-center gap-2 rounded-xl border py-3 px-4 text-xs font-semibold transition-all cursor-pointer ${isAgreed
                      ? "border-emerald-500/50 bg-emerald-500/10 text-emerald-500"
                      : isDark
                        ? "border-zinc-800 bg-zinc-800/40 hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200"
                        : "border-zinc-200 bg-zinc-50 hover:bg-zinc-100 text-zinc-600 hover:text-zinc-900"
                      }`}
                  >
                    <FileText size={16} className={isAgreed ? "text-emerald-500" : "text-orange-500"} />
                    <span>
                      {isAgreed ? "Syarat & Ketentuan Disetujui" : "Lihat Syarat & Ketentuan Sewa"}
                    </span>
                    {isAgreed && <CheckCircle2 size={14} className="ml-auto text-emerald-500" />}
                  </button>
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
                    <div
                      className={`mb-6 rounded-2xl border p-4 sm:p-5 flex flex-wrap items-center justify-between gap-4 ${isDark ? "border-orange-500/30 bg-orange-500/10" : "border-orange-200 bg-orange-50/50"
                        }`}
                    >
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
                          {formatPrice(selectedVariant.rate)}
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
                      const qty = cartQtyVariant ? (cartQtyVariant[String(variant.id)] ?? 0) : 0;

                      return (
                        <div
                          key={variant.id}
                          onClick={() => setSelectedVariant(variant)}
                          className={`relative group cursor-pointer rounded-2xl border p-5 transition-all duration-300 ${isSelected
                            ? "border-orange-500 bg-orange-500/10 shadow-lg ring-1 ring-orange-500"
                            : isDark
                              ? "border-zinc-800 bg-zinc-900/80 hover:border-zinc-700 hover:bg-zinc-800/80"
                              : "border-zinc-200 bg-white hover:border-zinc-300 hover:shadow-md"
                            }`} >

                          {/* Badge Qty */}
                          {qty > 0 && (
                            <div className="absolute top-0 right-0 translate-x-1/3 -translate-y-1/3 z-20">
                              <div className="flex h-7 min-w-7 items-center justify-center rounded-full bg-orange-500 px-2 text-xs font-bold text-white shadow-lg ring-2 ring-white">
                                {qty > 99 ? "99+" : qty}
                              </div>
                            </div>
                          )}

                          <div className="flex items-start justify-between gap-3">
                            <h4 className="font-bold text-base group-hover:text-orange-500 transition-colors">
                              {variant.name}
                            </h4>

                            {isSelected && (
                              <span className="rounded-full bg-orange-500 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
                                Aktif
                              </span>
                            )}
                          </div>

                          {variant.description && (
                            <p
                              className={`mt-2 text-xs line-clamp-2 ${isDark ? "text-zinc-400" : "text-zinc-500"
                                }`}
                            >
                              {variant.description}
                            </p>
                          )}

                          <div
                            className={`mt-4 flex items-end justify-between border-t pt-3 ${isDark ? "border-zinc-800/60" : "border-zinc-100"
                              }`}
                          >
                            <span className="text-xs text-zinc-400">Tarif</span>

                            <span className="text-lg font-black text-orange-500">
                              {formatPrice(variant.rate)}
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
                <div
                  className={`rounded-3xl border p-6 sm:p-8 backdrop-blur-sm ${isDark
                    ? "border-zinc-800 bg-zinc-900/50"
                    : "border-zinc-200/80 bg-white/60"
                    }`}
                >
                  {/* Header */}
                  <div className="mb-6">
                    <span className="text-xs font-bold uppercase tracking-widest text-orange-500">
                      What's Included
                    </span>

                    <h2 className="mt-1 text-2xl font-extrabold sm:text-3xl">
                      Yang Akan Anda Dapatkan
                    </h2>

                    <p
                      className={`mt-1 text-sm ${isDark ? "text-zinc-400" : "text-zinc-500"
                        }`}
                    >
                      Seluruh perlengkapan yang termasuk dalam paket yang Anda pilih.
                    </p>
                  </div>

                  {/* Summary */}
                  <div
                    className={`mb-6 rounded-2xl border p-4 sm:p-5 flex flex-wrap items-center justify-between gap-4 ${isDark
                      ? "border-orange-500/30 bg-orange-500/10"
                      : "border-orange-200 bg-orange-50/50"
                      }`}
                  >
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-orange-500">
                        Total Kelengkapan
                      </p>

                      <h3 className="mt-0.5 text-lg font-bold">
                        {(product?.items ?? []).reduce((total, item) => total + Number(item.qtyItem ?? 0), 0)} Item
                      </h3>

                      <p
                        className={`mt-1 text-xs ${isDark ? "text-zinc-400" : "text-zinc-500"
                          }`}
                      >
                        Semua item sudah termasuk dalam paket.
                      </p>
                    </div>
                  </div>

                  {/* Item Cards */}
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {(product?.items ?? []).map((item, index) => {
                      const qty = Number(item.qty ?? 1);

                      return (
                        <div
                          key={item.id ?? item.name ?? index}
                          className={`relative rounded-2xl border p-5 transition-all duration-300 ${isDark
                            ? "border-zinc-800 bg-zinc-900/80 hover:border-zinc-700"
                            : "border-zinc-200 bg-white hover:border-zinc-300 hover:shadow-md"
                            }`}
                        >
                          {/* Qty Badge */}
                          <div className="absolute top-0 right-0 translate-x-1/3 -translate-y-1/3">
                            <div className="flex h-7 min-w-7 items-center justify-center rounded-full bg-orange-500 px-2 text-xs font-bold text-white shadow-lg ring-2 ring-white">
                              {Number(item.qtyItem ?? 1)}x
                            </div>
                          </div>

                          <h4 className="font-bold text-base">
                            {item.name}
                          </h4>

                          {item.description && (
                            <p
                              className={`mt-2 line-clamp-2 text-xs ${isDark
                                ? "text-zinc-400"
                                : "text-zinc-500"
                                }`}
                            >
                              {item.description}
                            </p>
                          )}

                          <div
                            className={`mt-4 flex items-end justify-between border-t pt-3 ${isDark
                              ? "border-zinc-800/60"
                              : "border-zinc-100"
                              }`}
                          >
                            <span className="text-xs text-zinc-400">
                              Jumlah
                            </span>

                            <span className="text-lg font-black text-orange-500">
                              {qty} {item.unit?.code ?? "Pcs"}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
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

      {/* Modal Syarat & Ketentuan */}
      {isTermsModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div
            className={`relative w-full max-w-2xl rounded-3xl border shadow-2xl flex flex-col max-h-[90vh] overflow-hidden ${isDark ? "bg-zinc-900 border-zinc-800 text-zinc-100" : "bg-white border-zinc-200 text-zinc-900"
              }`}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b p-5 sm:px-6 dark:border-zinc-800">
              <div className="flex items-center gap-2.5">
                <div className="rounded-xl bg-orange-500/10 p-2 text-orange-500">
                  <FileText size={20} />
                </div>
                <div>
                  <h3 className="text-lg font-bold">Syarat & Ketentuan Sewa</h3>
                  <p className={`text-xs ${isDark ? "text-zinc-400" : "text-zinc-500"}`}>
                    Harap baca seluruh poin syarat dan ketentuan sampai bawah.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsTermsModalOpen(false)}
                className={`rounded-full p-2 transition-colors cursor-pointer ${isDark ? "hover:bg-zinc-800 text-zinc-400" : "hover:bg-zinc-100 text-zinc-500"
                  }`}
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Body (Scrollable tanpa tampilan scrollbar) */}
            <div
              ref={termsContentRef}
              onScroll={handleTermsScroll}
              className="p-5 sm:p-6 overflow-y-auto space-y-4 text-sm leading-relaxed flex-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
            >
              {!hasScrolledToBottom && (
                <div
                  className={`p-4 rounded-xl border text-xs ${isDark ? "bg-orange-500/10 border-orange-500/20 text-orange-300" : "bg-orange-50 border-orange-200 text-orange-800"
                    }`}
                >
                  💡 <strong>Catatan:</strong> Gulir (scroll) hingga akhir teks untuk membuka opsi persetujuan.
                </div>
              )}

              <div className="space-y-3">
                <h4 className="font-bold text-orange-500">1. Persyaratan Identitas & Penyewaan</h4>
                <p className={isDark ? "text-zinc-300" : "text-zinc-600"}>
                  Penyewa wajib memberikan identitas asli berupa KTP/SIM/Paspor yang masih berlaku sebagai jaminan selama masa penyewaan berlangsung.
                </p>
              </div>

              <div className="space-y-3">
                <h4 className="font-bold text-orange-500">2. Durasi & Pengembalian</h4>
                <p className={isDark ? "text-zinc-300" : "text-zinc-600"}>
                  Masa sewa dihitung 24 jam sejak barang diterima. Keterlambatan pengembalian akan dikenakan denda sesuai dengan tarif harian yang berlaku.
                </p>
              </div>

              <div className="space-y-3">
                <h4 className="font-bold text-orange-500">3. Kondisi & Kerusakan Barang</h4>
                <p className={isDark ? "text-zinc-300" : "text-zinc-600"}>
                  Penyewa bertanggung jawab penuh atas keutuhan dan kebersihan produk selama masa sewa. Kerusakan atau kehilangan unit/aksesoris akan dikenakan biaya penggantian/perbaikan.
                </p>
              </div>

              <div className="space-y-3">
                <h4 className="font-bold text-orange-500">4. Pembatalan & Deposit</h4>
                <p className={isDark ? "text-zinc-300" : "text-zinc-600"}>
                  Pembatalan pesanan kurang dari H-1 dari tanggal pengiriman akan dikenakan pemotongan deposit sebesar 50%.
                </p>
              </div>

              <div className="space-y-3">
                <h4 className="font-bold text-orange-500">5. Pengiriman & Pengambilan</h4>
                <p className={isDark ? "text-zinc-300" : "text-zinc-600"}>
                  Pengiriman dilakukan sesuai jadwal yang disepakati. Penyewa wajib memeriksa kondisi kelengkapan barang saat serah terima.
                </p>
              </div>

              <div className="space-y-3">
                <h4 className="font-bold text-orange-500">6. Ketentuan Pembayaran</h4>
                <p className={isDark ? "text-zinc-300" : "text-zinc-600"}>
                  Pembayaran wajib dilunasi sebelum unit dikirimkan atau pada saat serah terima barang di lokasi yang telah ditentukan.
                </p>
              </div>
            </div>

            {/* Modal Footer */}
            <div className={`p-5 sm:px-6 border-t space-y-4 ${isDark ? "border-zinc-800 bg-zinc-900/50" : "border-zinc-200 bg-zinc-50"}`}>
              {/* Checkbox Persetujuan (Hanya Aktif Ketika Selesai Scroll) */}
              <label
                className={`flex items-center gap-3 transition-opacity select-none ${hasScrolledToBottom ? "cursor-pointer opacity-100" : "cursor-not-allowed opacity-40"
                  }`}
              >
                <input
                  type="checkbox"
                  disabled={!hasScrolledToBottom}
                  checked={isAgreed}
                  onChange={(e) => setIsAgreed(e.target.checked)}
                  className="h-4 w-4 rounded border-zinc-300 text-orange-500 focus:ring-orange-500 dark:border-zinc-700 dark:bg-zinc-800 disabled:cursor-not-allowed"
                />
                <span className={`text-xs font-semibold ${isDark ? "text-zinc-300" : "text-zinc-700"}`}>
                  Saya telah membaca dan menyetujui seluruh Syarat & Ketentuan di atas
                </span>
              </label>

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsTermsModalOpen(false)}
                  className={`rounded-xl px-5 py-2.5 text-xs font-bold transition-all cursor-pointer ${isDark
                    ? "border border-zinc-700 hover:bg-zinc-800 text-zinc-300"
                    : "border border-zinc-300 hover:bg-zinc-100 text-zinc-700"
                    }`}
                >
                  Tutup
                </button>
                <button
                  type="button"
                  disabled={!isAgreed}
                  onClick={() => setIsTermsModalOpen(false)}
                  className={`rounded-xl px-6 py-2.5 text-xs font-bold text-white transition-all shadow-md ${isAgreed
                    ? "bg-orange-500 hover:bg-orange-600 shadow-orange-500/20 cursor-pointer"
                    : "bg-zinc-400 dark:bg-zinc-700 cursor-not-allowed opacity-60"
                    }`}
                >
                  Setujui & Lanjutkan
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
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