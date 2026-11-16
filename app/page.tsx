import AboutPreview from "@/components/home/AboutPreview";
import ContactCta from "@/components/home/ContactCta";
import Hero from "@/components/home/Hero";
import Showcase from "@/components/home/Showcase";
import TendersSection from "@/components/home/TendersSection";
import VideoPreview from "@/components/home/VideoPreview";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <AboutPreview />
        <WhyChooseUs />
        <Showcase />
        <VideoPreview />
        <ContactCta />
        <TendersSection />
      </main>
      <Footer />
    </>
  );
}
