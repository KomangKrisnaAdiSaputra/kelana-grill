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
import PricingSection from "@/components/landing/pricing-section";
import AppProvider from "@/contexts/app-provider";
import { useTheme } from "@/contexts/theme-context";
import { produk } from "@/routes/landing";
import type {
  LandingFaqItem,
  LandingNavItem,
  LandingPackageItem,
} from "@/types";
import type { ProductItem } from "@/types/product";

type LandingPageProps = {
  featuredProduct?: ProductItem | null;
};

const packages: LandingPackageItem[] = [
  {
    title: "Basic BBQ",
    price: "299K",
    desc: "Perfect untuk BBQ kecil bersama teman.",
    features: ["Portable grill", "Free setup", "2 jam penggunaan"],
  },
  {
    title: "Family Night",
    price: "599K",
    desc: "Pilihan paling populer untuk keluarga.",
    features: ["Premium grill", "Free delivery", "Charcoal included"],
    highlight: true,
  },
  {
    title: "Premium Event",
    price: "1.2JT",
    desc: "Untuk gathering dan event yang lebih besar.",
    features: ["Large grill", "Full setup", "Support team included"],
  },
];

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

const features = [
  "Premium Equipment",
  "Fast Delivery",
  "Free Setup",
  "Modern Experience",
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

  const { featuredProduct } = usePage<LandingPageProps>().props;

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

        <FeatureSection theme={theme} features={features} />

        <section id="products">
          <PricingSection theme={theme} packages={packages} />
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