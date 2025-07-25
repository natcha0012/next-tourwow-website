import Image from "next/image";
import Link from "next/link";
import React from "react";
import { AiFillTikTok } from "react-icons/ai";
import { BsFillTelephoneFill } from "react-icons/bs";
import { FaLine, FaSquareFacebook } from "react-icons/fa6";
import { IoIosMail } from "react-icons/io";
import qrImage from "@/assets/images/tourwow-line-official.png";
import styles from "./FooterBar.module.css";

function FooterBar() {
  return (
    <div className={styles.footerContainer}>
      <div className="flex flex-wrap container">
        <ul className={`${styles.menuList} ${styles.footerBlock}`}>
          <li>
            <Link href="/" title="หน้าแรก">
              หน้าแรก
            </Link>
          </li>
          <li>
            <Link prefetch={false} href="/tours" title="ทัวร์ต่างประเทศ">
              ทัวร์ต่างประเทศ
            </Link>
          </li>
          <li>
            <Link prefetch={false} href="/japan-tour" title="ทัวร์ญี่ปุ่น">
              ทัวร์ญี่ปุ่น
            </Link>
          </li>
          <li>
            <Link prefetch={false} href="/south-korea-tour" title="ทัวร์เกาหลี">
              ทัวร์เกาหลี
            </Link>
          </li>
          <li>
            <Link prefetch={false} href="/vietnam-tour" title="ทัวร์เวียดนาม">
              ทัวร์เวียดนาม
            </Link>
          </li>
          <li>
            <Link prefetch={false} href="/singapore-tour" title="ทัวร์สิงคโปร์">
              ทัวร์สิงคโปร์
            </Link>
          </li>
          <li>
            <Link prefetch={false} href="/europe-tour" title="ทัวร์ยุโรป">
              ทัวร์ยุโรป
            </Link>
          </li>
          <li>
            <Link prefetch={false} href="/taiwan-tour" title="ทัวร์ไต้หวัน">
              ทัวร์ไต้หวัน
            </Link>
          </li>
          <li>
            <Link prefetch={false} href="/georgia-tour" title="ทัวร์จอร์เจีย">
              ทัวร์จอร์เจีย
            </Link>
          </li>
        </ul>

        <ul className={`${styles.menuList} ${styles.footerBlock}`}>
          <li>
            <Link prefetch={false} href="/blog" title="บทความ">
              บทความ
            </Link>
          </li>
          <li>
            <Link prefetch={false} href="/about-us" title="เกี่ยวกับเรา">
              เกี่ยวกับเรา
            </Link>
          </li>
          <li>
            <Link prefetch={false} href="/contact-us" title="ติดต่อเรา">
              ติดต่อเรา
            </Link>
          </li>
          <li>
            <Link prefetch={false} href="/terms" title="ข้อตกลงการใช้งาน">
              ข้อตกลงการใช้งาน
            </Link>
          </li>
          <li>
            <Link
              prefetch={false}
              href="/privacy-policy"
              title="นโยบายคุ้มครองข้อมูลส่วนบุคคล"
            >
              นโยบายคุ้มครองข้อมูลส่วนบุคคล
            </Link>
          </li>
          <li>
            <Link prefetch={false} href="/testimonial" title="Testimonial">
              Testimonial
            </Link>
          </li>
          <li>
            <Link prefetch={false} href="/gallery" title="แกลลอรี่">
              แกลลอรี่
            </Link>
          </li>
        </ul>

        <div className={`${styles.footerBlock} pt-4 flex-1`}>
          <b className="text-xl">Tourwow</b>
          <div>เลขที่ใบอนุญาต 11/09058</div>
          <ul className="my-4">
            <li>
              <Link
                prefetch={false}
                className="flex py-2"
                title="Tourwow Phone"
                target="_blank"
                href="tel:026741500"
              >
                <BsFillTelephoneFill className="text-xl mr-2 text-[#0191ff]" />
                <span>026741500</span>
              </Link>
            </li>
            <li>
              <Link
                prefetch={false}
                href="mailto:support@tourwow.com"
                title="Email"
                className="flex py-2"
              >
                <div className="text-2xl">
                  <IoIosMail className=" mr-2" />
                </div>
                <span>support@tourwow.com</span>
              </Link>
            </li>
            <li>
              <Link
                prefetch={false}
                className="flex py-2"
                title="Tourwow Facebook"
                target="_blank"
                href="https://www.facebook.com/TourwowOfficial"
              >
                <FaSquareFacebook className="text-[#006cfa] text-2xl mr-2" />
                <span>Tourwow</span>
              </Link>
            </li>
            <li>
              <Link
                prefetch={false}
                className="flex py-2"
                title="Tourwow Line"
                target="_blank"
                href="https://line.me/ti/p/~@tourwow"
              >
                <FaLine className="text-2xl mr-2 text-[#00b536]" />
                <span>@tourwow</span>
              </Link>
            </li>
            <li>
              <Link
                prefetch={false}
                className="flex py-2"
                title="Tourwow Tiktok"
                target="_blank"
                href="https://www.tiktok.com/@tourwow_official"
              >
                <AiFillTikTok className="w-7 h-7 mr-2"></AiFillTikTok>
                <span>Tourwow Official</span>
              </Link>
            </li>
          </ul>
        </div>

        <div
          className={`${styles.footerBlock} mt-4 flex-1 grid justify-items-end`}
        >
          <Image
            src={qrImage}
            alt="QR Image Contact"
            width={160}
            height={160}
          />
        </div>
      </div>
      <div
        id="powerby-wrapper"
        className="flex justify-center items-center text-white h-[60px] bg-tw-blue"
      >
        <span className="text-[0.53rem]">Powered by</span>
        <Image
          src="/footer-logo.svg"
          alt="tourwow-logo"
          width={80}
          height={34}
        />
      </div>
    </div>
  );
}

export default FooterBar;
