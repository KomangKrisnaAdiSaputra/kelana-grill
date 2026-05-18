import { useLanguage } from "@/contexts/language-context";
import { useTranslation } from "@/lib/Lang";
import type { ThemeMode } from "@/types";

type Props = {
  theme: ThemeMode;
};

export default function FeatureSection({ theme }: Props) {
  const { text } = useLanguage();
  const { __ } = useTranslation();


  return (
    <section id="features" className="py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="max-w-2xl">
          <p className="text-sm uppercase tracking-[0.3em] text-orange-500">
            {__("Pengalaman")}
          </p>

          <h2 className="mt-4 text-3xl font-semibold tracking-tight md:text-4xl lg:text-5xl">
            {__("BBQ Jadi Lebih Praktis.")}
          </h2>

          <p
            className={`mt-6 text-base leading-7 md:text-lg md:leading-8 ${theme === "dark" ? "text-zinc-400" : "text-zinc-600"
              }`}
          >
            {__("Pilih paket BBQ dan perlengkapan sesuai kebutuhan acara kamu dengan proses booking yang mudah.")}
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 md:mt-16 md:gap-6 xl:grid-cols-4">
          {text.features.items.map((item, index) => (
            <div
              key={item.key}
              className={`
                group relative overflow-hidden rounded-[28px] border p-6 backdrop-blur-xl
                transition duration-500 hover:-translate-y-2
                hover:shadow-[0_20px_80px_rgba(255,140,0,0.15)]
                md:rounded-[32px] md:p-8
                ${theme === "dark"
                  ? "border-white/10 bg-white/[0.03] hover:border-orange-400/30"
                  : "border-orange-100 bg-white/70 hover:border-orange-300"
                }
              `}
            >
              <div className="absolute right-0 top-0 h-32 w-32 bg-orange-500/10 blur-3xl transition group-hover:bg-orange-500/20" />

              <div className="relative">
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-r from-orange-500 to-amber-400 text-white md:h-14 md:w-14">
                  0{index + 1}
                </div>

                <h3 className="text-xl font-semibold md:text-2xl">
                  {item.title}
                </h3>

                <p
                  className={`mt-4 leading-7 ${theme === "dark" ? "text-zinc-400" : "text-zinc-600"
                    }`}
                >
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}