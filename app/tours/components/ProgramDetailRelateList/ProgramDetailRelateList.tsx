import React from "react";
import { getRelateProgram } from "../../apis/program-detail";
import ProgramCard from "@/app/[...tours]/components/SearchResult/ProgramCard/ProgramCard";
import styles from "./ProgramDetailRelateList.module.css";
import { Period, Program } from "@/app/[...tours]/types/program";
import { thaiMonthsAbbreviation } from "@/constants/months";
type Props = {
  routerUrl: string;
};

async function ProgramDetailRelateList({ routerUrl }: Props) {
  const programList = await getRelateProgram(routerUrl);
  const getPeriodMonth = (program: Program) => {
    const today = new Date();
    const index = program.periods.findIndex((p) => {
      if (!p.start_at) return false;
      return new Date(p.start_at) >= today;
    });
    if (index === -1) return "-";
    const startDate = new Date(program.periods[index].start_at);
    const startMonth = startDate.getMonth();
    const startYear = (startDate.getFullYear() + 543) % 100;
    const lastDate = new Date(
      program.periods[program.periods.length - 1].start_at
    );
    const lastMonth = lastDate.getMonth();
    const lastYear = (lastDate.getFullYear() + 543) % 100;
    return startYear === lastYear
      ? startMonth === lastMonth
        ? `${thaiMonthsAbbreviation[startMonth]} ${startYear}`
        : `${thaiMonthsAbbreviation[startMonth]} - ${thaiMonthsAbbreviation[lastMonth]} ${lastYear}`
      : `${thaiMonthsAbbreviation[startMonth]} ${startYear} - ${thaiMonthsAbbreviation[lastMonth]} ${lastYear}`;
  };

  const getLowestPricePeriod = (program: Program): Period | null => {
    if (program?.periods?.length) {
      return program.periods.reduce((lowest, current) => {
        return current.price_adult_double < lowest.price_adult_double
          ? current
          : lowest;
      });
    }

    return program?.lowestPeriod ?? null;
  };

  const transformPrograms = programList.map((p) => {
    const tp = p;
    tp.periodMonthText = p.periodMonthText || getPeriodMonth(p);
    tp.lowestPeriod = getLowestPricePeriod(p);
    tp.countryListText = p.countries.map((item) => item.name_th).join(", ");
    tp.cityListText = p.country_sub_units
      .map((item) => item.name_th)
      .join(", ");
    return tp;
  });

  return (
    <section className="mb-12">
      <h2>โปรแกรมทัวร์ใกล้เคียง</h2>
      <div className="flex overflow-auto gap-4 -mt-4">
        {transformPrograms.map((program) => (
          <div className={styles.programCard} key={program.id}>
            <ProgramCard key={program.id} program={program}></ProgramCard>
          </div>
        ))}
      </div>
    </section>
  );
}

export default ProgramDetailRelateList;
