import { Link } from "@inertiajs/react";
import { ChevronRight } from "lucide-react";
import type { BreadcrumbItem } from "@/types";

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
  isDark?: boolean;
}

export default function Breadcrumb({
  items,
  className = "",
  isDark = false,
}: BreadcrumbProps) {
  return (
    <nav
      className={`w-full overflow-hidden text-sm ${className}`}
      aria-label="Breadcrumb"
    >
      <ol className="flex w-full items-center whitespace-nowrap">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li
              key={`${item.href}-${index}`}
              className={`flex items-center ${isLast ? "min-w-0 flex-1" : "shrink-0"
                }`}
            >
              {index !== 0 && (
                <ChevronRight
                  className={`mx-2 h-4 w-4 shrink-0 ${isDark
                    ? "text-zinc-600"
                    : "text-zinc-400"
                    }`}
                  strokeWidth={2}
                />
              )}

              {isLast ? (
                <span
                  title={item.title}
                  aria-current="page"
                  className={`block truncate font-semibold ${isDark
                    ? "text-white"
                    : "text-zinc-900"
                    }`}
                >
                  {item.title}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className={`transition-colors duration-200 ${isDark
                    ? "text-zinc-400 hover:text-orange-400"
                    : "text-zinc-500 hover:text-orange-500"
                    }`}
                >
                  {item.title}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}