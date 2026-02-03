
export interface Location {
  name: string;
  address: string;
}

export interface ResolvedLocation {
  name: string;
  address: string;
  map_url: string;
}

export interface Doctor {
  id?: string;  // ID que viene del JSON original
  n: string;   // name
  l: string;   // license
  p?: string[]; // phones (optional)
  lo: Location[]; // locations
  s: number[]; // specialty_ids
  c: number[]; // city_ids
  d?: number[]; // disease_ids (optional)
  f?: number[]; // focus_ids (optional)
}

export interface Lookups {
  specialties: string[];
  cities: string[];
  diseases: string[];
  focus: string[];
}

export interface EncyclopediaEntry {
  title: string;
  summary: string;
  whatTheyDo: string[];
  howTheyCheck: string[];
  whenToSee: string[];
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
      type: 'encyclopedia-index';
    }
  | {
      type: 'encyclopedia-detail';
      articleName: string;
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
