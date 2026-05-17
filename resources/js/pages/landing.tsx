import { usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";

import AmbientBackground from "@/components/landing/ambient-background";
import CtaSection from "@/components/landing/cta-section";
import FaqSection from "@/components/landing/faq-section";
import FeatureSection from "@/components/landing/feature-section";
// import FloatingWhatsApp from "@/components/landing/floating-whatsApp";
import Footer from "@/components/landing/footer";
import HeroSection from "@/components/landing/hero-section";
import MobileNavbar from "@/components/landing/mobile-navbar";
import Navbar from "@/components/landing/navbar";
import ProductSection from "@/components/landing/product-section";
import AppProvider from "@/contexts/app-provider";
import { useTheme } from "@/contexts/theme-context";
import { produk } from "@/routes/landing";
import type {
  LandingFaqItem,
  LandingNavItem,
} from "@/types";
import type { ProductItem } from "@/types/product";

type LandingPageProps = {
  featuredProduct?: ProductItem | null;
  products?: ProductItem[] | [];
};

const faqs: LandingFaqItem[] = [
  {
    key: "stove-package-items",
    translations: {
      id: {
        question: "Untuk paket dengan kompor, isi apa saja?",
        answer:
          "Paket dengan kompor sudah termasuk perlengkapan grill seperti kompor grill portable, pan grill, capitan atau penjepit BBQ, mangkok, sumpit, kuas, dan gas. Isi detail bisa berbeda sesuai paket yang dipilih.",
      },
      en: {
        question: "What is included in the package with a stove?",
        answer:
          "The package with a stove includes grilling equipment such as a portable grill stove, grill pan, BBQ tongs, bowls, chopsticks, brush, and gas canister. The exact items may vary depending on the package you choose.",
      },
    },
  },
  {
    key: "gas-included",
    translations: {
      id: {
        question: "Apakah sudah termasuk gas?",
        answer:
          "Ya, untuk paket dengan kompor sudah termasuk gas. Untuk paket tanpa kompor, gas tidak termasuk karena tidak ada perlengkapan kompor.",
      },
      en: {
        question: "Is gas included?",
        answer:
          "Yes, gas is included for packages with a stove. For packages without a stove, gas is not included because stove equipment is not provided.",
      },
    },
  },
  {
    key: "meat-only",
    translations: {
      id: {
        question: "Apakah bisa hanya membeli daging saja?",
        answer:
          "Bisa. Kamu bisa membeli menu ala carte atau daging saja sesuai ketersediaan stok. Silakan hubungi kami untuk pilihan daging dan harga terbaru.",
      },
      en: {
        question: "Can I buy only the meat?",
        answer:
          "Yes. You can order ala carte items or meat only, depending on stock availability. Please contact us for the latest meat options and prices.",
      },
    },
  },
  {
    key: "location",
    translations: {
      id: {
        question: "Lokasinya dimana ya?",
        answer:
          "Kami berada di area Denpasar dan Batubulan. Untuk alamat lengkap, titik lokasi, atau informasi pengambilan, silakan hubungi kami melalui WhatsApp.",
      },
      en: {
        question: "Where are you located?",
        answer:
          "We are located around the Denpasar and Batubulan areas. For the full address, map location, or pickup information, please contact us via WhatsApp.",
      },
    },
  },
  {
    key: "down-payment",
    translations: {
      id: {
        question: "Apakah harus DP?",
        answer:
          "DP diperlukan untuk pembelian daging. Selain itu, saat ada event, high season, atau pemesanan sedang ramai, semua pesanan wajib DP agar jadwal dan stok bisa kami amankan.",
      },
      en: {
        question: "Is a down payment required?",
        answer:
          "A down payment is required for meat-only purchases. In addition, during events, high season, or busy order periods, all orders require a down payment so we can secure the schedule and stock for you.",
      },
    },
  },
];
const cartItems = [
  {
    id: 1,
    name: "Paket Grill Premium",
    category: "Paket",
    price: 150000,
    qty: 1,
    image: "/images/products/grill-premium.jpg",
  },
  {
    id: 2,
    name: "Sosis Jumbo",
    category: "Ala Carte",
    price: 35000,
    qty: 2,
    image: "/images/products/sosis.jpg",
  },
];

const navItems: LandingNavItem[] = [
  {
    key: "about",
    name: "About",
    href: "#home",
  },
  {
    key: "products",
    name: "Produk",
    href: produk.url(),
  },
  {
    key: "contact",
    name: "Booking",
    href: "#booking",
  },
];

function PremiumRentalGrillLandingContent() {
  const { theme, toggleTheme } = useTheme();

  const [scrolled, setScrolled] = useState(false);

  const { featuredProduct, products } = usePage<LandingPageProps>().props;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`
        min-h-screen overflow-hidden transition-all duration-500
        ${theme === "dark"
          ? "bg-[#0F0F10] text-white"
          : "bg-gradient-to-br from-[#fff7ed] via-[#fffaf5] to-[#ffe7c2] text-zinc-900"
        }
      `}
    >
      <AmbientBackground theme={theme} />

      <Navbar
        theme={theme}
        scrolled={scrolled}
        navItems={navItems}
        onToggleTheme={toggleTheme}
        cartItems={cartItems}
      />

      <main>
        <section id="home">
          <HeroSection theme={theme} featuredProduct={featuredProduct} />
        </section>

        <FeatureSection theme={theme} />

        <section id="products">
          <ProductSection theme={theme} products={products} />
        </section>

        <FaqSection theme={theme} faqs={faqs} />

        <section id="booking">
          <CtaSection theme={theme} />
        </section>
      </main>

      <MobileNavbar theme={theme} items={navItems} />

      <div className="h-24 xl:hidden" />

      <Footer theme={theme} />

      {/* <FloatingWhatsApp /> */}
    </div>
  );
}

export default function PremiumRentalGrillLandingPage() {
  return (
    <AppProvider>
      <PremiumRentalGrillLandingContent />
    </AppProvider>
  );
}