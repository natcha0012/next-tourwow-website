import React from "react";
import { GoDotFill } from "react-icons/go";
import MonthChoice from "./MonthChoice/MonthChoice";
import styles from "./ProgramDetailCalendar.module.css";
import Calendar from "./Calendar/Calendar";
import { thaiMonthsAbbreviation } from "@/constants/months";
import { Period } from "@/app/tours/interfaces/program-detail.interface";
import ProgramDetailSelected from "./ProgramDetailSelected/ProgramDetailSelected";

type Props = {
  mapActiveDate: Record<
    string,
    { date: number; type: string | null; period?: Period }[]
  >;
  hotMonth: number | null;
};
async function ProgramDetailCalendar({ mapActiveDate, hotMonth }: Props) {
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
      <Calendar
        key={key}
        year={year}
        month={month + i}
        activeDate={mapActiveDate[key] ?? []}
      />
    );
    calendarChildren.push(child);
  }
  return (
    <section className={`container ${styles.programDetailBox}`}>
      <h2>ช่วงเวลาเดินทาง</h2>
      <MonthChoice monthChoicePills={monthPillChoices} hotMonth={hotMonth}>
        {calendarChildren}
      </MonthChoice>
      <div id="sub-title" className="m-2 flex flex-wrap mb-6">
        <span className="flex items-center mr-4">
          <GoDotFill className="text-[var(--tw-green)]" />
          จองได้เลย{" "}
        </span>
        <span className="flex items-center mr-4">
          <GoDotFill className="text-[var(--tw-light-gray)]" />
          เต็ม <small className="ml-1">กรุณาติดต่อเจ้าหน้าที่</small>
        </span>
        <span className="flex items-center">
          <GoDotFill className="text-[var(--tw-blue)]" />
          เลือก
        </span>
      </div>
      <ProgramDetailSelected></ProgramDetailSelected>
    </section>
  );
}

export default ProgramDetailCalendar;
