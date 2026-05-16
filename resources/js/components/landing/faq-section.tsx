import type { LandingFaqItem, ThemeMode } from "@/types";

type Props = {
  theme: ThemeMode;
  faqs: LandingFaqItem[];
};

export default function FaqSection({ theme, faqs }: Props) {
  return (
    <section id="faq" className="py-20 md:py-24">
      <div className="mx-auto max-w-4xl px-4 md:px-6">
        <div className="text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-orange-500">
            FAQ
          </p>

          <h2 className="mt-4 text-3xl font-semibold tracking-tight md:text-4xl lg:text-5xl">
            Frequently Asked Questions.
          </h2>
        </div>

        <div className="mt-10 space-y-5 md:mt-16">
          {faqs.map((faq) => (
            <div
              key={faq.question}
              className={`
                rounded-[24px] border p-6 backdrop-blur-xl md:rounded-[28px] md:p-8
                ${theme === "dark"
                  ? "border-white/10 bg-white/[0.03]"
                  : "border-orange-100 bg-white/70"
                }
              `}
            >
              <h3 className="text-lg font-semibold md:text-xl">
                {faq.question}
              </h3>

              <p
                className={`mt-4 leading-7 ${theme === "dark" ? "text-zinc-400" : "text-zinc-600"
                  }`}
              >
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}