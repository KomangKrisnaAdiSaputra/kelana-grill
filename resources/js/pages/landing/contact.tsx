import {
  Head,
  useForm,
  usePage,
} from "@inertiajs/react";

import {
  Mail,
  MapPin,
  Phone,
  Shield,
  User,
} from "lucide-react";

import {
  useEffect,
  useState,
} from "react";

import DateTimePicker from "@/components/datetime-picker";
import AmbientBackground from "@/components/landing/ambient-background";

import Footer from "@/components/landing/footer";

import MobileNavbar from "@/components/landing/mobile-navbar";

import Navbar from "@/components/landing/navbar";

import AppProvider from "@/contexts/app-provider";

import { useTheme } from "@/contexts/theme-context";

import { formatPrice } from "@/helpers/global";
import { booking } from "@/routes/landing/contact";

export default function ContactPage() {
  return (
    <AppProvider>
      <ContactContent />
    </AppProvider>
  );
}

function ContactContent() {
  const locale = usePage<any>().props.params.locale;

  const { theme, toggleTheme } = useTheme();

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(
        window.scrollY > 30,
      );
    };

    handleScroll();

    window.addEventListener(
      "scroll",
      handleScroll,
    );

    return () =>
      window.removeEventListener(
        "scroll",
        handleScroll,
      );
  }, []);

  const {
    data,
    setData,
    post,
    processing,
  } = useForm({
    firstname: "",
    lastname: "",
    phone: "",
    email: "",
    address: "",
    pickupdate: "",
    returndate: "",
    pickuplocation: "",
    guarantee: "",
    payment: "Cash",
    note: "",
    cart: [],
  });

  useEffect(() => {
    const cart = JSON.parse(
      localStorage.getItem(
        "kelana-grill-cart",
      ) || "[]",
    );

    setData("cart", cart);
  }, [setData]);

  const submit = (e: any) => {
    e.preventDefault();

    post(booking({ locale }).url, {
      preserveScroll: true,
      only: ['booking'],
      onSuccess: (res) => {
        console.log(res);

      },
      onError: () => {
      },
    });
  };

  return (
    <div
      className={`
        min-h-screen transition-all duration-500
        ${theme === "dark"
          ? "bg-[#0F0F10] text-white"
          : "bg-gradient-to-br from-[#fff7ed] via-[#fffaf5] to-[#ffe7c2] text-zinc-900"
        }
      `}
    >
      <Head title="Kontak" />

      <AmbientBackground theme={theme} />

      <Navbar
        theme={theme}
        scrolled={scrolled}
        onToggleTheme={
          toggleTheme
        }
      />

      <main className="relative mx-auto max-w-7xl px-4 pb-[500px] pt-28 md:px-6 md:pt-36">
        {/* HERO */}

        <section className="max-w-3xl">
          <div
            className={`
              inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm backdrop-blur-xl
              ${theme === "dark"
                ? "border-orange-400/20 bg-orange-500/10 text-orange-200"
                : "border-orange-200 bg-white/70 text-orange-700"
              }
            `}
          >
            Kelana Grill
          </div>

          <h1 className="mt-5 text-4xl font-semibold tracking-tight md:text-6xl">
            Booking Alat Grill
            Jadi Lebih Mudah
          </h1>

          <p
            className={`
              mt-5 max-w-2xl leading-7 md:text-lg
              ${theme === "dark"
                ? "text-zinc-400"
                : "text-zinc-600"
              }
            `}
          >
            Isi form booking
            berikut dan tim
            kami akan langsung
            menghubungi anda
            melalui WhatsApp
            untuk proses
            konfirmasi pesanan.
          </p>
        </section>

        {/* CONTENT */}

        <section className="mt-12 grid gap-8 lg:grid-cols-[420px_1fr]">
          {/* LEFT */}

          <div className="order-2 space-y-6 lg:order-1">

            <div
              className={`
                overflow-hidden rounded-[36px] p-7 backdrop-blur-2xl
                ${theme === "dark"
                  ? "bg-[#111112]/80 ring-1 ring-white/10"
                  : "bg-white/80 ring-1 ring-orange-100"
                }
              `}
            >
              <div className="inline-flex items-center rounded-full bg-orange-500 px-4 py-2 text-xs font-semibold text-white">
                Fast Booking
              </div>

              <h2 className="mt-5 text-3xl font-semibold leading-tight">
                Sewa alat grill
                untuk acara
                apapun
              </h2>

              <p
                className={`
                  mt-4 leading-7
                  ${theme === "dark"
                    ? "text-zinc-400"
                    : "text-zinc-600"
                  }
                `}
              >
                Cocok untuk
                gathering,
                camping,
                barbecue,
                acara keluarga,
                hingga event
                besar.
              </p>

              <div className="mt-8 space-y-4">
                {[
                  "Fast response WhatsApp",
                  "Alat bersih & siap pakai",
                  "Booking harian",
                  "Support event besar",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3"
                  >
                    <div className="h-2.5 w-2.5 rounded-full bg-orange-500" />

                    <p
                      className={
                        theme ===
                          "dark"
                          ? "text-zinc-300"
                          : "text-zinc-700"
                      }
                    >
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* CONTACT */}

            <div
              className={`
                overflow-hidden rounded-[36px] p-7 backdrop-blur-2xl
                ${theme === "dark"
                  ? "bg-[#111112]/80 ring-1 ring-white/10"
                  : "bg-white/80 ring-1 ring-orange-100"
                }
              `}
            >
              <h3 className="text-2xl font-semibold">
                Contact
                Information
              </h3>

              <div className="mt-7 space-y-5">
                <a
                  href="tel:+628123456789"
                  className={`
                    flex items-center gap-4 rounded-3xl p-4 transition-all
                    ${theme === "dark"
                      ? "bg-white/[0.04] hover:bg-white/[0.06]"
                      : "bg-orange-50/70 hover:bg-orange-100/70"
                    }
                  `}
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-500 text-white">
                    <Phone size={22} />
                  </div>

                  <div>
                    <p
                      className={
                        theme ===
                          "dark"
                          ? "text-sm text-zinc-400"
                          : "text-sm text-zinc-500"
                      }
                    >
                      Phone
                    </p>

                    <h4 className="font-semibold">
                      +62 812 3456
                      789
                    </h4>
                  </div>
                </a>

                <a
                  href="mailto:hello@kelanagrill.com"
                  className={`
                    flex items-center gap-4 rounded-3xl p-4 transition-all
                    ${theme === "dark"
                      ? "bg-white/[0.04] hover:bg-white/[0.06]"
                      : "bg-orange-50/70 hover:bg-orange-100/70"
                    }
                  `}
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-500 text-white">
                    <Mail size={22} />
                  </div>

                  <div>
                    <p
                      className={
                        theme ===
                          "dark"
                          ? "text-sm text-zinc-400"
                          : "text-sm text-zinc-500"
                      }
                    >
                      Email
                    </p>

                    <h4 className="font-semibold">
                      hello@kelanagrill.com
                    </h4>
                  </div>
                </a>

                <div
                  className={`
                    flex items-center gap-4 rounded-3xl p-4
                    ${theme === "dark"
                      ? "bg-white/[0.04]"
                      : "bg-orange-50/70"
                    }
                  `}
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-500 text-white">
                    <MapPin size={22} />
                  </div>

                  <div>
                    <p
                      className={
                        theme ===
                          "dark"
                          ? "text-sm text-zinc-400"
                          : "text-sm text-zinc-500"
                      }
                    >
                      Location
                    </p>

                    <h4 className="font-semibold">
                      Denpasar, Bali
                    </h4>
                  </div>
                </div>
              </div>
            </div>

            {/* CART */}

            <div
              className={`
                overflow-hidden rounded-[36px] p-7 backdrop-blur-2xl
                ${theme === "dark"
                  ? "bg-[#111112]/80 ring-1 ring-white/10"
                  : "bg-white/80 ring-1 ring-orange-100"
                }
              `}
            >
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-semibold">
                  Keranjang
                </h3>

                <div className="rounded-full bg-orange-500 px-3 py-1 text-xs font-semibold text-white">
                  {data.cart.length}{" "}
                  Item
                </div>
              </div>

              <div className="mt-6 space-y-4">
                {data.cart.length >
                  0 ? (
                  data.cart.map(
                    (
                      item: any,
                      index,
                    ) => (
                      <div
                        key={index}
                        className={`
                          rounded-3xl p-5
                          ${theme ===
                            "dark"
                            ? "bg-white/[0.04]"
                            : "bg-orange-50/70"
                          }
                        `}
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <h4 className="font-bold">
                              {item.product.name}
                            </h4>

                            <h2
                              className={
                                theme === "dark"
                                  ? "mt-1 text-sm text-zinc-400"
                                  : "mt-1 text-sm text-zinc-500"
                              }
                            >
                              {item.variant.name}
                            </h2>

                            <p
                              className={
                                theme === "dark"
                                  ? "mt-2 text-sm text-zinc-400"
                                  : "mt-2 text-sm text-zinc-500"
                              }
                            >
                              Qty : {item.qty}
                            </p>
                          </div>

                          <div className="rounded-2xl bg-orange-500 px-3 py-2 text-sm font-semibold text-white">
                            {formatPrice(item.variant.rate)}
                          </div>
                        </div>
                      </div>
                    ),
                  )
                ) : (
                  <div
                    className={`
                      rounded-3xl p-5 text-center
                      ${theme === "dark"
                        ? "bg-white/[0.04]"
                        : "bg-orange-50/70"
                      }
                    `}
                  >
                    <p
                      className={
                        theme ===
                          "dark"
                          ? "text-zinc-400"
                          : "text-zinc-500"
                      }
                    >
                      Belum ada
                      item dalam
                      keranjang
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className={`order-1 rounded-[36px] p-6 md:p-8 backdrop-blur-2xl lg:order-2 ${theme === "dark"
            ? "bg-[#111112]/80 ring-1 ring-white/10"
            : "bg-white/80 ring-1 ring-orange-100"}`}>
            <div className="mb-8 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-orange-500">
                  Booking Form
                </p>

                <h2 className="mt-2 text-3xl font-semibold">
                  Lengkapi data
                  booking
                </h2>
              </div>
            </div>

            <form
              onSubmit={submit}
              className="space-y-7"
            >
              {/* PERSONAL */}

              <div>
                <h3 className="mb-5 text-lg font-semibold">
                  Informasi
                  Pribadi
                </h3>

                <div className="grid gap-5 md:grid-cols-2">
                  <InputField
                    theme={theme}
                    icon={
                      <User
                        size={18}
                      />
                    }
                    label="First Name"
                    value={
                      data.firstname
                    }
                    onChange={(
                      e,
                    ) =>
                      setData(
                        "firstname",
                        e.target
                          .value,
                      )
                    }
                  />

                  <InputField
                    theme={theme}
                    icon={
                      <User
                        size={18}
                      />
                    }
                    label="Last Name"
                    value={
                      data.lastname
                    }
                    onChange={(
                      e,
                    ) =>
                      setData(
                        "lastname",
                        e.target
                          .value,
                      )
                    }
                  />
                </div>
              </div>

              {/* CONTACT */}

              <div>
                <h3 className="mb-5 text-lg font-semibold">
                  Kontak
                </h3>

                <div className="grid gap-5 md:grid-cols-2">
                  <InputField
                    theme={theme}
                    icon={
                      <Phone
                        size={18}
                      />
                    }
                    label="Phone"
                    type="tel"
                    value={
                      data.phone
                    }
                    onChange={(
                      e,
                    ) =>
                      setData(
                        "phone",
                        e.target
                          .value,
                      )
                    }
                  />

                  <InputField
                    theme={theme}
                    icon={
                      <Mail
                        size={18}
                      />
                    }
                    label="Email"
                    type="email"
                    value={
                      data.email
                    }
                    onChange={(
                      e,
                    ) =>
                      setData(
                        "email",
                        e.target
                          .value,
                      )
                    }
                  />
                </div>

                <div className="mt-5">
                  <InputField
                    theme={theme}
                    icon={
                      <MapPin
                        size={18}
                      />
                    }
                    label="Alamat"
                    value={
                      data.address
                    }
                    onChange={(
                      e,
                    ) =>
                      setData(
                        "address",
                        e.target
                          .value,
                      )
                    }
                  />
                </div>
              </div>

              {/* BOOKING */}

              <div>
                <h3 className="mb-5 text-lg font-semibold">
                  Detail Booking
                </h3>

                <div className="grid gap-5 md:grid-cols-2">
                  <DateTimePicker
                    theme={theme}
                    label="Tanggal Pengambilan"
                    value={data.pickupdate}
                    onChange={(value) =>
                      setData(
                        "pickupdate",
                        value,
                      )
                    }
                    blockedDates={[
                      "2026-05-28",
                      "2026-05-29",
                      "2026-06-02",
                    ]}
                    minDate={new Date().toISOString().split("T")[0]}
                    minHour={8}
                    maxHour={22}
                  />

                  <DateTimePicker
                    theme={theme}
                    label="Tanggal Pengembalian"
                    value={data.returndate}
                    onChange={(value) =>
                      setData(
                        "returndate",
                        value,
                      )
                    }
                    blockedDates={[
                      "2026-05-28",
                      "2026-05-29",
                    ]}
                    minHour={8}
                    maxHour={22}
                  />
                </div>

                <div className="mt-5">
                  <InputField
                    theme={theme}
                    icon={
                      <MapPin
                        size={18}
                      />
                    }
                    label="Lokasi Pengambilan"
                    value={
                      data.pickuplocation
                    }
                    onChange={(
                      e,
                    ) =>
                      setData(
                        "pickuplocation",
                        e.target
                          .value,
                      )
                    }
                  />
                </div>

                <div className="mt-5">
                  <InputField
                    theme={theme}
                    icon={
                      <Shield
                        size={18}
                      />
                    }
                    label="Jaminan"
                    placeholder="KTP / SIM / dll"
                    value={
                      data.guarantee
                    }
                    onChange={(
                      e,
                    ) =>
                      setData(
                        "guarantee",
                        e.target
                          .value,
                      )
                    }
                  />
                </div>
              </div>

              {/* PAYMENT */}

              <div>
                <h3 className="mb-5 text-lg font-semibold">
                  Pembayaran
                </h3>

                <select
                  value={
                    data.payment
                  }
                  onChange={(e) =>
                    setData(
                      "payment",
                      e.target.value,
                    )
                  }
                  className={`
                    w-full rounded-3xl border px-5 py-4 text-sm outline-none transition-all
                    ${theme === "dark"
                      ? `
                        border-white/10
                        bg-white/[0.04]
                        text-white
                      `
                      : `
                        border-orange-100
                        bg-orange-50/50
                        text-zinc-800
                      `
                    }
                  `}
                >
                  <option value="Cash">
                    Cash
                  </option>

                  <option value="Transfer">
                    Transfer
                  </option>
                </select>
              </div>

              {/* NOTE */}

              <div>
                <h3 className="mb-5 text-lg font-semibold">
                  Catatan
                </h3>

                <textarea
                  rows={6}
                  value={data.note}
                  onChange={(e) =>
                    setData(
                      "note",
                      e.target.value,
                    )
                  }
                  placeholder="Tulis kebutuhan tambahan anda..."
                  className={`
                    w-full rounded-3xl border px-5 py-4 text-sm outline-none transition-all resize-none
                    ${theme === "dark"
                      ? `
                        border-white/10
                        bg-white/[0.04]
                        text-white
                        placeholder:text-zinc-500
                      `
                      : `
                        border-orange-100
                        bg-orange-50/50
                        text-zinc-800
                        placeholder:text-zinc-400
                      `
                    }
                  `}
                />
              </div>

              {/* BUTTON */}

              <button
                type="submit"
                disabled={
                  processing
                }
                className="
                  group relative inline-flex w-full items-center justify-center overflow-hidden
                  rounded-[24px] bg-orange-500 px-7 py-5
                  text-sm font-semibold text-white
                  transition-all duration-300
                  hover:scale-[1.01]
                  hover:bg-orange-600
                  disabled:opacity-50
                "
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-120%] transition-transform duration-1000 group-hover:translate-x-[120%]" />

                <span className="relative z-10">
                  {processing
                    ? "Mengirim..."
                    : "Kirim Booking Sekarang"}
                </span>
              </button>
            </form>
          </div>
        </section>
      </main>

      <MobileNavbar theme={theme} />

      <div className="h-24 xl:hidden" />

      <Footer theme={theme} />
    </div>
  );
}

type InputFieldProps = {
  label: string;
  placeholder?: string;
  type?: string;
  icon?: React.ReactNode;
  theme: "dark" | "light";
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => void;
};

function InputField({
  label,
  placeholder,
  type = "text",
  icon,
  theme,
  value,
  onChange,
}: InputFieldProps) {
  return (
    <div>
      <label
        className={`
          mb-2 block text-sm font-medium
          ${theme === "dark"
            ? "text-zinc-300"
            : "text-zinc-700"
          }
        `}
      >
        {label}
      </label>

      <div
        className={`
          flex items-center gap-3 rounded-3xl border px-4 py-4 transition-all
          ${theme === "dark"
            ? `
              border-white/10
              bg-white/[0.04]
              text-white
              focus-within:border-orange-500
            `
            : `
              border-orange-100
              bg-orange-50/50
              text-zinc-800
              focus-within:border-orange-400
            `
          }
        `}
      >
        <div
          className={
            theme === "dark"
              ? "text-zinc-400"
              : "text-zinc-500"
          }
        >
          {icon}
        </div>

        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={
            placeholder
          }
          className={`
            w-full bg-transparent text-sm outline-none
            ${theme === "dark"
              ? "placeholder:text-zinc-500"
              : "placeholder:text-zinc-400"
            }
          `}
        />
      </div>
    </div>
  );
}