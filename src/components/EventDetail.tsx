'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface EventDetailProps {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  price: string;
  category: string;
  spotsLeft: number;
  totalSpots: number;
  description: string;
  images: string[];
  host: {
    name: string;
    image: string;
    bio: string;
  };
  includedItems?: string[];
  requirements?: string[];
  faq?: Array<{ question: string; answer: string }>;
}

const EventDetail = ({
  id,
  title,
  date,
  time,
  location,
  price,
  category,
  spotsLeft,
  totalSpots,
  description,
  images,
  host,
  includedItems = [],
  requirements = [],
  faq = [],
}: EventDetailProps) => {
  const [activeImage, setActiveImage] = useState(0);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleReservation = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would submit to a backend
    setShowModal(true);
  };

  return (
    <section className="py-12 bg-white">
      <div className="container-custom">
        {/* Breadcrumb */}
        <div className="mb-6">
          <div className="flex items-center text-sm text-gray-500">
            <Link href="/" className="hover:text-primary">Ana Sayfa</Link>
            <span className="mx-2">/</span>
            <Link href="/etkinlikler" className="hover:text-primary">Etkinlikler</Link>
            <span className="mx-2">/</span>
            <span className="text-primary">{title}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Left Column - Images and Details */}
          <div className="lg:col-span-2">
            {/* Image Gallery */}
            <div className="mb-8">
              <div className="relative w-full h-[400px] md:h-[500px] rounded-2xl overflow-hidden mb-4">
                <Image 
                  src={images[activeImage]} 
                  alt={title} 
                  fill
                  className="object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-primary text-white px-3 py-1 rounded-full text-sm font-medium">
                    {category}
                  </span>
                </div>
              </div>
              
              {/* Thumbnail Gallery */}
              {images.length > 1 && (
                <div className="flex gap-3 overflow-x-auto pb-2">
                  {images.map((img, index) => (
                    <button 
                      key={index}
                      onClick={() => setActiveImage(index)}
                      className={`relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 ${
                        activeImage === index ? 'ring-2 ring-primary' : ''
                      }`}
                    >
                      <Image 
                        src={img} 
                        alt={`${title} - görsel ${index + 1}`} 
                        fill
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Event Description */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Etkinlik Hakkında</h2>
              <div className="prose max-w-none text-gray-600">
                {showFullDescription ? (
                  <p>{description}</p>
                ) : (
                  <p>{description.slice(0, 300)}...</p>
                )}
                {description.length > 300 && (
                  <button 
                    onClick={() => setShowFullDescription(!showFullDescription)}
                    className="text-primary font-medium hover:underline mt-2"
                  >
                    {showFullDescription ? 'Daha az göster' : 'Devamını oku'}
                  </button>
                )}
              </div>
            </div>

            {/* What's Included */}
            {includedItems.length > 0 && (
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Neler Dahil?</h2>
                <ul className="space-y-2">
                  {includedItems.map((item, index) => (
                    <li key={index} className="flex items-start">
                      <svg className="h-5 w-5 text-primary mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-600">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Requirements */}
            {requirements.length > 0 && (
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Gereksinimler</h2>
                <ul className="space-y-2">
                  {requirements.map((req, index) => (
                    <li key={index} className="flex items-start">
                      <svg className="h-5 w-5 text-secondary mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-gray-600">{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Host Info */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Etkinlik Organizatörü</h2>
              <div className="flex items-center bg-light p-4 rounded-xl">
                <div className="relative w-16 h-16 rounded-full overflow-hidden mr-4">
                  <Image 
                    src={host.image} 
                    alt={host.name} 
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-bold text-lg">{host.name}</h3>
                  <p className="text-gray-600 text-sm">{host.bio}</p>
                </div>
              </div>
            </div>

            {/* FAQ */}
            {faq.length > 0 && (
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Sıkça Sorulan Sorular</h2>
                <div className="space-y-4">
                  {faq.map((item, index) => (
                    <details key={index} className="bg-light rounded-xl p-4">
                      <summary className="font-medium cursor-pointer">{item.question}</summary>
                      <p className="mt-2 text-gray-600">{item.answer}</p>
                    </details>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Reservation Card */}
          <div>
            <div className="bg-light rounded-2xl p-6 sticky top-24">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">{price}</h2>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  spotsLeft < 5 ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'
                }`}>
                  {spotsLeft} kişilik yer kaldı
                </span>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex items-center">
                  <svg className="h-5 w-5 text-gray-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className="text-gray-600">{date}</span>
                </div>
                <div className="flex items-center">
                  <svg className="h-5 w-5 text-gray-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-gray-600">{time}</span>
                </div>
                <div className="flex items-center">
                  <svg className="h-5 w-5 text-gray-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="text-gray-600">{location}</span>
                </div>
              </div>

              <form onSubmit={handleReservation}>
                <div className="mb-4">
                  <label htmlFor="participants" className="block text-sm font-medium text-gray-700 mb-1">
                    Katılımcı Sayısı
                  </label>
                  <select 
                    id="participants" 
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                    defaultValue="1"
                  >
                    {[...Array(Math.min(spotsLeft, 5))].map((_, i) => (
                      <option key={i} value={i + 1}>
                        {i + 1} {i === 0 ? 'kişi' : 'kişi'}
                      </option>
                    ))}
                  </select>
                </div>
                
                <button 
                  type="submit"
                  className="w-full bg-primary hover:bg-primary-dark text-white font-medium py-3 px-4 rounded-lg transition duration-300"
                >
                  Rezervasyon Yap
                </button>
              </form>

              <div className="mt-4 text-center text-sm text-gray-500">
                Ödeme etkinlik günü yapılacaktır.
              </div>

              <div className="mt-6 flex justify-center space-x-4">
                <button className="flex items-center text-gray-600 hover:text-primary">
                  <svg className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                  </svg>
                  Paylaş
                </button>
                <button className="flex items-center text-gray-600 hover:text-primary">
                  <svg className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  Kaydet
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Reservation Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-2">Rezervasyon Alındı!</h3>
              <p className="text-gray-600 mb-6">
                Rezervasyonunuz başarıyla alındı. Etkinlik detayları e-posta adresinize gönderilecektir.
              </p>
              <button
                onClick={() => setShowModal(false)}
                className="w-full bg-primary hover:bg-primary-dark text-white font-medium py-3 px-4 rounded-lg transition duration-300"
              >
                Tamam
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default EventDetail;
