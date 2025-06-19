'use client';

import Link from 'next/link';
import Image from 'next/image';

const HeroSection = () => {
  return (
    <section className="relative bg-gradient-to-r from-primary to-accent text-white overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{ 
          backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.4\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
          backgroundSize: '60px 60px'
        }}></div>
      </div>
      
      <div className="container-custom relative z-10 py-20 md:py-32 flex flex-col md:flex-row items-center">
        {/* Hero Content */}
        <div className="md:w-1/2 text-center md:text-left mb-10 md:mb-0">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Hayatın en güzel planları anlık çıkar.
          </h1>
          <p className="text-lg md:text-xl mb-8 text-white/90 max-w-lg">
            Anlık Plan; eğlenceli aktiviteler, quiz geceleri, temalı partiler, fake düğünler ve daha fazlasıyla yeni insanlarla tanışabileceğin sosyal bir topluluk.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <Link href="/etkinlikler" className="btn-secondary">
              Hemen Katıl
            </Link>
            <Link href="/etkinlikler" className="btn-outline border-white text-white hover:bg-white hover:text-primary">
              Yaklaşan Etkinlikler
            </Link>
          </div>
        </div>

        {/* Hero Image */}
        <div className="md:w-1/2 relative">
          <div className="relative h-[300px] md:h-[400px] w-full">
            <Image 
              src="/images/hero-image.jpg" 
              alt="Anlık Plan Etkinlik" 
              fill
              className="object-cover rounded-2xl shadow-xl"
              style={{ objectPosition: 'center' }}
              priority
            />
          </div>
          
          {/* Floating elements */}
          <div className="absolute top-5 -left-5 bg-white p-3 rounded-xl shadow-lg transform -rotate-6">
            <div className="text-primary font-bold">Quiz Night</div>
            <div className="text-sm text-gray-600">Her Çarşamba</div>
          </div>
          
          <div className="absolute bottom-10 -right-5 bg-white p-3 rounded-xl shadow-lg transform rotate-6">
            <div className="text-accent font-bold">Fake Düğün</div>
            <div className="text-sm text-gray-600">Ayda bir kez</div>
          </div>
        </div>
      </div>
      
      {/* Wave separator */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden">
        <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-[60px] text-light">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" fill="currentColor"></path>
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;
