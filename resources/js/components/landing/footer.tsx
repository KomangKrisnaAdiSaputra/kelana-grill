import type { ThemeMode } from "@/types";

type Props = {
  theme: ThemeMode;
};

export default function Footer({ theme }: Props) {
  const appName = import.meta.env.VITE_APP_NAME || "";

  const instagramUsername = import.meta.env.VITE_INSTAGRAM_USERNAME || "";
  const facebookUsername = import.meta.env.VITE_FACEBOOK_USERNAME || "";
  const tiktokUsername = import.meta.env.VITE_TIKTOK_USERNAME || "";

  const instagramUrl = instagramUsername
    ? `https://www.instagram.com/${instagramUsername.replace("@", "")}`
    : "#";

  const facebookUrl = facebookUsername
    ? `https://www.facebook.com/${facebookUsername.replace("@", "")}`
    : "#";

  const tiktokUrl = tiktokUsername
    ? `https://www.tiktok.com/@${tiktokUsername.replace("@", "")}`
    : "#";

  const socialLinks = [
    {
      label: "Instagram",
      href: instagramUrl,
      active: Boolean(instagramUsername),
    },
    {
      label: "Facebook",
      href: facebookUrl,
      active: Boolean(facebookUsername),
    },
    {
      label: "TikTok",
      href: tiktokUrl,
      active: Boolean(tiktokUsername),
    },
  ];


  return (
    <footer
      className={`border-t py-10 ${theme === "dark" ? "border-white/5" : "border-orange-100"
        }`}
    >
      <div
        className={`mx-auto flex max-w-7xl flex-col items-center justify-between gap-5 px-4 text-sm md:flex-row md:px-6 ${theme === "dark" ? "text-zinc-500" : "text-zinc-600"
          }`}
      >
        <p>© 2026 {appName}. All rights reserved.</p>

        <div className="flex gap-6">
          {socialLinks.map((item) => (
            <a
              key={item.label}
              href={item.href}
              target={item.active ? "_blank" : undefined}
              rel={item.active ? "noopener noreferrer" : undefined}
              className="transition hover:text-orange-500"
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}