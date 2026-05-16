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
import { produk } from "@/routes/landing";
import type {
  LandingFaqItem,
  LandingNavItem,
  LandingPackageItem,
  ThemeMode,
} from "@/types";

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
    name: "About",
    href: "#"
  },
  {
    name: "Produk",
    href: produk.url()
  },
  {
    name: "Booking",
    href: "#"
  }
];

export default function PremiumRentalGrillLandingPage() {
  const [theme, setTheme] = useState<ThemeMode>(() => {
    if (typeof window === "undefined") {
      return "light";
    }

    const savedTheme = localStorage.getItem("theme") as ThemeMode | null;

    return savedTheme === "dark" || savedTheme === "light" ? savedTheme : "light";
  });
  const [scrolled, setScrolled] = useState(false);

  const toggleTheme = () => {
    setTheme((currentTheme) => (currentTheme === "dark" ? "light" : "dark"));
  };

  useEffect(() => {
    localStorage.setItem("theme", theme);

    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
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

        <HeroSection theme={theme} />

        <FeatureSection theme={theme} features={features} />

        <PricingSection theme={theme} packages={packages} />

        <FaqSection theme={theme} faqs={faqs} />

        <CtaSection theme={theme} />

        <MobileNavbar theme={theme} items={navItems} />

        <div className="h-24 xl:hidden" />

        <Footer theme={theme} />

        <FloatingWhatsApp />
      </div>
    </>
  );
}