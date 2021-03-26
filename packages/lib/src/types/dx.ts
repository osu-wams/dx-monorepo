import { Resource } from './user';

export interface Announcement {
  action?: {
    title?: string;
    link: string;
  };
  affiliation: string[];
  audiences: string[];
  bg_image?: string;
  body: string;
  date?: string;
  id: string;
  locations: string[];
  pages: string[];
  title: string;
  type?: string;
}

export interface DynamicCard {
  affiliation: string[];
  audiences?: string[];
  body?: string;
  icon?: string;
  id: string;
  infoButtonId: string;
  link?: string;
  linkText?: string;
  locations: string[];
  pages: string[];
  resources?: (string | Resource)[];
  sticky: boolean;
  title: string;
  weight: number;
}

export interface Training {
  audiences: string[];
  id: string;
  title: string;
  image?: string;
  contact?: string;
  cost?: boolean;
  body?: string;
  offeredBy?: string;
  courseLength?: string;
  featured?: boolean;
  prerequisites?: string;
  deliveryMethod?: string[];
  tags: string[];
  websiteUri?: string;
  websiteTitle?: string;
}

export interface TrainingAudience {
  id: string;
  name: string;
}

export interface TrainingTag {
  id: string;
  name: string;
}

export interface PageSearchIndex {
  id: string;
  page: string;
  description: string;
  searchTerms: string[];
}
