import React from "react";
import { Period } from "../../interfaces/program-detail.interface";
import styles from "./ProgramDetailTravelTime.module.css";
import MonthChoice from "../ProgramSideColumn/components/ProgramDetailCalendar/MonthChoice/MonthChoice";
import PeriodTable from "./PeriodTable/PeriodTable";
import { thaiMonthsAbbreviation } from "@/constants/months";
type Props = {
  hotMonth: number | null;
  mapPeriods: Record<string, Period[]>;
};
function ProgramDetailTravelTime({ mapPeriods, hotMonth }: Props) {
  const today = new Date();
  const thisMonth = today.getMonth();
  const thisYear = today.getFullYear();
  const calendarChildren: React.ReactNode[] = [];
  const monthPillChoices: string[] = [];
  for (let i = 0; i < 6; i++) {
    const month = (thisMonth + i) % 12;
    const year = thisYear + (thisMonth + i < 12 ? 0 : 1);
    const key = `${month}-${year}`;
    const abbYear = (year + 543).toString().substring(2);
    const monthChoice = `${thaiMonthsAbbreviation[month]} ${abbYear}`;
    monthPillChoices.push(monthChoice);

    const child = (
      <PeriodTable key={key} periods={mapPeriods[key] ?? []}></PeriodTable>
    );
    calendarChildren.push(child);
  }
  return (
    <section id="hotPromo" className={styles.programPeriods}>
      <h2>ช่วงเวลาเดินทาง</h2>
      <MonthChoice monthChoicePills={monthPillChoices} hotMonth={hotMonth}>
        {calendarChildren}
      </MonthChoice>
    </section>
  );
}

export default ProgramDetailTravelTime;
