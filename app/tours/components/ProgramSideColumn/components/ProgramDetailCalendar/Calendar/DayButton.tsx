"use client";
import { useAtom } from "jotai";
import React from "react";
import { DayButtonAtom } from "../../../atoms/DayButtonAtom";
import style from "./Calendar.module.css";
import { Period } from "@/app/tours/interfaces/program-detail.interface";
type Props = {
  button: { date: number; type: string; period?: Period };
};
function DayButton({ button }: Props) {
  const [selectedDate, setSelectedDate] = useAtom(DayButtonAtom);
  return (
    <div className={style.dayButton}>
      <label
        onClick={() =>
          setSelectedDate({ day: button.date, period: button.period })
        }
        className={
          selectedDate?.period?.start_at === button.period?.start_at
            ? style.pick
            : style[button.type]
        }
      >
        {button.date}
      </label>
    </div>
  );
}

export default DayButton;
