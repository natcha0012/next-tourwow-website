import React from "react";
import style from "./Program.module.css";
import Link from "next/link";
import { Program } from "../../../types/program";
import Image from "next/image";
import { PiMapPinArea } from "react-icons/pi";
import { RxClock } from "react-icons/rx";
import { BiSolidStar } from "react-icons/bi";
import { TbCalendarTime } from "react-icons/tb";
import { SlPlane } from "react-icons/sl";
import Soldout from "@/assets/images/soldout.png";
type Props = {
  program: Program;
};
function ProgramCard({ program }: Props) {
  return (
    <div className={style.card}>
      <Link className="w-full" href={program.product_url} prefetch={false}>
        <figure className="-m-2 relative h-[300px] lg:h-[260px]">
          <Image
            src={program?.banner_url}
            alt={`ทัวร์${program?.countryListText} เมือง${program?.cityListText} ${program?.name} - TWP-${program?.tour_code}`}
            fill
            sizes="400"
            className="object-cover"
          ></Image>
        </figure>
      </Link>
      <Link href={program.product_url} prefetch={false}>
        <h3 className={style.headline}>{program.name}</h3>
      </Link>
      <p className={style.hilight}>{program.hilight_description}</p>
      <ul className={style.programDetail}>
        <li className={style.basisFull}>
          <PiMapPinArea className="w-4 h-4 mr-2" />
          <span className=" text-ellipsis line-clamp-1">
            {program.countryListText} {program.cityListText}
          </span>
        </li>
        <li>
          <RxClock className="w-4 h-4 mr-2" />
          <span>
            {program.duration_day} วัน {program.duration_night} คืน
          </span>
          {program.hotel_star && program.hotel_star >= 4 && (
            <span className="flex items-center ml-1">
              <BiSolidStar />
              {program.hotel_star}
            </span>
          )}
        </li>
        <li>
          <TbCalendarTime className="w-4 h-4 mr-2" />
          <span>{program.periodMonthText}</span>
        </li>
        <li>
          <SlPlane className="w-4 h-4 mr-2" />
          {program.lowestPeriod?.go_transportation_name_en ? (
            <span>
              {program?.lowestPeriod?.go_transportation_name_en} (
              {program?.lowestPeriod?.go_transportation_code})
            </span>
          ) : (
            <span>ไม่ระบุ</span>
          )}
        </li>
      </ul>
      <div className="flex justify-between">
        {program.lowestPeriod && (
          <div>
            <span>เริ่มต้น</span>
            <span className=" line-through ml-1">
              {new Intl.NumberFormat("th-TH", {
                style: "currency",
                currency: "THB",
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
              }).format(program.lowestPeriod?.price_adult_double_compare || 0)}
            </span>
            <br />
            <span
              className={`font-bold ${
                program.lowestPeriod?.price_adult_double_compare &&
                program.lowestPeriod?.price_adult_double_compare > 0
                  ? "text-[var(--tw-red)]"
                  : ""
              }`}
            >
              {new Intl.NumberFormat("th-TH", {
                style: "currency",
                currency: "THB",
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
              }).format(program.lowestPeriod?.price_adult_double || 0)}
            </span>
          </div>
        )}
        <Link
          href={program.product_url}
          prefetch={false}
          className={style.buttonViewDetail}
        >
          ดูข้อมูล
        </Link>
      </div>
      {program?.periods &&
        program.periods?.length > 0 &&
        program.periods[0].quantity_remaining <= 0 && (
          <div className={style.soldout}>
            <div className={style.label}>
              <Image
                src={Soldout}
                alt="soldout"
                className="h-[50px] w-auto"
              ></Image>
              <span className="text-white text-sm text-center">
                ว้า.. เสียใจด้วยนะ
                <br />
                ลองดูโปรแกรมอื่นก่อนน๊า...
              </span>
            </div>
          </div>
        )}
    </div>
  );
}

export default ProgramCard;
