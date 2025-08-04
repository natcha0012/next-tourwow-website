export interface ProgramDetail {
  id: number;
  tour_code: string;
  name: string;
  tw_name?: string;
  tw_new_booking_url: string;
  product_tw_url: string;
  duration_day: number;
  duration_night: number;
  hotel_star: number;
  hilight_description: string;
  tw_hilight_description?: string;
  tour_condition?: string;
  pool_key: string;
  has_pdf_detail_file: boolean;
  plane_transportation: PlaneTransportation;
  country: Country;
  countries: Country[];
  product_country_sub_units: ProductCountrySubUnit[];
  banner_image_files: BannerImageFile[];
  product_descriptions: ProductDescription[];
  periods: Period[];

  //
  countryListText: string;
  cityListText: string;
  lowestPeriod: Period | null;
}

export interface Period {
  id: number;
  pool_id: number;
  is_active: boolean;
  start_at: string;
  end_at: string;
  quantity_remaining: number;
  price_adult_double: number;
  price_adult_double_compare?: number;
  price_child_bed?: number;
  price_child_bed_compare?: number;
  price_infant?: number;
  price_infant_compare?: number;

  //
  startAt: Date | null;
  endAt: Date | null;
}
interface ProductDescription {
  id: number;
  type_slug: string;
  ordinal: number;
  description?: string;
  product_file?: Productfile;
}
interface Productfile {
  id: number;
  url: string;
  preview_url: string;
  thumbnail_url: string;
  content_url: string;
}
export interface BannerImageFile {
  id: number;
  url: string;
  preview_url: string;
  thumbnail_url: string;
  is_main: boolean;
}
interface ProductCountrySubUnit {
  id: number;
  name_en: string;
  name_th: string;
  country_id: number;
}
interface Country {
  id: number;
  name_th: string;
  name_en: string;
}
interface PlaneTransportation {
  id: number;
  code: string;
}

export interface ProgramDetailHeader {
  countryTh: string;
  countryEn: string;
  name: string;
  meta: {
    title: string;
    description: string;
    images: { url: string }[];
  };
}

export interface ProductMetaResponse {
  name: string;
  tourwow_code: string;
  tw_name: string | null;
  hilight_description: string;
  tw_hilight_description: string | null;
  banner_image_files: {
    id: number;
    url: string;
    preview_url: string;
    thumbnail_url: string;
    is_main: boolean;
  }[];
}
