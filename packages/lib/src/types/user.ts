export interface Alert {
  content: string;
  date: Date;
  title: string;
  type: string;
  updated: Date;
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
  itSystem?: string;
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

export interface UserAudienceOverride {
  campusCode?: string;
  firstYear?: boolean;
  graduate?: boolean;
  international?: boolean;
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
  devTools?: boolean;
  primaryAffiliation: string;
  primaryAffiliationOverride?: string;
  favoriteResources?: FavoriteResource[];
  isMobile?: boolean; // If the session for this user was initiated through the mobile app
  isMasquerade?: boolean; // If the session for this user is masqueraded or undefined when the user is not
}

export interface UserState {
  data: User;
  error: boolean;
  loading: boolean;
  isCanvasOptIn?: boolean;
  setUser?: Function;
  refreshFavorites?: Function;
}

export interface UserMessage {
  channelId: string;
  content: string;
  contentShort: string;
  deliveredAt?: string;
  id: string;
  imageUrl?: string;
  messageId: string;
  onid?: string;
  osuId?: string;
  sendAt: string;
  status: string;
  title: string;
}

export interface UserMessagesState {
  data: UserMessage[];
  isLoading: boolean;
  isSuccess: boolean;
}

export interface UserMessageItems {
  items: UserMessage[];
  lastKey?: string;
}

export interface UserMessageUpdate {
  messageId?: string; // Without it, it will affect all messages
  status: string;
}

export interface UserSettings {
  audienceOverride?: UserAudienceOverride;
  primaryAffiliationOverride?: string;
  theme?: string;
  devTools?: boolean;
}
