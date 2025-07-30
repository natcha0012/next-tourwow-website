import React, { Suspense } from "react";
import guruLogo from "@/assets/tourwow-guru-logo.png";
import Image from "next/image";
import Breadcrumb, { BreadcrumbType } from "@/components/Breadcrumb";
import {
  getAllCountry,
  getCityCount,
  getCountryNameTH,
  getCountrySlug,
} from "./apis/country";
import { getAllCity } from "./apis/city";
import SearchBox from "./components/SearchBox/SearchBox";
import { getCurrentPageData } from "../libs/apis/page-data";
import { ProgramFilters } from "./types/program-filters";
import { thaiMonths } from "@/constants/months";
import { CountrySubUnit } from "./types/country";
import CitySlide from "./components/CitySlide/CitySlide";
import CityCardList from "./components/CitySlide/CityCardList/CityCardList";
import DaySelector from "./components/DaySelector/DaySelector";
import { tourRoutes } from "@/constants/tours-route";
import SeoArticleHtml from "../blog/components/SeoArticleHtml/SeoArticleHtml";
import SeoArticleHtmlClient from "../blog/components/SeoArticleHtml/SeoArticleHtmlClient";
import SearchResultFaq from "./components/SearchResultFaq/SearchResultFaq";
import { Metadata } from "next";
import dynamic from "next/dynamic";
import Loading from "../components/Loading/Loading";
import CountrySlideClient from "./components/CountrySlide/CountrySlideClient";
import CountrySelector from "./components/CountrySlide/CountrySelector/CountrySelector";
import { getGuruHeader } from "./apis/program";
const SearchResult = dynamic(
  () => import("./components/SearchResult/SearchResult")
);
export async function generateMetadata({
  params,
}: {
  params: Promise<{ tours: string[] }>;
}): Promise<Metadata> {
  const { tours } = await params;
  const pageData = await getCurrentPageData("/" + (tours || []).join("/"));
  return {
    title: pageData?.meta_title || "Tourwow",
    description: pageData?.meta_description,
    openGraph: {
      title: pageData?.meta_title || "Tourwow",
      description: pageData?.meta_description,
    },
  };
}
async function TourPage({ params }: { params: Promise<{ tours: string[] }> }) {
  const countries = getAllCountry();
  const breadcrumb: BreadcrumbType[] = [];
  let countryId: number | null;
  let countrySubUnitId: number | null = null;
  let headlineText = "ทัวร์ต่างประเทศ";
  let showCityCount = false;
  let tourwowGuRuHeader = {
    cityCount: "0",
    totalQuantityRemaining: "0",
    lowestPrice: "0",
  };
  let defaultImage = "";
  let searchFilters: ProgramFilters = {};
  const { tours } = await params;
  const showCountrySelector = tours[0] === "tours";

  if (!tourRoutes.includes(tours[0])) {
    return <div>Page not found</div>;
  }

  let cities: CountrySubUnit[] = [];
  const pageData = await getCurrentPageData("/" + (tours || []).join("/"));
  if (pageData) {
    countryId = pageData?.page_argument.country_id ?? null;
    countrySubUnitId = pageData?.page_argument.country_sub_unit_id;
    cities = await getAllCity(countryId);
    if (countryId) {
      const slug = getCountrySlug(countryId);
      defaultImage = `https://media-prod.tourwow.com/country_cover/${slug}.jpg`;
    }
    const month = pageData?.page_argument.month || null;
    const sortBy = pageData?.page_argument.sort || "product_running_id_asc";
    const transportation = pageData?.page_argument.go_transportation_id
      ? {
          id: pageData?.page_argument.go_transportation_id,
          name: pageData?.page_argument.go_transportation_name_th,
        }
      : null;

    setBreadcrumb(countryId, countrySubUnitId);

    searchFilters = {
      country_id: countryId || undefined,
      country_sub_unit_id: countrySubUnitId || undefined,
      period_start_at_month: month || undefined,
      go_transportation_id: transportation ? transportation.id : undefined,
    };

    let additionTextHeadline = "";
    if (sortBy === "period_price_adult_double_asc") {
      additionTextHeadline = "ราคาถูก";
    } else if (transportation) {
      additionTextHeadline = transportation.name;
    } else if (month) {
      const currentYear = new Date().getFullYear() + 543;
      additionTextHeadline = `${thaiMonths[month - 1]} ปี ${currentYear
        .toString()
        .substring(2)} - ${(currentYear + 1).toString().substring(2)}`;
    }
    setHeadline(additionTextHeadline);

    const { totalQuantityRemaining, lowestPrice } = await getGuruHeader(
      searchFilters
    );

    tourwowGuRuHeader = {
      cityCount: countryId ? getCityCount(countryId).toLocaleString() : "0",
      totalQuantityRemaining,
      lowestPrice,
    };
  }

  function setHeadline(additionText: string = ""): void {
    if (countrySubUnitId) {
      const city = cities.find((f) => f.id === countrySubUnitId);
      showCityCount = false;
      headlineText = `ทัวร์${city?.name_th}` || `ทัวร์ต่างประเทศ`;
    } else if (countryId) {
      const countryNameTh = getCountryNameTH(countryId);
      showCityCount = true;
      headlineText = `ทัวร์${countryNameTh}`;
    }

    if (additionText) {
      headlineText = `${headlineText} ${additionText}`;
    }
  }

  function setBreadcrumb(
    countryId: number | null = null,
    countrySubUnitId: number | null = null
  ): void {
    if (countryId === null && countrySubUnitId === null) {
      breadcrumb.push({
        text: `ทัวร์ต่างประเทศ`,
        link: null,
      });

      return;
    }

    // Country
    const findCountry = countries.find((f) => f.id === countryId);
    if (findCountry) {
      breadcrumb.push({
        text: `ทัวร์${findCountry.nameTh}`,
        link: `/${findCountry?.slug}-tour`,
      });
    }

    const city = cities.find((f) => f.id === countrySubUnitId);
    if (city) {
      breadcrumb.push({
        text: `ทัวร์${city.name_th}`,
        link: null,
      });
    }
  }
  return (
    <div>
      <Suspense fallback={<Loading></Loading>}>
        <Breadcrumb breadcrumb={breadcrumb}></Breadcrumb>
      </Suspense>
      <Suspense
        fallback={
          <div className="h-[65px]">
            <Loading></Loading>
          </div>
        }
      >
        <SearchBox countries={countries} cities={cities}></SearchBox>
      </Suspense>
      <Suspense
        fallback={
          <div className="h-[145px]">
            <Loading></Loading>
          </div>
        }
      >
        <section className="h-[145px] container flex items-center justify-center flex-col">
          <h1 className="text-[2rem] mt-6">{headlineText}</h1>
          <div className="flex">
            <Image
              src={guruLogo}
              alt="guru-logo"
              className="object-contain w-[251px] max-w-[40%] h-auto"
              priority
            ></Image>
            <span className="ml-2 mt-1 text-xl ">
              มี {showCityCount && `${tourwowGuRuHeader.cityCount} เมือง`}{" "}
              {tourwowGuRuHeader.totalQuantityRemaining} ที่นั่ง เริ่มต้นที่{" "}
              {tourwowGuRuHeader.lowestPrice} บาท
            </span>
          </div>
        </section>
      </Suspense>
      {showCountrySelector && (
        <Suspense
          fallback={
            <div className="h-[270px]">
              <Loading></Loading>
            </div>
          }
        >
          <CountrySlideClient>
            <CountrySelector></CountrySelector>
          </CountrySlideClient>
        </Suspense>
      )}
      {!showCountrySelector && (
        <Suspense
          fallback={
            <div className="h-[270px]">
              <Loading></Loading>
            </div>
          }
        >
          <CitySlide>
            <CityCardList
              defaultImage={defaultImage}
              basePath={`/${tours[0]}`}
              cityList={cities}
              subUnitId={countrySubUnitId}
              lowestPrice={tourwowGuRuHeader.lowestPrice}
            ></CityCardList>
          </CitySlide>
        </Suspense>
      )}
      {!showCountrySelector && (
        <Suspense
          fallback={
            <div className="h-[50vh]">
              <Loading></Loading>
            </div>
          }
        >
          {countryId! && (
            <DaySelector
              countryId={countryId}
              countrySubUnitId={countrySubUnitId}
            ></DaySelector>
          )}
        </Suspense>
      )}
      <Suspense
        fallback={
          <div className="h-[50vh]">
            <Loading></Loading>
          </div>
        }
      >
        <SearchResult
          headlineText={headlineText}
          searchFilters={searchFilters}
        ></SearchResult>
      </Suspense>
      <Suspense
        fallback={
          <div className="h-[50vh]">
            <Loading></Loading>
          </div>
        }
      >
        {!showCountrySelector && (
          <SeoArticleHtmlClient>
            <SeoArticleHtml
              path={"/" + (tours || []).join("/")}
              showH1={false}
              bannerPriority={false}
            ></SeoArticleHtml>
          </SeoArticleHtmlClient>
        )}

        <SearchResultFaq
          locationText={getCountryNameTH(countryId!) ?? ""}
        ></SearchResultFaq>
      </Suspense>
    </div>
  );
}

export default TourPage;
