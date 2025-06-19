'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

// Sample upcoming events data
const upcomingEvents = [
  {
    id: 1,
    title: 'Quiz Night: Film ve Diziler',
    date: '28 Haziran 2025',
    time: '19:30',
    location: 'Kadıköy Moda - Kafeka',
    image: '/images/quiz-night-event.jpg',
    category: 'Quiz Night',
    price: '150 TL',
    spots: 12,
  },
  {
    id: 2,
    title: 'Yaz Temalı Fake Düğün',
    date: '5 Temmuz 2025',
    time: '20:00',
    location: 'Beşiktaş - Feriye',
    image: '/images/fake-wedding-event.jpg',
    category: 'Fake Düğün',
    price: '250 TL',
    spots: 8,
  },
  {
    id: 3,
    title: '80\'ler Temalı Parti',
    date: '12 Temmuz 2025',
    time: '21:00',
    location: 'Beyoğlu - Babylon',
    image: '/images/themed-party-event.jpg',
    category: 'Temalı Partiler',
    price: '200 TL',
    spots: 15,
  },
  {
    id: 4,
    title: 'Yeni Kariyer Speed Meeting',
    date: '19 Temmuz 2025',
    time: '18:00',
    location: 'Levent - WorkHub',
    image: '/images/speed-meeting-event.jpg',
    category: 'Speed Meeting',
    price: '180 TL',
    spots: 20,
  },
];

const UpcomingEvents = () => {
  return (
    <section className="section bg-light">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-2">Yaklaşan Etkinlikler</h2>
            <p className="text-gray-600">Yerini şimdiden ayırt!</p>
          </div>
          <Link href="/etkinlikler" className="btn-outline mt-4 md:mt-0">
            Tüm Etkinlikler
          </Link>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {upcomingEvents.map((event) => (
            <div key={event.id} className="card group">
              <div className="relative h-48 overflow-hidden">
                <div className="absolute top-0 left-0 bg-primary text-white z-10 py-1 px-3 rounded-br-lg">
                  {event.category}
                </div>
                <Image
                  src={event.image}
                  alt={event.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="p-5">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-lg">{event.title}</h3>
                  <span className="text-primary font-medium">{event.price}</span>
                </div>
                <div className="flex items-center text-gray-500 mb-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className="text-sm">{event.date} - {event.time}</span>
                </div>
                <div className="flex items-center text-gray-500 mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="text-sm">{event.location}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-accent">Son {event.spots} kontenjan</span>
                  <Link href={`/etkinlikler/${event.id}`} className="text-primary font-medium hover:underline">
                    Detaylar →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UpcomingEvents;
