import { FileText, X, Check, Info } from "lucide-react";
import { useMemo, useEffect, useState, useCallback } from "react";
import { useTranslation } from "@/helpers/global";

interface TermsConditionModalProps {
  open: boolean;
  isDark: boolean;
  isAgreed: boolean;
  hasScrolledToBottom: boolean;
  termsContentRef: React.RefObject<HTMLDivElement>;
  onClose: () => void;
  onAgreeChange: (checked: boolean) => void;
  onScroll: (e: React.UIEvent<HTMLDivElement>) => void;
  onContinue: () => void;
}

export default function TermsConditionModal({
  open,
  isDark,
  isAgreed,
  hasScrolledToBottom,
  termsContentRef,
  onClose,
  onAgreeChange,
  onScroll,
  onContinue,
}: TermsConditionModalProps) {
  const { __ } = useTranslation();
  const [isScrollable, setIsScrollable] = useState<boolean>(false);

  const terms = useMemo(
    () => [
      {
        title: "Durasi Penyewaan",
        description: "Penyewaan berlaku untuk 1 hari.",
      },
      {
        title: "Jam Pengambilan",
        description:
          "Barang dapat diambil pukul 09:00 - 18:00. Untuk pengambilan di luar jam tersebut dapat dibuat janji terlebih dahulu.",
      },
      {
        title: "Keterlambatan Pengembalian",
        description:
          "Batas keterlambatan pengembalian adalah 2 jam. Apabila melebihi batas tersebut akan dikenakan biaya tambahan sebesar 1 hari sewa.",
      },
      {
        title: "Jaminan Identitas",
        description:
          "Mohon membawa KTP, SIM, atau Kartu Pelajar saat pengambilan sebagai jaminan.",
      },
      {
        title: "Pengembalian Barang",
        description:
          "Seluruh barang wajib dikembalikan sesuai paket yang disewa, termasuk tabung gas apabila disertakan.",
      },
      {
        title: "Kerusakan & Kehilangan",
        description:
          "Kerusakan maupun kehilangan barang akan dikenakan biaya sesuai kondisi barang.",
      },
      {
        title: "Booking",
        description:
          "Dimohon melakukan booking dari jauh hari untuk menghindari full booked.",
      },
      {
        title: "Penyewaan dengan Daging",
        description:
          "Penyewaan yang disertai pemesanan daging wajib dilakukan minimal H-1 sebelum tanggal penyewaan.",
      },
      {
        title: "Promo",
        description:
          "Promo yang dipilih tidak dapat digabungkan dengan promo lainnya.",
      },
      {
        title: "Pengiriman",
        description:
          "Apabila pengiriman menggunakan jasa pengiriman online, ongkos kirim menjadi tanggung jawab pemesan.",
      },
    ],
    []
  );

  // Memeriksa apakah konten memerlukan scroll
  const checkScrollState = useCallback(() => {
    const el = termsContentRef.current;

    if (!el) {
      return;
    }

    const requiresScroll = el.scrollHeight > el.clientHeight + 2;
    setIsScrollable(requiresScroll);
  }, [termsContentRef]);

  useEffect(() => {
    if (!open) {
      return;
    }

    // Beri jeda kecil agar DOM selesai merender dimensi elemen
    const timer = setTimeout(checkScrollState, 100);
    window.addEventListener("resize", checkScrollState);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", checkScrollState);
    };
  }, [open, checkScrollState]);

  if (!open) {
    return null;
  }

  // Kunci logika utama:
  // BISA DI-KLIK jika: (TIDAK Butuh Scroll) ATAU (SUDAH Scroll Sampai Bawah)
  const isCheckboxEnabled = !isScrollable || hasScrolledToBottom;

  //   useEffect(() => {
  //   if (openTermsModal) {
  //     setHasScrolledToBottom(false);
  //     setIsAgreed(false);
  //   }
  // }, [openTermsModal]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-md transition-all duration-300">
      <div
        className={`relative flex max-h-[85vh] w-full max-w-2xl flex-col overflow-hidden rounded-3xl border shadow-2xl transition-all ${isDark
          ? "border-zinc-800/80 bg-zinc-950/90 text-zinc-100 shadow-orange-500/5"
          : "border-zinc-200/80 bg-white/95 text-zinc-900 shadow-xl"
          }`}
      >
        {/* Ambient Glow Accent */}
        <div className="pointer-events-none absolute -top-24 -left-24 h-48 w-48 rounded-full bg-orange-500/10 blur-3xl" />

        {/* Header */}
        <div
          className={`flex items-center justify-between border-b px-6 py-5 ${isDark ? "border-zinc-800/80" : "border-zinc-100"
            }`}
        >
          <div className="flex items-center gap-3.5">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-tr from-orange-500/20 to-amber-500/10 text-orange-500 shadow-sm border border-orange-500/20">
              <FileText size={22} />
            </div>

            <div>
              <h3 className="text-lg font-bold tracking-tight">
                {__("Syarat & Ketentuan")}
              </h3>
              <p
                className={`text-xs font-medium ${isDark ? "text-zinc-400" : "text-zinc-500"
                  }`}
              >
                {__("Harap membaca seluruh syarat hingga selesai.")}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className={`rounded-full p-2 transition-all duration-200 ${isDark
              ? "hover:bg-zinc-800/80 text-zinc-400 hover:text-white"
              : "hover:bg-zinc-100 text-zinc-500 hover:text-zinc-900"
              }`}
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div
          ref={termsContentRef}
          onScroll={onScroll}
          className="flex-1 space-y-3.5 overflow-y-auto p-6 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        >
          {/* Banner Peringatan: Hanya tampil jika halaman PERLU scroll dan pengguna BELUM scroll ke bawah */}
          {isScrollable && !hasScrolledToBottom && (
            <div
              className={`flex items-start gap-3 rounded-2xl border p-4 text-xs font-medium transition-all ${isDark
                ? "border-orange-500/20 bg-orange-500/10 text-orange-300"
                : "border-orange-200/80 bg-orange-50/80 text-orange-800"
                }`}
            >
              <Info size={18} className="mt-0.5 shrink-0 text-orange-500" />
              <span>
                {__(
                  "Silakan scroll hingga bagian paling bawah untuk mengaktifkan persetujuan."
                )}
              </span>
            </div>
          )}

          {terms.map((item, index) => (
            <div
              key={index}
              className={`group rounded-2xl border p-4 transition-all duration-200 ${isDark
                ? "border-zinc-800/60 bg-zinc-900/40 hover:border-zinc-700/80 hover:bg-zinc-900/80"
                : "border-zinc-100 bg-zinc-50/60 hover:border-zinc-200 hover:bg-zinc-50"
                }`}
            >
              <h4 className="mb-1.5 text-sm font-semibold text-orange-500 transition-colors">
                {index + 1}. {__(item.title)}
              </h4>

              <p
                className={`text-xs leading-relaxed ${isDark ? "text-zinc-300" : "text-zinc-600"
                  }`}
              >
                {__(item.description)}
              </p>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div
          className={`space-y-4 border-t p-6 ${isDark
            ? "border-zinc-800/80 bg-zinc-950/60"
            : "border-zinc-100 bg-zinc-50/50"
            }`}
        >
          <label
            className={`group flex items-center gap-3.5 select-none transition-opacity ${isCheckboxEnabled
              ? "cursor-pointer opacity-100"
              : "cursor-not-allowed opacity-40"
              }`}
          >
            <div className="relative flex items-center justify-center">
              <input
                type="checkbox"
                checked={isAgreed}
                disabled={!isCheckboxEnabled}
                onChange={(e) => onAgreeChange(e.target.checked)}
                className="peer sr-only"
              />
              <div
                className={`h-5 w-5 rounded-md border-2 transition-all duration-200 flex items-center justify-center ${isAgreed
                  ? "border-orange-500 bg-orange-500 text-white shadow-sm shadow-orange-500/30"
                  : isDark
                    ? "border-zinc-700 bg-zinc-900 group-hover:border-zinc-500"
                    : "border-zinc-300 bg-white group-hover:border-zinc-400"
                  }`}
              >
                {isAgreed && <Check size={14} strokeWidth={3} />}
              </div>
            </div>

            <span
              className={`text-xs font-medium transition-colors ${isDark ? "text-zinc-300" : "text-zinc-700"
                }`}
            >
              {__(
                "Saya telah membaca dan menyetujui seluruh syarat & ketentuan di atas."
              )}
            </span>
          </label>

          <div className="flex items-center justify-end gap-3 pt-1">
            <button
              onClick={onClose}
              className={`rounded-xl border px-5 py-2.5 text-xs font-semibold transition-all duration-200 ${isDark
                ? "border-zinc-800 bg-zinc-900 text-zinc-300 hover:bg-zinc-800 hover:text-white"
                : "border-zinc-200 bg-white text-zinc-700 hover:bg-zinc-100 hover:text-zinc-900"
                }`}
            >
              {__("Tutup")}
            </button>

            <button
              disabled={!isAgreed}
              onClick={onContinue}
              className={`rounded-xl px-6 py-2.5 text-xs font-semibold text-white shadow-md transition-all duration-200 ${isAgreed
                ? "bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 active:scale-[0.98] shadow-orange-500/20"
                : "cursor-not-allowed bg-zinc-300 text-zinc-500 dark:bg-zinc-800 dark:text-zinc-600 shadow-none"
                }`}
            >
              {__("Setujui & Lanjutkan")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}