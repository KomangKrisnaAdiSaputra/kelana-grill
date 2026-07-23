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

  const { products = [], product = null, breadcrumbs = [] } = usePage<ProductDetailPageProps>().props;

  const { __ } = useTranslation();
  const { theme, toggleTheme } = useTheme();

  const [scrolled, setScrolled] = useState(false);

  const [activeImage, setActiveImage] = useState(0);

  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(product?.variants?.[0] ?? null);

  const [imageError, setImageError] = useState(false);

  useEffect(() => {

    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);

    return () =>
      window.removeEventListener("scroll", handleScroll);

  }, []);

  const category = product?.categories?.[0] ?? null;
  const isDark = theme === 'dark';


  console.log(product);

  return (
    <>
      <Navbar
        theme={theme}
        scrolled={scrolled}
        onToggleTheme={toggleTheme}
      />

      <div
        className={`relative min-h-screen overflow-hidden transition-all duration-500 ${theme === "dark"
          ? "bg-theme-dark"
          : "bg-theme-light"
          }`}
      >
        <AmbientBackground theme={theme} />

        <main className="relative z-10">

          <section className="container mx-auto px-5 pt-32 pb-24">

            <Breadcrumb
              items={breadcrumbs}
              className="mb-10"
            />

            <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-6 items-start">

              <div className="lg:sticky lg:top-24">

                <div className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm">

                  <div className="relative overflow-hidden rounded-xl">

                    {imageError || !product?.image ? (<ProductImagePlaceholder theme={theme} className="w-full h-[430px] object-cover object-center transition duration-500" />) : (
                      <img
                        src={product?.image}
                        alt={product.name ?? 'Product Image'}
                        onError={() => setImageError(true)}
                        className="w-full h-[430px] object-cover object-center transition duration-500"
                      />
                    )}

                    {category && (
                      <span className="absolute left-4 top-4 rounded-full bg-orange-500 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-white">
                        {category.name ?? ''}
                      </span>
                    )}
                  </div>

                  <div className="mt-3 flex gap-2 overflow-x-auto">
                    {(product?.images ?? []).length > 0 && (
                      (product?.images ?? []).map((image, index) => (

                        <button
                          key={index}
                          onClick={() => setActiveImage(index)}
                          className={` overflow-hidden rounded-lg border transition ${activeImage === index ? "border-orange-500" : "border-zinc-200"}`} >

                          <img src={image} className="h-14 w-14 object-cover" />

                        </button>
                      )))}
                  </div>
                </div>
              </div>

              <div className="lg:sticky lg:top-24">

                <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">

                  {(product?.categories ?? []).length > 0 && (
                    (product?.categories ?? []).map((item, idx) => (
                      <span key={idx} className="inline-flex rounded-full bg-orange-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-orange-600">
                        {item?.name ?? ''}
                      </span>
                    ))
                  )}

                  <h1 className="mt-3 text-3xl font-bold leading-tight text-zinc-900">
                    {product?.name}
                  </h1>

                  <div className="mt-4 flex flex-wrap items-center gap-4 text-sm">

                    <div className="flex items-center gap-2 rounded-full bg-zinc-100 px-3 py-1">

                      <Star
                        size={14}
                        className="fill-yellow-400 text-yellow-400"
                      />

                      <span className="font-semibold">
                        {5}
                      </span>

                    </div>

                    <span className="text-zinc-400">

                      #{product?.code}

                    </span>

                  </div>

                  <div className="mt-6">

                    <h2 className="text-4xl font-bold text-orange-500">

                      IDR {formatPrice(0)}

                    </h2>

                    <p className="mt-1 text-sm text-zinc-500">

                      Harga sewa / {product?.qty} {" "} {product?.unit?.code}

                    </p>

                  </div>

                  <p className="mt-5 line-clamp-3 leading-7 text-zinc-600">

                    {product?.description}

                  </p>

                  <div className="mt-6 space-y-2">

                    <div className="flex items-center gap-3 rounded-lg bg-zinc-50 px-3 py-2.5">

                      <ShieldCheck
                        size={16}
                        className="text-orange-500"
                      />

                      <span className="text-sm">

                        Produk premium berkualitas

                      </span>

                    </div>

                    <div className="flex items-center gap-3 rounded-lg bg-zinc-50 px-3 py-2.5">

                      <CheckCircle2
                        size={16}
                        className="text-orange-500"
                      />

                      <span className="text-sm">

                        Dibersihkan sebelum dikirim

                      </span>

                    </div>

                  </div>

                  <div className="mt-6 grid grid-cols-2 gap-3">

                    <button className="rounded-xl bg-orange-500 py-3 text-sm font-semibold text-white transition hover:bg-orange-600">

                      <span className="flex items-center justify-center gap-2">

                        <MessageCircle size={16} />

                        WhatsApp

                      </span>

                    </button>

                    <button className="rounded-xl border border-zinc-200 py-3 text-sm font-semibold hover:bg-zinc-50">

                      Tambah Keranjang

                    </button>

                  </div>
                </div>
              </div>
            </div>

            <section className="mt-20 grid gap-8 lg:grid-cols-[1fr_380px]">

              {/* Variant */}

              <div>

                <div className="mb-8">

                  <span className="text-sm font-semibold uppercase tracking-[0.3em] text-orange-500">
                    Choose Package
                  </span>



                </div>

                {(product?.variants ?? []).length > 0 && (
                  <>
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p
                          className={`text-xs font-semibold tracking-[0.2em] uppercase ${isDark
                            ? 'text-zinc-400'
                            : 'text-zinc-500'
                            }`}
                        >
                          {__('Pilihan saat ini')}
                        </p>

                        <h2 className="mt-2 text-lg font-semibold">
                          {selectedVariant?.name ?? ""}
                        </h2>
                        <p className="mt-3 max-w-2xl leading-8 text-zinc-500">
                          Pilih paket yang paling sesuai dengan kebutuhan acara
                          Anda.
                        </p>
                      </div>

                      <div className="text-right">
                        <p className="text-2xl font-bold text-orange-400">
                          {formatPrice(selectedVariant?.rate ?? 0)}
                        </p>

                        {(selectedVariant?.minPerson || selectedVariant?.maxPerson) && (
                          <p className={`mt-1 text-xs ${isDark ? 'text-zinc-500' : 'text-zinc-500'}`}>
                            {selectedVariant.minPerson}-{selectedVariant.maxPerson}{' '} orang
                          </p>
                        )}
                      </div>
                    </div>


                    {(product?.variants ?? []).length > 1 && (
                      <div className="mt-5 grid gap-3 sm:grid-cols-2">
                        {(product?.variants ?? []).map((variant) => {
                          const isSelected = selectedVariant?.id === variant.id;

                          return (
                            <div
                              key={variant.id}
                              onClick={() => setSelectedVariant(variant)}
                              className={`cursor-pointer rounded-2xl border p-4 transition-all hover:scale-[1.02] ${isSelected
                                ? 'border-orange-400 bg-orange-500/10'
                                : isDark
                                  ? 'border-white/10 bg-black/20'
                                  : 'border-orange-100 bg-white'
                                } `}
                            >
                              <div className="flex items-start justify-between gap-3">
                                <div>
                                  <p className="text-sm font-semibold">
                                    {variant.name}
                                  </p>

                                  {variant.description && (
                                    <p
                                      className={`mt-1 text-xs ${isDark
                                        ? 'text-zinc-400'
                                        : 'text-zinc-500'
                                        }`}
                                    >
                                      {
                                        variant.description
                                      }
                                    </p>
                                  )}
                                </div>

                                {isSelected && (
                                  <span className="rounded-full bg-orange-500 px-2 py-1 text-[10px] font-semibold text-white">
                                    Aktif
                                  </span>
                                )}
                              </div>

                              <p className="mt-3 text-xl font-bold text-orange-400">
                                {formatPrice(
                                  variant.rate,
                                )}
                              </p>
                            </div>
                          );
                        })}
                      </div>
                    )}

                  </>
                )}


              </div>


            </section>


            <section className="mt-24">

              <div className="mb-10">

                <span className="text-sm font-semibold uppercase tracking-[0.3em] text-orange-500">
                  What's Included
                </span>

                <h2 className="mt-2 text-4xl font-black text-zinc-900">

                  Yang Akan Anda Dapatkan

                </h2>

              </div>

              <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">

                {(product?.items ?? []).length > 0 ? (
                  <div
                    className={`rounded-[28px] border p-5 ${isDark
                      ? 'border-white/10 bg-white/[0.04]'
                      : 'border-zinc-100 bg-white'
                      } `}
                  >
                    <div className="flex items-center justify-between gap-4">
                      <h4 className="text-lg font-semibold">
                        Isi Paket
                      </h4>

                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${isDark
                          ? 'bg-white/10 text-zinc-300'
                          : 'bg-zinc-100 text-zinc-500'
                          } `}
                      >
                        {(product?.items ?? []).length} item
                      </span>
                    </div>

                    <div className="mt-4 grid gap-2">
                      {(product?.items ?? []).map((item) => (
                        <div
                          key={item.name}
                          className={`flex items-start justify-between gap-4 rounded-2xl px-4 py-3 text-sm ${isDark
                            ? 'bg-black/20 text-zinc-300'
                            : 'bg-zinc-50 text-zinc-700'
                            } `}
                        >
                          <div className="min-w-0">
                            <p className="font-semibold">
                              {item.name}
                            </p>

                            {item.description && (
                              <p
                                className={`mt-1 text-xs ${isDark
                                  ? 'text-zinc-400'
                                  : 'text-zinc-500'
                                  }`}
                              >
                                {item.description}
                              </p>
                            )}
                          </div>

                          <span
                            className={`shrink-0 font-semibold ${isDark
                              ? 'text-zinc-400'
                              : 'text-zinc-500'
                              }`}
                          >
                            {Number(item.qty) * Number(item.qtyItem)} {item.unit?.code}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div
                    className={`rounded-[28px] border p-5 text-sm ${isDark
                      ? 'border-white/10 bg-white/[0.04] text-zinc-400'
                      : 'border-zinc-100 bg-zinc-50 text-zinc-500'
                      } `}
                  >
                    {__('Tidak ada data.')}
                  </div>
                )}

              </div>

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