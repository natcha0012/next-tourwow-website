export interface Country {
  id: number;
  nameTh: string;
  nameEn: string;
  slug: string;
  cityCount?: number;
  countryCode?: string;
}

export interface CountrySubUnit {
  id: number;
  name_en: string;
  name_th: string;
  country_id: number;
  primary_cover_url: string | null;
}
