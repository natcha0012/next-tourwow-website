import React from "react";
import style from "./CalendarPrice.module.css";
import { thaiMonths } from "@/constants/months";
import { ICalendarPrice } from "../../types/calendar-price";
import CalendarPriceButton from "./CalendarPriceButton";

type Props = {
  month: number;
  price?: Record<number, ICalendarPrice>;
};

const currentYear = new Date().getFullYear();
const displayYear = currentYear + 543;

let lastDaysOfPreviousMonth = 0;

let startGapDays = 0;
let endGapDays = 0;
let daysOfMonth = 0;

function CalendarPrice({ month, price }: Props) {
  function renderCalendar(year: number, month: number): void {
    const startDay = new Date(year, month, 1);
    const endDay = new Date(year, month + 1, 1);

    lastDaysOfPreviousMonth = new Date(year, month, 0).getDate();
    daysOfMonth = (endDay.getTime() - startDay.getTime()) / (1000 * 3600 * 24);
    startGapDays = startDay.getDay();
    endGapDays = 42 - daysOfMonth - startGapDays;
  }
  renderCalendar(currentYear, month);
  return (
    <div className={style.calendarTravel}>
      <h3 className="text-center text-2xl my-6">
        {thaiMonths[month % 12]} {displayYear + (month < 12 ? 0 : 1)}
      </h3>
      <ul className={style.header}>
        <li>อา</li>
        <li>จ</li>
        <li>อ</li>
        <li>พ</li>
        <li>พฤ</li>
        <li>ศ</li>
        <li>ส</li>
      </ul>
      <div className="flex justify-between flex-wrap">
        {Array.from({ length: startGapDays }).map((_, i) => (
          <div key={i} className={style.dayButton}>
            <label className={style.disable}>
              {lastDaysOfPreviousMonth - (startGapDays - 1) + i}
            </label>
          </div>
        ))}

        {Array.from({ length: daysOfMonth }).map((_, i) =>
          price && price[i + 1]?.period_quantity_remaining ? (
            <CalendarPriceButton
              key={i}
              date={{ day: i + 1, month: month }}
              quantity={price[i + 1].period_quantity_remaining}
              price={Number(
                price[i + 1].period_price_adult_double
              ).toLocaleString("th-TH", {
                minimumFractionDigits: 0,
                maximumFractionDigits: 2,
              })}
            ></CalendarPriceButton>
          ) : (
            <div key={i} className={style.dayButton}>
              <label className={price && price[i + 1] ? style.full : ""}>
                {i + 1}
              </label>
            </div>
          )
        )}

        {Array.from({ length: endGapDays }).map((_, i) => (
          <div key={i} className={style.dayButton}>
            <label className={style.disable}>{i + 1}</label>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CalendarPrice;
