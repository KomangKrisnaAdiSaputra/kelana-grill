import { landing } from "@/routes";
import type { LandingNavItem, ThemeMode } from "@/types";

type Props = {
  theme: ThemeMode;
  items: LandingNavItem[];
};

export default function MobileNavbar({ theme, items }: Props) {
  return (
    <div
      className={`
        fixed bottom-4 left-1/2 z-40 w-[calc(100%-20px)] max-w-md
        -translate-x-1/2 rounded-[28px] border px-3 py-3 backdrop-blur-2xl xl:hidden
        ${theme === "dark"
          ? "border-white/10 bg-black/60"
          : "border-orange-100 bg-white/90"
        }
      `}
    >
      <div className="grid grid-cols-4 gap-2">
        {[{
          name: "Home",
          href: landing().url,
        }, ...items].map((item) => (
          <a
            key={item.href}
            href={item.href}
            className={`
              rounded-2xl py-2 text-center text-xs font-medium transition
              ${theme === "dark"
                ? "text-zinc-300 hover:bg-white/10"
                : "text-zinc-700 hover:bg-orange-50"
              }
            `}
          >
            {item.name}
          </a>
        ))}
      </div>
    </div>
  );
}