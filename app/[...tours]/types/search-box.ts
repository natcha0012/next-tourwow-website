export interface SuggestionText {
  text: string;
  id?: number;
  type: "country" | "city";
}

export interface SearchBoxFilters {
  search_string: string | null;
  country_id: number | null;
  country_sub_unit_id: number | null;
  start_at_month: number | null;
}
