import { Moon, Sun } from "lucide-react";
import type { LandingNavItem, ThemeMode } from "@/types";

type Props = {
  theme: ThemeMode;
  scrolled: boolean;
  navItems: LandingNavItem[];
  onToggleTheme: () => void;
};

export default function Navbar({
  theme,
  scrolled,
  navItems,
  onToggleTheme,
}: Props) {
  return (
    <header
      className={`
        fixed left-0 top-0 z-50 w-full transition-all duration-500
        ${scrolled
          ? theme === "dark"
            ? "border-b border-white/10 bg-black/40 py-3 shadow-2xl shadow-black/10 backdrop-blur-2xl backdrop-saturate-150"
            : "border-b border-orange-100 bg-white/70 py-3 shadow-lg shadow-orange-100/50 backdrop-blur-2xl backdrop-saturate-150"
          : "bg-transparent py-4 md:py-5"
        }
      `}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 md:px-6">
        <a href="#" className="flex items-center gap-3">
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-orange-500 opacity-40 blur-xl" />

            <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-orange-500 to-amber-400 text-sm font-bold text-white shadow-lg shadow-orange-500/30 md:h-11 md:w-11 md:text-lg">
              G
            </div>
          </div>

          <div>
            <h1 className="text-base font-semibold tracking-tight md:text-lg">
              Kelana<span className="text-orange-500">Grill</span>
            </h1>

            <p className="text-[10px] text-zinc-500 md:text-xs">
              Premium BBQ Rental
            </p>
          </div>
        </a>

        <nav
          className={`
            hidden items-center gap-8 px-6 py-3 xl:flex
            ${theme === "dark"
              ? "white/[0.03]"
              : "white/70"
            }
          `}
        >
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`
                relative text-sm font-medium transition duration-300
                ${theme === "dark"
                  ? "text-zinc-300 hover:text-white"
                  : "text-zinc-700 hover:text-orange-500"
                }
                after:absolute after:bottom-[-6px] after:left-0
                after:h-[2px] after:w-0 after:bg-orange-500
                after:transition-all after:duration-300 hover:after:w-full
              `}
            >
              {item.name}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2 md:gap-3">
          <button
            type="button"
            onClick={onToggleTheme}
            className={`
              flex h-10 w-10 items-center justify-center rounded-full border
              transition-all duration-300 hover:scale-105 md:h-11 md:w-11
              ${theme === "dark"
                ? "border-white/10 bg-white/5 hover:bg-white/10"
                : "border-orange-200 bg-white/80 hover:bg-orange-50"
              }
            `}
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <a
            href="#pricing"
            className="group relative overflow-hidden rounded-full bg-gradient-to-r from-orange-500 to-amber-400 px-4 py-2.5 text-sm font-medium text-white shadow-lg shadow-orange-500/20 transition-all duration-300 hover:scale-[1.03] hover:shadow-orange-500/40 md:px-6 md:py-3"
          >
            <span className="relative z-10">Book Now</span>
            <div className="absolute inset-0 translate-y-full bg-white/20 transition-transform duration-500 group-hover:translate-y-0" />
          </a>
        </div>
      </div>
    </header>
  );
}