import type { ThemeMode } from "@/types";

type Props = {
  theme: ThemeMode;
};

export default function CtaSection({ theme }: Props) {
  return (
    <section className="relative overflow-hidden py-24 md:py-32">
      <div className="absolute left-1/2 top-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange-500/20 blur-3xl md:h-[500px] md:w-[500px]" />

      <div className="relative mx-auto max-w-4xl px-4 text-center md:px-6">
        <h2 className="text-4xl font-semibold tracking-tight sm:text-5xl md:text-7xl">
          Ready for Your
          <span className="bg-gradient-to-r from-orange-400 via-amber-400 to-yellow-300 bg-clip-text text-transparent">
            {" "}
            Next BBQ Night?
          </span>
        </h2>

        <p
          className={`mx-auto mt-6 max-w-2xl text-base leading-7 md:mt-8 md:text-lg md:leading-8 ${theme === "dark" ? "text-zinc-400" : "text-zinc-600"
            }`}
        >
          Booking cepat dan setup premium untuk event spesialmu.
        </p>

        <p className="mt-5 text-orange-400">Weekend slots cepat penuh 🔥</p>

        <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row md:gap-4">
          <a
            href="#"
            className="rounded-full bg-gradient-to-r from-orange-500 to-amber-400 px-8 py-4 font-medium text-white shadow-xl shadow-orange-500/20 transition hover:scale-[1.03] hover:shadow-orange-500/40"
          >
            Chat WhatsApp
          </a>

          <a
            href="#pricing"
            className={`
              rounded-full border px-8 py-4 font-medium backdrop-blur-xl transition
              ${theme === "dark"
                ? "border-white/10 bg-white/5 hover:bg-white/10"
                : "border-orange-200 bg-white/70 hover:bg-orange-50"
              }
            `}
          >
            Explore Packages
          </a>
        </div>
      </div>
    </section>
  );
}