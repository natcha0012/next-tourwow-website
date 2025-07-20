"use client";
import React, { useState } from "react";
import styles from "./BlogFilterCountry.module.css";
import { Country } from "../../page";
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp,
} from "react-icons/md";
import BlogList from "./components/BlogList/BlogList";

type Props = {
  countries: Country[];
};

function BlogFilterCountry({ countries }: Props) {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [expand, setExpand] = useState<boolean>(false);
  return (
    <div>
      <div className="flex flex-wrap">
        <button
          className={`${styles.btn} ${
            selectedId === null ? styles.btnActive : ""
          }`}
          onClick={() => setSelectedId(null)}
        >
          {" "}
          ดูทั้งหมด
        </button>
        {countries.slice(0, expand ? undefined : 10).map((country) => (
          <button
            key={country.id}
            className={`${styles.btn} ${
              selectedId === country.id ? styles.btnActive : ""
            }`}
            onClick={() => setSelectedId(country.id)}
          >
            {" "}
            {country.name_th}
          </button>
        ))}
        <button
          onClick={() => setExpand(!expand)}
          className={`${styles.linkMore} cursor-pointer flex items-center`}
        >
          {expand ? (
            <>
              <span>ดูน้อยลง</span>
              <MdOutlineKeyboardArrowUp />
            </>
          ) : (
            <>
              <span> ดูเพิ่มเติม</span>
              <MdOutlineKeyboardArrowDown />
            </>
          )}
        </button>
      </div>
      <BlogList countryId={selectedId}></BlogList>
    </div>
  );
}

export default BlogFilterCountry;
