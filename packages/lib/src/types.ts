export interface Alert {
  content: string;
  date: Date;
  title: string;
  type: string;
}

export interface Category {
  affiliation: string[];
  id: string;
  icon: string;
  name: string;
}

export interface Resource {
  affiliation: string[];
  audiences: string[];
  categories: string[];
  iconName?: string;
  id: string;
  link: string;
  locations: string[];
  synonyms: string[];
  title: string;
  type: string;
}

export interface ResourceEntityQueue {
  entityQueueTitle: string;
  items: Resource[];
}

export interface UserClassificationAttributes {
  [key: string]: any;
  level: string;
  levelCode: string;
  campus: string;
  campusCode: string;
  classification: string;
  isInternational: boolean;
}

export interface UserClassification {
  attributes?: UserClassificationAttributes;
  id?: string;
}

export interface User {
  osuId?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  isCanvasOptIn?: boolean;
  isAdmin: boolean;
  groups: string[];
  classification: UserClassification;
  audienceOverride: UserAudienceOverride;
  theme: string;
  primaryAffiliation: string;
  primaryAffiliationOverride?: string;
}

export interface UserState {
  data: User;
  error: boolean;
  loading: boolean;
  isCanvasOptIn?: boolean;
  setUser?: Function;
}

export interface UserAudienceOverride {
  campusCode?: string;
  firstYear?: boolean;
  graduate?: boolean;
  international?: boolean;
}

export interface UserSettings {
  audienceOverride?: UserAudienceOverride;
  primaryAffiliationOverride?: string;
  theme?: string;
}
