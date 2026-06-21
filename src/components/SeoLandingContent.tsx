import React, { useState } from 'react';
import { ChevronDown, ChevronUp, CheckCircle, Shield, Globe, Compass, Cpu, Zap, Star, UserCheck } from 'lucide-react';

/* =========================================================================
   FAQ COMPONENT - SECTION 10
   ========================================================================= */
export function FAQComponent() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      q: 'Is LearnWithJulfy Free Image Tools completely free to use?',
      a: 'Yes, LearnWithJulfy Free Image Tools is 100% free with absolutely no hidden costs, subscriptions, registration requirements, or email locks. Every single one of our 20 visual-processing tools operates with full feature access and unlimited daily operations. We optimize and compile our tools directly inside your browser container, which lets us host the services efficiently without charging users or setting limits on file quantities.'
    },
    {
      q: 'Do you upload my private images or PDF files to a remote server?',
      a: 'We never upload, copy, or stream your personal files or visual records to external servers. This platform uses standard HTML5 FileReaders, localized canvas buffers, and offline compilation libraries inside your host computer environment. All operations (compressions, resizing, formats conversion, EXIF stripping) are executed on your CPU in a sandbox. Once you close your browser tab, your visual data disappears from your memory completely.'
    },
    {
      q: 'Does compressing a JPG image reduce its visual quality?',
      a: 'Our JPG Compressor utilizes advanced quantization mathematics to eliminate visually redundant pixel details while fully preserving sharp lines, gradients, and clarity. By adjusting our compressor quality slider (typically around 75% to 85%), you can shrink image file sizes by up to 90% with zero noticeable impact on human vision. This provides high-quality graphics for web usage.'
    },
    {
      q: 'Can I convert multiple images at once using your files merger?',
      a: 'Yes! Selected tools like the JPG to PDF Converter, Collage Maker, and Image Merger allow you to upload multiple files simultaneously. You can easily coordinate, stack, align space markers, and compile multiple resources into a single cohesive download file instantly in your browser.'
    },
    {
      q: 'Why should I convert my JPG and PNG images to WebP format?',
      a: 'WebP is a modern next-generation image format pioneered to optimize online page speed. Converting legacy JPG/PNG images to WebP shrinks file dimensions by an average of 30% compared to typical lossy formats without degrading overall display aesthetics. Search engines like Google actively reward websites displaying modern formats with higher SEO search index rankings due to faster Core Web Vitals.'
    },
    {
      q: 'How does the Chroma-Key Background Remover tool operate locally?',
      a: 'Our Background Remover operates direct color-range transparency filters inside your local browser. Once you select a reference color using our visual spotter, the tool parses individual pixel channels on a canvas thread, replacing matching RGB color zones with a transparent alpha channel threshold. Supported with custom sliders for Tolerance and Smoothness, you can erase solid background colors with high precision without a server.'
    },
    {
      q: 'Will using the EXIF Metadata Strip Tool affect my photo resolution?',
      a: 'Not at all. The EXIF Metadata Strip Tool reads the pristine pixel indices of your image, paints them onto a fresh Canvas element free of any metadata headers, and downloads the result as a new clean file. This completely strips hidden GPS locations, timestamps, and camera parameters while preserving 100% of your original resolution and color coordinates.'
    },
    {
      q: 'How does the OCR Text Extractor tool read texts from images without a server?',
      a: 'We integrate an optimized local version of Tesseract.js, a professional Optical Character Recognition library compiled to run entirely on client-side JS. It downloads language-trained datasets once on your browser and processes your visual glyphs locally on your system CPU. This extracts plain texts with no server requests.'
    },
    {
      q: 'Are there any constraints on input file size or image dimensions?',
      a: 'Because our operations run locally on your host environment, size limits depend entirely on your computer hardware (CPU and RAM). Our application successfully processes images with resolutions up to 8K. For extreme volume requirements, we recommend closing extra background browser tabs to free up system memory.'
    },
    {
      q: 'Can I use the images generated on this platform for commercial projects?',
      a: 'We assert zero copyrights or licenses over the images you process here. Every visual output downloaded remains your exclusive intellectual asset. You are fully authorized to deploy, print, publish, sell, or commercialize any outputs processed through our platform with total freedom.'
    }
  ];

  return (
    <div className="space-y-4">
      {faqs.map((faq, idx) => {
        const isOpen = openIndex === idx;
        return (
          <div
            key={idx}
            className="border border-gray-150 dark:border-brand-gray/50 rounded-xl bg-white dark:bg-brand-dark-light transition-all overflow-hidden"
          >
            <button
              id={`faq-btn-${idx}`}
              onClick={() => setOpenIndex(isOpen ? null : idx)}
              className="w-full flex items-center justify-between p-5 text-left font-display font-semibold text-gray-900 dark:text-white hover:text-brand-primary cursor-pointer transition-colors"
            >
              <span className="text-sm md:text-base">{faq.q}</span>
              {isOpen ? <ChevronUp className="h-5 w-5 text-brand-primary" /> : <ChevronDown className="h-5 w-5 text-gray-400" />}
            </button>
            {isOpen && (
              <div id={`faq-answer-${idx}`} className="p-5 pt-0 border-t border-gray-100 dark:border-brand-gray/20 text-xs sm:text-sm text-gray-505 dark:text-gray-300 leading-relaxed bg-gray-50/30 dark:bg-brand-gray/10">
                {faq.a}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

/* =========================================================================
   COMPREHENSIVE SEO LANDING SECTIONS (2500+ Words)
   ========================================================================= */
export function SeoLandingContentComponent() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 space-y-20 border-t border-gray-100 dark:border-brand-gray/30 transition-colors">
      
      {/* SECTION 1: Why LearnWithJulfy Free Image Tools */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <h2 className="font-display text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight sm:text-4xl">
            Why LearnWithJulfy Free Image Tools?
          </h2>
          <div className="h-1.5 w-20 bg-brand-primary rounded" />
          <p className="text-gray-600 dark:text-gray-300 text-sm md:text-base leading-relaxed">
            In our modern hyper-connected digital marketplace, fast visual turnaround is no longer a luxury—it is an absolute operational necessity. High-ranking search result directories, beautiful social dashboards, and crisp branding catalogs all rely heavily on flawless graphics presentation. Yet, standard image editing suites have grown increasingly complex, bloated, resource-heavy, and financially out-of-reach for independent creators.
          </p>
          <p className="text-gray-600 dark:text-gray-300 text-sm md:text-base leading-relaxed">
            LearnWithJulfy Free Image Tools has been engineered from the ground up to solve this systemic challenge. We provide a premium suite of 20 high-fidelity visual utilities that operate completely within your browser sandbox. By blending standard local compilation logic with intuitive drag-and-drop mechanics, we give you the visual layout capabilities of desktop software directly inside a lightweight web frame—100% free, forever, with no accounts or uploads.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="p-6 bg-white dark:bg-brand-dark-light rounded-2xl border border-gray-100 dark:border-brand-gray/50 shadow-xs flex flex-col gap-3">
            <Shield className="h-8 w-8 text-brand-primary" />
            <h4 className="font-display font-bold text-gray-900 dark:text-white">Absolute Data Privacy</h4>
            <p className="text-xs text-gray-550 dark:text-gray-400 leading-relaxed">
              We never upload, scan, or copy your photos onto external web servers. Zero network transport occurs during conversion, providing total visual confidentiality.
            </p>
          </div>
          <div className="p-6 bg-white dark:bg-brand-dark-light rounded-2xl border border-gray-100 dark:border-brand-gray/50 shadow-xs flex flex-col gap-3">
            <Cpu className="h-8 w-8 text-brand-primary" />
            <h4 className="font-display font-bold text-gray-900 dark:text-white font-semibold">Localized Execution</h4>
            <p className="text-xs text-gray-550 dark:text-gray-400 leading-relaxed">
              Leverage your local CPU hardware processing limits. Scale, crop, and filter massive images instantly without being held back by slow network speeds.
            </p>
          </div>
          <div className="p-6 bg-white dark:bg-brand-dark-light rounded-2xl border border-gray-100 dark:border-brand-gray/50 shadow-xs flex flex-col gap-3">
            <Globe className="h-8 w-8 text-brand-primary" />
            <h4 className="font-display font-bold text-gray-900 dark:text-white">SEO Engine Optimized</h4>
            <p className="text-xs text-gray-550 dark:text-gray-400 leading-relaxed">
              Create lightning-fast next-gen WebP formats and strip camera metadata parameters, boosting Core Web Vitals to help your domain rank at the top.
            </p>
          </div>
          <div className="p-6 bg-white dark:bg-brand-dark-light rounded-2xl border border-gray-100 dark:border-brand-gray/50 shadow-xs flex flex-col gap-3">
            <Zap className="h-8 w-8 text-brand-primary" />
            <h4 className="font-display font-bold text-gray-900 dark:text-white">100% Free & Unlimited</h4>
            <p className="text-xs text-gray-550 dark:text-gray-400 leading-relaxed">
              No hidden subscriptions, processing caps, or email walls. Convert as many photos and file sizes as you need without interruption.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 2: Best Free Image Tool For Daily Image Tasks */}
      <section className="bg-orange-50/50 dark:bg-brand-dark-light/50 border border-orange-100/30 dark:border-brand-gray/30 rounded-3xl p-8 md:p-12 space-y-6">
        <h3 className="font-display text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
          Best Free Image Tool For Daily Image Tasks
        </h3>
        <p className="text-gray-600 dark:text-gray-300 text-sm md:text-base leading-relaxed">
          Daily workflow operations demand reliable visual software assets. Web developers need fast resizing ratios, writers need document formats conversion, social media promoters require optimized thumbnails, and photographers require metadata removal. LearnWithJulfy brings all 20 crucial tools together into a streamlined bento grid.
        </p>
        <p className="text-gray-650 dark:text-gray-300 text-sm md:text-base leading-relaxed">
          Rather than keeping tabs open for a compressor, a separate converter, and an editor, our platform lets you perform your sequence of visual operations in one session. Drag a camera photograph in, strip its GPS tracking metadata in our EXIF cleaner, resize its pixel layout, optimize the dimensions using the compressor, and save as next-gen WebP format—all within seconds, completely locally.
        </p>
      </section>

      {/* SECTION 3: Convert Images Easily Online */}
      <section className="space-y-6">
        <h3 className="font-display text-2xl md:text-3xl font-bold text-gray-900 dark:text-white text-center">
          Convert Images Easily Online
        </h3>
        <div className="h-1 bg-brand-primary w-24 mx-auto rounded" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-4">
          <div className="p-6 bg-white dark:bg-brand-dark border border-gray-100 dark:border-brand-gray hover:border-brand-primary/50 rounded-2xl transition-all">
            <h5 className="font-display font-bold text-gray-900 dark:text-white text-lg mb-3">Lossless Format Translators</h5>
            <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
              Our converters translate binary image blocks between JPG, PNG, WebP, and PDF streams. This ensures you maintain visual alpha transpaencies and crisp lines when passing graphical assets between design platforms.
            </p>
          </div>
          <div className="p-6 bg-white dark:bg-brand-dark border border-gray-100 dark:border-brand-gray hover:border-brand-primary/50 rounded-2xl transition-all">
            <h5 className="font-display font-bold text-gray-900 dark:text-white text-lg mb-3">PDF-Compatible Compilation</h5>
            <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
              Need to upload physical homework, corporate receipts, or invoice catalogs? Our PDF converters assemble multiple images together and format them cleanly into a multi-page PDF document, fully organized and optimized for sharing.
            </p>
          </div>
          <div className="p-6 bg-white dark:bg-brand-dark border border-gray-100 dark:border-brand-gray hover:border-brand-primary/50 rounded-2xl transition-all">
            <h5 className="font-display font-bold text-gray-900 dark:text-white text-lg mb-3">Universal Web Compatibility</h5>
            <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
              Some legacy apps do not accept modern WebPs; some search indexes reject heavy images. Our extensive converter tool index bridges all file gaps, ensuring you output formats that are fully compatible with your system requirements.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 4: Compress Images Without Losing Quality */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-6 lg:order-2">
          <h3 className="font-display text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
            Compress Images Without Losing Quality
          </h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm md:text-base leading-relaxed">
            High file resolution is vital for quality, but heavy images degrade browser rendering speed and consume precious storage. Our JPG compressor offers a customized client-side solution. By removing index data strings that are imperceptible to human eyes, you can reduce file weight dramatically while keeping visual outputs crisp and high-resolution.
          </p>
          <p className="text-gray-600 dark:text-gray-300 text-sm md:text-base leading-relaxed">
            Adjustable quality parameters give you complete control over your visual assets. Watch files shrink from several megabytes down to lightweight, fast-loading kilobytes while maintaining sharp details. Your core business and personal assets compile on your client machine, saving bandwidth on every download.
          </p>
        </div>
        <div className="bg-linear-to-br from-brand-primary/10 to-orange-500/5 dark:from-brand-primary/5 dark:to-transparent border border-orange-100/45 dark:border-brand-gray/30 rounded-3xl p-8 space-y-4">
          <div className="flex justify-between items-center pb-2 border-b border-orange-100/40 dark:border-brand-gray/20">
            <span className="text-sm font-semibold text-gray-800 dark:text-white">JPG Compressor Metrics</span>
            <span className="text-xs font-mono bg-brand-primary text-white px-2 py-0.5 rounded">Real-time</span>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
              <span>Original File Weight:</span>
              <span className="font-semibold text-gray-950 dark:text-white">4.82 MB</span>
            </div>
            <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
              <span>Remaining File Weight:</span>
              <span className="font-semibold text-green-600 dark:text-green-400">415 KB</span>
            </div>
            <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
              <span>Space Preservation Ratio:</span>
              <span className="font-bold text-green-600 dark:text-green-400">91.4% Saved ✓</span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: Resize Images For Websites & Social Media */}
      <section className="space-y-6">
        <h3 className="font-display text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
          Resize Images For Websites & Social Media
        </h3>
        <p className="text-gray-600 dark:text-gray-300 text-sm md:text-base leading-relaxed">
          Every prominent social media platform demands specific image aspect ratios to ensure layouts load beautifully. Twitter posts, Facebook banners, and YouTube thumbnails require precise matching dimensions to prevent awkward stretching or cropping. Our image resizer and thumbnail tool take the guesswork out of layout management.
        </p>
        <p className="text-gray-600 dark:text-gray-300 text-sm md:text-base leading-relaxed">
          Select our pre-configured visual templates or define custom pixel dimensions directly. With aspect ratio locks to preserve proportions and precision cropping grids, you can fit your graphics to standard layouts cleanly. This ensures your visual branding appears professional and polished across all digital channels.
        </p>
      </section>

      {/* SECTION 6: Benefits of Using Online Image Tools */}
      <section className="space-y-6">
        <h3 className="font-display text-2xl md:text-3xl font-bold text-gray-900 dark:text-white text-center">
          Benefits of Using Online Image Tools
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-4">
          <div className="p-5 border border-gray-150 dark:border-brand-gray/50 rounded-2xl bg-white dark:bg-brand-dark">
            <h5 className="font-display font-semibold text-gray-950 dark:text-white mb-2">Instant Downloads</h5>
            <p className="text-xs text-gray-500 dark:text-gray-450 leading-relaxed">
              No server queuing or waiting in lines. Your machine processes pixels instantly and triggers immediate downloads on completion.
            </p>
          </div>
          <div className="p-5 border border-gray-150 dark:border-brand-gray/50 rounded-2xl bg-white dark:bg-brand-dark">
            <h5 className="font-display font-semibold text-gray-950 dark:text-white mb-2">Bandwidth Preservation</h5>
            <p className="text-xs text-gray-500 dark:text-gray-455 leading-relaxed">
              Because files are read locally, you never waste high-speed data uploading or pulling heavy pictures over wireless connections.
            </p>
          </div>
          <div className="p-5 border border-gray-150 dark:border-brand-gray/50 rounded-2xl bg-white dark:bg-brand-dark">
            <h5 className="font-display font-semibold text-gray-950 dark:text-white mb-2">SaaS Quality Suite</h5>
            <p className="text-xs text-gray-500 dark:text-gray-455 leading-relaxed">
              Enjoy premium interface elements, smooth motion sliders, drag-and-drop frames, and clean layouts that operate as smoothly as desktop software.
            </p>
          </div>
          <div className="p-5 border border-gray-150 dark:border-brand-gray/50 rounded-2xl bg-white dark:bg-brand-dark">
            <h5 className="font-display font-semibold text-gray-950 dark:text-white mb-2">Zero Software Clutter</h5>
            <p className="text-xs text-gray-500 dark:text-gray-455 leading-relaxed">
              Keep your local drive clean. Avoid installing suspicious installer files or registration trackers on your physical operating system.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 7: Who Should Use These Tools */}
      <section className="space-y-8">
        <h3 className="font-display text-2xl md:text-3xl font-bold text-gray-900 dark:text-white text-center">
          Who Should Use LearnWithJulfy Free Image Tools?
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          <div className="p-6 bg-white dark:bg-brand-dark-light border border-gray-100 dark:border-brand-gray p-6 rounded-2xl flex flex-col gap-3">
            <div className="h-10 w-10 text-brand-primary flex items-center justify-center font-bold font-display text-lg bg-orange-50 dark:bg-brand-gray rounded-xl">ST</div>
            <h4 className="font-display font-bold text-gray-900 dark:text-white text-sm">Students</h4>
            <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
              Compile scanned physical assignments, resize graphic elements, and format files safely into standardized single-page PDF packages for portals.
            </p>
          </div>
          <div className="p-6 bg-white dark:bg-brand-dark-light border border-gray-100 dark:border-brand-gray p-6 rounded-2xl flex flex-col gap-3">
            <div className="h-10 w-10 text-brand-primary flex items-center justify-center font-bold font-display text-lg bg-orange-50 dark:bg-brand-gray rounded-xl">BL</div>
            <h4 className="font-display font-bold text-gray-900 dark:text-white text-sm">Bloggers</h4>
            <p className="text-xs text-gray-550 dark:text-gray-400 leading-relaxed">
              Convert raw JPEGs into core WebP formats, crop pictures for layouts, and compress visual assets to boost page speed and search index rankings.
            </p>
          </div>
          <div className="p-6 bg-white dark:bg-brand-dark-light border border-gray-100 dark:border-brand-gray p-6 rounded-2xl flex flex-col gap-3">
            <div className="h-10 w-10 text-brand-primary flex items-center justify-center font-bold font-display text-lg bg-orange-50 dark:bg-brand-gray rounded-xl">YT</div>
            <h4 className="font-display font-bold text-gray-900 dark:text-white text-sm">YouTubers</h4>
            <p className="text-xs text-gray-550 dark:text-gray-400 leading-relaxed">
              Design eye-catching thumbnails with precise social dimensions (1280x720) to capture viewer attention and drive higher click-through rates.
            </p>
          </div>
          <div className="p-6 bg-white dark:bg-brand-dark-light border border-gray-100 dark:border-brand-gray p-6 rounded-2xl flex flex-col gap-3">
            <div className="h-10 w-10 text-brand-primary flex items-center justify-center font-bold font-display text-lg bg-orange-50 dark:bg-brand-gray rounded-xl">DS</div>
            <h4 className="font-display font-bold text-gray-900 dark:text-white text-sm">Designers</h4>
            <p className="text-xs text-gray-550 dark:text-gray-400 leading-relaxed">
              Quickly split large layout images, merge columns together, test duotone filters, and generate fast visual mockups in an unthrottled playground.
            </p>
          </div>
          <div className="p-6 bg-white dark:bg-brand-dark-light border border-gray-100 dark:border-brand-gray p-6 rounded-2xl flex flex-col gap-3">
            <div className="h-10 w-10 text-brand-primary flex items-center justify-center font-bold font-display text-lg bg-orange-50 dark:bg-brand-gray rounded-xl">BS</div>
            <h4 className="font-display font-bold text-gray-900 dark:text-white text-sm">Businesses</h4>
            <p className="text-xs text-gray-550 dark:text-gray-400 leading-relaxed">
              Add transparent copyright watermarks to company branding designs and safely strip metadata credentials from shared photos to protect corporate privacy.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 8: Why Users Choose LearnWithJulfy */}
      <section className="bg-linear-to-r from-brand-primary to-orange-600 rounded-3xl p-8 md:p-12 text-white grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-8 space-y-4">
          <h3 className="font-display text-2xl md:text-3xl font-bold tracking-tight">Why Users Choose LearnWithJulfy Over Traditional Systems</h3>
          <p className="text-orange-50 text-sm md:text-base leading-relaxed">
            Standard platform utilities often exploit user metadata. They restrict conversion capacities, force software installations containing background telemetry systems, or lock essential tools behind weekly memberships. We protect you from this friction.
          </p>
          <p className="text-orange-50 text-sm md:text-base leading-relaxed">
            By running all graphics processing inside your browser, we eliminate server waiting queues entirely. Enjoy instant, unlimited operations without paywalls, and download high-quality visual assets with complete peace of mind.
          </p>
        </div>
        <div className="lg:col-span-4 flex flex-col gap-4">
          <div className="p-4 rounded-xl bg-white/10 backdrop-blur-xs flex items-center gap-3">
            <Star className="h-5 w-5 text-white shrink-0" />
            <span className="text-xs font-semibold">SaaS Standard UI Interface</span>
          </div>
          <div className="p-4 rounded-xl bg-white/10 backdrop-blur-xs flex items-center gap-3">
            <CheckCircle className="h-5 w-5 text-white shrink-0" />
            <span className="text-xs font-semibold">100% Free & Unlimited Access</span>
          </div>
          <div className="p-4 rounded-xl bg-white/10 backdrop-blur-xs flex items-center gap-3">
            <UserCheck className="h-5 w-5 text-white shrink-0" />
            <span className="text-xs font-semibold">No Registrations Required</span>
          </div>
        </div>
      </section>

      {/* SECTION 9: How To Use Image Tools */}
      <section className="space-y-6">
        <h3 className="font-display text-2xl md:text-3xl font-bold text-gray-900 dark:text-white text-center animate-reveal">
          How To Use LearnWithJulfy Image Tools
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-4">
          <div className="relative p-6 bg-white dark:bg-brand-dark-light border border-gray-100 dark:border-brand-gray p-6 rounded-2xl">
            <span className="absolute -top-4 left-6 h-8 w-8 bg-brand-primary text-white font-mono font-bold text-sm rounded-lg flex items-center justify-center">1</span>
            <h5 className="font-display font-semibold text-gray-950 dark:text-white mt-2 mb-2">Upload or Drag Files</h5>
            <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
              Select or drag your files into our secure upload box. Your data is instantly formatted in your local browser state—completely offline.
            </p>
          </div>
          <div className="relative p-6 bg-white dark:bg-brand-dark-light border border-gray-100 dark:border-brand-gray p-6 rounded-2xl">
            <span className="absolute -top-4 left-6 h-8 w-8 bg-brand-primary text-white font-mono font-bold text-sm rounded-lg flex items-center justify-center">2</span>
            <h5 className="font-display font-semibold text-gray-950 dark:text-white mt-2 mb-2">Configure Parameters</h5>
            <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
              Use our responsive sliders and presets to tweak parameters. Set resolutions, cropping boundaries, compression quality, or watermark layouts.
            </p>
          </div>
          <div className="relative p-6 bg-white dark:bg-brand-dark-light border border-gray-100 dark:border-brand-gray p-6 rounded-2xl">
            <span className="absolute -top-4 left-6 h-8 w-8 bg-brand-primary text-white font-mono font-bold text-sm rounded-lg flex items-center justify-center">3</span>
            <h5 className="font-display font-semibold text-gray-950 dark:text-white mt-2 mb-2">Build & Download</h5>
            <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
              Click the processing button to trigger advanced canvas rendering. Your finished assets download directly to your local drive instantly.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 10: Frequently Asked Questions Integration */}
      <section className="space-y-8">
        <div className="text-center space-y-4">
          <h3 className="font-display text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
            Frequently Asked Questions
          </h3>
          <p className="text-gray-520 dark:text-gray-400 text-sm max-w-2xl mx-auto">
            Got questions about our browser processing system, safety boundaries, or tool capabilities? Browse our detailed FAQ directory down below.
          </p>
        </div>
        <FAQComponent />
      </section>

    </div>
  );
}
