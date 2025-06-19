import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AboutSection from '@/components/AboutSection';

export const metadata = {
  title: 'Hakkımızda | Anlık Plan',
  description: 'Anlık Plan\'ın hikayesi, değerleri ve arkasındaki ekip hakkında bilgi edinin.',
};

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main>
        <div className="pt-24 pb-12 bg-light">
          <div className="container-custom">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">Hakkımızda</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto text-center">
              Anlık Plan'ın hikayesi, değerleri ve arkasındaki ekip hakkında bilgi edinin.
            </p>
          </div>
        </div>
        <AboutSection />
      </main>
      <Footer />
    </>
  );
}
