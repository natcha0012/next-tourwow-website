import React from "react";
import { GoDotFill } from "react-icons/go";
import MonthChoice from "./MonthChoice/MonthChoice";
import { getProductDateData } from "../apis/program";
import { ICalendarPrice } from "../types/calendar-price";
import CalendarPrice from "./CalendarPrice/CalendarPrice";

type Props = {
  countryId: number | null;
  countrySubUnitId: number | null;
};
async function DaySelector({ countryId, countrySubUnitId }: Props) {
  const month = new Date().getMonth();
  const productData = await getProductDateData(
    countryId!,
    countrySubUnitId || undefined
  );
  const calendarPrices = Array.from({ length: 7 }).map((_, i) => {
    const price: Record<number, ICalendarPrice> = {};
    productData.forEach((p) => {
      const date = new Date(p.date);
      if (date.getMonth() === month + i) {
        price[date.getDate()] = p;
      }
    });

    return <CalendarPrice key={i} month={month + i} price={price} />;
  });
  return (
    <section className="container">
      <div id="sub-title" className="flex items-center">
        <h2>เลือกวัน</h2>
        <GoDotFill className="text-[var(--tw-green)] ml-4 " />
        <span>ที่ว่าง และราคาเริ่มต้น </span>
        <GoDotFill className="text-[var(--tw-light-gray)] ml-1" /> เต็ม
      </div>
      <MonthChoice>{calendarPrices}</MonthChoice>
    </section>
  );
}

export default DaySelector;
