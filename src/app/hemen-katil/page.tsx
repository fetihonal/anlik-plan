import { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Hemen Katıl | Anlık Plan',
  description: 'Anlık Plan topluluğuna katılın, etkinliklere erişin ve yeni arkadaşlar edinin.',
};

export default function JoinNowPage() {
  return (
    <>
      <Navbar />
      <main>
        <section className="pt-24 pb-16 bg-light">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold mb-6">Anlık Plan'a Katıl</h1>
                <p className="text-lg text-gray-600 mb-8">
                  Şehrin en eğlenceli etkinliklerine katılmak, yeni insanlarla tanışmak ve unutulmaz deneyimler yaşamak için hemen üye ol!
                </p>
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mr-4 flex-shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-1">Ücretsiz Üyelik</h3>
                      <p className="text-gray-600">
                        Anlık Plan'a üyelik tamamen ücretsizdir. Sadece katıldığın etkinlikler için ödeme yaparsın.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center mr-4 flex-shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-1">Özel Etkinlik Erişimi</h3>
                      <p className="text-gray-600">
                        Üyelere özel etkinliklere erişim ve erken rezervasyon imkanı.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mr-4 flex-shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-1">Topluluk Ağı</h3>
                      <p className="text-gray-600">
                        5000+ üyeli WhatsApp ve Telegram gruplarımıza erişim.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-8 rounded-2xl shadow-lg">
                <h2 className="text-2xl font-bold mb-6 text-center">Üye Ol</h2>
                <form className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                        Ad
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                        placeholder="Adınız"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                        Soyad
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                        placeholder="Soyadınız"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      E-posta
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                      placeholder="ornek@email.com"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Telefon
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                      placeholder="05XX XXX XX XX"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                      Şifre
                    </label>
                    <input
                      type="password"
                      id="password"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                      placeholder="Şifreniz (en az 8 karakter)"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="birthdate" className="block text-sm font-medium text-gray-700 mb-1">
                      Doğum Tarihi
                    </label>
                    <input
                      type="date"
                      id="birthdate"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="interests" className="block text-sm font-medium text-gray-700 mb-1">
                      İlgi Alanları
                    </label>
                    <select
                      id="interests"
                      multiple
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                      size={4}
                    >
                      <option value="coffee">Kahve Buluşmaları</option>
                      <option value="food">Yemek Etkinlikleri</option>
                      <option value="outdoor">Doğa Aktiviteleri</option>
                      <option value="sports">Spor Etkinlikleri</option>
                      <option value="music">Müzik Etkinlikleri</option>
                      <option value="art">Sanat & Kültür</option>
                      <option value="games">Oyun Geceleri</option>
                      <option value="tech">Teknoloji</option>
                    </select>
                    <p className="text-xs text-gray-500 mt-1">Birden fazla seçim için Ctrl tuşunu basılı tutun.</p>
                  </div>
                  
                  <div className="flex items-start">
                    <input
                      type="checkbox"
                      id="terms"
                      className="mt-1 h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                      required
                    />
                    <label htmlFor="terms" className="ml-2 block text-sm text-gray-600">
                      <span>Anlık Plan'ın </span>
                      <a href="#" className="text-primary hover:underline">kullanım koşullarını</a>
                      <span> ve </span>
                      <a href="#" className="text-primary hover:underline">gizlilik politikasını</a>
                      <span> kabul ediyorum.</span>
                    </label>
                  </div>
                  
                  <button
                    type="submit"
                    className="w-full bg-primary hover:bg-primary-dark text-white font-medium py-3 px-4 rounded-lg transition duration-300"
                  >
                    Üye Ol
                  </button>
                </form>
                
                <div className="mt-6 text-center">
                  <p className="text-gray-600">
                    Zaten üye misin? <a href="#" className="text-primary font-medium hover:underline">Giriş Yap</a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <section className="py-16 bg-white">
          <div className="container-custom">
            <h2 className="text-3xl font-bold mb-12 text-center">Üyelerimizin Deneyimleri</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-light p-6 rounded-2xl">
                <div className="flex items-center mb-4">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4">
                    <Image
                      src="/images/testimonial-1.jpg"
                      alt="Testimonial"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold">Ayşe K.</h4>
                    <p className="text-sm text-gray-500">6 aydır üye</p>
                  </div>
                </div>
                <p className="text-gray-600">
                  "İstanbul'a yeni taşındığımda hiç arkadaşım yoktu. Anlık Plan sayesinde hem şehri keşfettim hem de harika insanlarla tanıştım. Artık her hafta sonu dolu dolu geçiyor!"
                </p>
              </div>
              
              <div className="bg-light p-6 rounded-2xl">
                <div className="flex items-center mb-4">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4">
                    <Image
                      src="/images/testimonial-2.jpg"
                      alt="Testimonial"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold">Mehmet B.</h4>
                    <p className="text-sm text-gray-500">1 yıldır üye</p>
                  </div>
                </div>
                <p className="text-gray-600">
                  "Sosyal çevrem genişledi, yeni hobiler edindim ve şimdi en yakın arkadaşlarım Anlık Plan etkinliklerinde tanıştığım insanlar. Keşke daha önce katılsaydım!"
                </p>
              </div>
              
              <div className="bg-light p-6 rounded-2xl">
                <div className="flex items-center mb-4">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4">
                    <Image
                      src="/images/testimonial-3.jpg"
                      alt="Testimonial"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold">Deniz T.</h4>
                    <p className="text-sm text-gray-500">3 aydır üye</p>
                  </div>
                </div>
                <p className="text-gray-600">
                  "İş hayatı dışında sosyalleşmek için harika bir platform. Etkinliklerdeki samimi ortam ve organizasyon kalitesi gerçekten çok iyi. Her etkinlikten sonra yeni arkadaşlarla ayrılıyorum."
                </p>
              </div>
            </div>
          </div>
        </section>
        
        <section className="py-16 bg-gradient-to-r from-primary to-secondary text-white">
          <div className="container-custom text-center">
            <h2 className="text-3xl font-bold mb-6">Hemen Anlık Plan'a Katıl!</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Şehrin en eğlenceli etkinliklerini kaçırma, yeni arkadaşlar edin ve hayatını renklendir.
            </p>
            <a 
              href="#top" 
              className="inline-block bg-white text-primary hover:bg-light font-medium py-3 px-8 rounded-lg transition duration-300"
            >
              Ücretsiz Üye Ol
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
