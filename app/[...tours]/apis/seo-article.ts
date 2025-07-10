import { ISeoArticleDetail } from "@/app/blog/types/seo-article-detail";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const AGENCY_DOMAIN = process.env.NEXT_PUBLIC_AGENCY_DOMAIN;
export async function getSeoArticle(
  path: string
): Promise<ISeoArticleDetail | null> {
  const url = `${API_URL}twm/${AGENCY_DOMAIN}/seo_articles/by_url_path`;
  try {
    const res = await fetch(`${url}?url_path=${path}`);
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
