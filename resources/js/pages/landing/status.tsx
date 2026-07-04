import { usePage } from '@inertiajs/react';
import { useEffect, useMemo, useState } from 'react';

import AmbientBackground from '@/components/landing/ambient-background';
import Footer from '@/components/landing/footer';
import MobileNavbar from '@/components/landing/mobile-navbar';
import Navbar from '@/components/landing/navbar';
import AppProvider from '@/contexts/app-provider';
import { useTheme } from '@/contexts/theme-context';
import { formatPrice, useTranslation } from '@/helpers/global';
import type { Order, OrderStatus } from '@/types/order';

function getStatusConfig(status: OrderStatus) {
  switch (status) {
    case 'PAID':
      return {
        label: 'Paid',
        color: 'border-emerald-500/20 bg-emerald-500/10 text-emerald-500',
      };

    case 'DOWN PAYMENT':
      return {
        label: 'Down Payment',
        color: 'border-blue-500/20 bg-blue-500/10 text-blue-500',
      };

    default:
      return {
        label: 'Menunggu Pembayaran',
        color: 'border-orange-500/20 bg-orange-500/10 text-orange-500',
      };
  }
}

type Props = {
  order: Order
};

function StatusPageContent() {
  const { theme, toggleTheme } = useTheme();
  const { __ } = useTranslation();

  const { order } = usePage<Props>().props;

  const [openedItems, setOpenedItems] = useState<Record<string, boolean>>({});
  const [scrolled, setScrolled] = useState(false);

  const status = getStatusConfig(order.status);

  const toggleItem = (id: string) => {
    setOpenedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const totalItems = useMemo(() => {
    return order.details.length;
  }, [order]);

  const payments = order.payments;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };

    handleScroll();

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const calculatePaid = (order: Order) => {
    return (order?.payments ?? [])
      .filter((payment) => payment.status === "PAID")
      .reduce((total, payment) => total + Number(payment.amount), 0);
  };

  const totalPay = Number(order?.total ?? 0) - calculatePaid(order!);


  return (
    <div
      className={`min-h-screen overflow-hidden transition-all duration-500 ${theme === 'dark' ? 'bg-theme-dark' : 'bg-theme-light'
        }`}
    >
      <AmbientBackground theme={theme} />

      <Navbar theme={theme} scrolled={scrolled} onToggleTheme={toggleTheme} />

      <main className="pt-28 pb-16">
        {/* HERO */}

        <section className="relative overflow-hidden">
          <div className="mx-auto max-w-7xl px-4 md:px-6">
            <div className="relative overflow-hidden rounded-[32px] md:rounded-[48px]">
              {/* Background */}

              <div className={`absolute inset-0 ${theme === 'dark' ? 'bg-white/[0.03]' : 'bg-white/70'}`} />
              <div className="absolute -top-24 right-0 h-80 w-80 rounded-full bg-orange-500/20 blur-3xl" />
              <div className="absolute bottom-0 left-0 h-72 w-72 rounded-full bg-orange-400/10 blur-3xl" />
              <div className={`absolute inset-0 border ${theme === 'dark' ? 'border-white/10' : 'border-orange-100'} rounded-[32px] md:rounded-[48px]`} />

              <div className="relative grid gap-8 p-5 sm:p-6 md:gap-10 md:p-8 lg:grid-cols-[1.2fr_0.8fr] lg:p-14">
                {/* LEFT */}

                <div>
                  <div
                    className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm backdrop-blur-xl ${theme === 'dark'
                      ? 'border-orange-400/20 bg-orange-500/10 text-orange-200'
                      : 'border-orange-200 bg-white/70 text-orange-700'
                      } `} >
                    Booking Status
                  </div>

                  <h1 className="mt-6 break-words text-2xl font-black tracking-tight sm:text-3xl md:text-4xl">
                    {__("Pesanan")} #
                    <span className="ml-1 break-all bg-gradient-to-r from-orange-500 via-amber-400 to-yellow-300 bg-clip-text text-transparent">
                      {order.bookingId}
                    </span>
                  </h1>

                  <div className="mt-6 flex items-center gap-3">
                    <span className={`h-3 w-3 rounded-full ${order.status === 'PAID' ? 'bg-green-500' : order.status === 'UNPAID' ? 'bg-amber-500' : 'bg-zinc-400'}`} />

                    <span className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>
                      {__(status.label)}
                    </span>
                  </div>

                  <h2 className="mt-8 bg-gradient-to-r from-orange-400 via-amber-400 to-yellow-300 bg-clip-text text-4xl font-black text-transparent sm:text-5xl md:text-6xl lg:text-7xl">
                    {formatPrice(totalPay)}
                  </h2>

                  <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    <div
                      className={`rounded-2xl px-5 py-4 backdrop-blur-xl ${theme === 'dark'
                        ? 'bg-white/[0.04] ring-1 ring-white/10'
                        : 'bg-white/80 ring-1 ring-orange-100'
                        }`}
                    >
                      <p className="text-xs tracking-wide text-zinc-500 uppercase">
                        {__("Pengambilan")}
                      </p>

                      <p className="mt-1 font-semibold">
                        {order.pickupDate}
                      </p>
                    </div>

                    <div
                      className={`rounded-2xl px-5 py-4 backdrop-blur-xl ${theme === 'dark'
                        ? 'bg-white/[0.04] ring-1 ring-white/10'
                        : 'bg-white/80 ring-1 ring-orange-100'
                        }`}
                    >
                      <p className="text-xs tracking-wide text-zinc-500 uppercase">
                        {__("Pengembalian")}
                      </p>

                      <p className="mt-1 font-semibold">
                        {order.returnDate}
                      </p>
                    </div>

                    <div
                      className={`rounded-2xl px-5 py-4 backdrop-blur-xl ${theme === 'dark'
                        ? 'bg-white/[0.04] ring-1 ring-white/10'
                        : 'bg-white/80 ring-1 ring-orange-100'
                        }`}
                    >
                      <p className="text-xs tracking-wide text-zinc-500 uppercase">
                        {__("Barang")}
                      </p>

                      <p className="mt-1 font-semibold">
                        {totalItems} {__("Produk")}
                      </p>
                    </div>
                  </div>

                  <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                    <a
                      href={`https://wa.me/${import.meta.env.VITE_WHATSAPP_NUMBER}`}
                      className="flex items-center justify-center rounded-2xl bg-orange-500 px-6 py-4 font-semibold text-white shadow-lg shadow-orange-500/20 transition hover:-translate-y-1 hover:bg-orange-600"
                    >
                      {__("Kontak Kami")}
                    </a>

                    <button
                      type="button"
                      onClick={() => {
                        document.getElementById('order-items')?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className={`flex items-center justify-center rounded-2xl px-6 py-4 font-semibold transition ${theme === 'dark'
                        ? 'border border-white/10 bg-white/[0.04] hover:bg-white/[0.08]'
                        : 'border border-orange-100 bg-white/80 hover:bg-orange-50'
                        }`}
                    >
                      {__("Lihat")} Order
                    </button>
                  </div>
                </div>

                {/* RIGHT */}

                <div className="relative lg:sticky lg:top-28">
                  <div
                    className={`rounded-[24px] md:rounded-[32px] p-6 backdrop-blur-xl ${theme === 'dark'
                      ? 'bg-white/[0.05] ring-1 ring-white/10'
                      : 'bg-white/90 ring-1 ring-orange-100'
                      } `}
                  >
                    <p className="text-sm tracking-[0.2em] text-orange-500 uppercase">
                      Customer
                    </p>

                    <h3 className="mt-4 break-words text-xl font-bold sm:text-2xl">
                      {order.firstName} {order.lastName}
                    </h3>

                    <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-1">
                      <div>
                        <p className="text-xs text-zinc-500">
                          Phone
                        </p>

                        <p className="mt-1 font-medium">
                          {order.phone}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs text-zinc-500">
                          Email
                        </p>

                        <p className="mt-1 font-medium">
                          {order.email}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs text-zinc-500">
                          {__("Pembayaran")}
                        </p>

                        <p className="mt-1 font-medium">
                          {order.payment}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs text-zinc-500">
                          {__("Jaminan")}
                        </p>

                        <p className="mt-1 font-medium">
                          {order.guarantee}
                        </p>
                      </div>
                    </div>

                    <div
                      className={`mt-6 border-t pt-6 ${theme === 'dark'
                        ? 'border-white/10'
                        : 'border-orange-100'
                        }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-zinc-500">
                          Total
                        </span>

                        <span className="text-xl font-bold sm:text-2xl">
                          {formatPrice(order.total)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= PAYMENT TIMELINE ================= */}
        {payments.length > 0 && (
          <section className="mx-auto mt-10 max-w-7xl px-4 md:px-6">
            <div
              className={`rounded-3xl border p-6 backdrop-blur-xl md:p-8 ${theme === "dark"
                ? "border-blue-500/20 bg-blue-500/5"
                : "border-blue-200 bg-blue-50"
                }`}
            >
              {/* Header */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-blue-500">
                    {__("Payment History")}
                  </p>

                  <h3
                    className={`mt-2 text-xl font-semibold ${theme === "dark" ? "text-white" : "text-zinc-900"
                      }`}
                  >
                    {__("Payments")}
                  </h3>
                </div>

                <span
                  className={`rounded-full border px-3 py-1 text-xs ${theme === "dark"
                    ? "border-blue-500/20 bg-blue-500/10 text-blue-300"
                    : "border-blue-200 bg-blue-100 text-blue-600"
                    }`}
                >
                  {payments.length} {payments.length > 1 ? "Payments" : "Payment"}
                </span>
              </div>

              <div className="mt-8 space-y-5">
                {payments.map((p: any, index: number) => {
                  const statusClass =
                    p.status === "PAID"
                      ? theme === "dark"
                        ? "bg-green-500/10 text-green-300"
                        : "bg-green-100 text-green-700"
                      : p.status === "CANCEL"
                        ? theme === "dark"
                          ? "bg-red-500/10 text-red-300"
                          : "bg-red-100 text-red-700"
                        : theme === "dark"
                          ? "bg-yellow-500/10 text-yellow-300"
                          : "bg-yellow-100 text-yellow-700";

                  return (
                    <div key={p.id} className="flex gap-4">
                      {/* Timeline hanya jika payment > 1 */}
                      {payments.length > 1 && (
                        <div className="flex flex-col items-center">
                          <div
                            className={`mt-3 h-3 w-3 rounded-full ${p.status === "PAID"
                              ? "bg-green-500"
                              : p.status === "CANCEL"
                                ? "bg-red-500"
                                : "bg-yellow-500"
                              }`}
                          />

                          {index < payments.length - 1 && (
                            <div
                              className={`mt-2 flex-1 w-px ${theme === "dark"
                                ? "bg-blue-500/20"
                                : "bg-blue-200"
                                }`}
                            />
                          )}
                        </div>
                      )}

                      {/* Card */}
                      <div
                        className={`flex-1 rounded-2xl border p-5 ${theme === "dark"
                          ? "border-white/10 bg-white/5"
                          : "border-zinc-200 bg-white"
                          }`}
                      >
                        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                          <div className="space-y-2">
                            <div>
                              <p
                                className={`text-lg font-semibold ${theme === "dark"
                                  ? "text-white"
                                  : "text-zinc-900"
                                  }`}
                              >
                                Payment #{p.paymentNo}
                              </p>

                              <p
                                className={`text-sm ${theme === "dark"
                                  ? "text-zinc-400"
                                  : "text-zinc-500"
                                  }`}
                              >
                                {p.paymentMethod}
                                {p.paymentChannel
                                  ? ` • ${p.paymentChannel}`
                                  : ""}
                              </p>
                            </div>

                            <div
                              className={`text-sm ${theme === "dark"
                                ? "text-zinc-300"
                                : "text-zinc-600"
                                }`}
                            >
                              <p>
                                <span className="font-medium">
                                  {__("Paid At")}:
                                </span>{" "}
                                {p.paidAt ?? __("Waiting payment")}
                              </p>

                              {p.note && (
                                <p className="mt-1">
                                  <span className="font-medium">
                                    {__("Note")}:
                                  </span>{" "}
                                  {p.note}
                                </p>
                              )}

                              {p.createBy && (
                                <p className="mt-1">
                                  <span className="font-medium">
                                    {__("Created By")}:
                                  </span>{" "}
                                  {p.createBy}
                                </p>
                              )}
                            </div>
                          </div>

                          <div className="text-left md:text-right">
                            <p
                              className={`text-xl font-bold ${theme === "dark"
                                ? "text-white"
                                : "text-zinc-900"
                                }`}
                            >
                              {formatPrice(p.amount)}
                            </p>

                            <span
                              className={`mt-2 inline-flex rounded-full px-3 py-1 text-xs font-medium ${statusClass}`}
                            >
                              {__(p.status)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* ================= ORDER ITEMS ================= */}
        <section className="mt-12 scroll-mt-32" id="order-items">
          <div className="mx-auto max-w-7xl px-4 md:px-6">
            <div
              className={`overflow-hidden rounded-3xl border backdrop-blur-xl ${theme === 'dark'
                ? 'border-orange-500/20 bg-orange-500/5'
                : 'border-orange-200 bg-orange-50'
                } `}
            >
              {/* HEADER */}
              <div
                className={`border-b p-6 md:p-8 ${theme === 'dark' ? 'border-orange-500/20' : 'border-orange-200'} `}
              >
                <p className="text-xs tracking-[0.3em] text-orange-500 uppercase">
                  {__("Barang yang Dipesan")}
                </p>

                <h2
                  className={`mt-2 text-2xl font-semibold md:text-3xl ${theme === 'dark' ? 'text-white' : 'text-zinc-900'} `}
                >
                  {__("Pesanan Anda")}
                </h2>

                <p
                  className={`mt-1 text-sm ${theme === 'dark' ? 'text-orange-200/60' : 'text-zinc-600'} `}
                >
                  {totalItems} {__("barang dalam pesanan ini")}
                </p>
              </div>

              {/* LIST */}
              <div
                className={`divide-y ${theme === 'dark' ? 'divide-orange-500/10' : 'divide-orange-200'} `}
              >
                {order.details.map((item: any) => {
                  const hasDetail = item.packages?.length > 0 && item.packages.some((pkg: any) => pkg.items?.length > 0 || pkg.options?.length > 0);
                  const isOpen = openedItems[item.id] ?? false;
                  const includedItems = item.packages?.reduce((t: number, pkg: any) => t + (pkg.items?.length || 0), 0);

                  return (
                    <div key={item.id}>
                      {/* ITEM */}
                      <button
                        onClick={() =>
                          hasDetail &&
                          toggleItem(item.id)
                        }
                        className={`flex w-full justify-between px-6 py-6 text-left transition md:px-8 ${theme === 'dark'
                          ? 'hover:bg-orange-500/5'
                          : 'hover:bg-orange-100/50'
                          } `}
                      >
                        {/* LEFT */}
                        <div className="pr-6">
                          <div className="flex flex-wrap items-center gap-2">
                            <h3
                              className={`text-base font-semibold md:text-lg ${theme === 'dark' ? 'text-white' : 'text-zinc-900'} `}
                            >
                              {item.name}
                            </h3>

                            {item.variant?.name && (
                              <span
                                className={`rounded-full px-2 py-1 text-[11px] ${theme ===
                                  'dark'
                                  ? 'bg-orange-500/10 text-orange-300'
                                  : 'bg-orange-100 text-orange-600'
                                  } `}
                              >
                                {item.variant.name}
                              </span>
                            )}
                          </div>

                          <p
                            className={`mt-1 text-sm ${theme === 'dark' ? 'text-zinc-300' : 'text-zinc-600'} `}>
                            {item.description}
                          </p>

                          {(hasDetail && includedItems > 0) && (
                            <p
                              className={`mt-2 text-xs ${theme === 'dark' ? 'text-orange-300' : 'text-orange-600'} `}
                            >
                              {includedItems}{' '} {__("barang yang termasuk")}
                            </p>
                          )}
                        </div>

                        {/* RIGHT */}
                        <div className="text-right">
                          <p
                            className={
                              theme === 'dark'
                                ? 'font-semibold text-white'
                                : 'font-semibold text-zinc-900'
                            }
                          >
                            {formatPrice(item.total)}
                          </p>

                          <p
                            className={`text-xs ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-500'} `} >
                            Qty × {item.qty}
                          </p>

                          {hasDetail && (
                            <div
                              className={`mt-2 inline-flex h-7 w-7 items-center justify-center rounded-full border ${theme === 'dark'
                                ? 'border-orange-500/20 bg-orange-500/10 text-orange-300'
                                : 'border-orange-200 bg-orange-100 text-orange-600'
                                } `}
                            >
                              {isOpen ? '−' : '+'}
                            </div>
                          )}
                        </div>
                      </button>

                      {/* DETAIL */}
                      {hasDetail && (
                        <div
                          className={`grid transition-all duration-300 ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'} `} >
                          <div className="overflow-hidden">
                            <div
                              className={`rounded-2xl border p-4 ${theme === 'dark'
                                ? 'border-orange-500/10 bg-orange-500/5'
                                : 'border-orange-200 bg-white'
                                } `} >
                              <div className="space-y-4">
                                {item.packages.map((pkg: any, pkgIndex: number) => (
                                  <div
                                    key={pkg.id ?? pkgIndex}
                                    className={`rounded-xl border p-3 ${theme === "dark"
                                      ? "border-orange-500/10 bg-orange-500/5"
                                      : "border-orange-100 bg-orange-50"
                                      }`}
                                  >
                                    {/* Package Name */}
                                    <p
                                      className={`font-medium ${theme === "dark" ? "text-orange-300" : "text-orange-700"
                                        }`}
                                    >
                                      {pkg.name}
                                    </p>

                                    {/* Package Options */}
                                    {pkg.options?.length > 0 && (
                                      <div className="mt-2 flex flex-wrap gap-2">
                                        {pkg.options.map((opt: any) => (
                                          <span
                                            key={opt.id}
                                            className={`rounded-full px-2 py-0.5 text-[10px] ${theme === "dark"
                                              ? "bg-orange-500/10 text-orange-300"
                                              : "bg-orange-100 text-orange-600"
                                              }`}
                                          >
                                            {opt.name}
                                          </span>
                                        ))}
                                      </div>
                                    )}

                                    {/* Package Items */}
                                    {pkg.items?.length > 0 && (
                                      <div className="mt-3 space-y-2">
                                        {pkg.items.map((detail: any, index: number) => (
                                          <div key={detail.id ?? index}>
                                            {index !== 0 && (
                                              <div
                                                className={`mb-2 h-px ${theme === "dark"
                                                  ? "bg-orange-500/10"
                                                  : "bg-orange-200"
                                                  }`}
                                              />
                                            )}

                                            <div className="flex items-start justify-between">
                                              <div>
                                                <p
                                                  className={
                                                    theme === "dark"
                                                      ? "text-sm text-white"
                                                      : "text-sm text-zinc-900"
                                                  }
                                                >
                                                  {detail.name}
                                                </p>

                                                {/* Jika item juga punya options */}
                                                {detail.options?.length > 0 && (
                                                  <div className="mt-1 flex flex-wrap gap-2">
                                                    {detail.options.map((opt: any) => (
                                                      <span
                                                        key={opt.id}
                                                        className={`rounded-full px-2 py-0.5 text-[10px] ${theme === "dark"
                                                          ? "bg-orange-500/10 text-orange-300"
                                                          : "bg-orange-100 text-orange-600"
                                                          }`}
                                                      >
                                                        {opt.name}
                                                      </span>
                                                    ))}
                                                  </div>
                                                )}
                                              </div>

                                              <span
                                                className={
                                                  theme === "dark"
                                                    ? "text-zinc-300"
                                                    : "text-zinc-500"
                                                }
                                              >
                                                × {detail.qty}
                                              </span>
                                            </div>
                                          </div>
                                        ))}
                                      </div>
                                    )}
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* FOOTER */}
              <div className={`flex justify-between border-t p-6 md:p-8 ${theme === 'dark' ? 'border-orange-500/20' : 'border-orange-200'} `} >
                <span className={theme === 'dark' ? 'text-zinc-300' : 'text-zinc-600'} >
                  {__("Jumlah Total")}
                </span>

                <span className={`text-2xl font-bold ${theme === 'dark' ? 'text-orange-300' : 'text-orange-600'} `}>
                  {formatPrice(order.total)}
                </span>
              </div>
            </div>
          </div>
        </section>
      </main>

      <MobileNavbar theme={theme} />

      <div className="h-24 xl:hidden" />

      <Footer theme={theme} />
    </div>
  );
}

export default function StatusPage() {
  return (
    <AppProvider>
      <StatusPageContent />
    </AppProvider>
  );
}
