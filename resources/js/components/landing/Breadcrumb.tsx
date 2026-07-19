import { Link } from "@inertiajs/react";
import { ChevronRight } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  url: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export default function Breadcrumb({
  items,
  className = "",
}: BreadcrumbProps) {
  return (
    <nav
      className={`w-full overflow-hidden text-sm text-gray-600 ${className}`}
      aria-label="Breadcrumb"
    >
      <ol className="flex w-full items-center whitespace-nowrap">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li
              key={`${item.url}-${index}`}
              className={`flex items-center ${isLast ? "min-w-0 flex-1" : "shrink-0"
                }`}
            >
              {index !== 0 && (
                <ChevronRight
                  className="mx-1 h-4 w-4 text-gray-400 shrink-0"
                  strokeWidth={2}
                />
              )}

              {isLast ? (
                <span
                  className="block truncate font-medium text-gray-900"
                  title={item.label}
                  aria-current="page"
                >
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.url}
                  className="shrink-0 hover:text-primary"
                >
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}