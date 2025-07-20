"use client";
import { thaiMonthsAbbreviation } from "@/constants/months";
import React, { useState } from "react";
import styles from "./MonthChoice.module.css";

const today = new Date();
const month = today.getMonth();
const monthChoicePills = [
  month,
  month + 1,
  month + 2,
  month + 3,
  month + 4,
  month + 5,
];

const year = (today.getFullYear() + 543).toString().substring(2);

type Props = {
  children: React.ReactNode[];
};
function MonthChoice({ children }: Props) {
  const [selectedMonth, SetSelectedMonth] = useState(month);
  return (
    <div>
      <ul className="flex my-4 overflow-x-auto">
        {monthChoicePills.map((item) => (
          <li key={item}>
            <button
              className={`${styles.monthButton} ${
                item === selectedMonth ? styles.active : ""
              }`}
              onClick={() => SetSelectedMonth(item)}
            >
              {thaiMonthsAbbreviation[item % 12]}{" "}
              {Number(year) + (item < 12 ? 0 : 1)}
            </button>
          </li>
        ))}
      </ul>
      <div className="flex">
        {children[selectedMonth - month]}
        <div className="hidden md:block">
          {children[selectedMonth - month + 1]}
        </div>
      </div>
    </div>
  );
}

export default MonthChoice;
