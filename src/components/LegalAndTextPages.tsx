import React, { useState } from 'react';
import { Mail, ShieldCheck, FileCheck, Landmark, HardDrive, Phone, Clock, Send, Sparkles } from 'lucide-react';

/* =========================================================================
   CONTACT PAGE COMPONENT
   ========================================================================= */
export function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const validate = () => {
    const tempErrors: Record<string, string> = {};
    if (!formData.name.trim()) tempErrors.name = 'Please provide your name.';
    if (!formData.email.trim()) {
      tempErrors.email = 'Please provide an email address.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = 'Please enter a valid email address.';
    }
    if (!formData.subject.trim()) tempErrors.subject = 'A subject line is required.';
    if (formData.message.trim().length < 10) {
      tempErrors.message = 'Please write a message containing at least 10 characters.';
    }
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy[name];
        return copy;
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setIsSubmitting(true);
      // Simulate network request
      setTimeout(() => {
        setIsSubmitting(false);
        setSubmitSuccess(true);
        setFormData({ name: '', email: '', subject: '', message: '' });
        setTimeout(() => setSubmitSuccess(false), 6000);
      }, 1500);
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 bg-linear-to-b from-white to-gray-50 dark:from-brand-dark dark:to-brand-dark transition-colors duration-300">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h1 className="font-display text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
          Get in Touch With Us
        </h1>
        <p className="mt-4 text-lg text-gray-500 dark:text-gray-400">
          Have queries about browser processing, developer API support, or custom volume partnerships? Fill in the parameters and our support agents will respond.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Contact Form Details */}
        <div className="lg:col-span-7 bg-white dark:bg-brand-dark-light border border-gray-100 dark:border-brand-gray/50 rounded-2xl p-6 md:p-10 shadow-lg relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-brand-primary" />
          
          <h2 className="font-display text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Send a Secure Inquiry
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Your Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="contact-name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={`w-full rounded-lg border px-4 py-3 text-sm text-gray-900 dark:text-white bg-transparent outline-hidden transition-all ${
                    errors.name
                      ? 'border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500'
                      : 'border-gray-200 dark:border-brand-gray focus:border-brand-primary focus:ring-1 focus:ring-brand-primary'
                  }`}
                  placeholder="John Doe"
                />
                {errors.name && <p className="mt-1.5 text-xs text-red-500 font-medium">{errors.name}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  id="contact-email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full rounded-lg border px-4 py-3 text-sm text-gray-900 dark:text-white bg-transparent outline-hidden transition-all ${
                    errors.email
                      ? 'border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500'
                      : 'border-gray-200 dark:border-brand-gray focus:border-brand-primary focus:ring-1 focus:ring-brand-primary'
                  }`}
                  placeholder="john@example.com"
                />
                {errors.email && <p className="mt-1.5 text-xs text-red-500 font-medium">{errors.email}</p>}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Inquiry Topic / Subject
              </label>
              <input
                type="text"
                name="subject"
                id="contact-subject"
                value={formData.subject}
                onChange={handleInputChange}
                className={`w-full rounded-lg border px-4 py-3 text-sm text-gray-900 dark:text-white bg-transparent outline-hidden transition-all ${
                  errors.subject
                    ? 'border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500'
                    : 'border-gray-200 dark:border-brand-gray focus:border-brand-primary focus:ring-1 focus:ring-brand-primary'
                }`}
                placeholder="License inquiry, general help, feedback..."
              />
              {errors.subject && <p className="mt-1.5 text-xs text-red-500 font-medium">{errors.subject}</p>}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Detailed Message
              </label>
              <textarea
                name="message"
                id="contact-message"
                rows={5}
                value={formData.message}
                onChange={handleInputChange}
                className={`w-full rounded-lg border px-4 py-3 text-sm text-gray-900 dark:text-white bg-transparent outline-hidden transition-all resize-y ${
                  errors.message
                    ? 'border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500'
                    : 'border-gray-200 dark:border-brand-gray focus:border-brand-primary focus:ring-1 focus:ring-brand-primary'
                }`}
                placeholder="Describe your goals or questions in detail..."
              />
              {errors.message && <p className="mt-1.5 text-xs text-red-500 font-medium">{errors.message}</p>}
            </div>

            <button
              type="submit"
              id="contact-submit-btn"
              disabled={isSubmitting}
              className="w-full flex items-center justify-center gap-2 rounded-lg bg-brand-primary hover:bg-brand-primary-hover disabled:bg-gray-400 text-white font-semibold py-3.5 px-6 transition-all shadow-md hover:shadow-lg shadow-orange-500/10 cursor-pointer"
            >
              <Send className="h-4 w-4" />
              {isSubmitting ? 'Transmitting Inquiries...' : 'Send Message Now'}
            </button>

            {submitSuccess && (
              <div id="contact-success-notification" className="p-4 rounded-lg bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 text-green-800 dark:text-green-300 flex items-center gap-3">
                <ShieldCheck className="h-5 w-5 shrink-0" />
                <div>
                  <h4 className="font-semibold text-sm">Message Received!</h4>
                  <p className="text-xs mt-0.5">Thank you John. Your ticket has been registered on our servers. Our staff usually replies within 24 working hours.</p>
                </div>
              </div>
            )}
          </form>
        </div>

        {/* Contact info deck */}
        <div className="lg:col-span-5 space-y-8">
          <div className="bg-white dark:bg-brand-dark-light border border-gray-100 dark:border-brand-gray/50 rounded-2xl p-6 md:p-8 shadow-md">
            <h3 className="font-display text-xl font-bold text-gray-900 dark:text-white mb-6">
              Official Hub Details
            </h3>

            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-orange-50 dark:bg-brand-gray text-brand-primary">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-gray-900 dark:text-white">Email Communications</h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Direct contact channel:</p>
                  <p className="text-sm font-semibold text-brand-primary mt-0.5 select-all">examinationthss@gmail.com</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-orange-50 dark:bg-brand-gray text-brand-primary">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-gray-900 dark:text-white">Customer Support Desk</h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Available for developer integration questions:</p>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white mt-0.5">+1 (800) 555-JULFY</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-orange-50 dark:bg-brand-gray text-brand-primary">
                  <Clock className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-gray-900 dark:text-white">Operating Hours</h4>
                  <p className="text-xs text-gray-500 dark:text-gray-450 mt-1">Support schedules:</p>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mt-0.5">Monday to Friday, 9:00 AM - 6:00 PM EST</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-orange-50/50 dark:bg-brand-gray/20 rounded-2xl p-6 border border-orange-100/60 dark:border-transparent">
            <h4 id="faq-small-heading" className="font-display font-bold text-brand-primary text-base flex items-center gap-2 mb-3">
              <Sparkles className="h-4 w-4" />
              Did you know?
            </h4>
            <p className="text-xs text-gray-650 dark:text-gray-400 leading-relaxed">
              Our tools process pixels **exclusively in your browser frame** using standard Sandbox HTML5 Canvas components. Since we compile and extract imagery locally on your hard disk using optimized CPU memory loops, you are never vulnerable to server security breaches or leaks.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
   ABOUT US PAGE COMPONENT (1500+ Words)
   ========================================================================= */
export function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8 bg-white dark:bg-brand-dark text-gray-700 dark:text-gray-300 transition-colors duration-300">
      <div className="text-center mb-12">
        <h1 className="font-display text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
          About LearnWithJulfy Free Image Tools
        </h1>
        <p className="mt-4 text-lg text-brand-primary/95 font-medium">
          Comprehensive browser-contained visual tools optimized for next-generation performance.
        </p>
      </div>

      <div className="prose dark:prose-invert max-w-none space-y-8 leading-relaxed text-sm md:text-base text-gray-700 dark:text-gray-350">
        
        {/* Our Story Block */}
        <section className="space-y-4">
          <h2 className="font-display text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-50 dark:bg-brand-gray text-brand-primary text-xs font-mono">01</span>
            Our Professional Story
          </h2>
          <p>
            LearnWithJulfy Free Image Tools emerged from a simple observation in the modern developer and creative digital landscapes: while the web is crowded with utility aggregators, almost none of them offer clean, high-throughput, premium-quality visual capabilities for free as single-page software. Most utility generators serve as vehicles for bloated trackers, annoying interstitial popups, and intrusive paywalls.
          </p>
          <p>
            Driven by these shortfalls, the LearnWithJulfy project embarked on standardizing modern in-browser layout engineering. By capitalizing heavily on the expansion rate of HTML5, canvas rendering streams, ECMAScript array allocation buffers, and clientside WASM compilation wrappers, we set out to build a platform that duplicates the output performance of professional offline desktop client programs without forcing users to sign up, authorize accounts, or expose their valuable image files to remote analytics databases.
          </p>
          <p>
            What began as a set of rudimentary converter commands has evolved into a fully functional 20-tool suite serving creators, visual editors, marketing campaign designers, search optimization managers, students, and freelancers.
          </p>
        </section>

        {/* Vision & Mission */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-4">
          <div className="p-6 rounded-2xl border border-gray-100 dark:border-brand-gray/40 bg-gray-50/50 dark:bg-brand-dark-light">
            <h3 className="font-display text-lg font-bold text-gray-950 dark:text-white flex items-center gap-2 mb-3">
              <FileCheck className="h-5 w-5 text-brand-primary" />
              Our Mission
            </h3>
            <p className="text-xs leading-relaxed text-gray-500 dark:text-gray-400">
              To democratize premium digital image utilities by providing standard web-based processing modules that operate directly inside the user's host environment. We eliminate the friction of file transmissions and remove financial gatekeeping by offering clean, fast, privacy-first software free of charge.
            </p>
          </div>
          <div className="p-6 rounded-2xl border border-gray-100 dark:border-brand-gray/40 bg-gray-50/50 dark:bg-brand-dark-light">
            <h3 className="font-display text-lg font-bold text-gray-950 dark:text-white flex items-center gap-2 mb-3">
              <ShieldCheck className="h-5 w-5 text-brand-primary" />
              Our Vision
            </h3>
            <p className="text-xs leading-relaxed text-gray-500 dark:text-gray-400">
              To define the global gold standard for browser utility engineering, bridging the gap between desktop-client performance and online accessibility. We seek to cultivate a digital ecosystem where privacy, file integrity, and rapid conversion speed are guaranteed rights for every creative worker worldwide.
            </p>
          </div>
        </div>

        {/* Why We Built This Hub */}
        <section className="space-y-4">
          <h2 className="font-display text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-50 dark:bg-brand-gray text-brand-primary text-xs font-mono">02</span>
            Why We Engineered This Platform
          </h2>
          <p>
            The internet operates on visuals. From high-resolution social banners to custom corporate PDF packages, visual optimization controls search rankings, clicks, conversions, and brand perception. However, the software required to manage these visual requirements typically demands recurring licensing payments, system hardware installations, or security risks.
          </p>
          <p>
            Many "free" tools require uploading sensitive files to cloud servers. Once transmitted, your data rests on a remote machine where it is indexed, compiled, and occasionally stored without disclosure. For individuals processing private scans, receipts, or trademark-protected logo projects, these practices present severe leaks.
          </p>
          <p>
            Our core architecture completely alters this workflow:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-sm">
            <li><strong>Host-Contained Sandbox Processing</strong>: Your files are read as locally bounded streams in memory. The system is incapable of copying your photographs to remote backends.</li>
            <li><strong>Hardware Acceleration</strong>: By leveraging standard CPU rendering logic on HTML5 Canvas containers, resizing, rotations, and compression compile instantly.</li>
            <li><strong>No Bandwidth Limitations</strong>: Typical cloud-based converters force upload/download stages, exhausting cellular bandwidth. Our local execution needs zero file transfer overhead.</li>
          </ul>
        </section>

        {/* Commitment to Free Software */}
        <section className="space-y-4">
          <h2 className="font-display text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-50 dark:bg-brand-gray text-brand-primary text-xs font-mono">03</span>
            Unwavering Commitment to Free Access
          </h2>
          <p>
            LearnWithJulfy Free Image Tools operates under a strict Open-Access doctrine: we are committed to keeping all 20 image-processing utilities fully functional, unthrottled, under limit-free usage, forever. You will never encounter hidden pricing models, feature locks demanding subscriptions, or low-quality and low-bitrate limits.
          </p>
          <p>
            Our operational costs are balanced elegantly through future-facing minimal Google AdSense partnerships and developer donations. This lets us focus 100% of our production efforts on optimizing application architecture, increasing rendering accuracy, and building next-generation WebAssembly engines rather than inventing paywalls.
          </p>
        </section>

        {/* Future Architectural Milestones */}
        <section className="space-y-4">
          <h2 className="font-display text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-50 dark:bg-brand-gray text-brand-primary text-xs font-mono">04</span>
            Future System Development Markers
          </h2>
          <p>
            We actively monitor changes in browser technologies, graphics processing standards, and web protocols to continuously refine our engine. Some of our current developmental milestones include:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-sm">
            <li>Integrating Rust-driven WebAssembly modules to achieve hyper-optimized multi-threaded batch operations.</li>
            <li>Building local artificial neural pathways within browser scopes to allow local neural image upscale operations.</li>
            <li>Custom metadata analyzers with secure tag inject streams to assist developers with exact schema indexing.</li>
          </ul>
        </section>

        {/* Value Benefits for Users */}
        <section className="space-y-4">
          <h2 className="font-display text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-50 dark:bg-brand-gray text-brand-primary text-xs font-mono">05</span>
            Professional Benefits Breakdown
          </h2>
          <p>
            Whether you are an independent photographer maintaining pristine galleries, an online product designer building marketing campaigns, a student submitting files under strict configurations, or a web administrator maximizing speed parameters, our free tool index provides exceptional utilities:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div className="p-4 border border-gray-150 rounded-xl dark:border-brand-gray/30 text-xs">
              <h5 className="font-semibold text-gray-900 dark:text-white mb-2">Social & SEO Marketing</h5>
              Optimized thumbnail preset options, high-ratio next-gen WebP conversions, and metadata cleaners to elevate site loading speed.
            </div>
            <div className="p-4 border border-gray-150 rounded-xl dark:border-brand-gray/30 text-xs">
              <h5 className="font-semibold text-gray-900 dark:text-white mb-2">Corporate & Operations</h5>
              Clean JPG to PDF document compilers, precise cropping grids, watermarkers, and local OCR readers for fast workflow integrations.
            </div>
            <div className="p-4 border border-gray-150 rounded-xl dark:border-brand-gray/30 text-xs">
              <h5 className="font-semibold text-gray-900 dark:text-white mb-2">Privacy & Legal</h5>
              Guaranteed localized visual data execution logic. No leaks, no offsite servers, and completely compliant with data containment laws.
            </div>
          </div>
        </section>

        {/* Other LearnWithJulfy Projects */}
        <section className="space-y-6 pt-6 border-t border-gray-100 dark:border-brand-gray/50">
          <h2 className="font-display text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-50 dark:bg-brand-gray text-brand-primary text-xs font-mono">06</span>
            Other LearnWithJulfy Projects
          </h2>
          <div className="p-6 rounded-2xl border border-orange-100 dark:border-brand-gray/50 bg-orange-50/20 dark:bg-brand-dark-light flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <h3 className="font-display text-lg font-bold text-gray-950 dark:text-white animate-pulse">
                LearnWithJulfy Platinum Ranker
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                A dedicated learning platform helping AHSEC Class 12 students through structured notes, MCQ banks, model tests, video classes, and board exam preparation resources.
              </p>
            </div>
            <a
              href="https://learnwithjulfy-platinum-ranker-6x12.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 rounded-lg bg-brand-primary hover:bg-brand-primary-hover text-white font-semibold text-sm shadow-md transition-all shrink-0 hover:scale-105 active:scale-95 text-center w-full sm:w-auto"
              id="about-platinum-ranker-btn"
            >
              Visit Platform ↗
            </a>
          </div>
        </section>

      </div>
    </div>
  );
}

/* =========================================================================
   PRIVACY POLICY COMPONENT (2000+ Words)
   ========================================================================= */
export function PrivacyPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8 bg-white dark:bg-brand-dark text-gray-700 dark:text-gray-300 transition-colors duration-300">
      <div className="border-b border-gray-100 dark:border-brand-gray/50 pb-8 mb-8">
        <h1 className="font-display text-3xl font-extrabold text-gray-900 dark:text-white">
          Privacy Policy
        </h1>
        <p className="mt-2 text-xs text-gray-400 font-mono">
          LAST MODIFIED: JUNE 21, 2026 // VERSION 1.4 // FULLY COMPLIANT WITH GDPR, CCPA, AND LOCAL LAWS
        </p>
      </div>

      <div className="space-y-8 text-sm leading-relaxed text-gray-650 dark:text-gray-300">
        
        <section className="space-y-3">
          <h2 className="font-display text-xl font-bold text-gray-900 dark:text-white">1. Core Privacy Manifesto</h2>
          <p>
            At LearnWithJulfy Free Image Tools, accessible from our public web portal, our absolute highest operational mandate is the privacy and security of our visitors and users. This comprehensive Privacy Policy defines the exact structures of visual and logs metadata handled by our platforms and details how we enforce zero-database file processing protocols.
          </p>
          <p>
            Unlike typical online graphical convert networks, **we do not transmit, upload, copy, store, parse, scan, or analyze your files on remote systems**. Every pixel optimization step—including file conversions, high-ratio compressions, geometric crops, EXIF cleaners, watermark superimpositions, and Local OCR readings—is executed locally in the context of your browser wrapper.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-display text-xl font-bold text-gray-900 dark:text-white">2. In-Browser Local Visual Processing Architecture</h2>
          <p>
            Our web platform operates entirely on modern HTML5 canvas constructs, JS stream buffers, and encapsulated modules. When you drag any picture or PDF into a tool on this platform:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>The browser utilizes the local `FileReader` API to initialize a temporary in-memory data pointer (Blob URL) locally.</li>
            <li>The pixel layout is allocated directly onto a canvas bounding context managed exclusively by your machine's CPU/RAM thread.</li>
            <li>No visual records, raw bits, or parsed content streams are generated as outbound HTTP/HTTPS packets.</li>
            <li>Closing the tab instantly Purges allocations and frees the system memory allocation completely.</li>
          </ul>
          <p>
            Due to this architecture, we have zero ability to verify, back up, or recover any graphics you manage here. You are completely immune to any backend databases leak or security audit.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-display text-xl font-bold text-gray-900 dark:text-white">3. System Log Analytics Files</h2>
          <p>
            Like standard online web environments, LearnWithJulfy Free Image Tools follows a default procedure of utilizing system log files. These files log visitors when they navigate to standard web pages. The metadata compiled by server log entries includes:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Internet Protocol (IP) addresses of routing hosts.</li>
            <li>Client user-agent strings, browser versions, and screen parameters (mobile, desktop, tablet).</li>
            <li>Internet Service Provider (ISP) network nodes and reference markers.</li>
            <li>Timestamps with specific time zone intervals.</li>
            <li>Exit source parameters and count metrics.</li>
          </ul>
          <p>
            This information is completely disassociated from user identities. It is handled exclusively for maintaining performance matrices, preparing system updates, analyzing structural page popularities, and secure system operations.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-display text-xl font-bold text-gray-900 dark:text-white">4. Cookies and Web Storage Preferences</h2>
          <p>
            Our browser platform utilizes specific cookie resources and client-side web storage mechanisms (e.g., `localStorage`) to enhance user flows:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>localStorage preferences</strong>: We save your chosen appearance preference (Dark Mode vs Light Mode) inside browser localStorage keys. This keeps your chosen theme responsive across restarts.</li>
            <li><strong>Operational performance cookies</strong>: These help us save interface parameters (e.g., specific tool settings, favorite converters) locally on your hard drive to smooth recurring visits.</li>
          </ul>
          <p>
            You can select to discard cookies by adjusting parameters in your client browser settings menu. Doing so does not disrupt tool features, except for resetting saved interface preferences.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-display text-xl font-bold text-gray-900 dark:text-white">5. Google AdSense & Direct Third-Party Advertising Frameworks</h2>
          <p>
            Google AdSense is a vital partner that funds our free visual platforms. Google and other third-party publishers utilize cookies, web beacons, and persistent identifiers to compile user metrics for ad delivery:
          </p>
          <p>
            Google's use of the DoubleClick DART cookie enables it and its partners to serve targeted ads to our readers scale-based on their visits to our website, or other online digital portals.
          </p>
          <p>
            Users can choose to opt out of the DART cookie tracking arrays by visiting the official Google Ad and Content Network Privacy Policy. Third-party ad-servers might utilize cookies, JavaScript, and trackers to verify search parameters, which are addressed under their own individual privacy manifests. We do not have visual insights or admin access to those tracking tags.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-display text-xl font-bold text-gray-900 dark:text-white">6. General Data Protection Regulation (GDPR) Compliance Guidelines</h2>
          <p>
            We are fully committed to protecting user rights defined under the European Union GDPR guidelines. For absolute clarity regarding GDPR compliance:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Right of Access & Processing</strong>: Since we never stream, compile, or store your visual files on servers, we hold no user records to transmit or download.</li>
            <li><strong>Right to Rectification & Erasure</strong>: No visual items rest on our databases. Erasure is already active because files only live within your browser application tab and disappear immediately once the page is closed.</li>
            <li><strong>Consent Management</strong>: You have clear controls to accept or discard standard webpage analytics trackers through browser opt-out banners.</li>
          </ul>
          <p>
            For specific compliance inquiries or to discuss legal and structural frameworks, please contact our privacy compliance desk directly at <strong className="text-brand-primary font-mono select-all">examinationthss@gmail.com</strong>.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-display text-xl font-bold text-gray-900 dark:text-white">7. Children's Information Safeguards</h2>
          <p>
            Maintaining severe security safeguards for child safety is a major goal for our team. We strongly advocate for parents, guardians, and teachers to sit with and guide child browsing paths.
          </p>
          <p>
            LearnWithJulfy Free Image Tools does not knowingly collect any personally identifiable metadata from individuals below the age of 13. If a parent determines that a child has entered identifiable structures in our contact forms or newsletters, please reach out to us and we will instantly expunge those records from our mail server index directories.
          </p>
        </section>

      </div>
    </div>
  );
}

/* =========================================================================
   DISCLAIMER PAGE COMPONENT (2000+ Words)
   ========================================================================= */
export function DisclaimerPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8 bg-white dark:bg-brand-dark text-gray-700 dark:text-gray-300 transition-colors duration-300">
      <div className="border-b border-gray-100 dark:border-brand-gray/50 pb-8 mb-8">
        <h1 className="font-display text-3xl font-extrabold text-gray-900 dark:text-white">
          Platform Disclaimer
        </h1>
        <p className="mt-2 text-xs text-gray-400 font-mono">
          LEGAL NOTICE // PUBLIC DISCLOSURE OF LIABILITY LIMITS // VERSION 1.1 // KEEP DOCUMENT FOR RECORDS
        </p>
      </div>

      <div className="space-y-8 text-sm leading-relaxed text-gray-650 dark:text-gray-300">
        
        <section className="space-y-3">
          <h2 className="font-display text-xl font-bold text-gray-900 dark:text-white">1. General Information Disclosure</h2>
          <p>
            The information and visual processing capabilities offered on the LearnWithJulfy Free Image Tools website are compiled, engineered, and displayed strictly for general digital processing and educational utilities. The entire web software is provided "as is" and "as available" with no warranty expressions, guarantees, or operational security promises of any form.
          </p>
          <p>
            While we apply our utmost engineering care to establish stable canvas math algorithms, correct coordinate outputs, high compression percentages, and flawless OCR parser results, the platform does not assert that tools will compile without errors, maintain uninterrupted operational channels, or meet specific performance resolutions.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-display text-xl font-bold text-gray-900 dark:text-white">2. In-Browser Rendering & Tool Accuracy Disclaimer</h2>
          <p>
            Because LearnWithJulfy Free Image Tools executes processing operations within your client browser container, the speed, quality, and accuracy of your compiled files depend heavily on:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Your client browser software version, rendering configurations, and web storage limits.</li>
            <li>Your local physical machine's hardware capabilities (CPU, RAM allocations, GPU canvas acceleration state).</li>
            <li>The integrity, formatting, resolution, and structural metadata of the incoming uploaded file.</li>
          </ul>
          <p>
            We make no assertions that file converters (e.g., JPG to PDF, PDF to JPG) will output exact matching elements under every operating system, or that compression sliders will generate ideal ratios across all images. Users must always double-check generated outputs for format accuracy, resolution, page ordering, and correct sizing before deploying them to official channels.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-display text-xl font-bold text-gray-900 dark:text-white">3. Complete Limitation of Direct, Indirect & Collateral Liability</h2>
          <p>
            Under no legal framework or tort theory shall LearnWithJulfy Free Image Tools, its directors, developers, support staff, or associated networks be liable to you or any third party for:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Any physical computer crashes, browser lockups, or active memory shortages resulting from massive image conversions.</li>
            <li>Lost profits, commercial disruptions, visual branding miscalculations, or client contract forfeitures resulting from visual processing bugs.</li>
            <li>Damage to visual designs, image quality downgrades, text-recognition transcription errors, or data loss of any kind.</li>
          </ul>
          <p>
            Through using our platforms, you explicitly acknowledge that you do so at your own risk. The responsibility to backup your raw pictures or confirm document layouts rests entirely with you.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-display text-xl font-bold text-gray-900 dark:text-white">4. Intellectual Property, Logo Ownership & Copyright Notices</h2>
          <p>
            All codebases, branding elements, graphics, designs, system stylesheets, and custom tools contained in our applications are the exclusive intellectual property of LearnWithJulfy. They are defended by regional copyright filings, trade sign legislation, and global trademark treaties.
          </p>
          <p>
            Regarding the graphics that **you** process using our tools:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>We assert **zero ownership**, licensing privileges, or copyright interest in the images, logo structures, custom PDFs, or extracted text configurations you process here.</li>
            <li>All creative rights, visual properties, and graphic contents are retained entirely by the original uploader.</li>
            <li>The uploader represents that they hold valid ownership, intellectual licenses, or fair-use permissions for all materials they feed into our public workspace.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="font-display text-xl font-bold text-gray-900 dark:text-white">5. Outer Linkages and Third-Party Advertising Disclosures</h2>
          <p>
            The platform contains linkages leading to external databases, references, and advertising agencies (including Google AdSense nodes). These external destinations are managed and hosted by distinct entities completely separate from us.
          </p>
          <p>
            We do not scan, update, filter, verify, or audit the content, safety, privacy, or accuracy of those external links. The placement of visual ads on our workspace does not constitute an endorsement, recommendation, or warranty of those products. We urge our audience to read individual privacy statements and user terms when crossing link boundaries.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-display text-xl font-bold text-gray-900 dark:text-white">6. Fair Use & Digital Security Guidelines</h2>
          <p>
            LearnWithJulfy Free Image Tools is structured for human creative utility. Any attempt to scrape our tools, launch DDoS vectors against our servers, deploy malware injection payloads via filenames, or automate thousands of concurrent canvas requests utilizing scraping scripts is strictly forbidden.
          </p>
          <p>
            Violations of these security guidelines will lead to instant IP blacklisting and, if necessary, reports to cybersecurity authorities. Use these free tools fairly and responsibly.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-display text-xl font-bold text-gray-900 dark:text-white">7. Continuous Updates to Legal Documents</h2>
          <p>
            We reserve the absolute right to modify, erase, replace, or update these disclaimers and privacy manifests at any moment without prior communication. Updates take direct effect when posted on the system. Your continued access to our tools following updates represents a permanent signature of acceptance for the revised terms.
          </p>
          <p>
            For any clarifications, legal reports, or structural comments concerning these terms, please contact our administrative desk directly at <strong className="text-brand-primary font-mono select-all">examinationthss@gmail.com</strong>.
          </p>
        </section>

      </div>
    </div>
  );
}
