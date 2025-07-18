import { PageData } from "@/app/types/page-data";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const AGENCY_DOMAIN = process.env.NEXT_PUBLIC_AGENCY_DOMAIN;

export async function getCurrentPageData(
  currentPath: string
): Promise<PageData | null> {
  const params = new URLSearchParams();
  params.append("url_paths", JSON.stringify([currentPath]));

  const url = `${API_URL}tw/${AGENCY_DOMAIN}/pages/by_url_paths?${params.toString()}`;

  try {
    const res = await fetch(url, { cache: "force-cache" });
    const data = await res.json();
    if (data.status === "success") {
      return data.data[0];
    } else {
      console.warn("API response not success:", data);
      return null;
    }
  } catch (error) {
    console.error("Error fetching page data:", error);
    return null;
  }
}
