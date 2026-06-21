import React, { useState, useEffect } from 'react';
import {
  FileText,
  FileImage,
  Percent,
  Maximize2,
  Crop,
  RotateCw,
  Image as ImageIcon,
  FileCheck,
  Share2,
  RefreshCw,
  Scissors,
  Stamp,
  ShieldAlert,
  Sparkles,
  Palette,
  Grid,
  Columns,
  Grid3X3,
  Tv,
  Languages,
  ShieldCheck,
  Zap,
  Star,
  Search,
  ArrowRight,
  Shield,
  HardDrive,
  ChevronRight
} from 'lucide-react';

import { Page, ToolId, Tool } from './types';
import { TOOLS_LIST } from './toolsData';
import Header from './components/Header';
import Footer from './components/Footer';
import JpgCompressor from './components/JpgCompressor';
import ImageResizer from './components/ImageResizer';
import ImageCropper from './components/ImageCropper';
import ToolInterfaces from './components/ToolInterfaces';

// Dynamic Icon Renderer Map Helper
function renderToolIcon(name: string, className = "h-6 w-6") {
  switch (name) {
    case 'FileText': return <FileText className={className} />;
    case 'FileImage': return <FileImage className={className} />;
    case 'Percent': return <Percent className={className} />;
    case 'Maximize2': return <Maximize2 className={className} />;
    case 'Crop': return <Crop className={className} />;
    case 'RotateCw': return <RotateCw className={className} />;
    case 'Image': return <ImageIcon className={className} />;
    case 'FileCheck': return <FileCheck className={className} />;
    case 'Share2': return <Share2 className={className} />;
    case 'RefreshCw': return <RefreshCw className={className} />;
    case 'Scissors': return <Scissors className={className} />;
    case 'Stamp': return <Stamp className={className} />;
    case 'ShieldAlert': return <ShieldAlert className={className} />;
    case 'Sparkles': return <Sparkles className={className} />;
    case 'Palette': return <Palette className={className} />;
    case 'Grid': return <Grid className={className} />;
    case 'Columns': return <Columns className={className} />;
    case 'Grid3X3': return <Grid3X3 className={className} />;
    case 'Tv': return <Tv className={className} />;
    case 'Languages': return <Languages className={className} />;
    default: return <ImageIcon className={className} />;
  }
}

function getCategoryLabel(category: string): string {
  switch (category) {
    case 'convert': return 'Image Conversion';
    case 'compress': return 'Image Compression';
    case 'edit': return 'Image Editing';
    case 'enhance': return 'Image Enhancement';
    case 'organize': return 'Image Organization';
    case 'ocr': return 'OCR & Extraction';
    default: return category;
  }
}

function getCategoryEmoji(category: string): string {
  switch (category) {
    case 'convert': return '🔄';
    case 'compress': return '🗜️';
    case 'edit': return '✂️';
    case 'enhance': return '✨';
    case 'organize': return '📦';
    case 'ocr': return '📝';
    default: return '⚙️';
  }
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [selectedToolId, setSelectedToolId] = useState<ToolId | null>(null);
  const [darkMode, setDarkMode] = useState<boolean>(false);

  // Search and Filter states
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeCategory, setActiveCategory] = useState<string>('all');

  // Load and apply Dark Mode states
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    } else {
      setDarkMode(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    const updated = !darkMode;
    setDarkMode(updated);
    if (updated) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const handleSelectTool = (toolId: ToolId) => {
    setSelectedToolId(toolId);
    setCurrentPage('tool');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Scroll smoothly down to the tools section block
  const scrollToToolsSection = () => {
    const el = document.getElementById('tools-grid-anchor');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Filter tools based on search inputs and chosen categories
  const filteredTools = TOOLS_LIST.filter((tool) => {
    const matchesSearch =
      tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.shortDesc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.category.toLowerCase().includes(searchQuery.toLowerCase());

    if (activeCategory === 'all') {
      return matchesSearch;
    }
    return matchesSearch && tool.category === activeCategory;
  });

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-brand-dark text-gray-800 dark:text-gray-200 transition-colors duration-300">
      
      {/* Premium Sticky Header */}
      <Header
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        setSelectedToolId={setSelectedToolId}
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
      />

      {/* Main Content Areas */}
      <main className="flex-grow">
        
        {currentPage === 'home' && (
          <div className="space-y-16">
            
            {/* HERO SECTION - Modern SaaS Layout */}
            <section
              id="hero-banner"
              className="relative overflow-hidden bg-linear-to-b from-orange-50/70 via-white to-white dark:from-brand-dark-light/50 dark:via-brand-dark dark:to-brand-dark py-20 px-4 sm:px-6 lg:px-8 border-b border-gray-100 dark:border-brand-gray/30"
            >
              {/* Blur Ambient Circles */}
              <div className="absolute top-1/4 left-10 h-72 w-72 rounded-full bg-brand-primary/10 blur-3xl pointer-events-none" />
              <div className="absolute bottom-10 right-10 h-80 w-80 rounded-full bg-orange-600/5 blur-3xl pointer-events-none" />

              <div className="mx-auto max-w-7xl">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                  
                  {/* Left Column: Heading and CTA */}
                  <div className="lg:col-span-7 space-y-6 text-left">
                    <div className="inline-flex items-center gap-2 rounded-full bg-orange-100/60 dark:bg-brand-gray px-3 py-1 text-xs font-semibold text-brand-primary">
                      <Sparkles className="h-3.5 w-3.5" /> 100% Client-Side Local Conversions
                    </div>
                    
                    <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 dark:text-white leading-tight tracking-tight">
                      Best Free Image Tool <span className="text-transparent bg-clip-text bg-linear-to-r from-brand-primary to-orange-600">Online</span>
                    </h1>

                    <p className="text-gray-600 dark:text-gray-300 text-base sm:text-lg max-w-2xl leading-relaxed">
                      Convert, Compress, Resize, Crop, Enhance, Edit and Manage Images with 20 Powerful Free Image Tools. Enjoy SaaS-quality speed directly on your machine—zero signups, infinite files, absolute secrecy.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 pt-2">
                      <button
                        onClick={scrollToToolsSection}
                        id="hero-primary-cta"
                        className="flex items-center justify-center gap-2 rounded-xl bg-brand-primary hover:bg-brand-primary-hover text-white font-bold px-8 py-4 shadow-lg shadow-orange-500/20 hover:shadow-orange-500/30 active:scale-98 transition-all cursor-pointer"
                      >
                        Use Free Tools <ArrowRight className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => {
                          const el = document.getElementById('benefits-section-anchor');
                          if (el) el.scrollIntoView({ behavior: 'smooth' });
                        }}
                        id="hero-secondary-cta"
                        className="flex items-center justify-center gap-2 rounded-xl bg-white dark:bg-brand-gray border border-gray-200 dark:border-brand-gray text-gray-700 dark:text-gray-300 font-bold px-8 py-4 hover:bg-gray-50 dark:hover:bg-brand-dark transition-all cursor-pointer"
                      >
                        Explore Features
                      </button>
                    </div>

                    {/* Simple Statistics Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8 border-t border-gray-150/75 dark:border-brand-gray/30">
                      <div>
                        <span className="block text-2xl font-extrabold text-gray-900 dark:text-white font-display">20+</span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">Image Power Utilities</span>
                      </div>
                      <div>
                        <span className="block text-2xl font-extrabold text-gray-900 dark:text-white font-display">Unlimited</span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">Daily Conversion Caps</span>
                      </div>
                      <div>
                        <span className="block text-2xl font-extrabold text-gray-900 dark:text-white font-display">No Register</span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">1-Click Local Execution</span>
                      </div>
                      <div>
                        <span className="block text-2xl font-extrabold text-gray-900 dark:text-white font-display">Fast Rate</span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">Runs Inside Browser</span>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Visual Mockup Illustration */}
                  <div className="lg:col-span-5 relative flex items-center justify-center">
                    <div className="relative w-full max-w-[420px] aspect-square rounded-3xl bg-linear-to-tr from-brand-primary to-orange-500 p-1.5 shadow-2xl shadow-orange-500/10 animate-float">
                      <div className="h-full w-full rounded-[20px] bg-white dark:bg-brand-dark-light p-6 flex flex-col justify-between">
                        
                        {/* Mock header */}
                        <div className="flex justify-between items-center pb-3 border-b border-gray-100 dark:border-brand-gray/35">
                          <span className="text-xs font-bold text-gray-400 uppercase tracking-widest font-mono">learnwithjulfy.com</span>
                          <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                        </div>

                        {/* Mid visualization */}
                        <div className="space-y-3.5 my-5">
                          <div className="h-10 rounded-lg bg-orange-50/60 dark:bg-brand-gray p-2.5 flex items-center justify-between border border-orange-100/40">
                            <span className="text-xs font-semibold text-brand-primary">JPG compressor engine</span>
                            <span className="text-[11px] font-mono font-bold">92% Saved ✓</span>
                          </div>
                          <div className="h-10 rounded-lg bg-gray-50 dark:bg-brand-gray p-2.5 flex items-center justify-between">
                            <span className="text-xs font-semibold text-gray-600 dark:text-gray-300">EXIF metadata strip</span>
                            <span className="text-[10px] font-mono text-green-500 font-bold">Privacy secure</span>
                          </div>
                          <div className="h-10 rounded-lg bg-gray-50 dark:bg-brand-gray p-2.5 flex items-center justify-between">
                            <span className="text-xs font-semibold text-gray-600 dark:text-gray-300">Local OCR recognition</span>
                            <span className="text-[10px] font-mono text-orange-500 font-bold">Extracting...</span>
                          </div>
                        </div>

                        {/* Visual bottom lock */}
                        <div className="p-3.5 rounded-xl bg-orange-500 text-white text-center text-xs font-bold shadow-md">
                          Processing Pixels Locally
                        </div>

                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </section>

            {/* TRUST BUILDING SECTION */}
            <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 bg-gray-50 dark:bg-brand-dark-light border border-gray-100 dark:border-brand-gray/50 rounded-3xl p-6 md:p-10 text-center sm:text-left">
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 p-2">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-orange-50 dark:bg-brand-dark text-brand-primary shadow-xs">
                    <ShieldCheck className="h-6 w-6" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-display font-bold text-gray-900 dark:text-white text-sm">Secure local execution</h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400 leading-normal">Your files are processed 100% inside your tab memory. Never uploaded offsite.</p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 p-2">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-orange-50 dark:bg-brand-dark text-brand-primary shadow-xs">
                    <HardDrive className="h-6 w-6" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-display font-bold text-gray-900 dark:text-white text-sm">No storage allocations</h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400 leading-normal">Requires zero computer disk installations. Simply leverage modern browser APIs.</p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 p-2">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-orange-50 dark:bg-brand-dark text-brand-primary shadow-xs">
                    <Zap className="h-6 w-6" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-display font-bold text-gray-900 dark:text-white text-sm">High-speed conversions</h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400 leading-normal">Canvas acceleration allows instant batch downloads and pixel re-quantization.</p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 p-2">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-orange-50 dark:bg-brand-dark text-brand-primary shadow-xs">
                    <Star className="h-6 w-6" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-display font-bold text-gray-900 dark:text-white text-sm">100% Free Forever</h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400 leading-normal">No hidden subscription blocks or watermark overlaps. Access full capabilities.</p>
                  </div>
                </div>
              </div>
            </section>

            {/* DEDICATED TOOLS GRID SHOWCASE */}
            <section id="tools-grid-anchor" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-10 scroll-mt-20">
              
              <div className="text-center space-y-4 max-w-3xl mx-auto">
                <h2 className="font-display text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                  Our Free Image Processing Suite
                </h2>
                <div className="h-1 w-24 bg-brand-primary mx-auto rounded" />
                <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base leading-relaxed">
                  Select any tool below to launch our browser-integrated pixel processors. Enjoy high-ratio compressions, crisp format transfers, adjustments, and OCR scans instantly.
                </p>
              </div>

              {/* SEARCH & FILTERS DOCK */}
              <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-gray-50/50 dark:bg-brand-dark-light/50 border border-gray-150 dark:border-brand-gray/40 rounded-2xl p-4">
                
                {/* Search query box */}
                <div className="relative w-full md:max-w-xs">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    id="search-tools-input"
                    placeholder="Search image tools..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full rounded-lg border border-gray-200 dark:border-brand-gray bg-white dark:bg-brand-dark pl-9.5 pr-4 py-2.5 text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:border-brand-primary focus:outline-hidden focus:ring-1 focus:ring-brand-primary"
                  />
                </div>

                {/* Filter tab selectors */}
                <nav className="flex flex-wrap gap-2 w-full md:w-auto mt-2 md:mt-0">
                  {[
                    { id: 'all', label: 'All Tools' },
                    { id: 'convert', label: 'Image Conversion' },
                    { id: 'compress', label: 'Image Compression' },
                    { id: 'edit', label: 'Image Editing' },
                    { id: 'enhance', label: 'Image Enhancement' },
                    { id: 'organize', label: 'Image Organization' },
                    { id: 'ocr', label: 'OCR & Extraction' },
                  ].map((cat) => (
                    <button
                      key={cat.id}
                      id={`category-tab-${cat.id}`}
                      onClick={() => setActiveCategory(cat.id)}
                      className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        activeCategory === cat.id
                          ? 'bg-brand-primary text-white shadow-xs'
                          : 'bg-white dark:bg-brand-dark border border-gray-150 dark:border-brand-gray/50 text-gray-700 dark:text-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </nav>

              </div>

              {/* TOOLS GRID LAYOUT (4 cols desktop, 2 cols tablet, 1 col mobile) */}
              {filteredTools.length === 0 ? (
                <div className="text-center py-20 bg-gray-50/50 rounded-2xl border border-dashed text-gray-500 space-y-2">
                  <span className="block font-semibold">No operational tools match your search criteria.</span>
                  <span className="text-xs">Try selecting 'All Tools' or resetting your input search terms.</span>
                </div>
              ) : (
                <div id="tools-grid-elements" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {filteredTools.map((tool) => (
                    <div
                      key={tool.id}
                      id={`tool-card-${tool.id}`}
                      className="group flex flex-col justify-between bg-white dark:bg-brand-dark-light border border-gray-150 dark:border-brand-gray/50 hover:border-brand-primary dark:hover:border-brand-primary rounded-2xl p-5 shadow-xs hover:shadow-md hover:-translate-y-1 transition-all duration-300"
                    >
                      <div className="space-y-4">
                        {/* Dynamic category dot label */}
                        <div className="flex justify-between items-center">
                          <span className="text-[10px] uppercase font-bold text-brand-primary font-mono select-none flex items-center gap-1 bg-orange-50/70 dark:bg-zinc-800/80 px-2.5 py-1 rounded-md">
                            <span>{getCategoryEmoji(tool.category)}</span>
                            <span>{getCategoryLabel(tool.category)}</span>
                          </span>
                        </div>

                        {/* Centered Icon block */}
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-50 dark:bg-brand-dark text-brand-primary group-hover:bg-brand-primary group-hover:text-white shadow-xs transition-colors duration-300">
                          {renderToolIcon(tool.iconName)}
                        </div>

                        {/* Title & Desc */}
                        <div className="space-y-1">
                          <h4 className="font-display font-bold text-gray-900 dark:text-white leading-tight mt-1 group-hover:text-brand-primary transition-colors">
                            {tool.name}
                          </h4>
                          <p className="text-xs leading-relaxed text-gray-500 dark:text-gray-400">
                            {tool.shortDesc}
                          </p>
                        </div>
                      </div>

                      {/* CTA use block */}
                      <button
                        onClick={() => handleSelectTool(tool.id)}
                        id={`use-tool-btn-${tool.id}`}
                        className="w-full text-center py-2.5 mt-5 text-xs font-bold uppercase rounded-lg bg-gray-50 dark:bg-brand-dark group-hover:bg-brand-primary group-hover:text-white text-gray-700 dark:text-gray-300 shadow-xs group-hover:shadow-md transition-all duration-300 flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        Use Tool Free <ChevronRight className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </section>

            {/* FEATURE SYSTEM SPOTLIGHT SECTION */}
            <section id="benefits-section-anchor" className="scroll-mt-20" />

            {/* BRAND NETWORK SECTION - ECOSYSTEM INTEGRATION */}
            <section id="brand-network-ecosystem" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 bg-linear-to-r from-orange-50/10 via-orange-50/40 to-transparent dark:from-brand-dark-light/10 dark:via-brand-gray/10 dark:to-transparent border-t border-b border-gray-100 dark:border-brand-gray/40 rounded-3xl">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                <div className="lg:col-span-5 space-y-6">
                  <div className="inline-flex items-center gap-1.5 rounded-full bg-orange-100/60 dark:bg-brand-gray px-3 py-1 text-xs font-semibold text-brand-primary">
                    <span className="flex h-2 w-2 rounded-full bg-brand-primary animate-pulse" />
                    LearnWithJulfy Brand Network
                  </div>
                  <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white leading-tight">
                    Explore LearnWithJulfy Ecosystem
                  </h2>
                  <p className="text-sm md:text-base text-gray-650 dark:text-gray-450 leading-relaxed font-sans">
                    LearnWithJulfy is building a growing ecosystem of educational resources and free digital tools. Explore our flagship educational platform designed for AHSEC Class 12 students and our free image processing platform.
                  </p>
                </div>
                
                <div className="lg:col-span-1" />

                <div className="lg:col-span-6">
                  <div className="relative group overflow-hidden rounded-2xl border border-orange-100 dark:border-brand-gray/50 bg-white dark:bg-brand-dark-light p-6 md:p-8 shadow-lg hover:shadow-xl transition-all duration-300">
                    <div className="absolute top-0 right-0 h-24 w-24 bg-brand-primary/10 rounded-full blur-2xl pointer-events-none" />
                    <div className="absolute top-0 left-0 h-1 bg-brand-primary w-full group-hover:scale-x-105 transition-transform duration-300" />
                    
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <span className="text-[10px] font-mono tracking-widest font-extrabold text-brand-primary uppercase">Flagship Platform</span>
                        <h3 className="font-display text-xl font-bold text-gray-950 dark:text-white hover:text-brand-primary transition-colors">
                          LearnWithJulfy Platinum Ranker
                        </h3>
                      </div>

                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-gray-600 dark:text-gray-300">
                        <li className="flex items-center gap-2">
                          <span className="h-1.5 w-1.5 rounded-full bg-brand-primary shrink-0" />
                          <span>AHSEC Class 12 Education</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="h-1.5 w-1.5 rounded-full bg-brand-primary shrink-0" />
                          <span>Daily Study Notes</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="h-1.5 w-1.5 rounded-full bg-brand-primary shrink-0" />
                          <span>MCQ Bank</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="h-1.5 w-1.5 rounded-full bg-brand-primary shrink-0" />
                          <span>Mock Tests</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="h-1.5 w-1.5 rounded-full bg-brand-primary shrink-0" />
                          <span>Video Classes</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="h-1.5 w-1.5 rounded-full bg-brand-primary shrink-0" />
                          <span>Board Preparation Resources</span>
                        </li>
                      </ul>

                      <div className="pt-2">
                        <a
                          href="https://learnwithjulfy-platinum-ranker-6x12.vercel.app/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center gap-2 rounded-lg bg-brand-primary hover:bg-brand-primary-hover text-white font-bold text-sm px-6 py-3 shadow-md hover:shadow-lg transition-transform duration-300 hover:scale-[1.03]"
                          id="ecosystem-cta-visit-ranker"
                        >
                          Visit Platform <ArrowRight className="h-4 w-4" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

          </div>
        )}

        {/* ACTIVE JPG COMPRESSOR INTERACTIVE VIEW */}
        {currentPage === 'tool' && selectedToolId === 'jpg-compressor' && (
          <JpgCompressor
            onGoBack={() => {
              setSelectedToolId(null);
              setCurrentPage('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {/* ACTIVE IMAGE RESIZER INTERACTIVE VIEW */}
        {currentPage === 'tool' && selectedToolId === 'image-resizer' && (
          <ImageResizer
            onGoBack={() => {
              setSelectedToolId(null);
              setCurrentPage('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {/* ACTIVE IMAGE CROpper INTERACTIVE VIEW */}
        {currentPage === 'tool' && selectedToolId === 'image-cropper' && (
          <ImageCropper
            onGoBack={() => {
              setSelectedToolId(null);
              setCurrentPage('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {/* ACTIVE GENERAL WORKSPACE MULTIPLEXED SUITE TOOLS */}
        {currentPage === 'tool' && selectedToolId && selectedToolId !== 'jpg-compressor' && selectedToolId !== 'image-resizer' && selectedToolId !== 'image-cropper' && (
          <ToolInterfaces
            toolId={selectedToolId}
            onGoBack={() => {
              setSelectedToolId(null);
              setCurrentPage('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

      </main>

      {/* Identical Interactive Responsive Footer */}
      <Footer setCurrentPage={setCurrentPage} setSelectedToolId={setSelectedToolId} />

    </div>
  );
}
