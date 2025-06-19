import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import EventFormats from "@/components/EventFormats";
import UpcomingEvents from "@/components/UpcomingEvents";
import CommunitySection from "@/components/CommunitySection";
import SponsorshipSection from "@/components/SponsorshipSection";
import ContactSection from "@/components/ContactSection";
import AboutSection from "@/components/AboutSection";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <UpcomingEvents />
        <EventFormats />
        <CommunitySection />
        <AboutSection />
        <SponsorshipSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
