import { Head } from "@inertiajs/react";
import { useEffect, useState } from "react";

import AmbientBackground from "@/components/landing/ambient-background";
import CtaSection from "@/components/landing/cta-section";
import FaqSection from "@/components/landing/faq-section";
import FeatureSection from "@/components/landing/feature-section";
import FloatingWhatsApp from "@/components/landing/floating-whatsApp";
import Footer from "@/components/landing/footer";
import HeroSection from "@/components/landing/hero-section";
import MobileBottomNavigation from "@/components/landing/mobile-bottom-navigation";
import Navbar from "@/components/landing/navbar";
import PricingSection from "@/components/landing/pricing-section";
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

const desktopNavItems: LandingNavItem[] = [
  {
    name: "Features",
    href: "#features",
  },
  {
    name: "Pricing",
    href: "#pricing",
  },
  {
    name: "FAQ",
    href: "#faq",
  },
];

const mobileNavItems: LandingNavItem[] = [
  {
    label: "Home",
    href: "#",
  },
  {
    label: "Features",
    href: "#features",
  },
  {
    label: "Pricing",
    href: "#pricing",
  },
  {
    label: "FAQ",
    href: "#faq",
  },
];

const features = [
  "Premium Equipment",
  "Fast Delivery",
  "Free Setup",
  "Modern Experience",
];

export default function PremiumRentalGrillLandingPage() {
  const [theme, setTheme] = useState<ThemeMode>("dark");
  const [scrolled, setScrolled] = useState(false);

  const toggleTheme = () => {
    setTheme((currentTheme) => (currentTheme === "dark" ? "light" : "dark"));
  };


  useEffect(() => {
    localStorage.setItem("theme", theme);

    if (theme === "dark") {
      return document.documentElement.classList.add("dark");
    }

    document.documentElement.classList.remove("dark");
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
      <Head title="GrillHaus" />

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
          navItems={desktopNavItems}
          onToggleTheme={toggleTheme}
        />

        <HeroSection theme={theme} />

        <FeatureSection theme={theme} features={features} />

        <PricingSection theme={theme} packages={packages} />

        <FaqSection theme={theme} faqs={faqs} />

        <CtaSection theme={theme} />

        <MobileBottomNavigation theme={theme} items={mobileNavItems} />

        <div className="h-24 xl:hidden" />

        <Footer theme={theme} />

        <FloatingWhatsApp />
      </div>
    </>
  );
}