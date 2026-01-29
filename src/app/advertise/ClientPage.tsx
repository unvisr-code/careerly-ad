"use client";

import { ContactModalProvider } from "@/lib/useContactModal";
import Navbar from "@/components/advertise/Navbar";
import HeroSection from "@/components/advertise/HeroSection";
import StatsSection from "@/components/advertise/StatsSection";
import SocialProofSection from "@/components/advertise/SocialProofSection";
import WhyCareerlySection from "@/components/advertise/WhyCareerlySection";
import ProductLineup from "@/components/advertise/ProductLineup";
import InlineCTA from "@/components/advertise/InlineCTA";
import ExposureSection from "@/components/advertise/ExposureSection";
import FAQSection from "@/components/advertise/FAQSection";
import CTABanner from "@/components/advertise/CTABanner";
import FooterSection from "@/components/advertise/FooterSection";
import ContactFormModal from "@/components/advertise/ContactFormModal";
import MobileStickyBar from "@/components/advertise/MobileStickyBar";

export default function ClientPage() {
  return (
    <ContactModalProvider>
      <Navbar />
      <main>
        <HeroSection />
        <StatsSection />
        <SocialProofSection />
        <WhyCareerlySection />
        <ProductLineup />
        <InlineCTA />
        <ExposureSection />
        <FAQSection />
        <CTABanner />
      </main>
      <FooterSection />
      <ContactFormModal />
      <MobileStickyBar />
    </ContactModalProvider>
  );
}
