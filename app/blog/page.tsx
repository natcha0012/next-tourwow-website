import Breadcrumb, { BreadcrumbType } from "@/components/Breadcrumb";
import React from "react";
import BlogFilterCountry from "./components/BlogFilterCountry/BlogFilterCountry";
import { Metadata } from "next";

export type Country = {
  id: number;
  name_th: string;
  name_en: string;
  slug: string;
  country_code: string;
  icon_url: string;
  primary_cover_url?: string;
  continents_id?: number;
};

export const metadata: Metadata = {
  title: "บทความท่องเที่ยว รีวิวเที่ยวต่างประเทศ | Tourwow ทัวร์ว้าว",
  description:
    "แหล่งรวมบทความท่องเที่ยวต่างประเทศ พร้อมเรื่องราวการเดินทางทุกรูปแบบ และประสบการณ์การท่องเที่ยวทั่วโลกมากมาย รวบรวมไว้ให้คุณแล้วที่นี่ | Tourwow ทัวร์ว้าว",
};

async function getSeoArticleCountriesActive(): Promise<Country[]> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/twm/${process.env.NEXT_PUBLIC_AGENCY_DOMAIN}/seo_articles/countries`
    );
    const data = await res.json();
    return data.status === "success"
      ? (data.data as Country[]).sort((a, b) =>
          a.name_th.localeCompare(b.name_th)
        )
      : [];
  } catch {
    return [];
  }
}
async function page() {
  const countries = await getSeoArticleCountriesActive();
  const breadcrumb: BreadcrumbType[] = [{ text: "บทความ", link: null }];
  return (
    <div>
      <Breadcrumb breadcrumb={breadcrumb}></Breadcrumb>
      <div className="container min-h-[100vh]">
        <h1>บทความล่าสุด</h1>
        <BlogFilterCountry countries={countries}></BlogFilterCountry>
      </div>
    </div>
  );
}

export default page;
