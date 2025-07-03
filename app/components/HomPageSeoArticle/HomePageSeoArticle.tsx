"use client";
import Link from "next/link";
import styles from "./HomePageSeoArticle.module.css";
import ArticleButton from "./ArticleButton";
import HiddenArticle from "./HiddenArticle";

export default function HomepageSeoArticle() {
  return (
    <section className={`container ${styles.article} px-4 py-8 mb-[7.5rem]`}>
      <h1>Tourwow ซื้อทัวร์ออนไลน์กับทัวร์ว้าว</h1>
      <p>
        Tourwow แพลตฟอร์มซื้อทัวร์ออนไลน์ชั้นนำ สินค้าท่องเที่ยวครบ ค้นหาง่าย
        จองง่าย เชื่อถือได้ ปลอดภัย
        <br />
        <Link href=".">ซื้อทัวร์ออนไลน์</Link>
        กับ Tourwow มั่นใจได้แน่นอน มีใบอนุญาตรับรองจากกรมการท่องเที่ยว
        ช่วยให้คุณซื้อทัวร์ได้อย่างมั่นใจ ว่าสามารถซื้อทัวร์และเดินทางได้จริง
        ที่สำคัญคือไม่ว่าใครก็สามารถซื้อทัวร์ออนไลน์บน Tourwow
        ได้ด้วยขั้นตอนง่าย ๆ ในไม่กี่คลิก
        มาร่วมค้นหาโปรแกรมทัวร์ออนไลน์เช่นเดียวกับผู้ใช้อีกหลายล้านคนทั่วประเทศไทย
        เพื่อที่จะได้โปรแกรมทัวร์ และสินค้าท่องเที่ยวแบบมีคุณภาพ ในราคาถูก
        มีโปรโมชั่นดี ๆ ดีลเด็ด ๆ สามารถเลือกซื้อได้ง่ายดายทุกที่ทุกเวลา ทั้ง
        <Link href="/tours" className="me-1 text-tw-blue">
          ทัวร์ต่างประเทศ
        </Link>
        &nbsp;
        <Link href="/thailand-tour" className="me-1 text-tw-blue">
          ทัวร์ในประเทศ
        </Link>
        ไปจนถึง ล่องเรือเจ้าพระยา ฯลฯ
      </p>

      <ArticleButton>
        <HiddenArticle />
      </ArticleButton>
    </section>
  );
}
