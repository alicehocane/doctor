
export interface Location {
  name: string;
  address: string;
  map_url: string;
}

export interface Doctor {
  id: string;
  slug: string;
  name: string;
  license: string;
  phones: string[];
  locations: Location[];
  specialty_ids: number[];
  city_ids: number[];
  disease_ids: number[];
}

export interface Lookups {
  specialties: string[];
  cities: string[];
  diseases: string[];
}

export interface ResolvedDoctor extends Omit<Doctor, 'specialty_ids' | 'city_ids' | 'disease_ids'> {
  specialties: string[];
  cities: string[];
  diseases: string[];
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
    };
