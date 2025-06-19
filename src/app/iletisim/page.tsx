import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ContactSection from '@/components/ContactSection';

export const metadata = {
  title: 'İletişim | Anlık Plan',
  description: 'Anlık Plan ile iletişime geçin, sorularınızı sorun ve geri bildirimlerinizi paylaşın.',
};

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main>
        <div className="pt-24 pb-12 bg-light">
          <div className="container-custom">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">İletişim</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto text-center">
              Anlık Plan ile iletişime geçin, sorularınızı sorun ve geri bildirimlerinizi paylaşın.
            </p>
          </div>
        </div>
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
