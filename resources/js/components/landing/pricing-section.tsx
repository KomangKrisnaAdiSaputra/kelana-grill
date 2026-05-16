import { useRef, useState } from "react";
import type { LandingPackageItem, ThemeMode } from "@/types";

type Props = {
  theme: ThemeMode;
  packages: LandingPackageItem[];
};

export default function PricingSection({ theme, packages }: Props) {
  const [activePackage, setActivePackage] = useState(0);
  const pricingRef = useRef<HTMLDivElement | null>(null);

  const scrollToPackage = (index: number) => {
    if (!pricingRef.current) {
      return;
    }

    const width = pricingRef.current.clientWidth;

    pricingRef.current.scrollTo({
      left: width * index,
      behavior: "smooth",
    });

    setActivePackage(index);
  };

  return (
    <section id="pricing" className="relative overflow-hidden py-20 md:py-24">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange-500/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 md:px-6">
        <div className="text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-orange-500">
            Packages
          </p>

          <h2 className="mt-4 text-3xl font-semibold tracking-tight md:text-4xl lg:text-5xl">
            Choose Your BBQ Setup.
          </h2>

          <p
            className={`mx-auto mt-5 max-w-2xl text-base md:text-lg ${theme === "dark" ? "text-zinc-400" : "text-zinc-600"
              }`}
          >
            Swipe package untuk melihat pilihan terbaik sesuai event BBQ kamu.
          </p>
        </div>

        <div className="mt-12 xl:hidden">
          <div
            ref={pricingRef}
            onScroll={(e) => {
              const container = e.currentTarget;
              const index = Math.round(
                container.scrollLeft / container.clientWidth
              );

              setActivePackage(index);
            }}
            className="scrollbar-hide flex snap-x snap-mandatory overflow-x-auto scroll-smooth pb-5"
          >
            {packages.map((item) => (
              <div key={item.title} className="min-w-full snap-center px-1">
                <PricingCard theme={theme} item={item} mobile />
              </div>
            ))}
          </div>

          <div className="mt-6 flex items-center justify-center gap-3">
            {packages.map((item, index) => (
              <button
                type="button"
                key={item.title}
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

        <div className="mt-16 hidden gap-8 xl:grid xl:grid-cols-3">
          {packages.map((item) => (
            <PricingCard key={item.title} theme={theme} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}

function PricingCard({
  theme,
  item,
  mobile = false,
}: {
  theme: ThemeMode;
  item: LandingPackageItem;
  mobile?: boolean;
}) {
  return (
    <div
      className={`
        relative overflow-hidden rounded-[36px] border backdrop-blur-xl transition duration-500
        ${mobile ? "p-7 active:scale-[0.98]" : "p-10 hover:-translate-y-2"}
        ${item.highlight
          ? "border-orange-300 bg-gradient-to-br from-orange-500/10 to-amber-400/10 shadow-[0_20px_80px_rgba(255,140,0,0.18)]"
          : theme === "dark"
            ? "border-white/10 bg-white/[0.03]"
            : "border-orange-100 bg-white/70"
        }
      `}
    >
      <div className="absolute right-0 top-0 h-40 w-40 bg-orange-500/10 blur-3xl" />

      {item.highlight && (
        <div className="absolute right-5 top-5 rounded-full bg-gradient-to-r from-orange-500 to-amber-400 px-4 py-2 text-xs font-medium uppercase tracking-wider text-white">
          {mobile ? "Most Popular" : "Popular"}
        </div>
      )}

      <div className="relative">
        <h3 className="text-3xl font-semibold">{item.title}</h3>

        <div className="mt-6 flex items-end gap-2">
          <span className={mobile ? "text-6xl font-bold" : "text-6xl font-bold"}>
            {item.price}
          </span>
        </div>

        <p
          className={`mt-6 leading-7 ${theme === "dark" ? "text-zinc-400" : "text-zinc-600"
            }`}
        >
          {item.desc}
        </p>

        <div className="mt-8 space-y-4">
          {item.features.map((feature) => (
            <div key={feature} className="flex items-center gap-3">
              <div className="h-2.5 w-2.5 rounded-full bg-orange-400 shadow-lg shadow-orange-400/40" />

              <span
                className={theme === "dark" ? "text-zinc-300" : "text-zinc-700"}
              >
                {feature}
              </span>
            </div>
          ))}
        </div>

        <button
          type="button"
          className="mt-10 w-full rounded-2xl bg-gradient-to-r from-orange-500 to-amber-400 px-6 py-4 font-medium text-white shadow-xl shadow-orange-500/20 transition hover:scale-[1.02] hover:shadow-orange-500/40"
        >
          Book Package
        </button>
      </div>
    </div>
  );
}