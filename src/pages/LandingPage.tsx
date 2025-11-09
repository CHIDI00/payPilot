import PaypilotDashboardShowcase from "../components/landing/PaypilotDashboardShowcase";
import HeroSection from "../components/landing/HeroSection";
import LandingHeader from "../components/landing/LandingHeader";
import Cards from "@/components/landing/Cards";
import Footer from "@/components/landing/Footer";

export default function LandingPage() {
  return (
    <div className="relative w-screen min-h-screen bg-gradient-to-b from-[#f5f3ff] via-[#ede9fe] to-[#e9d5ff]">
      <LandingHeader />
      <HeroSection />
      <PaypilotDashboardShowcase />
      <Cards />
      <Footer />
    </div>
  );
}
