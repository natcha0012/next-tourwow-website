import { Period } from "@/app/tours/interfaces/program-detail.interface";
import React from "react";
import styles from "./PeriodTable.module.css";
import Image from "next/image";
import { getCurrency } from "@/app/libs/utils/currency";
import Link from "next/link";
import { thaiDatePeriod } from "@/app/libs/utils/date";
type Props = {
  periods: Period[];
};
function PeriodTable({ periods }: Props) {
  return (
    <div className={styles.periodTable}>
      <table className="w-full">
        <thead className="text-white bg-tw-blue">
          <tr>
            <td className="py-4 px-6 sm:py-4 sm:px-10">ช่วงเวลา</td>
            <td className="py-4 px-6 sm:py-4 sm:px-10">ผู้ใหญ่</td>
            <td className="py-4 px-6 sm:py-4 sm:px-10"></td>
          </tr>
        </thead>
        <tbody>
          {periods.map((p, index) => (
            <tr key={index} className={styles.tableBorder}>
              <td className="py-4 px-6 sm:py-4 sm:px-10">
                <span className="sarabun">
                  {thaiDatePeriod(p.start_at, p.end_at, true, true)}
                </span>
                {p.quantity_remaining <= 4 && p.quantity_remaining > 0 && (
                  <div className={styles.lowQuatityLabel}>
                    <Image
                      src={"/icons/icon-fire.svg"}
                      width={20}
                      height={20}
                      alt="fire"
                    />
                    เหลือน้อย
                  </div>
                )}
                {p.quantity_remaining <= 0 && (
                  <div className="text-[var(--tw-red)] font-bold text-sm">
                    เต็ม
                  </div>
                )}
              </td>
              <td className="py-4 px-6 sm:py-4 sm:px-10">
                {p.price_adult_double_compare && (
                  <span className="text-sm mr-4">
                    เริ่มต้น
                    <small className="line-through">
                      {getCurrency(p.price_adult_double_compare)}
                    </small>
                  </span>
                )}
                <strong
                  className={`text-2xl ${
                    p.price_adult_double_compare && "text-[var(--tw-red)]"
                  }`}
                >
                  {getCurrency(p.price_adult_double)}
                </strong>
              </td>
              <td className="py-4 px-6 sm:py-4 sm:px-10">
                <Link
                  className={`${styles.bookingButton} ${
                    p.quantity_remaining > 0 && styles.green
                  }`}
                  href={"https://line.me/ti/p/~@tourwow"}
                  target="_blank"
                >
                  {p.quantity_remaining <= 0 ? "สอบถาม" : "จอง"}
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PeriodTable;
