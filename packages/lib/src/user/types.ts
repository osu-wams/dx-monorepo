export interface UserClassificationAttributes {
  [key: string]: any;
  level: string;
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
