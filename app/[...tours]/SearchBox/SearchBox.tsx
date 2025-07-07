"use client";

import { useEffect, useRef, useState } from "react";
import { SuggestionText, SearchBoxFilters } from "../types/search-box";
import { Country, CountrySubUnit } from "@/app/[...tours]/types/country";
import styles from "./SearchBox.module.css";
import { IoSearchOutline } from "react-icons/io5";
import { engMonth, thaiMonths } from "@/constants/months";
import { IoIosClose } from "react-icons/io";
import WordHighlight from "./WordHighlight";
import { useRouter } from "next/navigation";

type Props = {
  countries: Country[];
  cities: CountrySubUnit[];
};

export default function SearchBox({ countries, cities }: Props) {
  const [searchText, setSearchText] = useState("");
  const [selectedMonth, setSelectedMonth] = useState<Date | null>(null);
  const [showSuggestBox, setShowSuggestBox] = useState(false);
  const [showMonthSelectorBox, setShowMonthSelectorBox] = useState(false);
  const [filteredCountries, setFilteredCountries] = useState<Country[]>([]);
  const [filteredCities, setFilteredCities] = useState<CountrySubUnit[]>([]);
  const [maxCitiesToShow, setMaxCitiesToShow] = useState(5);

  const [selectedSuggestion, setSelectedSuggestion] =
    useState<SuggestionText | null>(null);

  const MINIMUM_LENGTH = 2;
  const router = useRouter();

  const ref = useRef<HTMLDivElement>(null);
  const onSearch = (filters: SearchBoxFilters) => {
    setShowMonthSelectorBox(false);
    setShowSuggestBox(false);
    let url: string = "/tours";
    let countrySlug: string;
    let subUnitSlug: string;
    const monthly: number | null = filters.start_at_month;

    //
    if (filters.country_sub_unit_id) {
      const country = countries.find((c) => c.id === filters.country_id);
      const subUnit = cities.find((f) => f.id === filters.country_sub_unit_id);
      if (!country || !subUnit) return;
      countrySlug = `${country.slug}-tour`;
      subUnitSlug = `${subUnit.name_en.toLowerCase().replace(" ", "-")}`;
      url = `/${countrySlug}/${subUnitSlug}`;
      router.push(url);
    } else if (filters.country_id) {
      const country = countries.find((c) => c.id === filters.country_id);
      if (!country) return;
      countrySlug = `${country.slug}-tour`;
      url = `/${countrySlug}`;

      if (monthly) {
        url = `${url}/month-${engMonth[monthly - 1]}`;
      }

      router.push(url);
    }
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) {
        setShowSuggestBox(false);
        setShowMonthSelectorBox(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const text = searchText.toLowerCase();
    if (text.length >= MINIMUM_LENGTH) {
      setFilteredCountries(
        countries.filter(
          (c) =>
            c.nameTh.toLowerCase().includes(text) ||
            c.nameEn.toLowerCase().includes(text)
        )
      );
      setFilteredCities(
        cities.filter(
          (c) =>
            c.name_th.toLowerCase().includes(text) ||
            c.name_en.toLowerCase().includes(text)
        )
      );
      setShowSuggestBox(true);
      setShowMonthSelectorBox(false);
    } else {
      setShowSuggestBox(false);
    }
  }, [cities, countries, searchText]);

  const handleSuggestionClick = (suggestion: SuggestionText) => {
    setSearchText(suggestion.text);
    setSelectedSuggestion(suggestion);
    setShowSuggestBox(false);
  };

  const handleSearch = () => {
    const filters: SearchBoxFilters = {
      search_string: null,
      country_id: null,
      country_sub_unit_id: null,
      start_at_month: selectedMonth?.getMonth()
        ? selectedMonth.getMonth() + 1
        : null,
    };

    if (selectedSuggestion) {
      if (selectedSuggestion.type === "country") {
        filters.country_id = selectedSuggestion.id!;
      } else if (selectedSuggestion.type === "city") {
        const city = cities.find((c) => c.id === selectedSuggestion.id);
        if (city) {
          filters.country_id = city.country_id;
          filters.country_sub_unit_id = city.id;
        }
      }
    } else if (searchText.trim()) {
      filters.search_string = searchText.trim();
    }

    onSearch(filters);
  };

  const getCountryName = (id: number) => {
    return countries.find((c) => c.id === id)?.nameTh || "";
  };

  return (
    <section className="container h-[65px]" ref={ref}>
      <div className={styles.wrap}>
        {/* Search Box */}
        <div className="relative border-r-[1px] border-r-[var(--tw-blue)] flex-[0_0_40%] sm:flex-[0_0_50%]">
          <input
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            placeholder="เที่ยวไหนดี?"
            className={`pl-2 placeholder:text-[var(--tw-blue)] ${styles.input}`}
          />
          <span className="absolute text-tw-blue text-sm bottom-0 left-2 hidden sm:block">
            ทุกที่, ทุกเวลา
          </span>

          {showSuggestBox && filteredCountries.length > 0 && (
            <div className={`${styles.helperWrap} ${styles.countryWrap}`}>
              <div className="flex justify-between mb-2">
                <span className="font-bold text-tw-blue">จุดหมายปลายทาง</span>
                <button
                  className="pointer"
                  onClick={() => setShowSuggestBox(false)}
                >
                  <IoIosClose className="text-2xl" />
                </button>
              </div>
              <div className={styles.suggestBody}>
                <strong className="absolute right-0 text-tw-blue">
                  Country
                </strong>
                {filteredCountries.map((c, idx) => (
                  <div
                    key={idx}
                    className="cursor-pointer text-[#8a9bad] hover:bg-[var(--tw-light-gray)]"
                    onClick={() =>
                      handleSuggestionClick({
                        id: c.id,
                        text: c.nameTh,
                        type: "country",
                      })
                    }
                  >
                    <WordHighlight
                      text={`${c.nameTh} (${c.nameEn})`}
                      keyword={searchText}
                    ></WordHighlight>
                  </div>
                ))}
              </div>

              {filteredCities.length > 0 && (
                <div className={styles.suggestBody}>
                  <strong className="absolute right-0 text-tw-blue">
                    City
                  </strong>
                  {filteredCities.slice(0, maxCitiesToShow).map((city, idx) => (
                    <div
                      key={idx}
                      className="cursor-pointer text-[#8a9bad] hover:bg-[var(--tw-light-gray)]"
                      onClick={() =>
                        handleSuggestionClick({
                          id: city.id,
                          text: `${getCountryName(city.country_id)}, ${
                            city.name_th
                          }`,
                          type: "city",
                        })
                      }
                    >
                      <WordHighlight
                        text={`${city.name_th} (${
                          city.name_en
                        }) ${getCountryName(city.country_id)}`}
                        keyword={searchText}
                      ></WordHighlight>
                    </div>
                  ))}
                  {filteredCities.length > maxCitiesToShow && (
                    <div
                      className="cursor-pointer mt-3"
                      onClick={() => setMaxCitiesToShow(maxCitiesToShow + 5)}
                    >
                      เพิ่มเติม +
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Month Selector */}
        <div className="relative flex-1 mr-8">
          <button
            onClick={() => {
              setShowMonthSelectorBox(!showMonthSelectorBox);
              setShowSuggestBox(false);
            }}
            className="text-left pl-2 text-tw-blue cursor-pointer"
          >
            {selectedMonth
              ? `${thaiMonths[selectedMonth.getMonth()]} ${String(
                  selectedMonth.getFullYear() + 543
                ).slice(2)}`
              : "เดือนไหนดี?"}
          </button>
          <span className="absolute text-tw-blue text-sm bottom-0 left-2">
            เวลาเดินทาง
          </span>

          {showMonthSelectorBox && (
            <ul className={`${styles.helperWrap} px-4`}>
              {Array.from({ length: 12 }, (_, i) => {
                const date = new Date();
                date.setMonth(date.getMonth() + i);
                return (
                  <li
                    key={i}
                    className="cursor-pointer border-b-[1px] border-b-[var(--tw-light-gray)] py-2 hover:bg-[var(--tw-light-gray)]"
                    onClick={() => {
                      setSelectedMonth(date);
                      setShowMonthSelectorBox(false);
                    }}
                  >
                    {thaiMonths[date.getMonth()]}{" "}
                    {String(date.getFullYear() + 543).slice(2)}
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {/* Search Button */}
        <button onClick={handleSearch} className={styles.searchButton}>
          <IoSearchOutline className="text-white" />
        </button>
      </div>
    </section>
  );
}
