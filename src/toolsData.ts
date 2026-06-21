import { Tool } from './types';

export const TOOLS_LIST: Tool[] = [
  {
    id: 'jpg-to-pdf',
    name: 'JPG to PDF Converter',
    shortDesc: 'Convert multiple JPG/JPEG images into an organized, high-quality PDF document instantly.',
    longDesc: 'Our client-side JPG to PDF converter batches your images together and compiles them into a single PDF document in the exact sequence you upload them. Your files never leave your computer, ensuring total privacy.',
    category: 'convert',
    iconName: 'FileText',
    instructions: [
      'Upload one or more JPG/JPEG files by dropping them into the zone or using the picker.',
      'Re-order files if necessary, and see their real-time previews.',
      'Click "Convert to PDF" to generate and download your high-quality PDF document.'
    ]
  },
  {
    id: 'pdf-to-jpg',
    name: 'PDF to JPG Extractor',
    shortDesc: 'Extract pages/images from PDF files and download them as high-quality JPG images.',
    longDesc: 'Instantly convert complex PDF pages into standard web-friendly JPEG files. This tool reads the PDF stream locally in your browser and draws each page cleanly, letting you downsample pages to imagery.',
    category: 'convert',
    iconName: 'FileImage',
    instructions: [
      'Drag & drop your PDF file into the designated upload area.',
      'Accepts standard PDF formats and prepares pages for visual rendering.',
      'Select high-fidelity rendering options and click "Extract Images" to download.'
    ]
  },
  {
    id: 'jpg-compressor',
    name: 'JPG Image Compressor',
    shortDesc: 'Reduce image file size by up to 90% while fully preserving visual clarity.',
    longDesc: 'Shrink your large photographs and digital graphics. This tool uses adjustable quantization sliders to re-calculate your JPEG compression locally, showing real-time Kb savings and percentage efficiency before saving.',
    category: 'compress',
    iconName: 'Percent',
    instructions: [
      'Drop your JPG, JPEG, or PNG image into the upload box.',
      'Adjust the quality slider (0-100) to find the perfect compromise of compression and size.',
      'Observe real-time measurements of file size savings and download.'
    ]
  },
  {
    id: 'image-resizer',
    name: 'Image Resizer',
    shortDesc: 'Resize images to precise dimensions or percentage scales with locked aspect ratio.',
    longDesc: 'Scale your visuals for blogs, social networks, or web templates. Change pixel proportions with ease, lock aspect ratios to prevent warping, and apply nearest-neighbor or bilinear canvas resampling filters.',
    category: 'compress',
    iconName: 'Maximize2',
    instructions: [
      'Upload your target image in any supported format (JPG, PNG, WebP, etc.).',
      'Toggle the "Maintain Aspect Ratio" lock, then specify your target Width or Height in pixels.',
      'Alternatively, select preset percentages (25%, 50%, 75%) and click "Resize Image".'
    ]
  },
  {
    id: 'image-cropper',
    name: 'Precision Image Cropper',
    shortDesc: 'Crop unnecessary margins or fit images to standard square, vertical, or widescreen shapes.',
    longDesc: 'Eliminate visual clutter in pictures. Our fully responsive, draggable crop boundaries allow you to specify exact framing, center alignment grids, or standard aspect ratio dimensions flawlessly.',
    category: 'compress',
    iconName: 'Crop',
    instructions: [
      'Select or drop the image you wish to edit into the input canvas.',
      'Drag and scale the visual crop bounding box over the section you desire to keep.',
      'Select custom cropping presets (1:1 Square, 16:9 Cinema, 4:3 Classical) or crop freely.',
      'Press "Crop & Save" to download the cropped segment.'
    ]
  },
  {
    id: 'image-rotator',
    name: 'Image Rotator & Flipper',
    shortDesc: 'Rotate images by 90/180/270 degrees or flip them horizontally and vertically.',
    longDesc: 'Fix camera orientation bugs instantly. Rotate vertical shots, create mirror effects by flipping axes, or perform micro orientation adjustments completely inside your browser sandbox.',
    category: 'compress',
    iconName: 'RotateCw',
    instructions: [
      'Upload the rotated or misaligned photo.',
      'Use the rotation controllers (Rotate Left, Rotate Right, Flip Horizontal, Flip Vertical).',
      'The Canvas updates instantly to reveal the new orientation.',
      'Click "Apply & Download" to get your visual asset.'
    ]
  },
  {
    id: 'jpg-to-png',
    name: 'JPG to PNG Converter',
    shortDesc: 'Convert JPG photos to PNG format to restore lossless compression features.',
    longDesc: 'Convert standard lossy JPEG files into Web-standard PNG-24 lossless assets. This tool preserves high-fidelity details of digital logos, illustrations, or charts for modern graphics production.',
    category: 'convert',
    iconName: 'Image',
    instructions: [
      'Upload your JPG/JPEG files in the drag-and-drop boundary.',
      'Click "Convert to PNG" to translate pixels to lossless format.',
      'Download your finished asset locally with full PNG extension details.'
    ]
  },
  {
    id: 'png-to-jpg',
    name: 'PNG to JPG Converter',
    shortDesc: 'Convert heavy PNG graphics to lightweight JPGs with custom background fillers.',
    longDesc: 'Reduce transparent PNG file sizes by transforming them to JPG. Since JPEGs do not support alpha transparent channels, choose a solid custom backdrop color (default is pure white) to fill transparent zones seamlessly.',
    category: 'convert',
    iconName: 'FileCheck',
    instructions: [
      'Upload a PNG image file containing transparent or solid backgrounds.',
      'Choose a fill color for your transparent regions from the visual color picker.',
      'Click "Convert to JPG" to rasterize and download at reduced weight.'
    ]
  },
  {
    id: 'jpg-to-webp',
    name: 'JPG to WebP Converter',
    shortDesc: 'Convert JPG to WebP for modern SEO compression standards and faster websites.',
    longDesc: 'Improve your Core Web Vitals speed. Converting your JPEGs to modern Next-Gen WebP compresses files up to 30% more than typical JPEGs, ensuring search engines reward your website for extreme speed.',
    category: 'convert',
    iconName: 'Share2',
    instructions: [
      'Drag-and-drop your legacy JPG or JPEG assets.',
      'Click "Convert to WebP" to execute top-tier next-gen image compression.',
      'Download the WebP file to replace obsolete imagery on your high-ranking site.'
    ]
  },
  {
    id: 'webp-to-jpg',
    name: 'WebP to JPG Converter',
    shortDesc: 'Convert next-gen WebP back to standard JPG format for legacy apps and software.',
    longDesc: 'Ensure universal offline compatibility. Perfect for developers, designers, or legal consultants who need legacy support for image editing suites, desktop software, or old web platforms that do not yet recognize WebP.',
    category: 'convert',
    iconName: 'RefreshCw',
    instructions: [
      'Upload your custom .webp input files.',
      'Press the "Convert to JPG" button to render to standard lossy JPEG formats.',
      'Instantly trigger a local download of high-compatibility images.'
    ]
  },
  {
    id: 'background-remover',
    name: 'Chroma-Key Background Remover',
    shortDesc: 'Erase solid backgrounds, green screens, or white margins to create instant transparent files.',
    longDesc: 'Create transparent icons and assets without expensive software. Our tool lets you click on any color in your image (or specify backgrounds) and customize visual tolerances, removing unwanted segments locally with high precision.',
    category: 'edit',
    iconName: 'Scissors',
    instructions: [
      'Upload an image containing a solid, white, green-screen, or distinctive background.',
      'Select a background color manually or input a color using a visual color-spotter.',
      'Adjust the Tolerance and Smoothness sliders to fine-tune transparent edges in real-time.',
      'Review the transparent checkerboard background and download as transparent PNG.'
    ]
  },
  {
    id: 'watermark-maker',
    name: 'Watermark Builder',
    shortDesc: 'Add custom text banners or branded logos to protect your unique creative photos.',
    longDesc: 'Prevent online copyright infringement. Superimpose custom text declarations or your company brand logo over images, adjusting coordinates, visual opacity, dimensions, and rotation angles interactively.',
    category: 'edit',
    iconName: 'Stamp',
    instructions: [
      'Select your base image to be protected by watermark.',
      'Select "Text Watermark" and enter copyright details, or select "Logo Watermark" to upload an overlay icon.',
      'Tweak sliders for Opacity, Font Size, Scale, Rotation, and Positioning.',
      'Save the watermarked output immediately to preserve author rights.'
    ]
  },
  {
    id: 'metadata-remover',
    name: 'EXIF Metadata Strip Tool',
    shortDesc: 'Strip hidden EXIF metadata, GPS locations, camera parameters, and private timestamps.',
    longDesc: 'Enhance your online privacy. Uploaded photos often store GPS coordinates, camera identifiers, and date logs which exposes privacy when shared. This tool cleans indices by drawing raw pixels on pristine canvases and exporting files.',
    category: 'edit',
    iconName: 'ShieldAlert',
    instructions: [
      'Upload your personal photo or digital image.',
      'The engine reads raw pixel layouts and isolates visual structures from embedded header logs.',
      'Press "Strip EXIF Data" to rebuild the canvas and export a thoroughly metadata-free file.'
    ]
  },
  {
    id: 'image-enhancer',
    name: 'Image Filter Enhancer',
    shortDesc: 'Adjust brightness, saturation, contrast, sharpness, and add visual aesthetic filters.',
    longDesc: 'Turn ordinary camera snapshots into artistic portfolio pieces. Tailor lighting, heighten contrast, emphasize saturation depths, or configure pixel matrices to elevate overall aesthetic composition.',
    category: 'enhance',
    iconName: 'Sparkles',
    instructions: [
      'Load the photo you wish to enhance.',
      'Manipulate sliders for Contrast, Saturation, Brightness, Sepia, and Blur in real-time.',
      'Click the "Reset Filters" button to revert, or click "Apply & Download" to save.'
    ]
  },
  {
    id: 'image-colorizer',
    name: 'Aesthetic Colorizer & Tint',
    shortDesc: 'Apply visual duotones, color warmth, filters, and color overlays to grayscale images.',
    longDesc: 'Give stylized artistic filters to monochrome graphics. Customize color temperature, apply rich vintage sepia tones, or design gorgeous duotone themes with high/low RGB offset modifiers manually.',
    category: 'enhance',
    iconName: 'Palette',
    instructions: [
      'Select a clean black-and-white, dark, or standard gray image.',
      'Apply custom stylistic presets (Vintage, Warm, Arctic, Sepia, Duotone Purple).',
      'Optimize tint balances using customization parameters, then click the download link.'
    ]
  },
  {
    id: 'collage-maker',
    name: 'Responsive Grid Collage Maker',
    shortDesc: 'Merge multiple pictures into gorgeous grids, column strips, or custom borders.',
    longDesc: 'Assemble multiple memories into a single template. This browser-based grid collage tool joins images in beautiful alignments, allowing customizable layout margins, corner rounding, and border palettes.',
    category: 'organize',
    iconName: 'Grid',
    instructions: [
      'Upload 2, 3, or more visual elements.',
      'Select a grid alignment format (Horizontal Strip, Vertical Strip, 2x2 Masonry Blocks).',
      'Choose border thickness, inner cell padding, and border backplate hex colors.',
      'Download your compiled collage as a single cohesive image.'
    ]
  },
  {
    id: 'image-merger',
    name: 'Seam Image Merger',
    shortDesc: 'Merge multiple images vertically or horizontally into a seamless strip.',
    longDesc: 'Perfect for compiling panoramic captures, comic strips, web banners, or screen grabs. Align images from top to bottom or side to side, adjust spacing margins, and preserve structural sizes universally.',
    category: 'organize',
    iconName: 'Columns',
    instructions: [
      'Upload two or more pictures you wish to link.',
      'Configure the flow direction (Vertical Stack vs Horizontal Strip).',
      'Adjust the spacing controller (0px to 50px) to pad the boundaries.',
      'Click "Merge & Build" to generate your unified graphic.'
    ]
  },
  {
    id: 'image-splitter',
    name: 'Image Grid Slicing Splitter',
    shortDesc: 'Split a large image into symmetric grids (eg. 3x3 for Instagram, 2x2 blocks).',
    longDesc: 'Break up sprawling visuals down to custom grid fragments. Perfect for social media grids, visual mosaics, and web layout builders. This splitter slices layouts symmetrically into distinct downloads.',
    category: 'organize',
    iconName: 'Grid3X3',
    instructions: [
      'Load the base image that needs to be segmented.',
      'Input the target slicing configurations (e.g., Rows: 3, Columns: 3 to split into a 9-mesh grid).',
      'Observe sliced canvas boundaries and hit "Slice Image".',
      'Instantly download every slice in quick succession with dynamic names.'
    ]
  },
  {
    id: 'thumbnail-creator',
    name: 'Social Media Thumbnail Creator',
    shortDesc: 'Crop & fit inputs to social platform sizes like YouTube, Facebook, or Instagram posts.',
    longDesc: 'Create visual banners perfectly calibrated for digital channels. This selector trims and centers uploads into dimensions compliant with YouTube Thumbnails, Facebook Page Covers, Instagram Square Posts, or Twitter Banners.',
    category: 'edit',
    iconName: 'Tv',
    instructions: [
      'Upload your graphics or photographic designs.',
      'Select standard templates: YouTube (1280x720), FB Cover (851x315), IG Post (1080x1080), Twitter Header (1500x500).',
      'Reposition the content inside the cropping guides and click "Apply Social Size".'
    ]
  },
  {
    id: 'ocr-text-extractor',
    name: 'OCR Image Text Extractor',
    shortDesc: 'Perform browser-based OCR (Optical Character Recognition) to extract text content.',
    longDesc: 'Extract printed texts in photographs, screenshots, and invoices. Driven 100% locally in your browser by Tesseract.js, this scanner parses languages, outputs plain editable markdown, and needs no external server requests.',
    category: 'ocr',
    iconName: 'Languages',
    instructions: [
      'Provide a sharp screenshot, scanned document page, or standard JPG/PNG text file.',
      'Press "Start OCR Extraction" to launch local scanning.',
      'Observe real-time parser progress status logs.',
      'Copy the extracted textual metadata directly from the screen area.'
    ]
  }
];
