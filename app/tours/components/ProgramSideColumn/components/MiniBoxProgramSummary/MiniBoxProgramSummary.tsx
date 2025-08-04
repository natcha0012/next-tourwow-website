import {
  Period,
  ProgramDetail,
} from "@/app/tours/interfaces/program-detail.interface";
import React from "react";
import { FaStar } from "react-icons/fa6";
type Props = {
  program: ProgramDetail | null;
};

function findLowerPricePeriod(periods: Period[]): Period {
  // Filter periods start date more than current date.
  let filters = periods.filter((p) => {
    const date = new Date(p.start_at);
    if (date && date >= new Date()) {
      return true;
    }

    return false;
  });

  if (filters.length === 0) {
    filters = periods;
  }

  return filters.reduce((a, b) =>
    a.price_adult_double < b.price_adult_double ? a : b
  );
}

function MiniBoxProgramSummary({ program }: Props) {
  const lowestPeriod = findLowerPricePeriod(program?.periods || []);
  return (
    <section className="p-4" style={{ boxShadow: "0 0 3px #00000040" }}>
      <h1 className="mt-0">
        ทัวร์{program?.countryListText} เมือง{program?.cityListText}
        {program?.tw_name ? program?.tw_name : program?.name}
      </h1>
      <p className="sarabun my-4">
        {program?.tw_hilight_description
          ? program?.tw_hilight_description
          : program?.hilight_description}
      </p>
      <ul className="flex justify-between my-4 bg-[var(--tw-sky-blue)]">
        <li className="p-2">
          <div>จำนวนวัน</div>
          <strong>
            {program?.duration_day} วัน
            {program?.duration_night} คืน
          </strong>
        </li>
        <li className="p-2">
          <div>ที่พัก</div>
          <div className="text-tw-blue">
            <FaStar className="mr-1" />
            {program?.hotel_star}
          </div>
        </li>
        <li className="p-2">
          <div>สายการบิน</div>
          <strong>{program?.plane_transportation?.code}</strong>
        </li>
      </ul>
      <ul className="flex justify-between">
        <li className="p-2">
          <div>ประเทศ{program?.country?.name_th}</div>
          <div>TWP-{program?.tour_code}</div>
        </li>
        <li className="p-2">
          <div>
            เริ่มต้น{" "}
            {lowestPeriod?.price_adult_double_compare && (
              <small className=" line-through">
                ฿
                {lowestPeriod?.price_adult_double_compare.toLocaleString(
                  "th-TH",
                  {
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 2,
                  }
                )}
              </small>
            )}
          </div>
          <strong className="text-[var(--tw-red)] text-xl">
            ฿
            {lowestPeriod?.price_adult_double.toLocaleString("th-TH", {
              minimumFractionDigits: 0,
              maximumFractionDigits: 2,
            })}
          </strong>
        </li>
      </ul>
    </section>
  );
}

export default MiniBoxProgramSummary;
