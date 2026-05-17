import { useEffect, useState } from "react";

import { useLanguage } from "@/contexts/language-context";
import { landing } from "@/routes";
import { produk } from "@/routes/landing";
import type { LandingNavItem, ThemeMode } from "@/types";

type Props = {
  theme: ThemeMode;
};

export default function MobileNavbar({ theme }: Props) {
  const { text, language } = useLanguage();

  const [currentHash, setCurrentHash] = useState(() => {
    if (typeof window === "undefined") {
      return "";
    }

    return window.location.hash;
  });

  const [currentPath, setCurrentPath] = useState(() => {
    if (typeof window === "undefined") {
      return "/";
    }

    return window.location.pathname;
  });

  const navItems: LandingNavItem[] = [
    {
      key: "about",
      name: "About",
      href: "#home",
    },
    {
      key: "products",
      name: "Produk",
      href: produk({ locale: language }).url,
    },
    {
      key: "contact",
      name: "Booking",
      href: "#booking",
    },
  ];

  const navText = text.nav;

  const mobileItems: LandingNavItem[] = [
    {
      key: "home",
      name: "Home",
      href: landing({ locale: language }).url,
    },
    ...navItems,
  ];

  useEffect(() => {
    const syncLocation = () => {
      setCurrentHash(window.location.hash);
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener("hashchange", syncLocation);
    window.addEventListener("popstate", syncLocation);

    return () => {
      window.removeEventListener("hashchange", syncLocation);
      window.removeEventListener("popstate", syncLocation);
    };
  }, []);

  const getNavLabel = (item: LandingNavItem) => {
    const navItem = item as LandingNavItem & {
      key?: keyof typeof navText;
    };

    if (navItem.key && navItem.key in navText) {
      return navText[navItem.key];
    }

    return item.name || item.label;
  };

  const normalizePathWithoutLanguage = (url: string) => {
    if (typeof window === "undefined") {
      return "/";
    }

    const supportedLanguages = ["id", "en"];

    const parsedUrl = new URL(url, window.location.origin);
    const segments = parsedUrl.pathname.split("/").filter(Boolean);

    if (segments.length > 0 && supportedLanguages.includes(segments[0])) {
      segments.shift();
    }

    return `/${segments.join("/")}`;
  };

  const isActiveNavItem = (href: string) => {
    if (typeof window === "undefined") {
      return false;
    }

    const currentNormalizedPath = normalizePathWithoutLanguage(currentPath);
    const targetNormalizedPath = normalizePathWithoutLanguage(href);

    const targetHash = href.includes("#")
      ? href.substring(href.indexOf("#"))
      : "";

    if (targetHash) {
      return (
        currentNormalizedPath === targetNormalizedPath &&
        currentHash === targetHash
      );
    }

    if (targetNormalizedPath === "/") {
      return currentNormalizedPath === "/" && !currentHash;
    }

    return (
      currentNormalizedPath === targetNormalizedPath ||
      currentNormalizedPath.startsWith(`${targetNormalizedPath}/`)
    );
  };

  const handleNavClick = (href: string) => {
    if (typeof window === "undefined") {
      return;
    }

    if (!href.includes("#")) {
      return;
    }

    const hash = href.substring(href.indexOf("#"));

    setCurrentHash(hash);
    setCurrentPath(window.location.pathname);
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
          const isActive = isActiveNavItem(item.href);

          return (
            <a
              key={item.href}
              href={item.href}
              aria-current={isActive ? "page" : undefined}
              onClick={() => handleNavClick(item.href)}
              className={`
                rounded-2xl py-2 text-center text-xs font-semibold transition
                ${isActive
                  ? theme === "dark"
                    ? "bg-white text-zinc-950 shadow-lg shadow-white/10"
                    : "bg-zinc-950 text-white shadow-lg shadow-orange-500/10"
                  : theme === "dark"
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