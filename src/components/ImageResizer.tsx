import React, { useState, useEffect, useRef } from 'react';
import { 
  Upload, 
  Download, 
  Trash2, 
  Settings, 
  Image as ImageIcon,
  ShieldCheck,
  Zap,
  Info,
  Maximize2,
  Lock,
  Unlock,
  RefreshCw
} from 'lucide-react';

interface ImageResizerProps {
  onGoBack: () => void;
}

export default function ImageResizer({ onGoBack }: ImageResizerProps) {
  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [originalUrl, setOriginalUrl] = useState<string | null>(null);
  const [originalSize, setOriginalSize] = useState<number>(0);
  const [resizedUrl, setResizedUrl] = useState<string | null>(null);
  const [resizedSize, setResizedSize] = useState<number>(0);
  const [width, setWidth] = useState<string>('');
  const [height, setHeight] = useState<string>('');
  const [maintainRatio, setMaintainRatio] = useState<boolean>(true);
  const [originalDims, setOriginalDims] = useState<{ width: number; height: number } | null>(null);
  const [isResizing, setIsResizing] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [format, setFormat] = useState<string>('image/png'); // Default format to maintain transparency

  const fileInputRef = useRef<HTMLInputElement>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);

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
      setErrorMsg('Invalid file format. Please upload an image file (JPG, JPEG, PNG, or WebP).');
      return;
    }
    setErrorMsg(null);
    setFile(inputFile);
    setOriginalSize(inputFile.size);
    setFormat(inputFile.type);

    const objectUrl = URL.createObjectURL(inputFile);
    setOriginalUrl(objectUrl);
  };

  // Handle dimensions tracking
  useEffect(() => {
    if (!originalUrl) {
      setOriginalDims(null);
      setWidth('');
      setHeight('');
      setResizedUrl(null);
      setResizedSize(0);
      return;
    }

    const img = new Image();
    img.onload = () => {
      setOriginalDims({ width: img.naturalWidth, height: img.naturalHeight });
      setWidth(img.naturalWidth.toString());
      setHeight(img.naturalHeight.toString());
    };
    img.onerror = () => {
      setErrorMsg('Failed to read the dimensions of the selected image.');
    };
    img.src = originalUrl;
  }, [originalUrl]);

  // Handle Dimension modifications
  const handleWidthChange = (val: string) => {
    setWidth(val);
    const parsedWidth = parseFloat(val);
    if (maintainRatio && originalDims && !isNaN(parsedWidth) && parsedWidth > 0) {
      const calculatedHeight = Math.round((parsedWidth / originalDims.width) * originalDims.height);
      setHeight(calculatedHeight.toString());
    }
  };

  const handleHeightChange = (val: string) => {
    setHeight(val);
    const parsedHeight = parseFloat(val);
    if (maintainRatio && originalDims && !isNaN(parsedHeight) && parsedHeight > 0) {
      const calculatedWidth = Math.round((parsedHeight / originalDims.height) * originalDims.width);
      setWidth(calculatedWidth.toString());
    }
  };

  // Trigger aspect ratio toggles and recalculate if active
  const toggleMaintainRatio = () => {
    const nextRatio = !maintainRatio;
    setMaintainRatio(nextRatio);
    if (nextRatio && originalDims && width) {
      const parsedWidth = parseFloat(width);
      if (!isNaN(parsedWidth) && parsedWidth > 0) {
        const calculatedHeight = Math.round((parsedWidth / originalDims.width) * originalDims.height);
        setHeight(calculatedHeight.toString());
      }
    }
  };

  // Preset scaling helpers
  const handleApplyPreset = (percent: number) => {
    if (!originalDims) return;
    const calculatedWidth = Math.round((originalDims.width * percent) / 100);
    const calculatedHeight = Math.round((originalDims.height * percent) / 100);
    setWidth(calculatedWidth.toString());
    setHeight(calculatedHeight.toString());
  };

  // Perform canvas resizing
  useEffect(() => {
    if (!originalUrl || !originalDims) {
      setResizedUrl(null);
      setResizedSize(0);
      return;
    }

    const targetWidth = parseInt(width);
    const targetHeight = parseInt(height);

    if (isNaN(targetWidth) || targetWidth <= 0 || isNaN(targetHeight) || targetHeight <= 0) {
      return;
    }

    setIsResizing(true);
    const timeoutId = setTimeout(() => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = targetWidth;
        canvas.height = targetHeight;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          setErrorMsg('Unable to retrieve canvas context for resizing action.');
          setIsResizing(false);
          return;
        }

        // Apply quality scale image smoothing properties
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';

        // Render resized visual bounds
        ctx.drawImage(img, 0, 0, targetWidth, targetHeight);

        canvas.toBlob(
          (blob) => {
            if (blob) {
              if (resizedUrl) {
                URL.revokeObjectURL(resizedUrl);
              }
              const compUrl = URL.createObjectURL(blob);
              setResizedUrl(compUrl);
              setResizedSize(blob.size);
            }
            setIsResizing(false);
          },
          format,
          format === 'image/jpeg' ? 0.92 : undefined
        );
      };

      img.onerror = () => {
        setErrorMsg('Failed to process image during scaling step.');
        setIsResizing(false);
      };

      img.src = originalUrl;
    }, 250); // Small debounce to avoid flashing during quick keystrokes 

    return () => clearTimeout(timeoutId);
  }, [originalUrl, originalDims, width, height, format]);

  // Reset the loaded configuration workspace
  const handleReset = () => {
    if (originalUrl) URL.revokeObjectURL(originalUrl);
    if (resizedUrl) URL.revokeObjectURL(resizedUrl);
    setFile(null);
    setOriginalUrl(null);
    setResizedUrl(null);
    setOriginalSize(0);
    setResizedSize(0);
    setWidth('');
    setHeight('');
    setOriginalDims(null);
    setErrorMsg(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Initiate file download trigger safety
  const handleDownload = () => {
    if (!resizedUrl || !file) return;
    const link = document.createElement('a');
    link.href = resizedUrl;
    
    const extension = format === 'image/jpeg' ? 'jpg' : format === 'image/webp' ? 'webp' : 'png';
    const originalName = file.name;
    const lastDotIndex = originalName.lastIndexOf('.');
    const baseName = lastDotIndex !== -1 ? originalName.substring(0, lastDotIndex) : originalName;
    link.download = `resized-${baseName}-${width}x${height}.${extension}`;
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

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
            <span className="text-brand-primary">Image Resizer</span>
          </div>
          <h1 className="font-display text-3xl font-extrabold text-gray-900 dark:text-white flex items-center gap-2.5">
            <span className="text-brand-primary">📐</span> Image Resizer
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Scale pixel widths, preset size percentages, or custom align coordinates with real-time lock ratio support.
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
          id="drag-drop-resizer-uploader"
        >
          <input 
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            className="hidden"
          />

          <div className="relative flex h-20 w-20 items-center justify-center rounded-3xl bg-orange-50 dark:bg-brand-gray text-brand-primary transition-transform group-hover:scale-105 duration-300">
            <div className="absolute inset-0 rounded-3xl bg-brand-primary/10 blur-xl pointer-events-none group-hover:opacity-100 opacity-60 transition-opacity" />
            <Maximize2 className="h-10 w-10 animate-pulse" />
          </div>

          <div className="space-y-2 max-w-md">
            <p className="font-display text-lg font-bold text-gray-900 dark:text-white">
              Drag & drop your image here to resize
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              or <span className="text-brand-primary font-bold hover:underline cursor-pointer">browse from computer</span> to scale locally.
            </p>
            <p className="text-xs text-gray-400 dark:text-zinc-500 italic mt-4">
              Supports JPG, PNG, WebP, SVG and more. Safe device-only processing.
            </p>
          </div>

          {/* Core Feature bullet flags */}
          <div className="pt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-2xl text-xs font-semibold text-gray-650 dark:text-gray-350">
            <div className="flex items-center justify-center gap-2 bg-gray-50/50 dark:bg-brand-gray/30 p-3 rounded-xl border border-gray-100/50 dark:border-brand-gray/20">
              <Zap className="h-4 w-4 text-brand-primary" />
              <span>Aspect ratio lock protection</span>
            </div>
            <div className="flex items-center justify-center gap-2 bg-gray-50/50 dark:bg-brand-gray/30 p-3 rounded-xl border border-gray-100/50 dark:border-brand-gray/20">
              <ShieldCheck className="h-4 w-4 text-brand-primary" />
              <span>100% Secure offline processing</span>
            </div>
            <div className="flex items-center justify-center gap-2 bg-gray-50/50 dark:bg-brand-gray/30 p-3 rounded-xl border border-gray-100/50 dark:border-brand-gray/20">
              <RefreshCw className="h-4 w-4 text-brand-primary" />
              <span>Bilinear interpolation smoothing</span>
            </div>
          </div>
        </div>
      ) : (
        /* INTERACTIVE LOADED WORKSPACE PREVIEW LAYOUT */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT PANEL: REALTIME DIMENSIONS SETTING */}
          <div className="lg:col-span-4 space-y-6 bg-white dark:bg-brand-dark-light rounded-3xl border border-gray-100 dark:border-brand-gray/40 p-6 shadow-md shadow-gray-100/30">
            <h3 className="font-display text-lg font-bold text-gray-950 dark:text-white flex items-center gap-2">
              <Settings className="h-5 w-5 text-brand-primary" /> Scale Constraints
            </h3>

            {/* Scale Dimensions Control Block */}
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label htmlFor="resizer-width" className="text-xs font-bold text-gray-550 dark:text-gray-400">
                    Width (px)
                  </label>
                  <input
                    id="resizer-width"
                    type="number"
                    value={width}
                    onChange={(e) => handleWidthChange(e.target.value)}
                    placeholder="Width"
                    className="w-full px-3.5 py-2 rounded-xl text-sm font-semibold bg-gray-50 dark:bg-brand-dark hover:bg-white focus:bg-white border border-gray-200 dark:border-brand-gray/60 text-gray-900 dark:text-white outline-none focus:border-brand-primary transition-all font-mono"
                  />
                </div>

                <div className="space-y-1">
                  <label htmlFor="resizer-height" className="text-xs font-bold text-gray-550 dark:text-gray-400">
                    Height (px)
                  </label>
                  <input
                    id="resizer-height"
                    type="number"
                    value={height}
                    onChange={(e) => handleHeightChange(e.target.value)}
                    placeholder="Height"
                    className="w-full px-3.5 py-2 rounded-xl text-sm font-semibold bg-gray-50 dark:bg-brand-dark hover:bg-white focus:bg-white border border-gray-200 dark:border-brand-gray/60 text-gray-900 dark:text-white outline-none focus:border-brand-primary transition-all font-mono"
                  />
                </div>
              </div>

              {/* Aspect Ratio Lock Toggle Action */}
              <button
                type="button"
                onClick={toggleMaintainRatio}
                className={`w-full py-2 px-4 rounded-xl text-xs font-bold transition-all border flex items-center justify-center gap-2 cursor-pointer ${
                  maintainRatio
                    ? 'bg-orange-500/[0.04] border-orange-200 text-brand-primary'
                    : 'bg-gray-50 dark:bg-brand-gray border-gray-200 dark:border-brand-gray/50 text-gray-500 dark:text-gray-400'
                }`}
              >
                {maintainRatio ? (
                  <>
                    <Lock className="h-4 w-4" /> Maintain Aspect Ratio Active
                  </>
                ) : (
                  <>
                    <Unlock className="h-4 w-4" /> Aspect Ratio Unlocked
                  </>
                )}
              </button>
            </div>

            {/* Quick Presets Scaling Bar */}
            <div className="space-y-2 pt-4 border-t border-gray-100 dark:border-brand-gray/20">
              <span className="block text-xs font-bold text-gray-650 dark:text-gray-400 mb-1">
                Quick Scaling Presets
              </span>
              <div className="grid grid-cols-4 gap-1.5">
                {[
                  { label: '25%', val: 25 },
                  { label: '50%', val: 50 },
                  { label: '75%', val: 75 },
                  { label: '100%', val: 100 },
                ].map((preset) => (
                  <button
                    key={preset.label}
                    type="button"
                    onClick={() => handleApplyPreset(preset.val)}
                    className="py-1.5 px-2 text-xs font-bold bg-gray-50 hover:bg-orange-500 hover:text-white dark:bg-brand-gray dark:hover:bg-zinc-800 text-gray-700 dark:text-white rounded-lg transition-all cursor-pointer select-none text-center font-mono active:scale-95"
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Format Picker */}
            <div className="space-y-2 pt-4 border-t border-gray-100 dark:border-brand-gray/20">
              <label htmlFor="resizer-format" className="block text-xs font-bold text-gray-650 dark:text-gray-400">
                Export Target Format
              </label>
              <select
                id="resizer-format"
                value={format}
                onChange={(e) => setFormat(e.target.value)}
                className="w-full px-3 py-2 text-xs font-bold bg-gray-50 dark:bg-brand-dark border border-gray-200 dark:border-brand-gray/60 text-gray-800 dark:text-white rounded-xl outline-none focus:border-brand-primary"
              >
                <option value="image/png">PNG Export (Lossless, Transparent)</option>
                <option value="image/jpeg">JPG Export (Standard Web, Consolidated)</option>
                <option value="image/webp">WebP Export (Modern Next-Gen Format)</option>
              </select>
            </div>

            {/* Realtime Dimensions Meta Info summary card */}
            <div className="p-4 rounded-2xl bg-orange-50/20 dark:bg-zinc-805/40 border border-orange-100/50 dark:border-brand-gray/50 space-y-3">
              {originalDims && (
                <div className="flex justify-between items-center text-xs text-gray-500 dark:text-gray-400">
                  <span>Original Dimensions:</span>
                  <span className="font-mono font-bold text-gray-900 dark:text-white">
                    {originalDims.width} × {originalDims.height} px
                  </span>
                </div>
              )}

              <div className="flex justify-between items-center text-xs text-gray-500 dark:text-gray-400">
                <span>Resized Image Weight:</span>
                {isResizing ? (
                  <span className="text-xs italic text-brand-primary animate-pulse font-mono font-bold">crunching...</span>
                ) : (
                  <span className="font-mono font-bold text-gray-900 dark:text-white">{formatBytes(resizedSize)}</span>
                )}
              </div>
            </div>

            {/* Operational Action Buttons */}
            <div className="pt-4 border-t border-gray-100 dark:border-brand-gray/20 space-y-3">
              <button
                onClick={handleDownload}
                disabled={isResizing || !resizedUrl}
                className="w-full py-3.5 px-4 rounded-xl bg-brand-primary hover:bg-brand-primary-hover disabled:bg-gray-200 dark:disabled:bg-brand-gray disabled:cursor-not-allowed select-none text-white text-sm font-bold shadow-md shadow-orange-500/10 transition-transform active:scale-97 cursor-pointer flex items-center justify-center gap-2"
              >
                <Download className="h-4.5 w-4.5" /> Download Resized Image
              </button>

              <button
                onClick={handleReset}
                className="w-full py-2.5 px-4 text-xs font-bold text-red-650 dark:text-red-400 bg-red-50/30 dark:bg-red-950/20 border border-red-100/50 dark:border-red-900/10 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5"
              >
                <Trash2 className="h-4 w-4" /> Load a Different Image
              </button>
            </div>
          </div>

          {/* RIGHT PANEL: DUAL ORIGINAL VS RESIZED PREVIEWS */}
          <div className="lg:col-span-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              {/* Standard Original Panel */}
              <div className="bg-white dark:bg-brand-dark-light rounded-3xl border border-gray-100 dark:border-brand-gray/40 overflow-hidden shadow-sm flex flex-col h-full">
                <div className="p-4 bg-gray-50 dark:bg-brand-gray/20 border-b border-gray-110 dark:border-brand-gray/30 flex justify-between items-center">
                  <span className="text-xs font-bold text-gray-700 dark:text-gray-300 font-mono uppercase tracking-wider flex items-center gap-1.5">
                    Original Preview
                  </span>
                  <span className="px-2 py-0.5 text-[10px] font-bold text-gray-500 bg-gray-100 dark:text-gray-400 dark:bg-brand-gray rounded font-mono">
                    {formatBytes(originalSize)}
                  </span>
                </div>

                <div className="p-4 flex-1 flex items-center justify-center bg-zinc-50 dark:bg-black/20 min-h-[300px] max-h-[460px] overflow-hidden">
                  {originalUrl && (
                    <img 
                      ref={imgRef}
                      src={originalUrl} 
                      alt="Original preset visual" 
                      className="max-h-[380px] max-w-full object-contain rounded-lg shadow-sm"
                      referrerPolicy="no-referrer"
                    />
                  )}
                </div>
              </div>

              {/* Scaled Target Preview */}
              <div className="bg-white dark:bg-brand-dark-light rounded-3xl border border-gray-100 dark:border-brand-gray/40 overflow-hidden shadow-sm flex flex-col h-full">
                <div className="p-4 bg-orange-50/40 dark:bg-brand-primary/10 border-b border-orange-100/50 dark:border-brand-gray/30 flex justify-between items-center">
                  <span className="text-xs font-bold text-brand-primary font-mono uppercase tracking-wider flex items-center gap-1.5">
                    Resized Export Preview
                  </span>
                  
                  {isResizing ? (
                    <span className="text-[10px] bg-brand-primary/10 text-brand-primary px-2 py-0.5 inline-block rounded animate-pulse font-mono font-bold">
                      rendering...
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 text-[10px] font-bold text-brand-primary bg-orange-50 dark:bg-brand-primary/20 rounded font-mono">
                      {formatBytes(resizedSize)}
                    </span>
                  )}
                </div>

                <div className="p-4 flex-1 flex items-center justify-center bg-zinc-50 dark:bg-black/20 min-h-[300px] max-h-[460px] overflow-hidden relative">
                  {isResizing && (
                    <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/70 dark:bg-brand-dark-light/80 backdrop-blur-xs">
                      <div className="text-center space-y-3">
                        <div className="h-8 w-8 border-4 border-brand-primary border-t-transparent rounded-full animate-spin mx-auto" />
                        <p className="text-xs font-semibold text-gray-500 dark:text-gray-400">Rendering Canvas Stream...</p>
                      </div>
                    </div>
                  )}

                  {resizedUrl ? (
                    <img 
                      src={resizedUrl} 
                      alt="Resized optimized scale frame" 
                      className="max-h-[380px] max-w-full object-contain rounded-lg shadow-sm"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="text-center p-6 text-gray-400 dark:text-zinc-650 space-y-1">
                      <ImageIcon className="h-8 w-8 mx-auto opacity-40" />
                      <p className="text-xs">Adjust dimensions to compute grid</p>
                    </div>
                  )}
                </div>
              </div>

            </div>

            {/* Security Notice */}
            <div className="p-4 rounded-2xl bg-gray-50/50 dark:bg-brand-dark-light border border-gray-100 dark:border-brand-gray/40 flex items-start gap-3">
              <Info className="h-5 w-5 text-brand-primary shrink-0 mt-0.5" />
              <div className="space-y-1 text-xs text-gray-500 dark:text-gray-400">
                <p className="font-semibold text-gray-900 dark:text-white">Professional-Grade Resampling Algorithms</p>
                <p className="leading-relaxed">
                  Pixels are resampled fully client-side on high-fidelity HTML5 rendering engines. Images are processed instantaneously in your browser memory for pure speed, safety, and reliability.
                </p>
              </div>
            </div>
          </div>

        </div>
      )}

    </div>
  );
}
