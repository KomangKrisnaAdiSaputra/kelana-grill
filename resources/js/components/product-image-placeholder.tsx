import { useTranslation } from "@/helpers/global";

type ProductImagePlaceholderProps = {
  theme?: 'light' | 'dark';
  className?: string;
};

export default function ProductImagePlaceholder({
  theme = 'light',
  className = '',
}: ProductImagePlaceholderProps) {
  const { __ } = useTranslation();

  return (
    <div
      className={`relative flex h-full w-full flex-col items-center justify-center overflow-hidden ${theme === 'dark'
        ? 'theme-card-dark border-b border-white/5'
        : 'theme-card-light border-b border-zinc-200/50'
        } ${className}`}
    >
      <img
        src="https://res.cloudinary.com/dikjbuftt/image/upload/v1781186432/Logo_te88na.png"
        alt="No Product"
        className={`object-contain ${theme === 'dark'
          ? 'h-28 w-28 opacity-[0.08]'
          : 'h-28 w-28 opacity-[0.12]'
          }`}
      />

      <p
        className={`mt-4 text-xs font-medium ${theme === 'dark'
          ? 'text-zinc-500'
          : 'text-zinc-500'
          }`}
      >
        {__("Gambar Tidak Ditemukan")}
      </p>
    </div>
  );
}