import Hero from "../../components/home/Hero";
import TrustedCompanies from "../../components/home/TrustedCompanies";
import Stats from "../../components/home/Stats";
import Categories from "../../components/home/Categories";
import FeaturedCourses from "../../components/home/FeaturedCourses";
import WhyChooseUs from "../../components/home/WhyChooseUs";
import AILearning from "../../components/home/AILearning";
import LearningJourney from "../../components/home/LearningJourney";
import InternshipSection from "../../components/home/InternshipSection";
import Testimonials from "../../components/home/Testimonials";
import Pricing from "../../components/home/Pricing";
import FAQ from "../../components/home/FAQ";
import FinalCTA from "../../components/home/FinalCTA";
import Footer from "../../components/common/Footer";

export default function Home() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[#050508] text-white">
      {/* Hero */}
      <Hero />

      {/* Trust */}
      <TrustedCompanies />

      {/* Statistics */}
      <Stats />

      {/* Categories */}
      <Categories />

      {/* Featured Courses */}
      <FeaturedCourses />

      {/* Why Choose Us */}
      <WhyChooseUs />

      {/* AI Learning */}
      <AILearning />

      {/* Learning Journey */}
      <LearningJourney />

      {/* Internships */}
      <InternshipSection />

      {/* Testimonials */}
      <Testimonials />

      {/* Pricing */}
      <Pricing />

      {/* FAQ */}
      <FAQ />

      {/* Final CTA */}
      <FinalCTA />

      {/* Footer */}
      <Footer />
    </main>
  );
}