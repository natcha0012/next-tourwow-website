// app/api/programs/top2/route.ts
import { getProgramDetail } from "@/app/tours/apis/program-detail";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const routerUrl = url.searchParams.get("url_path");
  if (!routerUrl)
    return NextResponse.json({ error: "Internal Error" }, { status: 400 });

  const programDetail = await getProgramDetail(routerUrl);
  if (programDetail) {
    const countryListText = programDetail.countries
      .map((item) => item.name_th)
      .join(", ");
    const cityListText = programDetail.product_country_sub_units
      .map((item) => item.name_th)
      .join(", ");
    return NextResponse.json({
      countryTh: programDetail.country.name_th,
      countryEn: programDetail.country.name_en,
      name: programDetail.tw_name || programDetail.name,
      meta: {
        title: `ทัวร์${countryListText} เมือง${cityListText} ${
          programDetail.tw_name || programDetail.name
        } | ${programDetail.tour_code}`,
        description: `${
          programDetail.tw_hilight_description ||
          programDetail.hilight_description
        } | ${programDetail.tour_code}`,
        images: programDetail?.banner_image_files.length
          ? [{ url: programDetail.banner_image_files[0].preview_url }]
          : [],
      },
    });
  } else {
    return NextResponse.json({ error: "Internal Error" }, { status: 400 });
  }
}
