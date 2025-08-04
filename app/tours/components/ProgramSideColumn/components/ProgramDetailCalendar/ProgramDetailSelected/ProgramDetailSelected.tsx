"use client";
import { useAtom } from "jotai";
import React from "react";
import { CiCalendar } from "react-icons/ci";
import { DayButtonAtom } from "../../../atoms/DayButtonAtom";
import { thaiDatePeriod } from "@/app/libs/utils/date";
import { getCurrency } from "@/app/libs/utils/currency";
import Link from "next/link";

function ProgramDetailSelected() {
  const [selectedDate] = useAtom(DayButtonAtom);
  if (!selectedDate?.period) return null;
  return (
    <div className="bg-[var(--tw-sky-blue)] -m-4 p-4">
      <div className="text-xl font-bold flex align-baseline">
        <CiCalendar className="w-6 h-6 mr-1" />
        เลือก{" "}
        {thaiDatePeriod(
          selectedDate?.period?.start_at,
          selectedDate?.period?.end_at,
          true,
          true
        )}
      </div>
      <ul className="my-3">
        <li className="flex justify-between items-center">
          <b>ผู้ใหญ่</b>
          <div>
            {selectedDate?.period?.price_adult_double_compare && (
              <small className=" line-through">
                {getCurrency(selectedDate?.period?.price_adult_double_compare)}
              </small>
            )}
            <strong className="mx-1 text-[var(--tw-red)] text-2xl">
              {getCurrency(selectedDate?.period?.price_adult_double ?? 0)}
            </strong>
            <span>บาท / ท่าน</span>
          </div>
        </li>
        {selectedDate?.period?.price_child_bed && (
          <li className="flex justify-between items-center">
            <b>เด็ก</b>
            <div>
              {selectedDate?.period?.price_child_bed_compare && (
                <small className=" line-through">
                  {getCurrency(selectedDate?.period?.price_child_bed_compare)}
                </small>
              )}
              <strong className="mx-1 text-[var(--tw-red)] text-2xl">
                {getCurrency(selectedDate?.period?.price_child_bed ?? 0)}
              </strong>
              <span>บาท / ท่าน</span>
            </div>
          </li>
        )}

        {selectedDate?.period?.price_infant && (
          <li className="flex justify-between items-center">
            <b>
              ทารก <span>(ต่ำกว่า / ขวบ)</span>
            </b>
            <div>
              {selectedDate?.period?.price_infant_compare && (
                <small className=" line-through">
                  {getCurrency(selectedDate?.period?.price_infant_compare)}
                </small>
              )}
              <strong className="mx-1 text-[var(--tw-red)] text-2xl">
                {getCurrency(selectedDate?.period?.price_infant ?? 0)}
              </strong>
              <span>บาท / ท่าน</span>
            </div>
          </li>
        )}
      </ul>
      <div className="text-white bg-[var(--tw-green)] rounded-4xl p-4 text-center">
        <Link href="https://line.me/ti/p/~@tourwow" target="_blank">
          คลิกจองเลย
        </Link>
      </div>
    </div>
  );
}

export default ProgramDetailSelected;
