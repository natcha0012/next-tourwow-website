import Image from "next/image";
import Link from "next/link";

interface Country {
  id: number;
  name_th: string;
  name_en: string;
  country_code: string;
  continents_id: number;
  slug: string;
  icon_url: string;
  primary_cover_url: string;
}

async function fetchCountries(): Promise<Country[]> {
  const params = new URLSearchParams();

  params.append("sort_by", "search_priority_asc_name_th_asc");

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/countries?${params.toString()}`
  );
  const data = await res.json();
  if (data.status === "success") {
    return data.data;
  }
  return [];
}

export default async function CountrySelector() {
  const countries = await fetchCountries();
  return (
    <>
      {countries.map((item) => (
        <Link
          prefetch={false}
          key={item.id}
          className="relative px-2 py-1"
          href={`${item.slug}-tour`}
        >
          <figure className="relative h-[160px] w-[160px]">
            <Image
              className={`object-cover rounded-full`}
              src={item.primary_cover_url}
              alt={item.name_th}
              fill
              sizes="160"
            />
          </figure>
          <figcaption className="text-center mt-2 text-tw-blue">
            {item.name_th}
          </figcaption>
        </Link>
      ))}
    </>
  );
}
