import Image from "next/image";
import Link from "next/link";
import styles from "./Header.module.css";
import { FaLine, FaSquareFacebook } from "react-icons/fa6";
import { AiFillTikTok } from "react-icons/ai";
import { BsFillTelephoneFill } from "react-icons/bs";
import ProfileHeader from "../ProfileHeader/ProfileHeader";
import SideBarButton from "../SideBarButton";

const Header = () => {
  return (
    <header className={`${styles.headerContainer} container`}>
      <SideBarButton></SideBarButton>
      <Image
        src="/logo.svg"
        alt="TourWow Logo"
        width={148}
        height={60}
        priority
      />
      <nav className={`hidden lg:flex ${styles.menuList}`}>
        <Link className="ml-6" href="/">
          หน้าแรก
        </Link>
        <Link className="ml-6" href="/about-us">
          เกี่ยวกับเรา
        </Link>
        <Link className="ml-6" href="/contact-us">
          ติดต่อเรา
        </Link>
        <Link className="ml-6" href="/blog">
          บทความ
        </Link>
        <Link className="ml-6" href="/gallery">
          แกลลอรี่
        </Link>
      </nav>

      <span className="text-sm hidden lg:inline-block">
        เลขที่ใบอนุญาต 11/09058
      </span>
      <div className="hidden lg:flex items-center m-4 gap-1">
        <Link
          title="Tourwow Facebook"
          target="_blank"
          href="https://www.facebook.com/TourwowOfficial"
        >
          <FaSquareFacebook className="text-[#006cfa] w-7 h-7" />
        </Link>
        <Link
          title="Tourwow Line"
          target="_blank"
          href="https://line.me/ti/p/~@tourwow"
        >
          <FaLine className="w-6 h-6 text-[#00b536]" />
        </Link>
        <Link
          title="Tourwow Tiktok"
          target="_blank"
          href="https://www.tiktok.com/@tourwow_official"
        >
          <AiFillTikTok className="w-8 h-8"></AiFillTikTok>
        </Link>
        <Link title="Tourwow Phone" target="_blank" href="tel:026741500">
          <BsFillTelephoneFill className="w-6 h-6 text-[#0191ff]" />
        </Link>
      </div>
      <ProfileHeader />
    </header>
  );
};

export default Header;
