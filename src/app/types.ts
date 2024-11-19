type ImageFormat = {
  ext: string;
  url: string;
  hash: string;
  mime: string;
  name: string;
  width: number;
  height: number;
  size: number;
  path?: string | null;
};

type Image = {
  alternativeText: string | null;
  caption: string | null;
  createdAt: string;
  documentId: string;
  ext: string;
  formats: {
    small?: ImageFormat;
    thumbnail?: ImageFormat;
  };
  hash: string;
  height: number;
  id: number;
  locale: string | null;
  mime: string;
  name: string;
  previewUrl: string | null;
  provider: string;
  provider_metadata: any | null;
  publishedAt: string;
  size: number;
  updatedAt: string;
  url: string;
  width: number;
};

export type Tour = {
  id: number;
  documentId: string;
  title: string;
  image: Image;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string | null;
  localizations: Array<any>;
  description?: string;
  departureTime?: string;
  returnTime?: string;
  included?: string[];
  notIncluded?: string[];
  imageUrl?: string;
  hasCta?: string;
};
