/* eslint-disable @typescript-eslint/no-explicit-any */
export interface Program {
  id: number;
  supplier_id: number;
  tour_code: string;
  tourwow_code: string;
  tw_url_path: string;
  name: string;
  price: number;
  price_compare: any;
  has_one_country: boolean;
  main_country_id: number;
  main_country_name_th: string;
  main_country_name_en: string;
  countries: Country[];
  country_sub_units: CountrySubUnit[];
  tags: string;
  duration_day: number;
  duration_night: number;
  duration_day_and_night: string;
  free_day: any;
  meal_amount: any;
  hotel_star: number;
  has_visa: boolean;
  visa_price: any;
  hilight_description: string;
  sub_category_label: string;
  product_sub_category_id: number;
  banner_url: string;
  has_active_periods: boolean;
  is_recommended: boolean;
  product_url: string;
  periods: Period[];

  //
  countryListText: string;
  cityListText: string;
  periodMonthText: string;
  lowestPeriod: Period | null;
}

interface Country {
  id: number;
  name_en: string;
  name_th: string;
}

interface CountrySubUnit {
  id: number;
  name_en: string;
  name_th: string;
  country_id: number;
}

export interface Period {
  id: number;
  group_code: any;
  start_at: string;
  end_at: string;
  is_channel_twp_online_booking: boolean;
  price_adult_double: number;
  price_adult_single: any;
  price_adult_tripple: any;
  price_child_no_bed: any;
  price_child_bed: any;
  price_infant: any;
  price_join_land: any;
  price_adult_double_compare?: number;
  price_adult_single_compare: any;
  price_adult_tripple_compare: any;
  price_child_no_bed_compare: any;
  price_child_bed_compare: any;
  price_infant_compare: any;
  price_join_land_compare: any;
  deposit: any;
  commission: number;
  quantity: number;
  quantity_remaining: number;
  sell_status_code: number;
  is_active: boolean;
  installment_count: number;
  transportation_category_id?: number;
  transportation_category_name?: string;
  go_transportation_id?: number;
  go_transportation_name_en?: string;
  go_transportation_code?: string;
  go_airport_arrival: any;
  go_airport_departure: any;
  go_flight_number_arrival: any;
  go_flight_number_departure: any;
  go_flight_time_arrival: any;
  go_flight_time_departure: any;
  back_transportation_id?: number;
  back_transportation_name_en?: string;
  back_transportation_code?: string;
  back_airport_arrival: any;
  back_airport_departure: any;
  back_flight_number_arrival: any;
  back_flight_number_departure: any;
  back_flight_time_arrival: any;
  back_flight_time_departure: any;
}
