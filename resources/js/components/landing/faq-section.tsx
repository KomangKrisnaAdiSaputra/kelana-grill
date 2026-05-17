import { useState } from "react";
import { useLanguage } from "@/contexts/language-context";
import type { LandingFaqItem, ThemeMode } from "@/types";

type Props = {
  theme: ThemeMode;
  faqs: LandingFaqItem[];
};

const faqSectionTranslations = {
  id: {
    eyebrow: "FAQ",
    title: "Pertanyaan yang Sering Ditanyakan.",
    subtitle:
      "Temukan jawaban seputar paket BBQ, pemesanan, lokasi, dan ketentuan lainnya.",
  },
  en: {
    eyebrow: "FAQ",
    title: "Frequently Asked Questions.",
    subtitle:
      "Find answers about BBQ packages, orders, locations, and other terms.",
  },
};

export default function FaqSection({ theme, faqs }: Props) {
  const { language } = useLanguage();
  const [openKey, setOpenKey] = useState<string | null>(faqs[0]?.key ?? null);

  const isDark = theme === "dark";

  const sectionText =
    faqSectionTranslations[
    language as keyof typeof faqSectionTranslations
    ] ?? faqSectionTranslations.id;

  return (
    <section id="faq" className="relative overflow-hidden py-20 md:py-24">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className={`
            absolute left-1/2 top-20 h-[360px] w-[360px] -translate-x-1/2 rounded-full blur-3xl
            ${isDark ? "bg-orange-500/10" : "bg-orange-300/20"}
          `}
        />
      </div>

      <div className="relative mx-auto max-w-4xl px-4 md:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-orange-500">
            {sectionText.eyebrow}
          </p>

          <h2
            className={`mt-4 text-3xl font-semibold tracking-tight md:text-4xl lg:text-5xl ${isDark ? "text-white" : "text-zinc-950"
              }`}
          >
            {sectionText.title}
          </h2>

          <p
            className={`mx-auto mt-5 text-base leading-7 md:text-lg ${isDark ? "text-zinc-400" : "text-zinc-600"
              }`}
          >
            {sectionText.subtitle}
          </p>
        </div>

        <div className="mt-10 space-y-4 md:mt-14">
          {faqs.map((faq, index) => {
            const faqText =
              faq.translations[
              language as keyof typeof faq.translations
              ] ?? faq.translations.id;

            const isOpen = openKey === faq.key;

            return (
              <div
                key={faq.key}
                className={`
                  group overflow-hidden rounded-[26px] border transition-all duration-300
                  ${isOpen
                    ? isDark
                      ? "border-orange-400/30 bg-white/[0.06] shadow-2xl shadow-orange-500/10"
                      : "border-orange-200 bg-white shadow-xl shadow-orange-100/70"
                    : isDark
                      ? "border-white/10 bg-white/[0.03] hover:border-white/15 hover:bg-white/[0.05]"
                      : "border-orange-100 bg-white/70 hover:border-orange-200 hover:bg-white"
                  }
                `}
              >
                <button
                  type="button"
                  onClick={() => setOpenKey(isOpen ? null : faq.key)}
                  className="flex w-full items-start justify-between gap-4 p-5 text-left md:p-6"
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${faq.key}`}
                >
                  <div className="flex gap-4">
                    <div
                      className={`
                        mt-0.5 hidden h-9 w-9 shrink-0 items-center justify-center rounded-2xl text-sm font-bold md:flex
                        ${isOpen
                          ? "bg-orange-500 text-white"
                          : isDark
                            ? "bg-white/10 text-zinc-300"
                            : "bg-orange-50 text-orange-500"
                        }
                      `}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </div>

                    <div>
                      <h3
                        className={`
                          text-base font-semibold leading-7 md:text-lg
                          ${isDark ? "text-white" : "text-zinc-950"}
                        `}
                      >
                        {faqText.question}
                      </h3>
                    </div>
                  </div>

                  <span
                    className={`
                      flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xl font-semibold transition duration-300
                      ${isOpen
                        ? "rotate-180 bg-orange-500 text-white"
                        : isDark
                          ? "bg-white/10 text-white group-hover:bg-white/15"
                          : "bg-orange-50 text-orange-500 group-hover:bg-orange-100"
                      }
                    `}
                  >
                    {isOpen ? "−" : "+"}
                  </span>
                </button>

                <div
                  id={`faq-answer-${faq.key}`}
                  className={`
                    grid transition-all duration-300 ease-out
                    ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}
                  `}
                >
                  <div className="overflow-hidden">
                    <div className="px-5 pb-5 md:px-6 md:pb-6">
                      <div
                        className={`
                          border-t pt-4 md:ml-13
                          ${isDark
                            ? "border-white/10 text-zinc-400"
                            : "border-orange-100 text-zinc-600"
                          }
                        `}
                      >
                        <p className="leading-7">{faqText.answer}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}