import {
  ProgramFilters,
  ProgramPaginatedResponse,
  ProgramSortBy,
} from "@/app/[...tours]/types/program-filters";
const API_URL = process.env.NEXT_PUBLIC_API_URL;
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
