"use client";
import React, { useState } from "react";
import styles from "./MonthChoice.module.css";

type Props = {
  monthChoicePills: string[];
  children: React.ReactNode[];
  hotMonth: number | null;
};
function MonthChoice({ children, monthChoicePills, hotMonth }: Props) {
  const [selectedMonth, SetSelectedMonth] = useState(hotMonth ?? 0);
  return (
    <div>
      <ul className="flex whitespace-pre py-4 overflow-x-auto">
        {monthChoicePills.map((item, index) => (
          <li key={index}>
            <button
              className={`${styles.monthButton} ${
                index === selectedMonth ? styles.active : ""
              }`}
              onClick={() => SetSelectedMonth(index)}
            >
              {item}
            </button>
          </li>
        ))}
      </ul>
      <div className="flex">{children[selectedMonth]}</div>
    </div>
  );
}

export default MonthChoice;
