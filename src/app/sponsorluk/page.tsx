import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SponsorshipSection from '@/components/SponsorshipSection';

export const metadata = {
  title: 'Sponsorluk | Anlık Plan',
  description: 'Anlık Plan\'ın sponsorluk ve mekan ortaklığı fırsatları hakkında bilgi edinin.',
};

export default function SponsorshipPage() {
  return (
    <>
      <Navbar />
      <main>
        <div className="pt-24 pb-12 bg-light">
          <div className="container-custom">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">Sponsorluk</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto text-center">
              Anlık Plan'ın sponsorluk ve mekan ortaklığı fırsatları hakkında bilgi edinin.
            </p>
          </div>
        </div>
        <SponsorshipSection />
      </main>
      <Footer />
    </>
  );
}
