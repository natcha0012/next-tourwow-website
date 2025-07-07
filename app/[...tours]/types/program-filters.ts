import { Program } from "./program";

export interface ProgramFilters {
  price_range?: { min_price: null; max_price: null };
  period_range?: { min_date: null; max_date: null };
  country_sub_unit_id?: number;
  tag?: null;
  country_id?: number;
  country_ids?: null;
  period_is_active?: null;
  period_start_at_month?: number;
  period_start_at?: string;
  go_transportation_id?: number;
}

export interface ProgramPaginatedResponse {
  page: number;
  page_entries: number;
  total: number;
  result: Program[];
  lowest_price: number;
  total_quantity_remaining: number;
}

export type ProgramSortBy =
  | "product_running_id_asc"
  | "period_price_adult_double_asc"
  | "period_price_adult_double_desc";
