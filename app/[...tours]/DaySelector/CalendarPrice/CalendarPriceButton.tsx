"use client";
import React from "react";
import style from "./CalendarPrice.module.css";
import { useAtom } from "jotai";
import {
  programSelectedAtom,
  TProgramSelectedAtom,
} from "../../atoms/programSelectedAtom";

type Props = {
  date: TProgramSelectedAtom;
  price: string;
  quantity: number;
};
function CalendarPriceButton({ date, quantity, price }: Props) {
  const [selectedDate, setSelectedDate] = useAtom(programSelectedAtom);
  return (
    <div className={style.dayButton}>
      <label
        onClick={() => setSelectedDate(date)}
        className={selectedDate === date ? style.pick : style.blank}
      >
        {date.day}
      </label>

      <span className={style.priceLabel}>
        <span>{price}</span>
        {quantity <= 4 ? (
          <span className=" block text-[#ff0202]">มี {quantity} ที่</span>
        ) : (
          quantity < 10 && (
            <span className=" block text-[#ffad00]">เหลือน้อย</span>
          )
        )}
      </span>
    </div>
  );
}

export default CalendarPriceButton;
