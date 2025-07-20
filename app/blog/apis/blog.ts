import { BlogListResponse } from "../BlogFilterCountry/interfaces/blog";
import { ISeoArticleDetail } from "../types/seo-article-detail";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const AGENCY_DOMAIN = process.env.NEXT_PUBLIC_AGENCY_DOMAIN;
export async function getBlogList(
  countryId: number | null = null,
  page: number,
  pageEntries: number,
  articleTypeId: number = 2,
  isActive: boolean = true
): Promise<BlogListResponse | null> {
  const url = `${API_URL}twm/${AGENCY_DOMAIN}/seo_articles/paginated`;
  try {
    const params = new URLSearchParams();
    params.append("article_type_id", articleTypeId.toString());
    params.append("is_active", isActive ? "true" : "false");
    params.append("page", page.toString());
    params.append("page_entries", pageEntries.toString());

    if (countryId) {
      params.append("country_id", countryId.toString());
    }
    const res = await fetch(`${url}?${params.toString()}`);
    const data = await res.json();
    if (data.status === "success") {
      return data.data;
    } else {
      console.warn("API response not success:", data);
      return null;
    }
  } catch (error) {
    console.error("Error fetching product data:", error);
    return null;
  }
}

export async function getBlogDetail(
  blogId: number
): Promise<ISeoArticleDetail | null> {
  const url = `${API_URL}twm/${AGENCY_DOMAIN}/seo_articles/${blogId}`;
  try {
    const res = await fetch(url, {
      cache: "force-cache",
    });
    const data = await res.json();
    if (data.status === "success") {
      return data.data;
    } else {
      console.warn("API response not success:", data);
      return null;
    }
  } catch (error) {
    console.error("Error fetching product data:", error);
    return null;
  }
}
