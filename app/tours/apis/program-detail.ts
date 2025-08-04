import { Program } from "@/app/[...tours]/types/program";
import {
  ProductMetaResponse,
  ProgramDetail,
  ProgramDetailHeader,
} from "../interfaces/program-detail.interface";
const API_URL = process.env.NEXT_PUBLIC_API_URL;
const AGENCY_DOMAIN = process.env.NEXT_PUBLIC_AGENCY_DOMAIN;
const HOST = process.env.NEXT_PUBLIC_HOST;
export async function getProgramDetail(
  routerUrl: string
): Promise<ProgramDetail | null> {
  const url = `${API_URL}tw/product?tw_url_path=${routerUrl}`;
  try {
    const res = await fetch(url, { cache: "no-store" });
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

export async function getMetaProgramDetail(
  routerUrl: string
): Promise<ProductMetaResponse | null> {
  const url = `${API_URL}tw/product/meta?tw_url_path=${routerUrl}`;
  try {
    const res = await fetch(url, { cache: "force-cache" });
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

export async function getProgramDetailHeader(
  routerUrl: string
): Promise<ProgramDetailHeader | null> {
  try {
    const res = await fetch(
      `${HOST}api/program-detail/header?url_path=${routerUrl}`,
      { cache: "force-cache" }
    );
    return res.json();
  } catch (error) {
    console.error("Error getting guru header:", error);
    return null;
  }
}

export async function getProgramDetailPdfFile(
  poolKey: string
): Promise<string | null> {
  try {
    const res = await fetch(
      `${API_URL}twm/${AGENCY_DOMAIN}/products/${poolKey}/pdf_detail_file`
    );
    const data = await res.json();
    return data?.data.url || null;
  } catch (error) {
    console.error("Error getting guru header:", error);
    return null;
  }
}

export async function getRelateProgram(routerUrl: string): Promise<Program[]> {
  try {
    const res = await fetch(
      `${API_URL}tw/recommend/products?tw_url_path=${routerUrl}&limit=4`
    );
    const data = await res.json();
    return data.data;
  } catch (error) {
    console.error("Error getting guru header:", error);
    return [];
  }
}
