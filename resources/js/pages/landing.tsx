import { Head } from "@inertiajs/react";
import { Moon, Sun } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function PremiumRentalGrillLandingPage() {
  const packages = [
    {
      title: "Basic BBQ",
      price: "299K",
      desc: "Perfect untuk BBQ kecil bersama teman.",
      features: ["Portable grill", "Free setup", "2 jam penggunaan"],
    },
    {
      title: "Family Night",
      price: "599K",
      desc: "Pilihan paling populer untuk keluarga.",
      features: [
        "Premium grill",
        "Free delivery",
        "Charcoal included",
      ],
      highlight: true,
    },
    {
      title: "Premium Event",
      price: "1.2JT",
      desc: "Untuk gathering dan event yang lebih besar.",
      features: ["Large grill", "Full setup", "Support team included"],
    },
  ];

  const faqs = [
    {
      question: "Apakah sudah termasuk arang?",
      answer:
        "Ya, beberapa paket sudah termasuk arang dan perlengkapan dasar BBQ.",
    },
    {
      question: "Area delivery dimana saja?",
      answer:
        "Kami melayani area kota dan sekitarnya dengan pengiriman cepat.",
    },
    {
      question: "Bisa booking mendadak?",
      answer: "Bisa, selama stok dan jadwal masih tersedia.",
    },
    {
      question: "Apakah ada deposit?",
      answer:
        "Beberapa paket membutuhkan deposit yang akan dikembalikan.",
    },
  ];

  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [scrolled, setScrolled] = useState(false);
  const [activePackage, setActivePackage] = useState(0);

  const pricingRef = useRef<HTMLDivElement | null>(null);

  const scrollToPackage = (index: number) => {
    if (!pricingRef.current) return;

    const width = pricingRef.current.clientWidth;

    pricingRef.current.scrollTo({
      left: width * index,
      behavior: "smooth",
    });

    setActivePackage(index);
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as
      | "dark"
      | "light"
      | null;

    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", theme);

    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <Head title="GrillHaus" />

      <div
        className={`
        min-h-screen overflow-hidden transition-all duration-500
        ${theme === "dark"
            ? "bg-[#0F0F10] text-white"
            : "bg-gradient-to-br from-[#fff7ed] via-[#fffaf5] to-[#ffe7c2] text-zinc-900"
          }
      `}
      >
        {/* Ambient Background */}
        <div className="fixed inset-0 -z-10 overflow-hidden">
          <div
            className={`
            absolute left-[-10%] top-[-10%]
            h-[300px] w-[300px] md:h-[500px] md:w-[500px]
            rounded-full blur-3xl
            ${theme === "dark"
                ? "bg-orange-500/20"
                : "bg-orange-300/30"
              }
          `}
          />

          <div
            className={`
            absolute right-[-5%] top-[20%]
            h-[250px] w-[250px] md:h-[400px] md:w-[400px]
            rounded-full blur-3xl
            ${theme === "dark"
                ? "bg-amber-400/10"
                : "bg-yellow-300/30"
              }
          `}
          />

          <div
            className={`
            absolute bottom-[-20%] left-[30%]
            h-[300px] w-[300px] md:h-[500px] md:w-[500px]
            rounded-full blur-3xl
            ${theme === "dark"
                ? "bg-orange-700/10"
                : "bg-orange-200/40"
              }
          `}
          />

          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,180,80,0.15),transparent_35%)]" />
        </div>

        {/* Navbar */}
        <header
          className={`
          fixed left-0 top-0 z-50 w-full
          transition-all duration-500
          ${scrolled
              ? theme === "dark"
                ? "border-b border-white/10 bg-black/40 py-3 shadow-2xl shadow-black/10 backdrop-blur-2xl backdrop-saturate-150"
                : "border-b border-orange-100 bg-white/70 py-3 shadow-lg shadow-orange-100/50 backdrop-blur-2xl backdrop-saturate-150"
              : "bg-transparent py-4 md:py-5"
            }
        `}
        >
          <div className="mx-auto flex max-w-7xl items-center justify-between px-4 md:px-6">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="absolute inset-0 rounded-full bg-orange-500 blur-xl opacity-40" />

                <div className="relative flex h-10 w-10 md:h-11 md:w-11 items-center justify-center rounded-full bg-gradient-to-br from-orange-500 to-amber-400 text-sm md:text-lg font-bold text-white shadow-lg shadow-orange-500/30">
                  G
                </div>
              </div>

              <div>
                <h1 className="text-base md:text-lg font-semibold tracking-tight">
                  Grill<span className="text-orange-500">Haus</span>
                </h1>

                <p className="text-[10px] md:text-xs text-zinc-500">
                  Premium BBQ Rental
                </p>
              </div>
            </div>

            {/* Nav Desktop */}
            <nav
              className={`
              hidden xl:flex items-center gap-8 rounded-full px-6 py-3
              ${theme === "dark"
                  ? "border border-white/10 bg-white/[0.03]"
                  : "border border-orange-100 bg-white/70"
                }
              backdrop-blur-xl
            `}
            >
              {[
                {
                  name: "Features",
                  href: "#features",
                },
                {
                  name: "Pricing",
                  href: "#pricing",
                },
                {
                  name: "FAQ",
                  href: "#faq",
                },
              ].map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className={`
                  relative text-sm font-medium transition duration-300
                  ${theme === "dark"
                      ? "text-zinc-300 hover:text-white"
                      : "text-zinc-700 hover:text-orange-500"
                    }
                  after:absolute after:left-0 after:bottom-[-6px]
                  after:h-[2px] after:w-0
                  after:bg-orange-500
                  after:transition-all after:duration-300
                  hover:after:w-full
                `}
                >
                  {item.name}
                </a>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-2 md:gap-3">
              <button
                onClick={() =>
                  setTheme(theme === "dark" ? "light" : "dark")
                }
                className={`
                flex h-10 w-10 md:h-11 md:w-11 items-center justify-center rounded-full border
                transition-all duration-300 hover:scale-105
                ${theme === "dark"
                    ? "border-white/10 bg-white/5 hover:bg-white/10"
                    : "border-orange-200 bg-white/80 hover:bg-orange-50"
                  }
              `}
              >
                {theme === "dark" ? (
                  <Sun size={18} />
                ) : (
                  <Moon size={18} />
                )}
              </button>

              <button className="group relative overflow-hidden rounded-full bg-gradient-to-r from-orange-500 to-amber-400 px-4 md:px-6 py-2.5 md:py-3 text-sm font-medium text-white shadow-lg shadow-orange-500/20 transition-all duration-300 hover:scale-[1.03] hover:shadow-orange-500/40">
                <span className="relative z-10">
                  Book Now
                </span>

                <div className="absolute inset-0 translate-y-full bg-white/20 transition-transform duration-500 group-hover:translate-y-0" />
              </button>
            </div>
          </div>
        </header>

        {/* Hero */}
        <section className="relative flex min-h-[92vh] items-center pt-20 md:pt-24">
          <div className="mx-auto grid max-w-7xl gap-10 lg:gap-16 px-4 md:px-6 py-10 md:py-24 md:grid-cols-1 xl:grid-cols-2 xl:items-center">
            {/* Left */}
            <div>
              <div
                className={`
                mb-6 inline-flex items-center rounded-full border px-4 py-2 text-xs md:text-sm backdrop-blur-xl
                ${theme === "dark"
                    ? "border-orange-400/20 bg-orange-500/10 text-orange-200"
                    : "border-orange-200 bg-white/70 text-orange-600"
                  }
              `}
              >
                Premium BBQ Experience
              </div>

              <h1 className="max-w-3xl text-4xl font-semibold leading-tight tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
                Premium Grill
                <span className="bg-gradient-to-r from-orange-400 via-amber-400 to-yellow-300 bg-clip-text text-transparent">
                  {" "}
                  Rental
                </span>
                <br />
                for Modern BBQ Party
              </h1>

              <p
                className={`
                mt-6 md:mt-8 max-w-xl text-base md:text-lg leading-7 md:leading-8
                ${theme === "dark"
                    ? "text-zinc-400"
                    : "text-zinc-600"
                  }
              `}
              >
                Rental grill modern untuk party, gathering,
                camping, dan event dengan setup premium.
              </p>

              {/* Buttons */}
              <div className="mt-8 md:mt-10 flex flex-col sm:flex-row flex-wrap gap-3 md:gap-4">
                <button className="rounded-full bg-gradient-to-r from-orange-500 to-amber-400 px-7 py-4 font-medium text-white shadow-xl shadow-orange-500/20 transition hover:scale-[1.03] hover:shadow-orange-500/40">
                  Sewa Sekarang
                </button>

                <button
                  className={`
                  rounded-full border px-7 py-4 font-medium backdrop-blur-xl transition
                  ${theme === "dark"
                      ? "border-white/10 bg-white/5 hover:bg-white/10"
                      : "border-orange-200 bg-white/70 hover:bg-orange-50"
                    }
                `}
                >
                  Lihat Paket
                </button>
              </div>

              {/* Mini Stats */}
              <div className="mt-10 md:mt-14 grid grid-cols-3 gap-4 md:flex md:flex-wrap md:gap-10">
                {[
                  {
                    value: "1,200+",
                    label: "Customers",
                  },
                  {
                    value: "350+",
                    label: "Events",
                  },
                  {
                    value: "4.9★",
                    label: "Rating",
                  },
                ].map((item) => (
                  <div key={item.label}>
                    <h3 className="bg-gradient-to-r from-orange-500 to-amber-400 bg-clip-text text-2xl md:text-3xl font-bold text-transparent">
                      {item.value}
                    </h3>

                    <p
                      className={`mt-2 text-xs md:text-sm ${theme === "dark"
                        ? "text-zinc-500"
                        : "text-zinc-600"
                        }`}
                    >
                      {item.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right */}
            <div className="relative">
              <div className="absolute -left-10 top-10 h-40 w-40 rounded-full bg-orange-500/20 blur-3xl" />

              <div
                className={`
                relative overflow-hidden rounded-[32px] md:rounded-[40px] border shadow-2xl backdrop-blur-2xl
                ${theme === "dark"
                    ? "border-white/10 bg-white/5"
                    : "border-orange-100 bg-white/60 shadow-orange-200/40"
                  }
              `}
              >
                <img
                  src="https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?q=80&w=1600&auto=format&fit=crop"
                  alt="BBQ"
                  className="h-[320px] sm:h-[450px] md:h-[550px] lg:h-[650px] w-full object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

                {/* Testimonial Floating */}
                <div className="absolute left-4 top-4 md:left-6 md:top-6 rounded-2xl border border-white/10 bg-black/30 px-4 py-3 md:px-5 md:py-4 backdrop-blur-xl">
                  <div className="flex gap-1 text-yellow-400">
                    ★★★★★
                  </div>

                  <p className="mt-2 text-xs md:text-sm text-white">
                    “Setup cepat & grill bersih.”
                  </p>
                </div>

                {/* Bottom Card */}
                <div className="absolute bottom-0 left-0 right-0 p-4 md:p-8">
                  <div className="rounded-3xl border border-white/10 bg-black/30 p-4 md:p-6 backdrop-blur-xl">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="text-xs md:text-sm text-zinc-300">
                          Most Popular Package
                        </p>

                        <h3 className="mt-1 text-lg md:text-2xl font-semibold text-white">
                          Family BBQ Set
                        </h3>
                      </div>

                      <div className="rounded-2xl bg-gradient-to-r from-orange-500 to-amber-400 px-4 py-2 md:px-5 md:py-3 text-sm md:text-base font-semibold text-white">
                        599K
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section id="features" className="py-20 md:py-24">
          <div className="mx-auto max-w-7xl px-4 md:px-6">
            <div className="max-w-2xl">
              <p className="text-sm uppercase tracking-[0.3em] text-orange-500">
                Experience
              </p>

              <h2 className="mt-4 text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight">
                More Than Just a Grill.
              </h2>

              <p
                className={`mt-6 text-base md:text-lg leading-7 md:leading-8 ${theme === "dark"
                  ? "text-zinc-400"
                  : "text-zinc-600"
                  }`}
              >
                Modern BBQ setup dengan pengalaman premium
                untuk setiap event spesialmu.
              </p>
            </div>

            <div className="mt-10 md:mt-16 grid gap-4 md:gap-6 sm:grid-cols-2 xl:grid-cols-4">
              {[
                "Premium Equipment",
                "Fast Delivery",
                "Free Setup",
                "Modern Experience",
              ].map((item, index) => (
                <div
                  key={index}
                  className={`
                  group relative overflow-hidden rounded-[28px] md:rounded-[32px] border p-6 md:p-8
                  backdrop-blur-xl transition duration-500
                  hover:-translate-y-2
                  hover:shadow-[0_20px_80px_rgba(255,140,0,0.15)]
                  ${theme === "dark"
                      ? "border-white/10 bg-white/[0.03] hover:border-orange-400/30"
                      : "border-orange-100 bg-white/70 hover:border-orange-300"
                    }
                `}
                >
                  <div className="absolute right-0 top-0 h-32 w-32 bg-orange-500/10 blur-3xl transition group-hover:bg-orange-500/20" />

                  <div className="relative">
                    <div className="mb-6 flex h-12 w-12 md:h-14 md:w-14 items-center justify-center rounded-2xl bg-gradient-to-r from-orange-500 to-amber-400 text-white">
                      0{index + 1}
                    </div>

                    <h3 className="text-xl md:text-2xl font-semibold">
                      {item}
                    </h3>

                    <p
                      className={`mt-4 leading-7 ${theme === "dark"
                        ? "text-zinc-400"
                        : "text-zinc-600"
                        }`}
                    >
                      Premium service dengan setup modern
                      dan praktis.
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section id="pricing" className="relative py-20 md:py-24 overflow-hidden">
          {/* Background Blur */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute left-1/2 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange-500/10 blur-3xl" />
          </div>

          <div className="relative mx-auto max-w-7xl px-4 md:px-6">
            <div className="text-center">
              <p className="text-sm uppercase tracking-[0.3em] text-orange-500">
                Packages
              </p>

              <h2 className="mt-4 text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight">
                Choose Your BBQ Setup.
              </h2>

              <p
                className={`mx-auto mt-5 max-w-2xl text-base md:text-lg ${theme === "dark"
                  ? "text-zinc-400"
                  : "text-zinc-600"
                  }`}
              >
                Swipe package untuk melihat pilihan terbaik
                sesuai event BBQ kamu.
              </p>
            </div>

            {/* MOBILE & TABLET APP STYLE */}
            <div className="mt-12 xl:hidden">
              <div
                ref={pricingRef}
                onScroll={(e) => {
                  const container = e.currentTarget;
                  const scrollLeft = container.scrollLeft;
                  const width = container.clientWidth;

                  const index = Math.round(scrollLeft / width);

                  setActivePackage(index);
                }}
                className="
    flex overflow-x-auto
    snap-x snap-mandatory
    scrollbar-hide
    scroll-smooth
    pb-5
  "
              >
                {packages.map((item, index) => (
                  <div
                    key={index}
                    className="min-w-full snap-center px-1"
                  >
                    <div
                      className={`
          relative overflow-hidden rounded-[36px] border p-7
          backdrop-blur-2xl
          transition-all duration-500
          active:scale-[0.98]
          ${item.highlight
                          ? "border-orange-300 bg-gradient-to-br from-orange-500/20 to-amber-400/10 shadow-[0_20px_80px_rgba(255,140,0,0.25)]"
                          : theme === "dark"
                            ? "border-white/10 bg-white/[0.04]"
                            : "border-orange-100 bg-white/70"
                        }
        `}
                    >
                      {/* Glow */}
                      <div className="absolute right-0 top-0 h-40 w-40 bg-orange-500/10 blur-3xl" />

                      {item.highlight && (
                        <div className="absolute right-5 top-5 rounded-full bg-gradient-to-r from-orange-500 to-amber-400 px-4 py-2 text-xs font-medium uppercase tracking-wider text-white shadow-lg">
                          Most Popular
                        </div>
                      )}

                      <div className="relative">
                        <h3 className="text-3xl font-semibold">
                          {item.title}
                        </h3>

                        <div className="mt-7 flex items-end gap-2">
                          <span className="text-6xl font-bold">
                            {item.price}
                          </span>
                        </div>

                        <p
                          className={`mt-6 leading-7 ${theme === "dark"
                            ? "text-zinc-400"
                            : "text-zinc-600"
                            }`}
                        >
                          {item.desc}
                        </p>

                        <div className="mt-8 space-y-4">
                          {item.features.map((feature, i) => (
                            <div
                              key={i}
                              className="flex items-center gap-3"
                            >
                              <div className="h-2.5 w-2.5 rounded-full bg-orange-400 shadow-lg shadow-orange-400/40" />

                              <span
                                className={
                                  theme === "dark"
                                    ? "text-zinc-300"
                                    : "text-zinc-700"
                                }
                              >
                                {feature}
                              </span>
                            </div>
                          ))}
                        </div>

                        <button className="mt-10 w-full rounded-2xl bg-gradient-to-r from-orange-500 to-amber-400 px-6 py-4 font-medium text-white shadow-xl shadow-orange-500/20 transition hover:scale-[1.02] hover:shadow-orange-500/40">
                          Book Package
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* INTERACTIVE PAGINATION */}
              <div className="mt-6 flex items-center justify-center gap-3">
                {packages.map((_, index) => (
                  <button
                    type="button"
                    key={index}
                    onClick={() => scrollToPackage(index)}
                    className={`
      h-2.5 rounded-full transition-all duration-300
      ${activePackage === index
                        ? "w-10 bg-orange-500"
                        : theme === "dark"
                          ? "w-2.5 bg-white/20 hover:bg-white/40"
                          : "w-2.5 bg-zinc-300 hover:bg-zinc-400"
                      }
    `}
                  />
                ))}
              </div>
            </div>

            {/* DESKTOP */}
            <div className="mt-16 hidden xl:grid gap-8 xl:grid-cols-3">
              {packages.map((item, index) => (
                <div
                  key={index}
                  className={`
          relative overflow-hidden rounded-[36px] border p-10
          backdrop-blur-xl transition duration-500
          hover:-translate-y-2
          ${item.highlight
                      ? "scale-[1.02] border-orange-300 bg-gradient-to-br from-orange-500/10 to-amber-400/10 shadow-[0_20px_80px_rgba(255,140,0,0.18)]"
                      : theme === "dark"
                        ? "border-white/10 bg-white/[0.03]"
                        : "border-orange-100 bg-white/70"
                    }
        `}
                >
                  {item.highlight && (
                    <div className="absolute right-5 top-5 rounded-full bg-gradient-to-r from-orange-500 to-amber-400 px-4 py-2 text-xs font-medium uppercase tracking-wider text-white">
                      Popular
                    </div>
                  )}

                  <h3 className="text-3xl font-semibold">
                    {item.title}
                  </h3>

                  <div className="mt-6 flex items-end gap-2">
                    <span className="text-6xl font-bold">
                      {item.price}
                    </span>
                  </div>

                  <p
                    className={`mt-6 leading-7 ${theme === "dark"
                      ? "text-zinc-400"
                      : "text-zinc-600"
                      }`}
                  >
                    {item.desc}
                  </p>

                  <div className="mt-8 space-y-4">
                    {item.features.map((feature, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-3"
                      >
                        <div className="h-2 w-2 rounded-full bg-orange-400" />

                        <span
                          className={
                            theme === "dark"
                              ? "text-zinc-300"
                              : "text-zinc-700"
                          }
                        >
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>

                  <button className="mt-10 w-full rounded-2xl bg-gradient-to-r from-orange-500 to-amber-400 px-6 py-4 font-medium text-white shadow-lg shadow-orange-500/20 transition hover:scale-[1.02] hover:shadow-orange-500/40">
                    Book Package
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="py-20 md:py-24">
          <div className="mx-auto max-w-4xl px-4 md:px-6">
            <div className="text-center">
              <p className="text-sm uppercase tracking-[0.3em] text-orange-500">
                FAQ
              </p>

              <h2 className="mt-4 text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight">
                Frequently Asked Questions.
              </h2>
            </div>

            <div className="mt-10 md:mt-16 space-y-5">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className={`
                  rounded-[24px] md:rounded-[28px] border p-6 md:p-8 backdrop-blur-xl
                  ${theme === "dark"
                      ? "border-white/10 bg-white/[0.03]"
                      : "border-orange-100 bg-white/70"
                    }
                `}
                >
                  <h3 className="text-lg md:text-xl font-semibold">
                    {faq.question}
                  </h3>

                  <p
                    className={`mt-4 leading-7 ${theme === "dark"
                      ? "text-zinc-400"
                      : "text-zinc-600"
                      }`}
                  >
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="relative overflow-hidden py-24 md:py-32">
          <div className="absolute left-1/2 top-1/2 h-[300px] w-[300px] md:h-[500px] md:w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange-500/20 blur-3xl" />

          <div className="relative mx-auto max-w-4xl px-4 md:px-6 text-center">
            <h2 className="text-4xl sm:text-5xl md:text-7xl font-semibold tracking-tight">
              Ready for Your
              <span className="bg-gradient-to-r from-orange-400 via-amber-400 to-yellow-300 bg-clip-text text-transparent">
                {" "}
                Next BBQ Night?
              </span>
            </h2>

            <p
              className={`mx-auto mt-6 md:mt-8 max-w-2xl text-base md:text-lg leading-7 md:leading-8 ${theme === "dark"
                ? "text-zinc-400"
                : "text-zinc-600"
                }`}
            >
              Booking cepat dan setup premium untuk
              event spesialmu.
            </p>

            <p className="mt-5 text-orange-400">
              Weekend slots cepat penuh 🔥
            </p>

            <div className="mt-10 flex flex-col sm:flex-row justify-center gap-3 md:gap-4">
              <button className="rounded-full bg-gradient-to-r from-orange-500 to-amber-400 px-8 py-4 font-medium text-white shadow-xl shadow-orange-500/20 transition hover:scale-[1.03] hover:shadow-orange-500/40">
                Chat WhatsApp
              </button>

              <button
                className={`
                rounded-full border px-8 py-4 font-medium backdrop-blur-xl transition
                ${theme === "dark"
                    ? "border-white/10 bg-white/5 hover:bg-white/10"
                    : "border-orange-200 bg-white/70 hover:bg-orange-50"
                  }
              `}
              >
                Explore Packages
              </button>
            </div>
          </div>
        </section>

        {/* Mobile Bottom Navigation */}
        <div
          className={`
          fixed bottom-4 left-1/2 z-40
          w-[calc(100%-20px)]
          max-w-md
          -translate-x-1/2
          rounded-[28px]
          border
          px-3
          py-3
          backdrop-blur-2xl
          xl:hidden
          ${theme === "dark"
              ? "border-white/10 bg-black/60"
              : "border-orange-100 bg-white/90"
            }
        `}
        >
          <div className="grid grid-cols-4 gap-2">
            {[
              {
                label: "Home",
                href: "#",
              },
              {
                label: "Features",
                href: "#features",
              },
              {
                label: "Pricing",
                href: "#pricing",
              },
              {
                label: "FAQ",
                href: "#faq",
              },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                className={`
                rounded-2xl py-2 text-center text-xs font-medium transition
                ${theme === "dark"
                    ? "text-zinc-300 hover:bg-white/10"
                    : "text-zinc-700 hover:bg-orange-50"
                  }
              `}
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>

        {/* Spacer Mobile */}
        <div className="h-24 xl:hidden" />

        {/* Footer */}
        <footer
          className={`border-t py-10 ${theme === "dark"
            ? "border-white/5"
            : "border-orange-100"
            }`}
        >
          <div
            className={`mx-auto flex max-w-7xl flex-col items-center justify-between gap-5 px-4 md:px-6 text-sm md:flex-row ${theme === "dark"
              ? "text-zinc-500"
              : "text-zinc-600"
              }`}
          >
            <p>© 2026 GrillHaus. All rights reserved.</p>

            <div className="flex gap-6">
              <a href="#" className="transition hover:text-orange-500">
                Instagram
              </a>

              <a href="#" className="transition hover:text-orange-500">
                WhatsApp
              </a>

              <a href="#" className="transition hover:text-orange-500">
                TikTok
              </a>
            </div>
          </div>
        </footer>

        {/* Floating WhatsApp */}
        <a
          href="#"
          className="
          fixed bottom-24 md:bottom-6 right-4 md:right-6 z-50
          flex items-center gap-3
          rounded-full
          bg-green-500
          px-4 md:px-5 py-3 md:py-4
          text-white
          shadow-2xl shadow-green-500/30
          transition-all duration-300
          hover:scale-105
        "
        >
          <div className="text-xl">💬</div>

          <div className="hidden sm:block">
            <p className="text-xs opacity-80">
              Need help?
            </p>

            <p className="text-sm font-semibold">
              Chat WhatsApp
            </p>
          </div>
        </a>
      </div>
    </>
  );
}