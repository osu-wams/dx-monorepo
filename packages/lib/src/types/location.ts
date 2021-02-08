export interface Location {
  id: string;
  name: string;
  tags: string[];
  type: string;
  abbreviation?: string;
  geometry?: {
    type?: string;
    coordinates?: string[][][];
  };
  summary?: string;
  description: string | null;
  descriptionHTML: string | null;
  address: string | null;
  city: string | null;
  state: string | null;
  zip: string | null;
  county?: string;
  telephone?: string;
  fax?: string;
  thumbnails?: string[];
  image: string | null; // Derived from thumbnails property
  images?: string[];
  departments?: string[];
  website?: string;
  link: string | null; // Derived from the website property
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
}

export interface LocationResponse {
  links: { self: string };
  data: {
    attributes: Location;
  }[];
}
