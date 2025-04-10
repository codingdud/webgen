export enum ComponentType {
    HEADER = 'header',
    CARD = 'card',
    PROFILE = 'profile',
    BACKGROUND = 'background',
    THUMBNAIL = 'thumbnail',
    PRODUCT = 'product',
    ICON = 'icon',
    INFOGRAPHIC = 'infographic',
    TESTIMONIAL = 'testimonial',
    CTA = 'cta'
  }
  
  export enum AspectRatio {
    RATIO_1_1 = '1:1',
    RATIO_16_9 = '16:9',
    RATIO_9_16 = '9:16',
    RATIO_5_4 = '5:4',
    RATIO_4_5 = '4:5',
    RATIO_3_2 = '3:2',
    RATIO_2_3 = '2:3'
  }
  
  export enum OutputFormat {
    JPEG = 'jpeg',
    PNG = 'png'
  }
  
  export enum StylePreset {
    MINIMALIST = 'minimalist',
    MODERN = 'modern',
    CORPORATE = 'corporate',
    CREATIVE = 'creative',
    GEOMETRIC = 'geometric',
    SKETCH = 'sketch'
  }
  
  export interface ComponentDefaults {
    defaultRatio: AspectRatio;
    basePrompt: string;
    negativePrompt: string;
  }
  
  export interface StyleModifier {
    description: string;
    keywords: string[];
  }
  
  export const COMPONENT_DEFAULTS: Record<ComponentType, ComponentDefaults> = {
    [ComponentType.HEADER]: {
      defaultRatio: AspectRatio.RATIO_16_9,
      basePrompt: 'Professional  header image only with clear focal pointclea',
      negativePrompt: 'text, watermark, blurry, low quality, cluttered'
    },
    [ComponentType.CARD]: {
      defaultRatio: AspectRatio.RATIO_3_2,
      basePrompt: 'Clean card image with balanced composition',
      negativePrompt: 'text, busy background, distracting elements'
    },
    [ComponentType.PROFILE]: {
      defaultRatio: AspectRatio.RATIO_1_1,
      basePrompt: 'Professional profile picture image only with clean background',
      negativePrompt: 'multiple people, text, logos, distracting elements'
    },
    [ComponentType.BACKGROUND]: {
      defaultRatio: AspectRatio.RATIO_16_9,
      basePrompt: 'background pattern or image',
      negativePrompt: 'sharp objects, text, logos, busy patterns'
    },
    [ComponentType.THUMBNAIL]: {
      defaultRatio: AspectRatio.RATIO_1_1,
      basePrompt: 'Clear, attention-grabbing thumbnail image',
      negativePrompt: 'text, watermark, blurry, low resolution'
    },
    [ComponentType.PRODUCT]: {
      defaultRatio: AspectRatio.RATIO_1_1,
      basePrompt: 'Professional product photography',
      negativePrompt: 'text, watermark, distracting elements, busy background'
    },
    [ComponentType.ICON]: {
      defaultRatio: AspectRatio.RATIO_1_1,
      basePrompt: 'Simple, clear icon design image ',
      negativePrompt: 'text, complex details, photorealistic elements'
    },
    [ComponentType.INFOGRAPHIC]: {
      defaultRatio: AspectRatio.RATIO_16_9,
      basePrompt: 'Clear visual representation with organized layout image ',
      negativePrompt: 'text, cluttered design, low contrast'
    },
    [ComponentType.TESTIMONIAL]: {
      defaultRatio: AspectRatio.RATIO_1_1,
      basePrompt: 'Authentic looking testimonial image only',
      negativePrompt: 'artificial looking, overly posed, low quality,text ,sentance'
    },
    [ComponentType.CTA]: {
      defaultRatio: AspectRatio.RATIO_3_2,
      basePrompt: 'Eye-catching call-to-action visual image',
      negativePrompt: 'text, complex background, distracting elements'
    }
  };
  
  export const STYLE_MODIFIERS: Record<StylePreset, StyleModifier> = {
  [StylePreset.MINIMALIST]: {
    description: 'minimalist design image only, ample white space, essential elements only, clear hierarchy, high contrast, modern simplicity',
    keywords: [
      'minimalist', 'clean lines', 'whitespace', 'essential', 
      'balanced composition', 'subtle gradients', 'high contrast',
      'refined details', 'elegant simplicity'
    ]
  },
  [StylePreset.MODERN]: {
    description: 'modern assert image only, dynamic composition, bold color accents, smooth gradients, floating elements, glass morphism, subtle shadows, cutting-edge design trends',
    keywords: [
      'modern UI', 'sleek interface', 'dynamic layout',
      'bold accents', 'gradient effects', 'glass morphism',
      'floating elements', 'contemporary design', 'trendy'
    ]
  },
  [StylePreset.CORPORATE]: {
    description: 'professional elements image only, trustworthy appearance, corporate identity, consistent branding, structured layout, premium quality, business-appropriate visuals',
    keywords: [
      'professional', 'corporate identity', 'premium quality',
      'business appropriate', 'structured', 'trustworthy',
      'brand consistent', 'polished finish', 'executive style'
    ]
  },
  [StylePreset.CREATIVE]: {
    description: 'creative  design image only, unique visual elements, artistic composition, vibrant color palette, innovative layouts, expressive style, eye-catching details, memorable visuals',
    keywords: [
      'creative design', 'artistic elements', 'innovative',
      'expressive', 'unique perspective', 'vibrant',
      'eye-catching', 'memorable', 'distinctive style'
    ]
  },
  [StylePreset.GEOMETRIC]: {
    description: 'geometric patterns, precise shapes, mathematical harmony, structured grid layout, clean intersections, balanced proportions, modern abstract forms, systematic design',
    keywords: [
      'geometric shapes', 'precise patterns', 'grid based',
      'mathematical', 'structured composition', 'clean lines',
      'balanced forms', 'systematic', 'abstract elements'
    ]
  },
  [StylePreset.SKETCH]: {
    description: 'pencil sketch illustration, organic hand-drawn style, soft pencil strokes, textured shading, natural artistic elements, loose sketch lines, freehand drawing, gentle sketching technique',
    keywords: [
      'hand-drawn', 'sketched style', 'organic lines',
      'natural strokes', 'artistic illustration', 'authentic',
      'personal touch', 'warm style', 'casual drawing'
    ]
  }
};