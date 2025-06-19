'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

// Define event format types
const eventFormats = [
  {
    id: 'quiz-night',
    title: 'Quiz Night',
    description: 'Eğlenceli sorular ve takım çalışması ile bilginizi test edin. Kazanan takıma sürpriz ödüller!',
    image: '/images/quiz-night.jpg',
  },
  {
    id: 'fake-dugun',
    title: 'Fake Düğün',
    description: 'Gerçek düğün atmosferinde eğlenceli bir gece. Gelin, damat, nikah, pasta kesimi ve daha fazlası!',
    image: '/images/fake-wedding.jpg',
  },
  {
    id: 'temali-partiler',
    title: 'Temalı Partiler',
    description: '80\'ler, retro, film karakterleri ve daha birçok temada kostümlü partiler.',
    image: '/images/themed-party.jpg',
  },
  {
    id: 'speed-meeting',
    title: 'Speed Meeting',
    description: 'Kısa süreli sohbetlerle yeni insanlarla tanışın. Arkadaşlık ve networking için ideal!',
    image: '/images/speed-meeting.jpg',
  },
  {
    id: 'workshop',
    title: 'Workshop',
    description: 'Yeni beceriler öğrenin ve yaratıcılığınızı keşfedin. Sanat, yemek ve el işi atölyeleri.',
    image: '/images/workshop.jpg',
  },
  {
    id: 'standup-openmic',
    title: 'Stand-Up & Open Mic',
    description: 'Yeteneklerinizi gösterin veya komedi performanslarını izleyin. Herkes için açık sahne!',
    image: '/images/standup.jpg',
  },
  {
    id: 'gizli-konseptler',
    title: 'Gizli Konseptler',
    description: 'Sürpriz etkinlikler ve gizli konseptler. Ne olacağını bilmeden katılın ve şaşırın!',
    image: '/images/secret-concept.jpg',
  },
];

const EventFormats = () => {
  const [activeFormat, setActiveFormat] = useState(eventFormats[0]);

  return (
    <section className="section bg-light">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Etkinlik Formatlarımız</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Her hafta farklı formatlarda düzenlediğimiz etkinliklerle yeni insanlarla tanışın ve eğlenceli vakit geçirin.
          </p>
        </div>

        {/* Event Format Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {eventFormats.map((format) => (
            <button
              key={format.id}
              onClick={() => setActiveFormat(format)}
              className={`px-4 py-2 rounded-full text-sm md:text-base transition-all duration-300 ${
                activeFormat.id === format.id
                  ? 'bg-primary text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              {format.title}
            </button>
          ))}
        </div>

        {/* Active Format Display */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/2 relative h-[300px]">
              <Image
                src={activeFormat.image}
                alt={activeFormat.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="md:w-1/2 p-8 flex flex-col justify-center">
              <h3 className="text-2xl font-bold mb-4">{activeFormat.title}</h3>
              <p className="text-gray-600 mb-6">{activeFormat.description}</p>
              <Link href={`/etkinlikler#${activeFormat.id}`} className="btn-primary self-start">
                Detaylı Bilgi
              </Link>
            </div>
          </div>
        </div>

        {/* All Formats Grid (Mobile) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {eventFormats.map((format) => (
            <div key={format.id} className="card">
              <div className="relative h-48">
                <Image
                  src={format.image}
                  alt={format.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="font-bold text-xl mb-2">{format.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{format.description}</p>
                <Link href={`/etkinlikler#${format.id}`} className="text-primary font-medium hover:underline">
                  Detaylı Bilgi →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EventFormats;
