export type Page = 'home' | 'tool' | 'about' | 'contact' | 'privacy' | 'disclaimer';

export type ToolId =
  | 'jpg-to-pdf'
  | 'pdf-to-jpg'
  | 'jpg-compressor'
  | 'image-resizer'
  | 'image-cropper'
  | 'image-rotator'
  | 'jpg-to-png'
  | 'png-to-jpg'
  | 'jpg-to-webp'
  | 'webp-to-jpg'
  | 'background-remover'
  | 'watermark-maker'
  | 'metadata-remover'
  | 'image-enhancer'
  | 'image-colorizer'
  | 'collage-maker'
  | 'image-merger'
  | 'image-splitter'
  | 'thumbnail-creator'
  | 'ocr-text-extractor';

export interface Tool {
  id: ToolId;
  name: string;
  shortDesc: string;
  longDesc: string;
  category: 'convert' | 'compress' | 'edit' | 'enhance' | 'organize' | 'ocr';
  iconName: string; // Used to pick icons dynamically in React
  instructions: string[];
}
