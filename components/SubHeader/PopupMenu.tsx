"use client";

import {
  asiaContinent,
  Country,
  europeContinent,
  otherContinent,
} from "@/constants/continents";
import Image from "next/image";
import styles from "./PopupMenu.module.css";

export default function PopupMenu() {
  const renderMenuSection = (title: string, countries: Country[]) => (
    <div className="text-[var(--tw-gray)]">
      <b className=" ml-4">{title}</b>
      <ul
        className={`grid grid-cols-2 px-4 mt-4 ${
          title === "ทัวร์ทวีปยุโรป"
            ? " border-x-[1px] border-[var(--tw-light-gray)]"
            : ""
        }`}
      >
        {countries.map((item, index) => (
          <li key={index} className=" flex mr-2 mb-2 gap-2">
            <a href={`/${item.slug}-tour`}>
              <Image
                style={{ verticalAlign: "bottom" }}
                width={35}
                height={24}
                src={`/flag-icons/${item.country_code.toLowerCase()}.svg`}
                alt={item.name_en}
                loading="lazy"
              />
            </a>
            <div> {item.name_th}</div>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <div id="menu-wrap" className={styles.menuWrap}>
      {renderMenuSection("ทัวร์ทวีปเอเชีย", asiaContinent)}
      {renderMenuSection("ทัวร์ทวีปยุโรป", europeContinent)}
      {renderMenuSection("ทัวร์ทวีปอื่นๆ", otherContinent)}
    </div>
  );
}
