"use client";

import Image from "next/image";
import Link from "next/link";

const testimonials = [
  {
    id: 1,
    name: "Ayşe K.",
    role: "Düzenli Katılımcı",
    content:
      "Anlık Plan sayesinde şehirde yeni taşındığım dönemde birçok arkadaş edindim. Quiz Nightlar favorim!",
    image: "/images/testimonial-1.jpg",
  },
  {
    id: 2,
    name: "Mehmet Y.",
    role: "6 Aylık Üye",
    content:
      "Fake düğün etkinliğinde tanıştığım insanlarla hala görüşüyoruz. Hayatımda katıldığım en eğlenceli organizasyondu.",
    image: "/images/testimonial-2.jpg",
  },
  {
    id: 3,
    name: "Zeynep A.",
    role: "Yeni Katılımcı",
    content:
      "İlk kez katıldığım Speed Meeting etkinliğinde kendimi çok rahat hissettim. Herkes çok sıcakkanlı ve samimiydi.",
    image: "/images/testimonial-3.jpg",
  },
];

const CommunitySection = () => {
  return (
    <section className="section bg-white">
      <div className="container-custom">
        {/* Community Groups */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* WhatsApp Group */}
          <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-2xl p-8 text-white flex flex-col md:flex-row items-center gap-6">
            <div className="w-24 h-24 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="48"
                height="48"
                fill="currentColor"
                viewBox="0 0 16 16">
                <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z" />
              </svg>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-2">WhatsApp Grubumuz</h3>
              <p className="mb-4">
                Etkinlik duyuruları ve günlük sohbetler için WhatsApp grubumuza
                katılın.
              </p>
              <a
                href="https://whatsapp.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-green-600 font-medium py-2 px-6 rounded-full inline-block hover:bg-opacity-90 transition-all shadow-sm hover:shadow-md">
                Gruba Katıl
              </a>
            </div>
          </div>

          {/* Telegram Group */}
          <div className="bg-gradient-to-r from-blue-400 to-blue-500 rounded-2xl p-8 text-white flex flex-col md:flex-row items-center gap-6">
            <div className="w-24 h-24 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="48"
                height="48"
                fill="currentColor"
                viewBox="0 0 16 16">
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.287 5.906c-.778.324-2.334.994-4.666 2.01-.378.15-.577.298-.595.442-.03.243.275.339.69.47l.175.055c.408.133.958.288 1.243.294.26.006.549-.1.868-.32 2.179-1.471 3.304-2.214 3.374-2.23.05-.012.12-.026.166.016.047.041.042.12.037.141-.03.129-1.227 1.241-1.846 1.817-.193.18-.33.307-.358.336a8.154 8.154 0 0 1-.188.186c-.38.366-.664.64.015 1.088.327.216.589.393.85.571.284.194.568.387.936.629.093.06.183.125.27.187.331.236.63.448.997.414.214-.02.435-.22.547-.82.265-1.417.786-4.486.906-5.751a1.426 1.426 0 0 0-.013-.315.337.337 0 0 0-.114-.217.526.526 0 0 0-.31-.093c-.3.005-.763.166-2.984 1.09z" />
              </svg>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-2">Telegram Kanalımız</h3>
              <p className="mb-4">
                Daha geniş topluluk tartışmaları ve etkinlik fotoğrafları için
                Telegram kanalımıza katılın.
              </p>
              <a
                href="https://telegram.org"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-blue-500 font-medium py-2 px-6 rounded-full inline-block hover:bg-opacity-90 transition-all shadow-sm hover:shadow-md">
                Kanala Katıl
              </a>
            </div>
          </div>
        </div>

        {/* Testimonials */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold mb-8 text-center">
            Katılımcı Deneyimleri
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="bg-light rounded-2xl p-6 relative shadow-sm hover:shadow-md transition-all">
                {/* Quote icon */}
                <div className="absolute top-4 right-4 text-primary opacity-20">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    fill="currentColor"
                    viewBox="0 0 16 16">
                    <path d="M12 12a1 1 0 0 0 1-1V8.558a1 1 0 0 0-1-1h-1.388c0-.351.021-.703.062-1.054.062-.372.166-.703.31-.992.145-.29.331-.517.559-.683.227-.186.516-.279.868-.279V3c-.579 0-1.085.124-1.52.372a3.322 3.322 0 0 0-1.085.992 4.92 4.92 0 0 0-.62 1.458A7.712 7.712 0 0 0 9 7.558V11a1 1 0 0 0 1 1h2Zm-6 0a1 1 0 0 0 1-1V8.558a1 1 0 0 0-1-1H4.612c0-.351.021-.703.062-1.054.062-.372.166-.703.31-.992.145-.29.331-.517.559-.683.227-.186.516-.279.868-.279V3c-.579 0-1.085.124-1.52.372a3.322 3.322 0 0 0-1.085.992 4.92 4.92 0 0 0-.62 1.458A7.712 7.712 0 0 0 3 7.558V11a1 1 0 0 0 1 1h2Z" />
                  </svg>
                </div>

                <p className="text-gray-600 mb-6 leading-relaxed">
                  {testimonial.content}
                </p>

                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full overflow-hidden relative mr-4">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold">{testimonial.name}</h4>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-8">
          <Link
            href="/topluluk"
            className="btn-primary shadow-md hover:shadow-lg">
            Topluluğumuzu Keşfet
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CommunitySection;
