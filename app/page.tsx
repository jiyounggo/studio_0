import MainVisual from "@/components/MainVisual";
import NeedsSection from "@/components/NeedsSection";
import AboutStudioSection from "@/components/AboutStudioSection";
import ReviewSection from "@/components/ReviewSection";
import PortfolioSection from "@/components/PortfolioSection";
import ContactSection from "@/components/ContactSection";
import ServiceStorySection from "@/components/ServiceStorySection";

export default function HomePage() {
  return (
    <main>
      <MainVisual />

      <AboutStudioSection />
      <NeedsSection />
      {/* <ServiceStorySection /> */}

      <ReviewSection />
      <PortfolioSection />
      <ContactSection />
    </main>
  );
}
