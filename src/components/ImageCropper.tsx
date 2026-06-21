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
  Crop,
  Grid,
  Maximize2
} from 'lucide-react';

interface ImageCropperProps {
  onGoBack: () => void;
}

interface CropArea {
  x: number;     // percent of image width (0 - 100)
  y: number;     // percent of image height (0 - 100)
  width: number; // percent (0 - 100)
  height: number;// percent (0 - 100)
}

export default function ImageCropper({ onGoBack }: ImageCropperProps) {
  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [originalUrl, setOriginalUrl] = useState<string | null>(null);
  const [originalSize, setOriginalSize] = useState<number>(0);
  const [croppedUrl, setCroppedUrl] = useState<string | null>(null);
  const [croppedSize, setCroppedSize] = useState<number>(0);
  
  // Crop parameters in % representing the selection relative to natural dimensions
  const [crop, setCrop] = useState<CropArea>({ x: 10, y: 10, width: 80, height: 80 });
  const [aspectRatio, setAspectRatio] = useState<string>('free'); // 'free', '1:1', '16:9', '4:3'
  const [originalDims, setOriginalDims] = useState<{ width: number; height: number } | null>(null);
  const [isCropping, setIsCropping] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  
  // Dragging crop overlay controls
  const [isDraggingBox, setIsDraggingBox] = useState<boolean>(false);
  const [isResizingBox, setIsResizingBox] = useState<string | null>(null); // 'nw', 'ne', 'se', 'sw'
  const dragStartRef = useRef<{ mX: number; mY: number; cX: number; cY: number; cW: number; cH: number } | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

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
      setErrorMsg('Invalid file format. Please upload an image file (JPG, JPEG, PNG, or WebP).');
      return;
    }
    setErrorMsg(null);
    setFile(inputFile);
    setOriginalSize(inputFile.size);

    const objectUrl = URL.createObjectURL(inputFile);
    setOriginalUrl(objectUrl);
  };

  // Load natural dimensions
  useEffect(() => {
    if (!originalUrl) {
      setOriginalDims(null);
      setCroppedUrl(null);
      setCroppedSize(0);
      return;
    }

    const img = new Image();
    img.onload = () => {
      setOriginalDims({ width: img.naturalWidth, height: img.naturalHeight });
      // Reset crop to a sensible centered rectangle
      setCrop({ x: 15, y: 15, width: 70, height: 70 });
      setAspectRatio('free');
    };
    img.onerror = () => {
      setErrorMsg('Failed to read image properties.');
    };
    img.src = originalUrl;
  }, [originalUrl]);

  // Handle aspect ratio overrides
  const applyAspectRatio = (ratioType: string, currentCrop = crop) => {
    setAspectRatio(ratioType);
    if (!originalDims) return;

    let targetWidth = currentCrop.width;
    let targetHeight = currentCrop.height;

    // Convert crop % sizes back to pixels to do math accurately
    const imgW = originalDims.width;
    const imgH = originalDims.height;

    if (ratioType === '1:1') {
      // Fit to square based on the smaller dimension
      const minSz = Math.min(imgW * (targetWidth / 100), imgH * (targetHeight / 100));
      targetWidth = (minSz / imgW) * 100;
      targetHeight = (minSz / imgH) * 100;
    } else if (ratioType === '16:9') {
      const baseWidthPx = imgW * (targetWidth / 100);
      const idealHeightPx = (baseWidthPx * 9) / 16;
      if (idealHeightPx <= imgH) {
        targetHeight = (idealHeightPx / imgH) * 100;
      } else {
        const baseHeightPx = imgH * (targetHeight / 100);
        targetWidth = ((baseHeightPx * 16) / 9 / imgW) * 100;
      }
    } else if (ratioType === '4:3') {
      const baseWidthPx = imgW * (targetWidth / 100);
      const idealHeightPx = (baseWidthPx * 3) / 4;
      if (idealHeightPx <= imgH) {
        targetHeight = (idealHeightPx / imgH) * 100;
      } else {
        const baseHeightPx = imgH * (targetHeight / 100);
        targetWidth = ((baseHeightPx * 4) / 3 / imgW) * 100;
      }
    } else {
      return; // Free aspect ratio doesn't modify values
    }

    // Keep it centered or bounded within (100 - size)
    const newX = Math.max(0, Math.min(100 - targetWidth, currentCrop.x));
    const newY = Math.max(0, Math.min(100 - targetHeight, currentCrop.y));

    setCrop({
      x: Math.round(newX),
      y: Math.round(newY),
      width: Math.round(targetWidth),
      height: Math.round(targetHeight)
    });
  };

  // Perform canvas cropping using dynamic canvas viewport
  useEffect(() => {
    if (!originalUrl || !originalDims) {
      setCroppedUrl(null);
      setCroppedSize(0);
      return;
    }

    setIsCropping(true);

    const timeoutId = setTimeout(() => {
      const img = new Image();
      img.onload = () => {
        // Calculate exact source pixel positions
        const sourceX = (crop.x / 100) * originalDims.width;
        const sourceY = (crop.y / 100) * originalDims.height;
        const sourceW = (crop.width / 100) * originalDims.width;
        const sourceH = (crop.height / 100) * originalDims.height;

        if (sourceW <= 1 || sourceH <= 1) {
          setIsCropping(false);
          return;
        }

        const canvas = document.createElement('canvas');
        canvas.width = sourceW;
        canvas.height = sourceH;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          setErrorMsg('Failed to acquire canvas 2D rendering instance.');
          setIsCropping(false);
          return;
        }

        // Apply high precision blending properties
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';

        // Perform crop transfer
        ctx.drawImage(
          img,
          sourceX, sourceY, sourceW, sourceH, // Source boundaries
          0, 0, sourceW, sourceH              // Target destination matching canvas dimensions
        );

        canvas.toBlob(
          (blob) => {
            if (blob) {
              if (croppedUrl) {
                URL.revokeObjectURL(croppedUrl);
              }
              const compUrl = URL.createObjectURL(blob);
              setCroppedUrl(compUrl);
              setCroppedSize(blob.size);
            }
            setIsCropping(false);
          },
          file?.type || 'image/png'
        );
      };

      img.onerror = () => {
        setErrorMsg('Failed to parse crop boundaries.');
        setIsCropping(false);
      };

      img.src = originalUrl;
    }, 200); // Debounce visual recalculation

    return () => clearTimeout(timeoutId);
  }, [originalUrl, originalDims, crop]);

  // Pointer/Mouse interactive events over the crop workspace preview
  const handleContainerMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const mouseX = ((e.clientX - rect.left) / rect.width) * 100;
    const mouseY = ((e.clientY - rect.top) / rect.height) * 100;

    // Determine target click: Is it a corner handle?
    // Check northwest handle
    const handleThreshold = 5; // bounds accuracy
    const distanceToNW = Math.hypot(mouseX - crop.x, mouseY - crop.y);
    const distanceToNE = Math.hypot(mouseX - (crop.x + crop.width), mouseY - crop.y);
    const distanceToSE = Math.hypot(mouseX - (crop.x + crop.width), mouseY - (crop.y + crop.height));
    const distanceToSW = Math.hypot(mouseX - crop.x, mouseY - (crop.y + crop.height));

    if (distanceToNW < handleThreshold) {
      setIsResizingBox('nw');
    } else if (distanceToNE < handleThreshold) {
      setIsResizingBox('ne');
    } else if (distanceToSE < handleThreshold) {
      setIsResizingBox('se');
    } else if (distanceToSW < handleThreshold) {
      setIsResizingBox('sw');
    } else if (
      mouseX >= crop.x && 
      mouseX <= crop.x + crop.width && 
      mouseY >= crop.y && 
      mouseY <= crop.y + crop.height
    ) {
      setIsDraggingBox(true);
    } else {
      // Start free-form drag crop box creation
      setCrop({ x: Math.round(mouseX), y: Math.round(mouseY), width: 1, height: 1 });
      setIsResizingBox('se');
    }

    dragStartRef.current = {
      mX: mouseX,
      mY: mouseY,
      cX: crop.x,
      cY: crop.y,
      cW: crop.width,
      cH: crop.height
    };
  };

  const handleContainerMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!dragStartRef.current || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const mouseX = ((e.clientX - rect.left) / rect.width) * 100;
    const mouseY = ((e.clientY - rect.top) / rect.height) * 100;

    const start = dragStartRef.current;
    const deltaX = mouseX - start.mX;
    const deltaY = mouseY - start.mY;

    if (isDraggingBox) {
      // Displace existing bounding box
      let nextX = Math.round(start.cX + deltaX);
      let nextY = Math.round(start.cY + deltaY);

      // Clamp limits to prevent visual overflows
      nextX = Math.max(0, Math.min(100 - start.cW, nextX));
      nextY = Math.max(0, Math.min(100 - start.cH, nextY));

      setCrop(prev => ({ ...prev, x: nextX, y: nextY }));
    } else if (isResizingBox) {
      let nextX = crop.x;
      let nextY = crop.y;
      let nextW = crop.width;
      let nextH = crop.height;

      if (isResizingBox === 'se') {
        nextW = Math.max(5, Math.min(100 - start.cX, start.cW + deltaX));
        nextH = Math.max(5, Math.min(100 - start.cY, start.cH + deltaY));
      } else if (isResizingBox === 'sw') {
        const potentialW = start.cW - deltaX;
        if (potentialW >= 5 && start.cX + deltaX >= 0) {
          nextX = start.cX + deltaX;
          nextW = potentialW;
        }
        nextH = Math.max(5, Math.min(100 - start.cY, start.cH + deltaY));
      } else if (isResizingBox === 'nw') {
        const potentialW = start.cW - deltaX;
        const potentialH = start.cH - deltaY;
        if (potentialW >= 5 && start.cX + deltaX >= 0) {
          nextX = start.cX + deltaX;
          nextW = potentialW;
        }
        if (potentialH >= 5 && start.cY + deltaY >= 0) {
          nextY = start.cY + deltaY;
          nextH = potentialH;
        }
      } else if (isResizingBox === 'ne') {
        nextW = Math.max(5, Math.min(100 - start.cX, start.cW + deltaX));
        const potentialH = start.cH - deltaY;
        if (potentialH >= 5 && start.cY + deltaY >= 0) {
          nextY = start.cY + deltaY;
          nextH = potentialH;
        }
      }

      const rawCrop = {
        x: Math.round(nextX),
        y: Math.round(nextY),
        width: Math.round(nextW),
        height: Math.round(nextH)
      };

      if (aspectRatio === 'free') {
        setCrop(rawCrop);
      } else {
        // Enforce aspect ratio integrity during resizing recalculation
        applyAspectRatio(aspectRatio, rawCrop);
      }
    }
  };

  const handleContainerMouseUpOrLeave = () => {
    setIsDraggingBox(false);
    setIsResizingBox(null);
    dragStartRef.current = null;
  };

  // Safe manual slider input changes
  const handleSliderChange = (field: keyof CropArea, value: number) => {
    const rawCrop = { ...crop, [field]: value };
    // Maintain alignment limitations
    if (field === 'x') rawCrop.x = Math.min(100 - crop.width, value);
    if (field === 'y') rawCrop.y = Math.min(100 - crop.height, value);
    if (field === 'width') rawCrop.width = Math.min(100 - crop.x, value);
    if (field === 'height') rawCrop.height = Math.min(100 - crop.y, value);

    if (aspectRatio === 'free') {
      setCrop(rawCrop);
    } else {
      applyAspectRatio(aspectRatio, rawCrop);
    }
  };

  // Reset workspace parameters completely
  const handleReset = () => {
    if (originalUrl) URL.revokeObjectURL(originalUrl);
    if (croppedUrl) URL.revokeObjectURL(croppedUrl);
    setFile(null);
    setOriginalUrl(null);
    setCroppedUrl(null);
    setOriginalSize(0);
    setCroppedSize(0);
    setOriginalDims(null);
    setErrorMsg(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Anchor and downloadcropped segment payload safely
  const handleDownload = () => {
    if (!croppedUrl || !file) return;
    const link = document.createElement('a');
    link.href = croppedUrl;
    
    // Maintain original extensions
    const originalName = file.name;
    const lastDotIndex = originalName.lastIndexOf('.');
    const baseName = lastDotIndex !== -1 ? originalName.substring(0, lastDotIndex) : originalName;
    const extension = file.type.split('/')[1] || 'png';
    link.download = `cropped-${baseName}-${crop.width}x${crop.height}.${extension}`;
    
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
            <span className="text-brand-primary">Precision Image Cropper</span>
          </div>
          <h1 className="font-display text-3xl font-extrabold text-gray-900 dark:text-white flex items-center gap-2.5">
            <span className="text-brand-primary">✂️</span> Precision Image Cropper
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Cut margins, align crops to standard squares or banners, and customize framing rules completely inside your browser.
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
          id="drag-drop-cropper-uploader"
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
            <Crop className="h-10 w-10 animate-pulse" />
          </div>

          <div className="space-y-2 max-w-md">
            <p className="font-display text-lg font-bold text-gray-900 dark:text-white">
              Drag & drop your image here to start cropping
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              or <span className="text-brand-primary font-bold hover:underline cursor-pointer">browse from computer</span> to crop locally.
            </p>
            <p className="text-xs text-gray-400 dark:text-zinc-500 italic mt-4">
              Airtight pixel precision with no image quality degradation. Done locally.
            </p>
          </div>

          {/* Core Feature bullet flags */}
          <div className="pt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-2xl text-xs font-semibold text-gray-655 dark:text-gray-350">
            <div className="flex items-center justify-center gap-2 bg-gray-50/50 dark:bg-brand-gray/30 p-3 rounded-xl border border-gray-100/50 dark:border-brand-gray/20">
              <Zap className="h-4 w-4 text-brand-primary" />
              <span>Fluid draggable crop frame overlays</span>
            </div>
            <div className="flex items-center justify-center gap-2 bg-gray-50/50 dark:bg-brand-gray/30 p-3 rounded-xl border border-gray-100/50 dark:border-brand-gray/20">
              <ShieldCheck className="h-4 w-4 text-brand-primary" />
              <span>Full privacy local processing</span>
            </div>
            <div className="flex items-center justify-center gap-2 bg-gray-50/50 dark:bg-brand-gray/30 p-3 rounded-xl border border-gray-100/50 dark:border-brand-gray/20">
              <Grid className="h-4 w-4 text-brand-primary" />
              <span>Classic alignment grids</span>
            </div>
          </div>
        </div>
      ) : (
        /* INTERACTIVE LOADED WORKSPACE PREVIEW LAYOUT */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT PANEL: ASPECT RATIOS & TUNING COORDINATES */}
          <div className="lg:col-span-4 space-y-6 bg-white dark:bg-brand-dark-light rounded-3xl border border-gray-100 dark:border-brand-gray/40 p-6 shadow-md shadow-gray-100/30">
            <h3 className="font-display text-lg font-bold text-gray-950 dark:text-white flex items-center gap-2">
              <Settings className="h-5 w-5 text-brand-primary" /> Aspect Presets
            </h3>

            {/* Quick Presets Selection Bar */}
            <div className="grid grid-cols-2 gap-2">
              {[
                { label: 'Free-form Standard', id: 'free' },
                { label: '1:1 Square (Instagram)', id: '1:1' },
                { label: '16:9 Cinema Wide', id: '16:9' },
                { label: '4:3 Classic Standard', id: '4:3' },
              ].map((style) => (
                <button
                  key={style.id}
                  type="button"
                  onClick={() => applyAspectRatio(style.id)}
                  className={`py-2 px-3 text-xs font-bold rounded-xl transition-all border text-center cursor-pointer select-none truncate ${
                    aspectRatio === style.id
                      ? 'bg-orange-500/[0.04] border-orange-200 text-brand-primary font-bold'
                      : 'bg-gray-50 dark:bg-brand-gray border-gray-200 dark:border-brand-gray/50 text-gray-700 dark:text-gray-300'
                  }`}
                  title={style.label}
                >
                  {style.label}
                </button>
              ))}
            </div>

            {/* Fine Tuning Coordinates (Sliders) */}
            <div className="space-y-4 pt-4 border-t border-gray-100 dark:border-brand-gray/20">
              <span className="block text-xs font-bold text-gray-650 dark:text-gray-400 uppercase tracking-wider font-mono">
                🛠️ Boundary Coordinates
              </span>

              {/* Slider controls for precise offsets */}
              <div className="space-y-3.5 text-xs">
                <div className="space-y-1">
                  <div className="flex justify-between font-mono font-semibold">
                    <span>X Offset (X-Start):</span>
                    <span className="text-brand-primary">{crop.x}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max={100 - crop.width}
                    value={crop.x}
                    onChange={(e) => handleSliderChange('x', parseInt(e.target.value))}
                    className="w-full accent-brand-primary cursor-pointer"
                  />
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between font-mono font-semibold">
                    <span>Y Offset (Y-Start):</span>
                    <span className="text-brand-primary">{crop.y}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max={100 - crop.height}
                    value={crop.y}
                    onChange={(e) => handleSliderChange('y', parseInt(e.target.value))}
                    className="w-full accent-brand-primary cursor-pointer"
                  />
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between font-mono font-semibold">
                    <span>Target Width:</span>
                    <span className="text-brand-primary">{crop.width}%</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max={100 - crop.x}
                    value={crop.width}
                    onChange={(e) => handleSliderChange('width', parseInt(e.target.value))}
                    className="w-full accent-brand-primary cursor-pointer"
                  />
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between font-mono font-semibold">
                    <span>Target Height:</span>
                    <span className="text-brand-primary">{crop.height}%</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max={100 - crop.y}
                    value={crop.height}
                    onChange={(e) => handleSliderChange('height', parseInt(e.target.value))}
                    className="w-full accent-brand-primary cursor-pointer"
                  />
                </div>
              </div>
            </div>

            {/* Live Cropper Metadata Summary Card */}
            <div className="p-4 rounded-2xl bg-orange-50/20 dark:bg-zinc-805/40 border border-orange-100/50 dark:border-brand-gray/50 space-y-3">
              {originalDims && (
                <>
                  <div className="flex justify-between items-center text-xs text-gray-500 dark:text-gray-400">
                    <span>Original Resolution:</span>
                    <span className="font-mono font-bold text-gray-900 dark:text-white">
                      {originalDims.width} × {originalDims.height} px
                    </span>
                  </div>

                  <div className="flex justify-between items-center text-xs text-gray-500 dark:text-gray-400">
                    <span>Cropped Resolution:</span>
                    <span className="font-mono font-bold text-brand-primary">
                      {Math.round((crop.width / 100) * originalDims.width)} × {Math.round((crop.height / 100) * originalDims.height)} px
                    </span>
                  </div>
                </>
              )}

              <div className="flex justify-between items-center text-xs text-gray-500 dark:text-gray-400">
                <span>Exported File Weight:</span>
                {isCropping ? (
                  <span className="text-xs italic text-brand-primary animate-pulse font-mono font-bold">slicing...</span>
                ) : (
                  <span className="font-mono font-bold text-gray-900 dark:text-white">{formatBytes(croppedSize)}</span>
                )}
              </div>
            </div>

            {/* Operational Action Buttons */}
            <div className="pt-4 border-t border-gray-100 dark:border-brand-gray/20 space-y-3">
              <button
                onClick={handleDownload}
                disabled={isCropping || !croppedUrl}
                className="w-full py-3.5 px-4 rounded-xl bg-brand-primary hover:bg-brand-primary-hover disabled:bg-gray-200 dark:disabled:bg-brand-gray disabled:cursor-not-allowed select-none text-white text-sm font-bold shadow-md shadow-orange-500/10 transition-transform active:scale-97 cursor-pointer flex items-center justify-center gap-2"
              >
                <Download className="h-4.5 w-4.5" /> Download Cropped Image
              </button>

              <button
                onClick={handleReset}
                className="w-full py-2.5 px-4 text-xs font-bold text-red-650 dark:text-red-400 bg-red-50/30 dark:bg-red-950/20 border border-red-100/50 dark:border-red-900/10 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5"
              >
                <Trash2 className="h-4 w-4" /> Load a Different Image
              </button>
            </div>
          </div>

          {/* RIGHT PANEL: DUAL WORKSPACE DRAW & CRop EXPORT PREVIEWS */}
          <div className="lg:col-span-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              {/* Draggable Active Workspace Screen */}
              <div className="bg-white dark:bg-brand-dark-light rounded-3xl border border-gray-100 dark:border-brand-gray/40 overflow-hidden shadow-sm flex flex-col h-full">
                <div className="p-4 bg-gray-50 dark:bg-brand-gray/20 border-b border-gray-110 dark:border-brand-gray/30 flex justify-between items-center">
                  <span className="text-xs font-bold text-gray-700 dark:text-gray-300 font-mono src-mono uppercase tracking-wider flex items-center gap-1.5">
                    👈 Drag/Resize Workspace
                  </span>
                  <span className="px-2 py-0.5 text-[10px] font-bold text-gray-500 bg-gray-100 dark:text-gray-400 dark:bg-brand-gray rounded font-mono">
                    GRID ACTIVE
                  </span>
                </div>

                {/* Crop boundary absolute mouse controller wrapper */}
                <div className="p-4 flex-1 flex items-center justify-center bg-zinc-150 dark:bg-black/40 min-h-[300px] max-h-[460px] overflow-hidden select-none">
                  {originalUrl ? (
                    <div 
                      ref={containerRef}
                      onMouseMove={handleContainerMouseMove}
                      onMouseDown={handleContainerMouseDown}
                      onMouseUp={handleContainerMouseUpOrLeave}
                      onMouseLeave={handleContainerMouseUpOrLeave}
                      className="relative max-h-[385px] max-w-full overflow-hidden shadow-md rounded-lg cursor-crosshair border border-gray-200 dark:border-brand-gray/40 inline-block"
                      style={{ touchAction: 'none' }}
                    >
                      {/* Base Original render frame */}
                      <img 
                        src={originalUrl} 
                        alt="Workspace canvas background crop frame" 
                        className="max-h-[380px] max-w-full object-contain select-none pointer-events-none"
                        referrerPolicy="no-referrer"
                      />

                      {/* Translucent overlay covering unselected margins */}
                      <div className="absolute inset-0 bg-black/60 pointer-events-none" />

                      {/* Explicit High-Contrast Interactive Selection Area with Rule-of-Thirds Grid */}
                      <div 
                        className="absolute border-2 border-brand-primary shadow-[0_0_0_9999px_rgba(0,0,0,0)]"
                        style={{
                          left: `${crop.x}%`,
                          top: `${crop.y}%`,
                          width: `${crop.width}%`,
                          height: `${crop.height}%`,
                          boxShadow: '0 0 0 9999px rgba(0, 0, 0, 0.45)',
                          cursor: 'move'
                        }}
                      >
                        {/* Interactive Grid lines */}
                        <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 pointer-events-none opacity-40">
                          <div className="border-r border-dashed border-white col-span-1 row-span-3" />
                          <div className="border-r border-dashed border-white col-span-1 row-span-3" />
                          <div className="border-b border-dashed border-white col-span-3 row-span-1" />
                          <div className="border-b border-dashed border-white col-span-3 row-span-1" />
                        </div>

                        {/* Drag and Resize interactive node handles */}
                        {/* North-West handle */}
                        <div 
                          className="absolute -top-1.5 -left-1.5 h-3.5 w-3.5 bg-brand-primary border-2 border-white rounded-full transition-transform hover:scale-125 z-20"
                          style={{ cursor: 'nwse-resize' }}
                        />
                        {/* North-East handle */}
                        <div 
                          className="absolute -top-1.5 -right-1.5 h-3.5 w-3.5 bg-brand-primary border-2 border-white rounded-full transition-transform hover:scale-125 z-20"
                          style={{ cursor: 'nesw-resize' }}
                        />
                        {/* South-East handle */}
                        <div 
                          className="absolute -bottom-1.5 -right-1.5 h-3.5 w-3.5 bg-brand-primary border-2 border-white rounded-full transition-transform hover:scale-125 z-20"
                          style={{ cursor: 'nwse-resize' }}
                        />
                        {/* South-West handle */}
                        <div 
                          className="absolute -bottom-1.5 -left-1.5 h-3.5 w-3.5 bg-brand-primary border-2 border-white rounded-full transition-transform hover:scale-125 z-20"
                          style={{ cursor: 'nesw-resize' }}
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="text-center p-6 text-gray-400 dark:text-zinc-650 space-y-1">
                      <ImageIcon className="h-8 w-8 mx-auto opacity-40" />
                      <p className="text-xs">No image uploaded</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Live Render Output Preview panel */}
              <div className="bg-white dark:bg-brand-dark-light rounded-3xl border border-gray-100 dark:border-brand-gray/40 overflow-hidden shadow-sm flex flex-col h-full">
                <div className="p-4 bg-orange-50/40 dark:bg-brand-primary/10 border-b border-orange-100/50 dark:border-brand-gray/30 flex justify-between items-center">
                  <span className="text-xs font-bold text-brand-primary font-mono uppercase tracking-wider flex items-center gap-1.5">
                    Live Export Preview
                  </span>
                  
                  {isCropping ? (
                    <span className="text-[10px] bg-brand-primary/10 text-brand-primary px-2 py-0.5 inline-block rounded animate-pulse font-mono font-bold">
                      computing...
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 text-[10px] font-bold text-brand-primary bg-orange-50 dark:bg-brand-primary/20 rounded font-mono">
                      {formatBytes(croppedSize)}
                    </span>
                  )}
                </div>

                <div className="p-4 flex-1 flex items-center justify-center bg-zinc-50 dark:bg-black/20 min-h-[300px] max-h-[460px] overflow-hidden relative">
                  {isCropping && (
                    <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/70 dark:bg-brand-dark-light/80 backdrop-blur-xs">
                      <div className="text-center space-y-3">
                        <div className="h-8 w-8 border-4 border-brand-primary border-t-transparent rounded-full animate-spin mx-auto" />
                        <p className="text-xs font-semibold text-gray-500 dark:text-gray-400">Rendering Cropped Canvas...</p>
                      </div>
                    </div>
                  )}

                  {croppedUrl ? (
                    <img 
                      src={croppedUrl} 
                      alt="Segment Cropped Preview Frame" 
                      className="max-h-[380px] max-w-full object-contain rounded-lg shadow-sm border border-gray-150/70"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="text-center p-6 text-gray-400 dark:text-zinc-655 space-y-1">
                      <ImageIcon className="h-8 w-8 mx-auto opacity-40" />
                      <p className="text-xs">Crop to generate snapshot preview</p>
                    </div>
                  )}
                </div>
              </div>

            </div>

            {/* Practical instructions badge strip */}
            <div className="p-4 rounded-2xl bg-gray-50/50 dark:bg-brand-dark-light border border-gray-100 dark:border-brand-gray/40 flex items-start gap-3">
              <Info className="h-5 w-5 text-brand-primary shrink-0 mt-0.5" />
              <div className="space-y-1 text-xs text-gray-500 dark:text-gray-400">
                <p className="font-semibold text-gray-900 dark:text-white">Airtight Resolution & Format Support</p>
                <p className="leading-relaxed">
                  Dragging the NW, NE, SE, or SW points gives you direct interactive shape definition, while the Rule of Thirds grid assists in compositional photography framing. All crops are generated in high quality locally in the browser sandbox.
                </p>
              </div>
            </div>
          </div>

        </div>
      )}

    </div>
  );
}
