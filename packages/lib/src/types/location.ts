export interface Location {
  id: string;
  type: string;
  attributes: {
    name: string;
    tags: string[];
    type: string;
    abbreviation?: string;
    geometry?: {
      type?: string;
      coordinates?: string[][][];
    };
    summary?: string;
    description?: string;
    descriptionHTML?: string;
    address: string;
    city: string;
    state: string;
    zip: string;
    county?: string;
    telephone?: string;
    fax?: string;
    thumbnails?: string[];
    images?: string[];
    departments?: string[];
    website?: string;
    sqft?: string;
    calendar?: string;
    campus: string;
    giRestroomCount: number;
    giRestroomLimit: boolean;
    giRestroomLocations: string;
    synonyms?: string[];
    bldgID?: string;
    parkingZoneGroup?: string;
    propID?: string;
    adaParkingSpaceCount?: number;
    motorcycleParkingSpaceCount?: number;
    evParkingSpaceCount?: number;
    weeklyMenu?: string;
    adaEntries?: {
      lon: number;
      lat: number;
      accessible: boolean;
      function: string;
    }[];
    aedInventories?: {
      lon: number;
      lat: number;
      location?: string;
      floor?: number;
      make?: string;
      model?: string;
      serialNo?: string;
      departmentOwner?: string;
      contact?: string;
    }[];
    latitude: string;
    longitude: string;
  };
  links: { self: string };
}

export interface LocationResponse {
  links: { self: string };
  data: Location[];
}
