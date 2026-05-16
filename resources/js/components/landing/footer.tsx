import type { ThemeMode } from "@/types";

type Props = {
  theme: ThemeMode;
};

export default function Footer({ theme }: Props) {
  return (
    <footer
      className={`border-t py-10 ${theme === "dark" ? "border-white/5" : "border-orange-100"
        }`}
    >
      <div
        className={`mx-auto flex max-w-7xl flex-col items-center justify-between gap-5 px-4 text-sm md:flex-row md:px-6 ${theme === "dark" ? "text-zinc-500" : "text-zinc-600"
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
  );
}