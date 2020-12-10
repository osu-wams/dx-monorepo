import { Resource } from './user';

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
  department?: string;
  courseLength?: string;
  featured?: boolean;
  frequency?: string;
  prerequisites?: string;
  courseDesign?: string;
  tags: string[];
  type?: string;
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
