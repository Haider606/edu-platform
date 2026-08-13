import { useEffect } from "react";
import Hero from "../../components/home/Hero";
import TrustedCompanies from "../../components/home/TrustedCompanies";
import Categories from "../../components/home/Categories";
import FeaturedCourses from "../../components/home/FeaturedCourses";
import WhyChooseUs from "../../components/home/WhyChooseUs";
import AILearning from "../../components/home/AILearning";
import LearningJourney from "../../components/home/LearningJourney";
import InternshipSection from "../../components/home/InternshipSection";
import Testimonials from "../../components/home/Testimonials";
import Stats from "../../components/home/Stats";
import Pricing from "../../components/home/Pricing";
import FAQ from "../../components/home/FAQ";
import FinalCTA from "../../components/home/FinalCTA";
import Footer from "../../components/common/Footer";

export default function Home() {
  useEffect(() => {
    document.title = "EduPlatform — Learn Skills. Build Your Future.";
  }, []);

  return (
    <main className="min-h-screen overflow-hidden bg-[#050508] text-slate-50">
      <Hero />
      <TrustedCompanies />
      <Categories />
      <FeaturedCourses />
      <WhyChooseUs />
      <AILearning />
      <LearningJourney />
      <InternshipSection />
      <Testimonials />
      <Stats />
      <Pricing />
      <FAQ />
      <FinalCTA />
      <Footer />
    </main>
  );
}
