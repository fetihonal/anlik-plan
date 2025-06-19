import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CommunitySection from '@/components/CommunitySection';

export const metadata = {
  title: 'Topluluk | Anlık Plan',
  description: 'Anlık Plan topluluğuna katılın, WhatsApp ve Telegram gruplarımıza dahil olun, üye deneyimlerini okuyun.',
};

export default function CommunityPage() {
  return (
    <>
      <Navbar />
      <main>
        <div className="pt-24 pb-12 bg-light">
          <div className="container-custom">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">Topluluğumuz</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto text-center">
              Anlık Plan topluluğuna katılın, WhatsApp ve Telegram gruplarımıza dahil olun ve üye deneyimlerini okuyun.
            </p>
          </div>
        </div>
        <CommunitySection />
      </main>
      <Footer />
    </>
  );
}
