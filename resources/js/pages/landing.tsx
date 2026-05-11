import { Head } from "@inertiajs/react";

export default function PremiumRentalGrillLandingPage() {
  const packages = [
    {
      title: 'Basic BBQ',
      price: '299K',
      desc: 'Perfect untuk BBQ kecil bersama teman.',
      features: ['Portable grill', 'Free setup', '2 jam penggunaan'],
    },
    {
      title: 'Family Night',
      price: '599K',
      desc: 'Pilihan paling populer untuk keluarga.',
      features: ['Premium grill', 'Free delivery', 'Charcoal included'],
      highlight: true,
    },
    {
      title: 'Premium Event',
      price: '1.2JT',
      desc: 'Untuk gathering dan event yang lebih besar.',
      features: ['Large grill', 'Full setup', 'Support team included'],
    },
  ];

  const faqs = [
    {
      question: 'Apakah sudah termasuk arang?',
      answer: 'Ya, beberapa paket sudah termasuk arang dan perlengkapan dasar BBQ.',
    },
    {
      question: 'Area delivery dimana saja?',
      answer: 'Kami melayani area kota dan sekitarnya dengan pengiriman cepat.',
    },
    {
      question: 'Bisa booking mendadak?',
      answer: 'Bisa, selama stok dan jadwal masih tersedia.',
    },
    {
      question: 'Apakah ada deposit?',
      answer: 'Beberapa paket membutuhkan deposit yang akan dikembalikan.',
    },
  ];

  return (
    <>
      <Head title="Welcome" />
      <div className="min-h-screen bg-[#0F0F10] text-white overflow-hidden">
        {/* Ambient Background */}
        <div className="fixed inset-0 -z-10 overflow-hidden">
          <div className="absolute left-[-10%] top-[-10%] h-[500px] w-[500px] rounded-full bg-orange-500/20 blur-3xl" />
          <div className="absolute right-[-5%] top-[20%] h-[400px] w-[400px] rounded-full bg-amber-400/10 blur-3xl" />
          <div className="absolute bottom-[-20%] left-[30%] h-[500px] w-[500px] rounded-full bg-orange-700/10 blur-3xl" />
        </div>

        {/* Navbar */}
        <header className="sticky top-0 z-50 border-b border-white/5 bg-black/20 backdrop-blur-xl">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
            <div>
              <h1 className="text-xl font-semibold tracking-tight">
                Grill<span className="text-orange-400">Haus</span>
              </h1>
            </div>

            <nav className="hidden gap-8 text-sm text-zinc-300 md:flex">
              <a href="#features" className="transition hover:text-white">
                Features
              </a>
              <a href="#pricing" className="transition hover:text-white">
                Pricing
              </a>
              <a href="#faq" className="transition hover:text-white">
                FAQ
              </a>
            </nav>

            <button className="rounded-full border border-orange-400/30 bg-orange-500/10 px-5 py-2 text-sm font-medium text-orange-300 transition hover:bg-orange-500/20">
              Book Now
            </button>
          </div>
        </header>

        {/* Hero */}
        <section className="relative flex min-h-[92vh] items-center">
          <div className="mx-auto grid max-w-7xl gap-16 px-6 py-24 lg:grid-cols-2 lg:items-center">
            <div>
              <div className="mb-6 inline-flex items-center rounded-full border border-orange-400/20 bg-orange-500/10 px-4 py-2 text-sm text-orange-200 backdrop-blur-xl">
                Premium BBQ Experience
              </div>

              <h1 className="max-w-2xl text-5xl font-semibold leading-tight tracking-tight md:text-7xl">
                Elevate Your
                <span className="bg-gradient-to-r from-orange-300 to-orange-500 bg-clip-text text-transparent">
                  {' '}
                  BBQ Night
                </span>
              </h1>

              <p className="mt-8 max-w-xl text-lg leading-8 text-zinc-400">
                Rental grill modern untuk party, gathering, camping, dan event dengan setup premium dan pengalaman BBQ yang lebih elegan.
              </p>

              <div className="mt-10 flex flex-wrap gap-4">
                <button className="rounded-full bg-orange-500 px-7 py-4 font-medium text-white transition hover:scale-[1.02] hover:bg-orange-400">
                  Sewa Sekarang
                </button>

                <button className="rounded-full border border-white/10 bg-white/5 px-7 py-4 font-medium text-white backdrop-blur-xl transition hover:bg-white/10">
                  Lihat Paket
                </button>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -left-10 top-10 h-40 w-40 rounded-full bg-orange-500/20 blur-3xl" />

              <div className="relative overflow-hidden rounded-[40px] border border-white/10 bg-white/5 shadow-2xl backdrop-blur-2xl">
                <img
                  src="https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?q=80&w=1600&auto=format&fit=crop"
                  alt="BBQ"
                  className="h-[650px] w-full object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <div className="rounded-3xl border border-white/10 bg-black/30 p-6 backdrop-blur-xl">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-zinc-400">Most Popular Package</p>
                        <h3 className="mt-1 text-2xl font-semibold">Family BBQ Set</h3>
                      </div>

                      <div className="rounded-2xl bg-orange-500 px-5 py-3 font-semibold">
                        599K
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section id="features" className="py-24">
          <div className="mx-auto max-w-7xl px-6">
            <div className="max-w-2xl">
              <p className="text-sm uppercase tracking-[0.3em] text-orange-400">
                Experience
              </p>

              <h2 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">
                More Than Just a Grill.
              </h2>

              <p className="mt-6 text-lg leading-8 text-zinc-400">
                Kami menghadirkan pengalaman BBQ yang modern, praktis, dan premium untuk setiap momen spesialmu.
              </p>
            </div>

            <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {[
                'Premium Equipment',
                'Fast Delivery',
                'Free Setup',
                'Modern Experience',
              ].map((item, index) => (
                <div
                  key={index}
                  className="group relative overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.03] p-8 backdrop-blur-xl transition duration-500 hover:-translate-y-1 hover:border-orange-400/30"
                >
                  <div className="absolute right-0 top-0 h-32 w-32 bg-orange-500/10 blur-3xl transition group-hover:bg-orange-500/20" />

                  <div className="relative">
                    <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-500/10 text-orange-300">
                      0{index + 1}
                    </div>

                    <h3 className="text-2xl font-semibold">{item}</h3>

                    <p className="mt-4 leading-7 text-zinc-400">
                      Setup modern dengan pelayanan profesional dan pengalaman BBQ yang lebih nyaman.
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section id="pricing" className="py-24">
          <div className="mx-auto max-w-7xl px-6">
            <div className="text-center">
              <p className="text-sm uppercase tracking-[0.3em] text-orange-400">
                Packages
              </p>

              <h2 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">
                Choose Your BBQ Setup.
              </h2>
            </div>

            <div className="mt-16 grid gap-8 lg:grid-cols-3">
              {packages.map((item, index) => (
                <div
                  key={index}
                  className={`relative overflow-hidden rounded-[36px] border p-10 transition duration-500 hover:-translate-y-2 ${item.highlight
                    ? 'border-orange-400/40 bg-orange-500/10'
                    : 'border-white/10 bg-white/[0.03]'
                    } backdrop-blur-xl`}
                >
                  {item.highlight && (
                    <div className="absolute right-5 top-5 rounded-full bg-orange-500 px-4 py-2 text-xs font-medium uppercase tracking-wider text-white">
                      Popular
                    </div>
                  )}

                  <h3 className="text-3xl font-semibold">{item.title}</h3>

                  <div className="mt-6 flex items-end gap-2">
                    <span className="text-6xl font-bold">{item.price}</span>
                  </div>

                  <p className="mt-6 leading-7 text-zinc-400">{item.desc}</p>

                  <div className="mt-8 space-y-4">
                    {item.features.map((feature, i) => (
                      <div key={i} className="flex items-center gap-3 text-zinc-300">
                        <div className="h-2 w-2 rounded-full bg-orange-400" />
                        {feature}
                      </div>
                    ))}
                  </div>

                  <button className={`mt-10 w-full rounded-2xl px-6 py-4 font-medium transition ${item.highlight
                    ? 'bg-orange-500 text-white hover:bg-orange-400'
                    : 'border border-white/10 bg-white/5 hover:bg-white/10'
                    }`}>
                    Book Package
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Gallery */}
        <section className="py-24">
          <div className="mx-auto max-w-7xl px-6">
            <div className="flex items-end justify-between gap-10">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-orange-400">
                  Gallery
                </p>

                <h2 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">
                  Moments Worth Grilling.
                </h2>
              </div>
            </div>

            <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[
                'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=1200&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1529692236671-f1dc3f576f5c?q=80&w=1200&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1200&auto=format&fit=crop',
              ].map((image, index) => (
                <div
                  key={index}
                  className="group relative overflow-hidden rounded-[32px] border border-white/10"
                >
                  <img
                    src={image}
                    alt="Gallery"
                    className="h-[500px] w-full object-cover transition duration-700 group-hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="py-24">
          <div className="mx-auto max-w-4xl px-6">
            <div className="text-center">
              <p className="text-sm uppercase tracking-[0.3em] text-orange-400">
                FAQ
              </p>

              <h2 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">
                Frequently Asked Questions.
              </h2>
            </div>

            <div className="mt-16 space-y-5">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="rounded-[28px] border border-white/10 bg-white/[0.03] p-8 backdrop-blur-xl"
                >
                  <h3 className="text-xl font-semibold">{faq.question}</h3>

                  <p className="mt-4 leading-7 text-zinc-400">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="relative overflow-hidden py-32">
          <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange-500/20 blur-3xl" />

          <div className="relative mx-auto max-w-4xl px-6 text-center">
            <h2 className="text-5xl font-semibold tracking-tight md:text-7xl">
              Ready for Your
              <span className="bg-gradient-to-r from-orange-300 to-orange-500 bg-clip-text text-transparent">
                {' '}
                Next BBQ Night?
              </span>
            </h2>

            <p className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-zinc-400">
              Booking cepat, setup praktis, dan pengalaman BBQ premium untuk setiap acara spesialmu.
            </p>

            <div className="mt-10 flex justify-center gap-4">
              <button className="rounded-full bg-orange-500 px-8 py-4 font-medium text-white transition hover:scale-[1.02] hover:bg-orange-400">
                Chat WhatsApp
              </button>

              <button className="rounded-full border border-white/10 bg-white/5 px-8 py-4 font-medium text-white backdrop-blur-xl transition hover:bg-white/10">
                Explore Packages
              </button>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-white/5 py-10">
          <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-5 px-6 text-sm text-zinc-500 md:flex-row">
            <p>© 2026 GrillHaus. All rights reserved.</p>

            <div className="flex gap-6">
              <a href="#" className="transition hover:text-white">
                Instagram
              </a>
              <a href="#" className="transition hover:text-white">
                WhatsApp
              </a>
              <a href="#" className="transition hover:text-white">
                TikTok
              </a>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
