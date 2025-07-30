import {
  ProgramFilters,
  ProgramPaginatedResponse,
  ProgramSortBy,
} from "@/app/[...tours]/types/program-filters";
import { ICalendarPrice } from "../types/calendar-price";
const API_URL = process.env.NEXT_PUBLIC_API_URL;
const HOST = process.env.NEXT_PUBLIC_HOST;
export async function getPrograms(
  page: number,
  pageEntries: number,
  filters: ProgramFilters | undefined = undefined,
  sortBy: ProgramSortBy = "product_running_id_asc"
): Promise<ProgramPaginatedResponse | null> {
  const url = `${API_URL}tw/products/paginated`;
  const params = new URLSearchParams();
  params.append("page", page.toString());
  params.append("page_entries", pageEntries.toString());
  params.append("sort_by", sortBy);
  if (filters) {
    params.append("filters", JSON.stringify(filters));
  }

  try {
    const res = await fetch(`${url}?${params.toString()}`);
    const data = await res.json();
    if (data.status === "success") {
      return data.data;
    } else {
      console.warn("API response not success:", data);
      return null;
    }
  } catch (error) {
    console.error("Error fetching program:", error);
    return null;
  }
}

export async function getProductDateData(
  countryId: number,
  countrySubUnitId: number | undefined = undefined
): Promise<ICalendarPrice[]> {
  const url = `${API_URL}tw/products/dates`;
  const params = new URLSearchParams();
  const filters = {
    country_id: countryId,
    country_sub_unit_id: countrySubUnitId,
  };
  params.append("filters", JSON.stringify(filters));
  try {
    const res = await fetch(`${url}?${params.toString()}`);
    const data = await res.json();
    if (data.status === "success") {
      return data.data;
    } else {
      console.warn("API response not success:", data);
      return [];
    }
  } catch (error) {
    console.error("Error fetching product data:", error);
    return [];
  }
}

export async function getGuruHeader(
  searchFilters: ProgramFilters
): Promise<{ totalQuantityRemaining: string; lowestPrice: string }> {
  try {
    const res = await fetch(`${HOST}api/tourwow-guru`, {
      method: "POST",
      body: JSON.stringify(searchFilters),
      headers: {
        "Content-Type": "application/json",
      },
      next: { revalidate: 60 },
    });
    return res.json();
  } catch (error) {
    console.error("Error getting guru header:", error);
    return { totalQuantityRemaining: "0", lowestPrice: "0" };
  }
}
