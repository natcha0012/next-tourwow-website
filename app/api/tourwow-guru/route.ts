import { getPrograms } from "@/app/[...tours]/apis/program";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      country_id,
      country_sub_unit_id,
      period_start_at_month,
      go_transportation_id,
    } = body;

    const searchFilters = {
      country_id: country_id ?? undefined,
      country_sub_unit_id: country_sub_unit_id ?? undefined,
      period_start_at_month: period_start_at_month ?? undefined,
      go_transportation_id: go_transportation_id ?? undefined,
    };

    const fullResult = await getPrograms(1, 1, searchFilters);
    const response = {
      lowestPrice: (Number(fullResult?.lowest_price) || 0).toLocaleString(
        "th-TH",
        {
          minimumFractionDigits: 0,
          maximumFractionDigits: 2,
        }
      ),
      totalQuantityRemaining: Number(
        fullResult?.total_quantity_remaining || 0
      ).toLocaleString("th-TH", {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
      }),
    };

    return NextResponse.json(response);
  } catch {
    return NextResponse.json({ error: "Internal Error" }, { status: 400 });
  }
}
