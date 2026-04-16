import Navbar from "@/components/landing/Navbar";
import HeroSection from "@/components/landing/HeroSection";
import WhySysdeHero from "@/components/landing/WhySysdeHero";
import PuzzleModules from "@/components/landing/PuzzleModules";
import TwoWorlds from "@/components/landing/TwoWorlds";
import Pricing from "@/components/landing/Pricing";
import WhySysde from "@/components/landing/WhySysde";
import RfpSection from "@/components/landing/rfp/RfpSection";
import FloatingChat from "@/components/landing/FloatingChat";
import Footer from "@/components/landing/Footer";

const Index = () => (
  <div className="min-h-screen">
    <Navbar />
    <HeroSection />
    <WhySysdeHero />
    <PuzzleModules />
    <Pricing />
    <TwoWorlds />
    <WhySysde />
    <RfpSection />
    <Footer />
    <FloatingChat />
  </div>
);

export default Index;
