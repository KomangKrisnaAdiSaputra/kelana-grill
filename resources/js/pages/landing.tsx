import { usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";

import AmbientBackground from "@/components/landing/ambient-background";
import CtaSection from "@/components/landing/cta-section";
import FaqSection from "@/components/landing/faq-section";
import FeatureSection from "@/components/landing/feature-section";
import FloatingWhatsApp from "@/components/landing/floating-whatsApp";
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
    question: "Apakah sudah termasuk arang?",
    answer: "Ya, beberapa paket sudah termasuk arang dan perlengkapan dasar BBQ.",
  },
  {
    question: "Area delivery dimana saja?",
    answer: "Kami melayani area kota dan sekitarnya dengan pengiriman cepat.",
  },
  {
    question: "Bisa booking mendadak?",
    answer: "Bisa, selama stok dan jadwal masih tersedia.",
  },
  {
    question: "Apakah ada deposit?",
    answer: "Beberapa paket membutuhkan deposit yang akan dikembalikan.",
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

      <FloatingWhatsApp />
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