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

export interface FavoriteResource {
  osuId?: number;
  created?: string;
  resourceId: string;
  order: number;
  active: boolean;
}

export interface Resource {
  affiliation: string[];
  audiences: string[];
  categories: string[];
  excludeTrending: boolean;
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

export interface TrendingResource {
  resourceId: string;
  date: string;
  affiliation: string;
  campus: string;
  title: string;
  totalEvents: number;
  uniqueEvents: number;
  period?: string;
}

export interface UserClassificationAttributes {
  [key: string]: any;
  levelCode: string;
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
  affiliations: string[];
  classification: UserClassification;
  audienceOverride: UserAudienceOverride;
  theme: string;
  primaryAffiliation: string;
  primaryAffiliationOverride?: string;
  favoriteResources?: FavoriteResource[];
}

export interface UserState {
  data: User;
  error: boolean;
  loading: boolean;
  isCanvasOptIn?: boolean;
  setUser?: Function;
  refreshFavorites?: Function;
}

export interface UserAudienceOverride {
  campusCode?: string;
  firstYear?: boolean;
  graduate?: boolean;
  international?: boolean;
}

export interface UserMessage {
  channelId: string;
  content: string;
  contentShort: string;
  deliveredAt?: string;
  messageId: string;
  osuId: string;
  sendAt: string;
  status: string;
  title: string;
}

export interface UserMessageItems {
  items: UserMessage[];
  lastKey?: string;
}

export interface UserMessageUpdate {
  messageId: string;
  status: string;
}

export interface UserSettings {
  audienceOverride?: UserAudienceOverride;
  primaryAffiliationOverride?: string;
  theme?: string;
}
