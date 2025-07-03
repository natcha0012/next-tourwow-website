import Image from "next/image";
import styles from "./PopularCountry.module.css";
import Link from "next/link";
import otherCountry from "@/assets/images/popular-country-other.jpg";

type Country = {
  id: number;
  image_url: string;
  ordinal: number;
  link: string | null;
  country: {
    id: number;
    name_th: string;
    name_en: string;
  };
};

const generatePath = (countryName: string | undefined | null): string | null =>
  countryName
    ? `${countryName.trim().replace(" ", "-").toLowerCase()}-tour`
    : null;

async function fetchCountries(): Promise<Country[]> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/twm/${process.env.NEXT_PUBLIC_AGENCY_DOMAIN}/countries/recommend`
  );
  const data = await res.json();
  if (data.status === "success") {
    return data.data.map((item: Country) => ({
      ...item,
      link: generatePath(item.country.name_en),
    }));
  }
  return [];
}
async function PopularCountry() {
  const countries = await fetchCountries();

  return (
    <section className="bg-tw-blue py-8 px-4">
      <div className="container py-4 text-white">
        <Link className={`${styles.tourLink} hidden sm:block`} href="/tours">
          ดูประเทศยอดนิยมทั้งหมด
        </Link>
        <h2 className="text-5xl">ประเทศยอดนิยม</h2>
        <strong>พบกับโปรแกรมทัวร์ในประเทศยอดนิยมมากมายที่นี่</strong>
        <div className=" sm:grid sm:grid-cols-4 flex sm:overflow-y-auto gap-4 overflow-y-scroll mt-6 -my-2">
          {countries.map((item, idx) => (
            <div
              className={`${styles.popularCountry} ${
                idx === 0 || idx === countries.length - 1 ? "sm:col-span-2" : ""
              }`}
              key={item.id}
            >
              <Link
                title={`ประเทศยอดนิยม-${item.country.name_th}`}
                href={item.link || "#"}
              >
                <h3 className={styles.imgTitle}>{item.country.name_th}</h3>
                <figure className={styles.imgFigure}>
                  <Image
                    src={item.image_url}
                    alt={`ประเทศยอดนิยม-${item.country.name_th}`}
                    fill
                    sizes="500px"
                  />
                </figure>
                <div className={styles.mark}></div>
              </Link>
            </div>
          ))}
          <div className={styles.popularCountry}>
            <Link href="/tours">
              <span className={styles.imgCaption}>ดูประเทศยอดนิยมทั้งหมด</span>
              <figure className={styles.imgFigure}>
                <Image
                  src={otherCountry}
                  alt="ประเทศยอดนิยมทั้งหมด"
                  fill
                  sizes="500px"
                />
              </figure>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PopularCountry;
