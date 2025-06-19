'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container-custom flex justify-between items-center py-4">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <span className="font-display text-2xl font-bold text-primary">Anlık<span className="text-accent">Plan</span></span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <Link href="/" className="font-medium hover:text-primary transition-colors">
            Ana Sayfa
          </Link>
          <Link href="/etkinlikler" className="font-medium hover:text-primary transition-colors">
            Etkinlikler
          </Link>
          <Link href="/topluluk" className="font-medium hover:text-primary transition-colors">
            Topluluk
          </Link>
          <Link href="/hakkimizda" className="font-medium hover:text-primary transition-colors">
            Hakkımızda
          </Link>
          <Link href="/sponsorluk" className="font-medium hover:text-primary transition-colors">
            Sponsorluk
          </Link>
          <Link href="/iletisim" className="font-medium hover:text-primary transition-colors">
            İletişim
          </Link>
          <Link href="/etkinlikler" className="btn-primary">
            Hemen Katıl
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-dark focus:outline-none"
          onClick={toggleMenu}
        >
          {isOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-white py-4 px-4">
          <div className="flex flex-col space-y-4">
            <Link href="/" className="font-medium hover:text-primary transition-colors py-2">
              Ana Sayfa
            </Link>
            <Link href="/etkinlikler" className="font-medium hover:text-primary transition-colors py-2">
              Etkinlikler
            </Link>
            <Link href="/topluluk" className="font-medium hover:text-primary transition-colors py-2">
              Topluluk
            </Link>
            <Link href="/hakkimizda" className="font-medium hover:text-primary transition-colors py-2">
              Hakkımızda
            </Link>
            <Link href="/sponsorluk" className="font-medium hover:text-primary transition-colors py-2">
              Sponsorluk
            </Link>
            <Link href="/iletisim" className="font-medium hover:text-primary transition-colors py-2">
              İletişim
            </Link>
            <Link href="/etkinlikler" className="btn-primary text-center">
              Hemen Katıl
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
