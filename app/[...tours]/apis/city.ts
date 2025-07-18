import { CountrySubUnit } from "../types/country";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getAllCity(
  countryId: number | null = null,
  sortBy = "search_priority_asc_name_th_asc"
): Promise<CountrySubUnit[]> {
  const params = new URLSearchParams();

  if (sortBy) {
    params.append("sort_by", sortBy);
  }

  if (countryId) {
    params.append("country_id", countryId.toString());
  }

  const url = `${API_URL}country_sub_units?${params.toString()}`;

  try {
    const res = await fetch(url, { cache: "force-cache" });
    const data = await res.json();

    if (data.status === "success") {
      return data.data;
    } else {
      console.warn("API response not success:", data);
      return [];
    }
  } catch (error) {
    console.error("Error fetching cities:", error);
    return [];
  }
}
