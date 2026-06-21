import React, { useState } from 'react';
import { Page, ToolId } from '../types';

interface FooterProps {
  setCurrentPage: (page: Page) => void;
  setSelectedToolId: (id: ToolId | null) => void;
}

export default function Footer({ setCurrentPage, setSelectedToolId }: FooterProps) {
  const [emailValue, setEmailValue] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleLinkClick = (page: Page) => {
    setCurrentPage(page);
    setSelectedToolId(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleToolShortcutClick = (toolId: ToolId) => {
    setCurrentPage('tool');
    setSelectedToolId(toolId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailValue.trim()) {
      setSubscribed(true);
      setTimeout(() => {
        setEmailValue('');
        setSubscribed(false);
      }, 4000);
    }
  };

  return (
    <footer
      id="main-footer"
      className="relative mt-auto border-t-[3px] border-t-brand-primary bg-linear-to-b from-white to-gray-50 dark:from-brand-dark dark:to-brand-dark-light text-gray-700 dark:text-gray-300 transition-colors duration-300"
    >
      {/* Decorative Blur Ambient Glow */}
      <div className="absolute -top-12 left-1/2 -translate-x-1/2 h-24 w-72 rounded-full bg-brand-primary/10 blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Column 1: Brand & Social */}
          <div className="flex flex-col space-y-4">
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => handleLinkClick('home')}>
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-br from-brand-primary to-orange-600 shadow-md">
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-white"
                >
                  <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"></path>
                  <path d="M14 2v4a2 2 0 0 0 2 2h4"></path>
                  <path d="m10 13 2 2 4-4"></path>
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="font-display text-base font-bold tracking-tight text-gray-950 dark:text-white">
                  LearnWithJulfy
                </span>
                <span className="text-[10px] font-medium tracking-widest text-brand-primary uppercase">
                  Free Image Tools
                </span>
              </div>
            </div>

            <p className="text-sm leading-relaxed text-gray-500 dark:text-gray-400">
              LearnWithJulfy Free Image Tools is part of the LearnWithJulfy ecosystem, which also includes LearnWithJulfy Platinum Ranker, a platform dedicated to helping AHSEC students through notes, MCQs, mock tests, and educational resources.
            </p>

            {/* Custom Hover Social Icons with Specific Hover Hex Colors */}
            <div className="flex items-center gap-3 pt-2">
              {/* Facebook */}
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LearnWithJulfy Facebook Page"
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 dark:bg-brand-gray text-gray-600 dark:text-gray-300 hover:text-white dark:hover:text-white transition-all duration-300 hover:-translate-y-1 hover:scale-110 hover:shadow-md"
                style={
                  {
                    '--hover-bg': '#1877F2',
                  } as React.CSSProperties
                }
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#1877F2';
                  e.currentTarget.style.borderColor = '#1877F2';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '';
                  e.currentTarget.style.borderColor = '';
                }}
              >
                <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z" />
                </svg>
              </a>

              {/* Instagram */}
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LearnWithJulfy Instagram Page"
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 dark:bg-brand-gray text-gray-600 dark:text-gray-300 hover:text-white dark:hover:text-white transition-all duration-300 hover:-translate-y-1 hover:scale-110 hover:shadow-md"
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#E4405F';
                  e.currentTarget.style.borderColor = '#E4405F';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '';
                  e.currentTarget.style.borderColor = '';
                }}
              >
                <svg className="h-5 w-5 stroke-current fill-none" strokeWidth="2" viewBox="0 0 24 24">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>

              {/* X */}
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LearnWithJulfy X Account"
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 dark:bg-brand-gray text-gray-600 dark:text-gray-300 hover:text-white dark:hover:text-white transition-all duration-300 hover:-translate-y-1 hover:scale-110 hover:shadow-md"
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#000000';
                  e.currentTarget.style.borderColor = '#000000';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '';
                  e.currentTarget.style.borderColor = '';
                }}
              >
                <svg className="h-4.5 w-4.5 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>

              {/* YouTube */}
              <a
                href="https://www.youtube.com/channel/UCUQBU0hKJLCt82wwyEnf8Fw"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LearnWithJulfy YouTube Channel"
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 dark:bg-brand-gray text-gray-600 dark:text-gray-300 hover:text-white dark:hover:text-white transition-all duration-300 hover:-translate-y-1 hover:scale-110 hover:shadow-md"
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#FF0000';
                  e.currentTarget.style.borderColor = '#FF0000';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '';
                  e.currentTarget.style.borderColor = '';
                }}
              >
                <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.518 3.5 12 3.5 12 3.5s-7.518 0-9.388.553a3.003 3.003 0 0 0-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 0 0 2.11 2.11c1.87.553 9.388.553 9.388.553s7.518 0 9.388-.553a3.003 3.003 0 0 0 2.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="flex flex-col space-y-4">
            <h3 className="font-display font-semibold text-gray-900 dark:text-white tracking-wide text-sm uppercase">
              Quick Navigation
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  onClick={() => {
                    const el = document.getElementById('hero-banner');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="transition-transform duration-300 hover:translate-x-1.5 hover:text-brand-primary text-gray-500 dark:text-gray-400 cursor-pointer"
                >
                  Hero Banner
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    const el = document.getElementById('benefits-section-anchor');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="transition-transform duration-300 hover:translate-x-1.5 hover:text-brand-primary text-gray-500 dark:text-gray-400 cursor-pointer"
                >
                  Feature Spotlights
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    const el = document.getElementById('tools-grid-anchor');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="transition-transform duration-300 hover:translate-x-1.5 hover:text-brand-primary text-gray-500 dark:text-gray-400 cursor-pointer"
                >
                  Mega Tools Suite
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    const el = document.getElementById('brand-network-ecosystem');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="transition-transform duration-300 hover:translate-x-1.5 hover:text-brand-primary text-gray-500 dark:text-gray-400 cursor-pointer"
                >
                  Ecosystem Network
                </button>
              </li>
              <li>
                <a
                  href="https://learnwithjulfy-platinum-ranker-6x12.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block transition-transform duration-300 hover:translate-x-1.5 hover:text-brand-primary text-gray-500 dark:text-gray-400 font-sans"
                >
                  Platinum Ranker Academy ↗
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Popular Tools */}
          <div className="flex flex-col space-y-4">
            <h3 className="font-display font-semibold text-gray-900 dark:text-white tracking-wide text-sm uppercase">
              Popular Shortcuts
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  onClick={() => handleToolShortcutClick('jpg-to-pdf')}
                  className="transition-transform duration-300 hover:translate-x-1.5 hover:text-brand-primary text-gray-500 dark:text-gray-400"
                >
                  JPG to PDF
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleToolShortcutClick('jpg-compressor')}
                  className="transition-transform duration-300 hover:translate-x-1.5 hover:text-brand-primary text-gray-500 dark:text-gray-400"
                >
                  Image Compressor
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleToolShortcutClick('image-resizer')}
                  className="transition-transform duration-300 hover:translate-x-1.5 hover:text-brand-primary text-gray-500 dark:text-gray-400"
                >
                  Image Resizer
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleToolShortcutClick('jpg-to-png')}
                  className="transition-transform duration-300 hover:translate-x-1.5 hover:text-brand-primary text-gray-500 dark:text-gray-400"
                >
                  JPG to PNG Converter
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleToolShortcutClick('ocr-text-extractor')}
                  className="transition-transform duration-300 hover:translate-x-1.5 hover:text-brand-primary text-gray-500 dark:text-gray-400"
                >
                  OCR Text Extractor
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div className="flex flex-col space-y-4">
            <h3 className="font-display font-semibold text-gray-900 dark:text-white tracking-wide text-sm uppercase">
              Subscribe Newsletter
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
              Stay in touch with premium code releases, speed performance enhancements, and brand updates. No spam.
            </p>

            <form onSubmit={handleNewsletterSubmit} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  id="newsletter-email"
                  placeholder="name@example.com"
                  required
                  value={emailValue}
                  onChange={(e) => setEmailValue(e.target.value)}
                  className="w-full rounded-lg border border-gray-200 dark:border-brand-gray bg-white dark:bg-brand-gray/50 px-3.5 py-2.5 text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:border-brand-primary focus:outline-hidden focus:ring-1 focus:ring-brand-primary"
                />
              </div>

              <button
                type="submit"
                id="newsletter-submit-btn"
                className="w-full flex items-center justify-center gap-2 rounded-lg bg-brand-primary hover:bg-brand-primary-hover text-white py-2.5 text-sm font-semibold transition-all hover:shadow-lg hover:shadow-orange-500/20 active:scale-98"
              >
                {subscribed ? 'Awesome! Subscribed ✓' : 'Subscribe Now'}
              </button>
            </form>
          </div>
        </div>

        {/* Legal Signatures */}
        <div className="mt-12 border-t border-gray-100 dark:border-brand-gray/40 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400 dark:text-gray-500">
          <p>© {new Date().getFullYear()} LearnWithJulfy Free Image Tools. All Rights Reserved.</p>
          <div className="flex gap-4">
            <button onClick={() => handleLinkClick('privacy')} className="hover:text-brand-primary transition-colors">
              Privacy Terms
            </button>
            <span>•</span>
            <button onClick={() => handleLinkClick('disclaimer')} className="hover:text-brand-primary transition-colors">
              Service Disclaimer
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
