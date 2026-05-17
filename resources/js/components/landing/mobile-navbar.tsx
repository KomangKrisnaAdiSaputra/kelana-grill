import { useLanguage } from "@/contexts/language-context";
import { scrollToLocalizedHref } from "@/helpers/language";
import { landing } from "@/routes";
import type { LandingNavItem, ThemeMode } from "@/types";

type Props = {
  theme: ThemeMode;
  items: LandingNavItem[];
};

export default function MobileNavbar({ theme, items }: Props) {
  const { text, getLocalizedHref } = useLanguage();

  const navText = text.nav;

  const mobileItems: LandingNavItem[] = [
    {
      key: "home",
      name: "Home",
      href: landing().url,
    },
    ...items,
  ];

  const getNavLabel = (item: LandingNavItem) => {
    const navItem = item as LandingNavItem & {
      key?: keyof typeof navText;
    };

    if (navItem.key && navItem.key in navText) {
      return navText[navItem.key];
    }

    return item.name || item.label;
  };

  const handleNavigate = (
    event: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    event.preventDefault();

    const localizedHref = getLocalizedHref(href);

    window.history.pushState({}, "", localizedHref);
    scrollToLocalizedHref(localizedHref);
  };

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
        {mobileItems.map((item) => {
          const localizedHref = getLocalizedHref(item.href);

          return (
            <a
              key={item.href}
              href={localizedHref}
              onClick={(event) => handleNavigate(event, item.href)}
              className={`
                rounded-2xl py-2 text-center text-xs font-medium transition
                ${theme === "dark"
                  ? "text-zinc-300 hover:bg-white/10"
                  : "text-zinc-700 hover:bg-orange-50"
                }
              `}
            >
              {getNavLabel(item)}
            </a>
          );
        })}
      </div>
    </div>
  );
}