import { useState } from "react";
import Link from "next/link";
import {
  asiaContinent,
  Country,
  europeContinent,
  otherContinent,
} from "@/constants/continents";
import { IoClose } from "react-icons/io5";
import { FaAngleRight } from "react-icons/fa";

import styles from "./MobileSideBar.module.css";
import { FaLine, FaSquareFacebook } from "react-icons/fa6";
import { BsFillTelephoneFill } from "react-icons/bs";
import { IoIosMail } from "react-icons/io";

type Props = {
  onClose: () => void;
};

const continents: Record<string, Country[]> = {
  asia: asiaContinent,
  europe: europeContinent,
  other: otherContinent,
};

export default function MobileSideBar({ onClose }: Props) {
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const toggleMenu = (menu: string) => {
    setOpenMenu((prev) => (prev === menu ? null : menu));
  };

  return (
    <>
      <div className={styles.mask} onClick={onClose}></div>
      <aside className={styles.mobileMenu}>
        <div className="flex items-center">
          <button onClick={onClose} className="text-2xl">
            <IoClose className="text-tw-blue"></IoClose>
          </button>
          <span className="pl-4">
            <div className="text-lg">Tourwow</div>
            <small>เลขที่ใบอนุญาต 11/09955</small>
          </span>
        </div>
        <ul className={styles.menuList}>
          <li>
            <Link href="/">หน้าแรก</Link>
          </li>
          <hr className={styles.line} />
          <li>
            <Link href="/tours">ทัวร์ต่างประเทศ</Link>
          </li>
          <li className="flex justify-between items-center">
            <a onClick={() => toggleMenu("asia")}>ทัวร์เอเชีย</a>
            <FaAngleRight></FaAngleRight>
          </li>
          <li className="flex justify-between items-center">
            <a onClick={() => toggleMenu("europe")}>ทัวร์ยุโรป</a>
            <FaAngleRight></FaAngleRight>
          </li>
          <li className="flex justify-between items-center">
            <a onClick={() => toggleMenu("other")}>ทวีปอื่นๆ</a>
            <FaAngleRight></FaAngleRight>
          </li>
          <hr className={styles.line} />
          <li>
            <Link href="/blog">บทความ</Link>
          </li>
          <hr className={styles.line} />
          <li>
            <Link href="/about-us">เกี่ยวกับเรา</Link>
          </li>
          <li>
            <Link href="/contact-us">ติดต่อเรา</Link>
          </li>
          <li>
            <Link href="/terms">ข้อตกลงการใช้งาน</Link>
          </li>
          <li>
            <Link href="/privacy-policy">นโยบายคุ้มครองข้อมูลส่วนบุคคล</Link>
          </li>
          <li>
            <Link href="/testimonial">Testimonial</Link>
          </li>
          <li>
            <Link href="/gallery">แกลลอรี่</Link>
          </li>
        </ul>
        <div className="flex">
          <Link
            href="https://www.facebook.com/TourwowOfficial"
            target="_blank"
            className={styles.linkIcon}
          >
            <FaSquareFacebook className="text-[#006cfa]" />
          </Link>
          <Link
            href="https://line.me/ti/p/~@tourwow"
            target="_blank"
            className={styles.linkIcon}
          >
            <FaLine className="text-[#00b536]" />
          </Link>
          <Link href="mailto:support@tourwow.com" className={styles.linkIcon}>
            <IoIosMail />
          </Link>
          <Link href="tel:026741500" className={styles.linkIcon}>
            <BsFillTelephoneFill className=" text-[#0191ff] w-7 h-7" />
          </Link>
        </div>

        {["asia", "europe", "other"].map(
          (continent) =>
            openMenu === continent && (
              <ul className={styles.subMenuList} key={continent}>
                <h6 className="my-4">
                  {continent === "asia" && "ทัวร์ทวีปเอเชีย"}
                  {continent === "europe" && "ทัวร์ทวีปยุโรป"}
                  {continent === "other" && "ทัวร์ทวีปอื่นๆ"}
                </h6>
                {continents[continent].map((item, index) => (
                  <li key={index}>
                    <Link className="text-tw-blue" href={`/${item.slug}-tour`}>
                      {item.name_th}
                    </Link>
                  </li>
                ))}
              </ul>
            )
        )}
      </aside>
    </>
  );
}
