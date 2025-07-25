"use client";
import React, { useEffect, useState } from "react";
import style from "./SearchResult.module.css";
import { FaSliders } from "react-icons/fa6";
import { ProgramFilters, ProgramSortBy } from "../../types/program-filters";
import { getPrograms } from "../../apis/program";
import { Period, Program } from "../../types/program";
import ProgramCard from "./ProgramCard/ProgramCard";
import { thaiMonthsAbbreviation } from "@/constants/months";
import { programSelectedAtom } from "../../atoms/programSelectedAtom";
import { useAtom } from "jotai";
type Props = {
  headlineText: string;
  searchFilters: ProgramFilters;
};
function SearchResult({ headlineText, searchFilters }: Props) {
  const pageEntries = 12;
  const [selectedDate] = useAtom(programSelectedAtom);
  const [showFilter, setShowFilter] = useState(false);
  const [programTotal, setProgramTotal] = useState<number | undefined>(
    undefined
  );
  const [programList, setProgramList] = useState<Program[]>([]);
  const [sortBy, setSortBy] = useState<ProgramSortBy>("product_running_id_asc");
  const [page, setPage] = useState(1);
  let hasFetched = false;

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

  const transformData = (program: Program[]) => {
    const transformPrograms = program.map((p) => {
      const tp = p;
      tp.periodMonthText = p.periodMonthText || getPeriodMonth(p);
      tp.lowestPeriod = getLowestPricePeriod(p);
      tp.countryListText = p.countries.map((item) => item.name_th).join(", ");
      tp.cityListText = p.country_sub_units
        .map((item) => item.name_th)
        .join(", ");
      return tp;
    });
    setProgramList(transformPrograms);
  };

  useEffect(() => {
    if (hasFetched) return;
    hasFetched = true;
    getPrograms(1, pageEntries, searchFilters, sortBy).then((programs) => {
      setProgramTotal(programs?.total);
      transformData(programs?.result || []);
    });
  }, []);

  useEffect(() => {
    if (!selectedDate) {
      return;
    }
    const today = new Date();
    setPage(1);
    searchFilters.period_start_at = `${today.getFullYear()}-${
      (selectedDate?.month || 0) + 1
    }-${selectedDate?.day}`;
    getPrograms(1, pageEntries, searchFilters, sortBy).then((programs) => {
      setProgramTotal(programs?.total);
      transformData(programs?.result || []);
    });
  }, [selectedDate]);

  const onSortProgram = async (sortBy: ProgramSortBy) => {
    setPage(1);
    setSortBy(sortBy);
    const programs = await getPrograms(1, pageEntries, searchFilters, sortBy);
    setProgramTotal(programs?.total);
    transformData(programs?.result || []);
  };

  const clickGetMoreProgram = async () => {
    const rawPrograms = await getPrograms(
      page + 1,
      pageEntries,
      searchFilters,
      sortBy
    );
    setPage(page + 1);
    transformData([...programList, ...(rawPrograms?.result || [])]);
  };
  return (
    <section className="container mt-4">
      <div className=" float-right">
        <button
          className={style.filterButton}
          onClick={() => setShowFilter(!showFilter)}
        >
          <FaSliders className="mr-2" />
          <span>ตัวช่วยค้นหา</span>
        </button>
        {showFilter && (
          <ul className={style.sortOrderBox}>
            <li onClick={() => onSortProgram("product_running_id_asc")}>
              ยอดนิยม
            </li>
            <li onClick={() => onSortProgram("period_price_adult_double_asc")}>
              {"ราคา น้อย -> มาก"}
            </li>
            <li onClick={() => onSortProgram("period_price_adult_double_desc")}>
              {"ราคา มาก -> น้อย"}
            </li>
          </ul>
        )}
      </div>
      <h2>ผลการค้นหา</h2>
      <div className="text-xl font-bold">
        เจอแล้ว {headlineText} {programTotal} โปรแกรม
      </div>
      <div className="flex flex-wrap">
        {programList.map((program) => (
          <div className={style.programCard} key={program.id}>
            <ProgramCard key={program.id} program={program}></ProgramCard>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-center my-4">
        <button
          className={style.clickMoreBtn}
          onClick={() => clickGetMoreProgram()}
        >
          ดูโปรแกรมทัวร์เพิ่ม
        </button>
      </div>
    </section>
  );
}

export default SearchResult;
