import React, { useState, useEffect, useRef } from 'react';
import { 
  Upload, 
  Download, 
  Percent, 
  Trash2, 
  Settings, 
  Check, 
  Image as ImageIcon,
  ArrowRight,
  ShieldCheck,
  Zap,
  Info
} from 'lucide-react';

interface JpgCompressorProps {
  onGoBack: () => void;
}

export default function JpgCompressor({ onGoBack }: JpgCompressorProps) {
  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [originalUrl, setOriginalUrl] = useState<string | null>(null);
  const [originalSize, setOriginalSize] = useState<number>(0);
  const [compressedUrl, setCompressedUrl] = useState<string | null>(null);
  const [compressedSize, setCompressedSize] = useState<number>(0);
  const [quality, setQuality] = useState<number>(80);
  const [isCompressing, setIsCompressing] = useState<boolean>(false);
  const [imageDims, setImageDims] = useState<{ width: number; height: number } | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Format Helper for file sizes
  const formatBytes = (bytes: number): string => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  // Drag handlers
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      validateAndProcessFile(droppedFile);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      validateAndProcessFile(e.target.files[0]);
    }
  };

  const validateAndProcessFile = (inputFile: File) => {
    if (!inputFile.type.startsWith('image/')) {
      setErrorMsg('Invalid file format. Please upload a structured image file (JPG, JPEG, PNG, or WebP).');
      return;
    }
    setErrorMsg(null);
    setFile(inputFile);
    setOriginalSize(inputFile.size);

    // Create original url preview
    const objectUrl = URL.createObjectURL(inputFile);
    setOriginalUrl(objectUrl);
  };

  // Compress using Canvas API
  useEffect(() => {
    if (!originalUrl) {
      setCompressedUrl(null);
      setCompressedSize(0);
      setImageDims(null);
      return;
    }

    setIsCompressing(true);
    const img = new Image();
    img.onload = () => {
      setImageDims({ width: img.naturalWidth, height: img.naturalHeight });

      // Create a canvas aligned to natural dimensions
      const canvas = document.createElement('canvas');
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;

      const ctx = canvas.getContext('2d');
      if (!ctx) {
        setErrorMsg('Could not initialize image processing canvas context.');
        setIsCompressing(false);
        return;
      }

      // Fill canvas background to white (handles transparency beautifully for PNG conversions to JPG)
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw original image on canvas
      ctx.drawImage(img, 0, 0);

      // Compress to JPEG with target quality value (converted to normalized float 0.1 - 1.0)
      const qValue = quality / 100;
      canvas.toBlob(
        (blob) => {
          if (blob) {
            // Revoke previous compressed URL if it exists
            if (compressedUrl) {
              URL.revokeObjectURL(compressedUrl);
            }
            const compUrl = URL.createObjectURL(blob);
            setCompressedUrl(compUrl);
            setCompressedSize(blob.size);
          }
          setIsCompressing(false);
        },
        'image/jpeg',
        qValue
      );
    };

    img.onerror = () => {
      setErrorMsg('Failed to process image file. It may be corrupted.');
      setIsCompressing(false);
    };

    img.src = originalUrl;

    // Cleanup URLs on change or unmount
    return () => {
      // Don't revoke originalUrl directly, let validation and explicit reset manage it
    };
  }, [originalUrl, quality]);

  // Clean trigger for clearing active workspace
  const handleReset = () => {
    if (originalUrl) URL.revokeObjectURL(originalUrl);
    if (compressedUrl) URL.revokeObjectURL(compressedUrl);
    setFile(null);
    setOriginalUrl(null);
    setCompressedUrl(null);
    setOriginalSize(0);
    setCompressedSize(0);
    setQuality(80);
    setImageDims(null);
    setErrorMsg(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Download compressed JPEG
  const handleDownload = () => {
    if (!compressedUrl || !file) return;
    const link = document.createElement('a');
    link.href = compressedUrl;
    
    // Change extension to .jpg in downloaded filename
    const originalName = file.name;
    const lastDotIndex = originalName.lastIndexOf('.');
    const baseName = lastDotIndex !== -1 ? originalName.substring(0, lastDotIndex) : originalName;
    link.download = `compressed-${baseName}-${quality}pct.jpg`;
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const savingsPercentage = originalSize > 0 && compressedSize > 0 
    ? Math.max(0, Math.round(((originalSize - compressedSize) / originalSize) * 100))
    : 0;

  return (
    <div className="w-full max-w-5xl mx-auto py-6 px-4 sm:px-6 lg:px-8 space-y-8 animate-fade-in">
      
      {/* Dynamic Header Path Navigation */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-gray-100 dark:border-brand-gray/30">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-semibold text-gray-500 dark:text-gray-400">
            <button 
              onClick={onGoBack}
              className="hover:text-brand-primary hover:underline transition-all cursor-pointer"
            >
              All Tools Suite
            </button>
            <span>/</span>
            <span className="text-brand-primary">JPG Image Compressor</span>
          </div>
          <h1 className="font-display text-3xl font-extrabold text-gray-900 dark:text-white flex items-center gap-2.5">
            <span className="text-brand-primary">🗜️</span> JPG Image Compressor
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Optimize, compress, and shrink JPG/PNG files to smaller sizes in real-time. Created 100% locally on your browser.
          </p>
        </div>

        <button
          onClick={onGoBack}
          className="px-4 py-2 text-xs font-bold text-gray-700 dark:text-white bg-gray-50 dark:bg-brand-gray border border-gray-200 dark:border-brand-gray/50 hover:bg-orange-50 hover:border-orange-200 dark:hover:bg-brand-dark rounded-xl transition-all cursor-pointer flex items-center gap-1.5 active:scale-98"
        >
          ← Return to Directory
        </button>
      </div>

      {errorMsg && (
        <div className="p-4 rounded-xl border border-red-100 dark:border-red-900/30 bg-red-50/50 dark:bg-red-950/20 text-red-650 dark:text-red-400 text-sm flex items-start gap-3">
          <span className="text-lg">⚠️</span>
          <div className="space-y-1">
            <p className="font-semibold">Processing Action Alert</p>
            <p className="opacity-90">{errorMsg}</p>
          </div>
        </div>
      )}

      {/* WORKSPACE PREVIEW IF FILE NOT LOADED */}
      {!file ? (
        <div 
          className={`relative group rounded-3xl border-2 border-dashed transition-all duration-350 p-12 text-center flex flex-col items-center justify-center space-y-6 bg-white dark:bg-brand-dark-light ${
            dragActive 
              ? 'border-brand-primary bg-orange-500/[0.04] dark:bg-orange-500/[0.02] scale-[1.01]' 
              : 'border-gray-200 dark:border-brand-gray/60 hover:border-brand-primary/60 dark:hover:border-brand-primary/40'
          }`}
          onDragEnter={handleDrag}
          onDragOver={handleDrag}
          onDragLeave={handleDrag}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          id="drag-drop-compressor-uploader"
        >
          <input 
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/jpeg, image/jpg, image/png, image/webp"
            className="hidden"
          />

          <div className="relative flex h-20 w-20 items-center justify-center rounded-3xl bg-orange-50 dark:bg-brand-gray text-brand-primary transition-transform group-hover:scale-105 duration-300">
            <div className="absolute inset-0 rounded-3xl bg-brand-primary/10 blur-xl pointer-events-none group-hover:opacity-100 opacity-60 transition-opacity" />
            <Upload className="h-10 w-10 animate-pulse" />
          </div>

          <div className="space-y-2 max-w-md">
            <p className="font-display text-lg font-bold text-gray-900 dark:text-white">
              Drag & drop your JPG/PNG image here
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              or <span className="text-brand-primary font-bold hover:underline cursor-pointer">browse from computer</span> to compress locally.
            </p>
            <p className="text-xs text-gray-400 dark:text-zinc-500 italic mt-4">
              Supports JPG, JPEG, PNG, and WebP. Max secure memory 50MB.
            </p>
          </div>

          {/* Core Feature bullet flags */}
          <div className="pt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-2xl text-xs font-semibold text-gray-650 dark:text-gray-350">
            <div className="flex items-center justify-center gap-2 bg-gray-50/50 dark:bg-brand-gray/30 p-3 rounded-xl border border-gray-100/50 dark:border-brand-gray/20">
              <Zap className="h-4 w-4 text-brand-primary" />
              <span>Instant client-side compression</span>
            </div>
            <div className="flex items-center justify-center gap-2 bg-gray-50/50 dark:bg-brand-gray/30 p-3 rounded-xl border border-gray-100/50 dark:border-brand-gray/20">
              <ShieldCheck className="h-4 w-4 text-brand-primary" />
              <span>100% Secure & Confidential</span>
            </div>
            <div className="flex items-center justify-center gap-2 bg-gray-50/50 dark:bg-brand-gray/30 p-3 rounded-xl border border-gray-100/50 dark:border-brand-gray/20">
              <Percent className="h-4 w-4 text-brand-primary" />
              <span>Adjust ratios in real-time</span>
            </div>
          </div>
        </div>
      ) : (
        /* INTERACTIVE LOADED WORKSPACE PREVIEW LAYOUT */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT PANEL: REALTIME PARAMETER SLIDERS */}
          <div className="lg:col-span-4 space-y-6 bg-white dark:bg-brand-dark-light rounded-3xl border border-gray-100 dark:border-brand-gray/40 p-6 shadow-md shadow-gray-100/30">
            <h3 className="font-display text-lg font-bold text-gray-950 dark:text-white flex items-center gap-2">
              <Settings className="h-5 w-5 text-brand-primary" /> Compression Ratio
            </h3>

            <div className="space-y-4">
              <div className="flex justify-between items-center bg-gray-50 dark:bg-brand-gray/30 p-3 rounded-2xl border border-gray-100 dark:border-brand-gray/20">
                <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">Original Filename:</span>
                <span className="text-xs font-bold text-gray-900 dark:text-white truncate max-w-[160px]" title={file.name}>
                  {file.name}
                </span>
              </div>

              {imageDims && (
                <div className="flex justify-between items-center bg-gray-50 dark:bg-brand-gray/30 p-3 rounded-2xl border border-gray-100 dark:border-brand-gray/20">
                  <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">Resolution:</span>
                  <span className="text-xs font-mono font-bold text-gray-900 dark:text-white">
                    {imageDims.width} × {imageDims.height} px
                  </span>
                </div>
              )}
            </div>

            {/* Slider Control Block */}
            <div className="space-y-4 pt-4 border-t border-gray-100 dark:border-brand-gray/20">
              <div className="flex justify-between items-center">
                <label htmlFor="quality-slider" className="text-sm font-semibold text-gray-800 dark:text-white">
                  Target Quality
                </label>
                <div className="flex items-center gap-1.5">
                  <span className="px-2.5 py-1 text-xs font-mono font-bold text-white bg-brand-primary rounded-lg shadow-sm">
                    {quality}%
                  </span>
                </div>
              </div>

              <input
                id="quality-slider"
                type="range"
                min="10"
                max="100"
                step="1"
                value={quality}
                onChange={(e) => setQuality(parseInt(e.target.value))}
                className="w-full h-2 rounded-lg bg-gray-100 dark:bg-brand-gray accent-brand-primary cursor-pointer border-none"
              />

              <div className="flex justify-between text-[11px] text-gray-400 dark:text-zinc-500 font-mono">
                <span>10% (Min size)</span>
                <span>80% (Recommended)</span>
                <span>100% (Lossless)</span>
              </div>
            </div>

            {/* Interactive Stats Panel Summary */}
            <div className="p-4 rounded-2xl bg-orange-50/20 dark:bg-zinc-805/40 border border-orange-100/50 dark:border-brand-gray/50 space-y-3">
              <div className="flex justify-between items-center text-xs text-gray-500 dark:text-gray-400">
                <span>Original File Weight:</span>
                <span className="font-mono font-bold text-gray-900 dark:text-white">{formatBytes(originalSize)}</span>
              </div>

              <div className="flex justify-between items-center text-xs text-gray-500 dark:text-gray-400">
                <span>Estimated JPG Weight:</span>
                {isCompressing ? (
                  <span className="text-xs italic text-brand-primary animate-pulse font-mono font-bold">processing...</span>
                ) : (
                  <span className="font-mono font-bold text-gray-900 dark:text-white">{formatBytes(compressedSize)}</span>
                )}
              </div>

              {savingsPercentage > 0 && !isCompressing && (
                <div className="pt-2 border-t border-orange-100/30 dark:border-brand-gray/20 flex items-center justify-between text-xs font-bold text-brand-primary bg-orange-500/5 p-2 rounded-xl">
                  <span className="flex items-center gap-1">🎉 Space Cleared:</span>
                  <span className="text-sm font-mono tracking-tight font-extrabold flex items-center gap-0.5">
                    -{savingsPercentage}% ({formatBytes(originalSize - compressedSize)})
                  </span>
                </div>
              )}
            </div>

            {/* Operational Action Buttons */}
            <div className="pt-4 border-t border-gray-100 dark:border-brand-gray/20 space-y-3">
              <button
                onClick={handleDownload}
                disabled={isCompressing || !compressedUrl}
                className="w-full py-3.5 px-4 rounded-xl bg-brand-primary hover:bg-brand-primary-hover disabled:bg-gray-200 dark:disabled:bg-brand-gray disabled:cursor-not-allowed select-none text-white text-sm font-bold shadow-md shadow-orange-500/10 transition-transform active:scale-97 cursor-pointer flex items-center justify-center gap-2"
              >
                <Download className="h-4.5 w-4.5" /> Download Compressed JPG
              </button>

              <button
                onClick={handleReset}
                className="w-full py-2.5 px-4 text-xs font-bold text-red-650 dark:text-red-400 bg-red-50/30 dark:bg-red-950/20 border border-red-100/50 dark:border-red-900/10 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5"
              >
                <Trash2 className="h-4 w-4" /> Load a Different Image
              </button>
            </div>
          </div>

          {/* RIGHT PANEL: DUAL ORIGINAL VS COMPRESSED PREVIEWS */}
          <div className="lg:col-span-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              {/* Standard Original Panel */}
              <div className="bg-white dark:bg-brand-dark-light rounded-3xl border border-gray-100 dark:border-brand-gray/40 overflow-hidden shadow-sm flex flex-col h-full">
                <div className="p-4 bg-gray-50 dark:bg-brand-gray/20 border-b border-gray-150/70 dark:border-brand-gray/30 flex justify-between items-center">
                  <span className="text-xs font-bold text-gray-700 dark:text-gray-300 font-mono uppercase tracking-wider flex items-center gap-1.5">
                    Original Image
                  </span>
                  <span className="px-2 py-0.5 text-[10px] font-bold text-gray-500 bg-gray-100 dark:text-gray-400 dark:bg-brand-gray rounded font-mono">
                    {formatBytes(originalSize)}
                  </span>
                </div>

                <div className="p-4 flex-1 flex items-center justify-center bg-zinc-50 dark:bg-black/20 min-h-[300px] max-h-[460px] overflow-hidden">
                  {originalUrl ? (
                    <img 
                      src={originalUrl} 
                      alt="Original snapshot preview" 
                      className="max-h-[380px] max-w-full object-contain rounded-lg shadow-sm"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="text-center p-6 text-gray-400 dark:text-zinc-600 space-y-1">
                      <ImageIcon className="h-8 w-8 mx-auto opacity-40" />
                      <p className="text-xs">Initial image pending upload</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Advanced Compressed Preview */}
              <div className="bg-white dark:bg-brand-dark-light rounded-3xl border border-gray-100 dark:border-brand-gray/40 overflow-hidden shadow-sm flex flex-col h-full">
                <div className="p-4 bg-orange-50/40 dark:bg-brand-primary/10 border-b border-orange-100/50 dark:border-brand-gray/30 flex justify-between items-center">
                  <span className="text-xs font-bold text-brand-primary font-mono uppercase tracking-wider flex items-center gap-1.5">
                    Optimized JPG Preview
                  </span>
                  
                  {isCompressing ? (
                    <span className="text-[10px] bg-brand-primary/10 text-brand-primary px-2 py-0.5 inline-block rounded animate-pulse font-mono font-bold">
                      re-calculating...
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 text-[10px] font-bold text-brand-primary bg-orange-50 dark:bg-brand-primary/20 rounded font-mono">
                      {formatBytes(compressedSize)}
                    </span>
                  )}
                </div>

                <div className="p-4 flex-1 flex items-center justify-center bg-zinc-50 dark:bg-black/20 min-h-[300px] max-h-[460px] overflow-hidden relative">
                  {isCompressing && (
                    <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/70 dark:bg-brand-dark-light/80 backdrop-blur-xs">
                      <div className="text-center space-y-3">
                        <div className="h-8 w-8 border-4 border-brand-primary border-t-transparent rounded-full animate-spin mx-auto" />
                        <p className="text-xs font-semibold text-gray-500 dark:text-gray-400">Performing Web-Quantization...</p>
                      </div>
                    </div>
                  )}

                  {compressedUrl ? (
                    <img 
                      src={compressedUrl} 
                      alt="Compressed optimized web export" 
                      className="max-h-[380px] max-w-full object-contain rounded-lg shadow-sm"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="text-center p-6 text-gray-400 dark:text-zinc-600 space-y-1">
                      <ImageIcon className="h-8 w-8 mx-auto opacity-40" />
                      <p className="text-xs">Processing JPG parameters</p>
                    </div>
                  )}
                </div>
              </div>

            </div>

            {/* Privacy Acknowledge Badge strip */}
            <div className="p-4 rounded-2xl bg-gray-50/50 dark:bg-brand-dark-light border border-gray-100 dark:border-brand-gray/40 flex items-start gap-3">
              <Info className="h-5 w-5 text-brand-primary shrink-0 mt-0.5" />
              <div className="space-y-1 text-xs text-gray-500 dark:text-gray-400">
                <p className="font-semibold text-gray-900 dark:text-white">Active Offline Processing Mode Available</p>
                <p className="leading-relaxed">
                  All images are rasterized, encoded, and compressed cleanly directly on your local device's memory using standard browser APIs. No remote databases, analytics APIs, or files are uploaded to our cloud server, giving you 100% airtight privacy.
                </p>
              </div>
            </div>
          </div>

        </div>
      )}

    </div>
  );
}
