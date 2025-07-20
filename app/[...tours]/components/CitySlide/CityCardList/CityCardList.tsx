import Image from "next/image";
import { CountrySubUnit } from "../../../types/country";
import styles from "./CityCardList.module.css";
import Link from "next/link";

type Props = {
  defaultImage: string;
  cityList: CountrySubUnit[];
  subUnitId: number | null;
  basePath: string;
  lowestPrice: string;
};

export default function CityCardList({
  defaultImage,
  cityList,
  subUnitId,
  basePath,
  lowestPrice,
}: Props) {
  return (
    <>
      {cityList.map((item) => (
        <Link
          prefetch={false}
          key={item.id}
          className="relative px-2 py-1"
          href={`${basePath}/${item.name_en}`}
        >
          <figure className="relative h-[200px] w-[170px]">
            <Image
              className={`${
                item.id === subUnitId
                  ? "outline-4 outline-[var(--tw-blue)]"
                  : ""
              } object-cover rounded-2xl`}
              src={item.primary_cover_url || defaultImage}
              alt={item.name_th}
              fill
              sizes="170"
            />
            <figcaption className={styles.cityName}>{item.name_th}</figcaption>

            {item.id === subUnitId && (
              <div className={styles.markSelector}>
                <h3>{item.name_th}</h3>
                <div>เริ่มต้น {lowestPrice} บาท</div>
              </div>
            )}
          </figure>
        </Link>
      ))}
    </>
  );
}
