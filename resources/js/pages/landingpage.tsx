import { AnimatePresence, motion } from "framer-motion";
import {
  Facebook,
  Flame,
  Instagram,
  Menu,
  Music2,
  ShieldCheck,
  Users,
  X,
} from "lucide-react";
import { useState } from "react";

export default function LandingPage() {
  const [openHamMenu, setOpenHamMenu] = useState(false);

  const handleScroll = (id: string) => {
    const element = document.getElementById(id)

    if (element) {
      const yOffset = -30 // tinggi header
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset

      window.scrollTo({
        top: y,
        behavior: "smooth",
      })
    }
  }
  return (
    <div className="bg-[#F9FAFB] text-gray-800">

      {/* ================= NAVBAR ================= */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

          {/* LOGO */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3"
          >
            <img
              src="/images/logo.png"
              alt="KelanaGrill Logo"
              className="w-9 h-9 object-contain"
            />
            <span className="font-bold text-xl tracking-tight text-gray-900">
              Kelana<span className="text-yellow-500">Grill</span>
            </span>

          </motion.div>
          <button
            onClick={() => setOpenHamMenu(!openHamMenu)}
            className="md:hidden cursor-pointer"
          >
            {openHamMenu ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* NAVIGATION */}
          <nav className="hidden md:flex gap-8 text-sm font-medium">

            <button
              onClick={() => handleScroll("paket")}
              className="hover:text-yellow-500 transition-colors cursor-pointer"
            >
              Paket
            </button>

            <button
              onClick={() => handleScroll("kontak")}
              className="hover:text-yellow-500 transition-colors cursor-pointer"
            >
              Kontak
            </button>

          </nav>
        </div>
        <AnimatePresence>
          {openHamMenu && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.25 }}
              className="md:hidden bg-white border-t border-gray-200"
            >
              <div className="flex flex-col p-6 gap-6 text-sm font-medium">
                <button
                  onClick={() => handleScroll("paket")}
                  className="text-left hover:text-yellow-500 transition"
                >
                  Paket
                </button>

                <button
                  onClick={() => handleScroll("kontak")}
                  className="text-left hover:text-yellow-500 transition"
                >
                  Kontak
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden bg-gradient-to-br from-yellow-100 via-orange-100 to-red-100">
        {/* ================= BACKGROUND DECOR ================= */}

        {/* Blob kiri atas */}
        <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-yellow-300/40 rounded-full blur-[120px]" />

        {/* Blob kanan */}
        <div className="absolute top-20 -right-40 w-[520px] h-[520px] bg-orange-400/40 rounded-full blur-[140px]" />

        {/* Soft layer bawah */}
        <div className="absolute bottom-0 left-0 w-full h-48 bg-gradient-to-t from-white via-white/80 to-transparent" />

        {/* ================= CONTENT ================= */}
        <div className="relative max-w-7xl mx-auto px-6 pt-28 pb-24 grid grid-cols-1 md:grid-cols-2 gap-20 items-center">

          {/* ================= TEXT ================= */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center md:text-left"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              🔥 BBQ Jadi Lebih <br className="hidden md:block" />
              Gampang & Seru
            </h1>

            <p className="mt-6 text-lg md:text-xl text-gray-700 max-w-xl mx-auto md:mx-0">
              Sewa alat grill lengkap, bersih, dan siap pakai untuk
              acara keluarga, komunitas, maupun kantor.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <a
                href="https://wa.me/6281337467442"
                target="_blank"
                className="bg-yellow-500 hover:bg-yellow-600 text-white px-8 py-4 rounded-2xl font-semibold shadow-lg transition"
              >
                Booking Sekarang
              </a>
              <button className="bg-white/90 hover:bg-gray-100 px-8 py-4 rounded-2xl font-semibold shadow transition cursor-pointer"
                onClick={() => handleScroll("paket")}>
                Lihat Paket
              </button>
            </div>
          </motion.div>

          {/* ================= HERO IMAGE ================= */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="relative flex justify-center items-center"
          >
            {/* Glow belakang image */}
            <div className="
            absolute
            w-72 h-72
            sm:w-96 sm:h-96
            md:w-[480px] md:h-[480px]
            bg-yellow-300/50
            blur-[140px]
            rounded-full
          " />

            {/* Image */}
            <motion.img
              src="/images/grill-hero.png"
              alt="KelanaGrill"
              animate={{ y: [0, -16, 0], rotate: [0, 1.5, 0] }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="
              relative z-10
              w-72
              sm:w-80
              md:w-[440px]
              lg:w-[540px]
              drop-shadow-2xl
            "
            />
          </motion.div>
        </div>
      </section>

      {/* ================= WHY US ================= */}
      <section id="fitur" className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">
            Kenapa Memilih Kami?
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Flame />,
                title: "Grill Lengkap",
                desc: "Beragam pilihan alat BBQ modern & berkualitas.",
              },
              {
                icon: <ShieldCheck />,
                title: "Bersih & Higienis",
                desc: "Peralatan dibersihkan sebelum & sesudah pemakaian.",
              },
              {
                icon: <Users />,
                title: "Cocok untuk Semua Acara",
                desc: "Dari acara keluarga hingga gathering kantor.",
              }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -8 }}
                className="bg-white rounded-2xl shadow p-8 text-center"
              >
                <div className="mx-auto mb-4 w-12 h-12 flex items-center justify-center rounded-full bg-yellow-100 text-yellow-600">
                  {item.icon}
                </div>
                <h3 className="font-semibold text-lg">{item.title}</h3>
                <p className="text-gray-600 mt-2">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= PAKET ================= */}
      <section id="paket" className="py-28 bg-gradient-to-b from-white to-gray-50 scroll-mt-24">
        <div className="max-w-7xl mx-auto px-6">

          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Pilihan Paket Grill
            </h2>
            <p className="mt-4 text-gray-600 max-w-xl mx-auto">
              Pilih paket sesuai kebutuhan acara Anda.
              {/* Semua sudah termasuk */}
              {/* peralatan lengkap dan siap pakai. */}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-10">

            {[
              {
                title: "Grill 1",
                price: 50000,
                desc: "",
                features: [
                  "Kompor dan Gas",
                  "Pan Grill Bulat",
                  "2 Set Mangkok",
                  "2 Set Sumpit",
                  "Set Kuas",
                  "Capitan",
                ],
              },
              {
                title: "Grill 2",
                price: 50000,
                desc: "",
                highlight: true,
                features: [
                  "Kompor dan Gas",
                  "Pan Grill Kotak",
                  "2 Set Mangkok",
                  "2 Set Sumpit",
                  "Set Kuas",
                  "Capitan",
                ],
              },
              {
                title: "Suki",
                price: 50000,
                desc: "",
                features: [
                  "Kompor dan Gas",
                  "Panci Suki 2 Sekat",
                  "4 Set Mangkok",
                  "4 Set Sendok",
                  "4 Set Sumpit",
                  "2 Set Sendok Kuah dan Capitan",
                ],
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                whileHover={{ y: -8 }}
                className={`
            relative rounded-3xl p-10 bg-white border shadow-sm
            transition-all duration-300
            ${item.highlight ? "ring-2 ring-yellow-400 shadow-xl" : ""}
          `}
              >
                {item.highlight && (
                  <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-yellow-400 text-white text-xs font-semibold px-4 py-1 rounded-full shadow">
                    Paling Populer
                  </span>
                )}

                <h3 className="text-xl font-semibold text-gray-900">
                  Paket {item.title}
                </h3>

                <p className="text-gray-500 text-sm mt-2">
                  {item.desc}
                </p>

                <div className="mt-6">
                  <span className="text-4xl font-bold text-gray-900">
                    Rp {new Intl.NumberFormat("id-ID").format(item.price)}
                  </span>
                  {/* <span className="text-gray-500 text-sm"> / event</span> */}
                </div>

                <ul className="mt-8 space-y-3 text-gray-600 text-sm">
                  {item.features.map((f, idx) => (
                    <li key={idx} className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-yellow-400 rounded-full" />
                      {f}
                    </li>
                  ))}
                </ul>

                <a
                  href={`https://wa.me/6281337467442?text=${encodeURIComponent(`Halo, saya ingin memesan Paket ${item.title}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button
                    className={`
      mt-10 w-full py-3 rounded-xl font-semibold transition cursor-pointer
      ${item.highlight
                        ? "bg-yellow-500 hover:bg-yellow-600 text-white"
                        : "bg-gray-900 hover:bg-gray-800 text-white shadow-lg"}
    `}
                  >
                    Pilih Paket
                  </button>
                </a>
              </motion.div>
            ))}
          </div>

          {/* Lihat Selengkapnya */}
          <div className="text-center mt-20">
            <a
              href="/paket"
              className="inline-block text-yellow-600 font-semibold hover:underline"
            >
              Lihat Selengkapnya →
            </a>
          </div>

        </div>
      </section>

      {/* ================= KONTAK ================= */}
      <section id="kontak" className="py-24 bg-white scroll-mt-24">
        <div className="max-w-6xl mx-auto px-6">

          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Hubungi Kami
            </h2>
            <p className="mt-4 text-gray-600">
              Punya pertanyaan atau ingin booking sekarang?
              Tim kami siap membantu.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">

            {/* INFO */}
            <div className="space-y-6">
              <div className="bg-gray-50 p-6 rounded-2xl">
                <h3 className="font-semibold text-gray-900">WhatsApp</h3>
                <p className="text-gray-600 mt-2">081337467442</p>
              </div>

              <div className="bg-gray-50 p-6 rounded-2xl">
                <h3 className="font-semibold text-gray-900">Email</h3>
                <p className="text-gray-600 mt-2">kelanagrill@gmail.com</p>
              </div>

              <div className="bg-gray-50 p-6 rounded-2xl">
                <h3 className="font-semibold text-gray-900">Jam Operasional</h3>
                <p className="text-gray-600 mt-2">
                  Senin – Minggu, 08.00 – 20.00
                </p>
              </div>
            </div>

            {/* CTA CARD */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-gradient-to-br from-yellow-400 to-orange-500 p-10 rounded-3xl text-white shadow-xl text-center"
            >
              <h3 className="text-2xl font-bold">
                Siap BBQ Seru?
              </h3>

              <p className="mt-4 text-white/90">
                Klik tombol di bawah untuk langsung chat via WhatsApp.
              </p>

              <a
                href="https://wa.me/6281337467442"
                target="_blank"
                className="inline-block mt-8 bg-white text-orange-500 font-semibold px-8 py-4 rounded-2xl shadow hover:bg-gray-100 transition"
              >
                Chat WhatsApp
              </a>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      {/* <section className="relative overflow-hidden bg-gradient-to-br from-yellow-400 via-orange-400 to-red-500 py-24">

        <div className="relative max-w-4xl mx-auto px-6 text-center text-white">
          <h2 className="text-3xl md:text-5xl font-bold">
            Siap BBQ Seru Tanpa Ribet?
          </h2>

          <p className="mt-6 text-lg text-white/90">
            Hubungi kami sekarang dan nikmati pengalaman BBQ terbaik.
          </p>

          <motion.button
            whileHover={{ scale: 1.07 }}
            whileTap={{ scale: 0.95 }}
            className="mt-10 bg-white text-gray-900 px-10 py-4 rounded-2xl font-semibold shadow-xl"
          >
            🔥 Pesan Sekarang
          </motion.button>
        </div>

        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
          <svg
            viewBox="0 0 1440 120"
            className="relative block w-full h-20 md:h-28"
            preserveAspectRatio="none"
          >
            <path
              d="M0,64L80,74.7C160,85,320,107,480,101.3C640,96,800,64,960,58.7C1120,53,1280,75,1360,85.3L1440,96V120H0Z"
              className="fill-gray-950"
            ></path>
          </svg>
        </div>

      </section> */}

      {/* ================= FOOTER ================= */}
      <footer className="bg-gray-950 text-gray-300 pt-20 pb-12 relative overflow-hidden">

        {/* subtle gradient glow */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-gray-950 to-gray-900 opacity-60 pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-12">

          {/* BRAND */}
          <div>
            <div className="flex items-center gap-3">
              <img
                src="/images/logo.png"
                alt="KelanaGrill Logo"
                className="w-10 h-10 object-contain"
              />
              <h3 className="font-bold text-xl text-white tracking-tight">
                Kelana<span className="text-yellow-400">Grill</span>
              </h3>
            </div>

            <p className="mt-5 text-sm text-gray-400 leading-relaxed max-w-sm">
              Penyedia sewa alat grill terpercaya untuk acara keluarga,
              gathering komunitas, hingga event besar.
            </p>

            <a
              href="https://wa.me/6281337467442"
              target="_blank"
              className="inline-block mt-6 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-5 py-2 rounded-xl transition"
            >
              Booking Sekarang
            </a>
          </div>

          {/* MENU */}
          <div>
            <h4 className="font-semibold text-white mb-6">Menu</h4>
            <ul className="space-y-4 text-sm">
              <li>
                <button
                  onClick={() => document.getElementById("paket")?.scrollIntoView({ behavior: "smooth" })}
                  className="hover:text-yellow-400 transition cursor-pointer"
                >
                  Paket
                </button>
              </li>
              <li>
                <button
                  onClick={() => document.getElementById("kontak")?.scrollIntoView({ behavior: "smooth" })}
                  className="hover:text-yellow-400 transition cursor-pointer"
                >
                  Kontak
                </button>
              </li>
            </ul>
          </div>

          {/* KONTAK */}
          <div>
            <h4 className="font-semibold text-white mb-6">Kontak</h4>

            <div className="space-y-4 text-sm text-gray-400">
              <p>📱 WhatsApp: 081337467442</p>
              <p>📧 Email: kelanagrill@gmail.com</p>
              <p>🕒 Setiap Hari 08.00 - 20.00</p>
            </div>

            {/* SOCIAL ICONS */}
            <div className="flex gap-4 mt-6">

              <a
                href="https://instagram.com/kelanagrill"
                target="_blank"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 hover:bg-pink-500 hover:text-white transition"
              >
                <Instagram size={18} />
              </a>

              <a
                href="https://facebook.com/kelana.grill"
                target="_blank"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 hover:bg-blue-600 hover:text-white transition"
              >
                <Facebook size={18} />
              </a>

              <a
                href="https://tiktok.com/@kelana.grill"
                target="_blank"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 hover:bg-white hover:text-black transition"
              >
                <Music2 size={18} />
              </a>

            </div>
          </div>

        </div>

        {/* COPYRIGHT */}
        <div className="relative border-t border-gray-800 mt-16 pt-6 text-center text-xs text-gray-500">
          © {new Date().getFullYear()} KelanaGrill. All rights reserved.
        </div>

      </footer>
    </div>
  );
}
