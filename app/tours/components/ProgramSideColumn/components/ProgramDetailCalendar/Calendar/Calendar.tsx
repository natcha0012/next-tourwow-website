import React from "react";
import style from "./Calendar.module.css";
import DayButton from "./DayButton";
import { Period } from "@/app/tours/interfaces/program-detail.interface";

type Props = {
  year: number;
  month: number;
  activeDate: { date: number; type: string | null; period?: Period }[];
};

let lastDaysOfPreviousMonth = 0;

let startGapDays = 0;
let endGapDays = 0;
let daysOfMonth = 0;

function Calendar({ month, activeDate, year }: Props) {
  function renderCalendar(year: number, month: number): void {
    const startDay = new Date(year, month, 1);
    const endDay = new Date(year, month + 1, 1);

    lastDaysOfPreviousMonth = new Date(year, month, 0).getDate();
    daysOfMonth = (endDay.getTime() - startDay.getTime()) / (1000 * 3600 * 24);
    startGapDays = startDay.getDay();
    endGapDays = 42 - daysOfMonth - startGapDays;
  }
  renderCalendar(year, month);

  const dayButtons: { date: number; type: string | null; period?: Period }[] =
    [];
  for (let i = 1; i <= daysOfMonth; i++) {
    const button = activeDate.find((d) => d.date === i);
    dayButtons.push(button || { date: i, type: null });
  }
  return (
    <div className="w-full">
      <ul className="grid grid-cols-7 gap-1 py-4 text-center">
        <li>อา</li>
        <li>จ</li>
        <li>อ</li>
        <li>พ</li>
        <li>พฤ</li>
        <li>ศ</li>
        <li>ส</li>
      </ul>
      <div className="grid grid-cols-7 gap-1">
        {Array.from({ length: startGapDays }).map((_, i) => (
          <div key={i} className={style.dayButton}>
            <label className={style.disable}>
              {lastDaysOfPreviousMonth - (startGapDays - 1) + i}
            </label>
          </div>
        ))}

        {dayButtons.map((button) =>
          button.type ? (
            <DayButton
              key={button.date}
              button={{
                date: button.date,
                type: button.type,
                period: button.period,
              }}
            ></DayButton>
          ) : (
            <div key={button.date} className={style.dayButton}>
              <label>{button.date}</label>
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

export default Calendar;
