import { usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";

import AmbientBackground from "@/components/landing/ambient-background";
import CtaSection from "@/components/landing/cta-section";
import FaqSection from "@/components/landing/faq-section";
import FeatureSection from "@/components/landing/feature-section";
import Footer from "@/components/landing/footer";
import HeroSection from "@/components/landing/hero-section";
import MobileNavbar from "@/components/landing/mobile-navbar";
import Navbar from "@/components/landing/navbar";
import ProductSection from "@/components/landing/product-section";
import AppProvider from "@/contexts/app-provider";
import { useTheme } from "@/contexts/theme-context";
import type { Product } from "@/types/product";

export type LandingPageProps = {
  featuredProduct: Product | null;
  products: Product[];
};


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
        onToggleTheme={toggleTheme}
        cartItems={[]}
      />

      <main>
        <section id="home">
          <HeroSection theme={theme} featuredProduct={featuredProduct} />
        </section>

        <FeatureSection theme={theme} />

        <section id="products">
          <ProductSection theme={theme} products={products} />
        </section>

        <FaqSection theme={theme} />

        <section id="booking">
          <CtaSection theme={theme} />
        </section>
      </main>

      <MobileNavbar theme={theme} />

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