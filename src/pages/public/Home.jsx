import Hero from "../../components/home/Hero";
import Stats from "../../components/home/Stats";
import Features from "../../components/home/Features";
import CoursesSection from "../../components/home/CoursesSection";
import LearningProcess from "../../components/home/LearningProcess";
import WhyChooseUs from "../../components/home/WhyChooseUs";
import AIFeatures from "../../components/home/AIFeatures";
import Internship from "../../components/home/Internship";
import Testimonials from "../../components/home/Testimonials";
import Pricing from "../../components/home/Pricing";
import FAQ from "../../components/home/FAQ";
import CTA from "../../components/home/CTA";

export default function Home() {
  return (
    <>
      <Hero />
      <Stats />
      <Features />
      <CoursesSection />
      <LearningProcess />
      <WhyChooseUs />
      <AIFeatures />
      <Internship />
      <Testimonials />
      <Pricing />
      <FAQ />
      <CTA />
    </>
  );
}