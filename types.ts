
export interface Location {
  n: string; // name
  a: string; // address
}

export interface ResolvedLocation {
  name: string;
  address: string;
  map_url: string;
}

export interface Doctor {
  n: string;   // name
  l: string;   // license
  p: string[]; // phones
  lo: Location[]; // locations
  s: number[]; // specialty_ids
  c: number[]; // city_ids
  d: number[]; // disease_ids
  f?: number[]; // focus_ids
}

export interface Lookups {
  specialties: string[];
  cities: string[];
  diseases: string[];
  focus: string[];
}

export interface ResolvedDoctor {
  id: string;
  slug: string;
  name: string;
  license: string;
  phones: string[];
  specialties: string[];
  cities: string[];
  diseases: string[];
  focus: string[];
  locations: ResolvedLocation[];
}

export type ViewState = 
  | {
      type: 'list';
      filters: {
        query: string;
        specialty: string | null;
        city: string | null;
        disease: string | null;
      };
    } 
  | {
      type: 'detail';
      slug: string;
    }
  | {
      type: 'specialties-index';
    }
  | {
      type: 'specialty-detail';
      specialtyName: string;
    }
  | {
      type: 'cities-index';
    }
  | {
      type: 'city-detail';
      cityName: string;
    }
  | {
      type: 'diseases-index';
    }
  | {
      type: 'disease-detail';
      diseaseName: string;
    }
  | {
      type: 'privacy';
    }
  | {
      type: 'terms';
    }
  | {
      type: 'contact';
    }
  | {
      type: 'legal';
    }
  | {
      type: 'faq-page';
    };
