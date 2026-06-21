import React, { useState, useEffect } from 'react';
import { Sun, Moon, Menu, X, Image as ImageIcon } from 'lucide-react';
import { Page } from '../types';

interface HeaderProps {
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
  setSelectedToolId: (id: any) => void;
  darkMode: boolean;
  toggleDarkMode: () => void;
}

export default function Header({
  currentPage,
  setCurrentPage,
  setSelectedToolId,
  darkMode,
  toggleDarkMode,
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (page: Page) => {
    setCurrentPage(page);
    setSelectedToolId(null);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks: { label: string; page: Page }[] = [
    { label: 'Home', page: 'home' },
  ];

  return (
    <header
      id="main-header"
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? 'bg-white/90 dark:bg-brand-dark/90 backdrop-blur-md shadow-md border-b border-gray-100 dark:border-brand-gray/50'
          : 'bg-white dark:bg-brand-dark border-b border-transparent'
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* SVG Logo Design */}
          <div
            id="site-logo"
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => handleNavClick('home')}
          >
            <div className="relative flex h-11 w-11 shrink-0 items-center justify-center group-hover:scale-105 transition-transform duration-300">
              {/* Detailed Circular Brand Logo SVG */}
              <svg
                width="44"
                height="44"
                viewBox="0 0 200 200"
                className="drop-shadow-md"
              >
                {/* Outer dark background */}
                <circle cx="100" cy="100" r="96" fill="#0A0A0A" />
                
                {/* Thin inner glowing border with yellow-orange-red gradient */}
                <circle cx="100" cy="100" r="92" fill="none" stroke="url(#logoGradient)" strokeWidth="6" />
                
                {/* Define Gradients */}
                <defs>
                  <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FBBF24" />
                    <stop offset="50%" stopColor="#EA580C" />
                    <stop offset="100%" stopColor="#DC2626" />
                  </linearGradient>
                  <linearGradient id="bulbGold" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#FFE082" />
                    <stop offset="100%" stopColor="#FFB300" />
                  </linearGradient>
                </defs>

                {/* Lightbulb glowing rays */}
                <g stroke="#FBBF24" strokeWidth="3" strokeLinecap="round">
                  <line x1="100" y1="20" x2="100" y2="12" />
                  <line x1="82" y1="25" x2="76" y2="18" />
                  <line x1="118" y1="25" x2="124" y2="18" />
                  <line x1="70" y1="36" x2="62" y2="33" />
                  <line x1="130" y1="36" x2="138" y2="33" />
                </g>

                {/* Glowing Lightbulb */}
                <path
                  d="M90,44 C90,34 110,34 110,44 C110,49 106,52 104,55 L104,59 L96,59 L96,55 C94,52 90,49 90,44 Z"
                  fill="url(#bulbGold)"
                  stroke="#FF8F00"
                  strokeWidth="1.5"
                />
                <path d="M97,44 L100,40 L103,44" fill="none" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" />
                <rect x="97" y="59" width="6" height="2.5" rx="1" fill="#90A4AE" />
                <rect x="98" y="61.5" width="4" height="2" rx="1" fill="#78909C" />

                {/* Open Book */}
                <path
                  d="M100,75 C90,68 70,68 54,73 C52,73.5 50,75 50,77 L50,91 C68,86 88,86 100,91 Z"
                  fill="#FFFFFF"
                  stroke="#EA580C"
                  strokeWidth="1.5"
                />
                <path
                  d="M100,75 C110,68 130,68 146,73 C148,73.5 150,75 150,77 L150,91 C132,86 112,86 100,91 Z"
                  fill="#FFFFFF"
                  stroke="#EA580C"
                  strokeWidth="1.5"
                />
                <path d="M57,78 C68,74 84,74 95,78" fill="none" stroke="#B0BEC5" strokeWidth="1" />
                <path d="M57,83 C68,79 84,79 95,83" fill="none" stroke="#B0BEC5" strokeWidth="1" />
                <path d="M143,78 C132,74 116,74 105,78" fill="none" stroke="#B0BEC5" strokeWidth="1" />
                <path d="M143,83 C132,79 116,79 105,83" fill="none" stroke="#B0BEC5" strokeWidth="1" />

                {/* LWJ Letters */}
                <text
                  x="48"
                  y="126"
                  fontFamily="system-ui, -apple-system, sans-serif"
                  fontWeight="900"
                  fontSize="44"
                  fill="#FFFFFF"
                  transform="rotate(-5 48 126)"
                >
                  L
                </text>
                <text
                  x="80"
                  y="128"
                  fontFamily="system-ui, -apple-system, sans-serif"
                  fontWeight="900"
                  fontSize="48"
                  fill="#F59E0B"
                >
                  W
                </text>
                <text
                  x="128"
                  y="126"
                  fontFamily="system-ui, -apple-system, sans-serif"
                  fontWeight="900"
                  fontSize="44"
                  fill="#FFFFFF"
                  transform="rotate(5 128 126)"
                >
                  J
                </text>

                {/* red footer banner ribbon */}
                <path
                  d="M33,142 C70,136 130,136 167,142 L163,153 C130,148 70,148 37,153 Z"
                  fill="#DC2626"
                />
                <text
                  x="100"
                  y="148.5"
                  fontFamily="system-ui, sans-serif"
                  fontWeight="bold"
                  fontSize="9"
                  letterSpacing="0.5"
                  fill="#FFFFFF"
                  textAnchor="middle"
                >
                  LEARN • GROW • SUCCEED
                </text>

                {/* Play Button Icon */}
                <rect x="85" y="160" width="30" height="20" rx="6" fill="#FF0000" />
                <polygon points="97,166 107,170 97,174" fill="#FFFFFF" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="font-display text-lg font-bold tracking-tight text-gray-900 dark:text-white leading-none">
                LearnWithJulfy
              </span>
              <span className="text-[10px] font-medium tracking-widest text-brand-primary uppercase">
                Free Image Tools
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <button
                key={link.page}
                id={`nav-${link.page}`}
                onClick={() => handleNavClick(link.page)}
                className={`text-sm font-medium transition-colors hover:text-brand-primary ${
                  currentPage === link.page
                    ? 'text-brand-primary underline underline-offset-4 decoration-2'
                    : 'text-gray-600 dark:text-gray-300'
                }`}
              >
                {link.label}
              </button>
            ))}
            <a
              href="https://learnwithjulfy-platinum-ranker-6x12.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-semibold transition-colors text-orange-600 dark:text-brand-primary hover:opacity-80"
              id="desktop-nav-platinum-ranker"
            >
              Platinum Ranker
            </a>
          </nav>

          {/* Action buttons */}
          <div className="flex items-center gap-3">
            {/* Dark Mode Toggle */}
            <button
              id="theme-toggler"
              onClick={toggleDarkMode}
              className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 dark:bg-brand-gray text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-brand-dark transition-colors"
              aria-label="Toggle Dark Mode"
            >
              {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>

            {/* Mobile menu trigger */}
            <button
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 dark:bg-brand-gray text-gray-700 dark:text-gray-300 hover:bg-gray-200"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {mobileMenuOpen && (
        <div id="mobile-nav-menu" className="md:hidden border-t border-gray-100 dark:border-brand-gray bg-white dark:bg-brand-dark px-4 py-4 space-y-2 shadow-inner">
          {navLinks.map((link) => (
            <button
              key={link.page}
              id={`mobile-nav-${link.page}`}
              onClick={() => handleNavClick(link.page)}
              className={`block w-full text-left px-4 py-3 rounded-lg text-base font-medium transition-all ${
                currentPage === link.page
                  ? 'bg-orange-50 dark:bg-brand-gray text-brand-primary'
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50'
              }`}
            >
              {link.label}
            </button>
          ))}
          <a
            href="https://learnwithjulfy-platinum-ranker-6x12.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMobileMenuOpen(false)}
            className="block w-full text-left px-4 py-3 rounded-lg text-base font-semibold text-orange-600 dark:text-brand-primary hover:bg-gray-50 dark:hover:bg-brand-gray/30 transition-all font-sans"
            id="mobile-nav-platinum-ranker"
          >
            Platinum Ranker
          </a>
        </div>
      )}
    </header>
  );
}
