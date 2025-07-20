import React from "react";
import style from "./SearchResultFaq.module.css";
type Props = {
  locationText: string;
};
function SearchResultFaq({ locationText }: Props) {
  return (
    <section className="bg-[var(--tw-light-gray)] py-20 mt-4">
      <div className="container">
        <h2>คำถามที่พบบ่อยเกี่ยวกับทัวร์ {locationText}</h2>
        <div>
          <h3 className={style.faqQuestion}>
            จองทัวร์{locationText}กับ tourwow มั่นใจได้ไหม
            และได้ไปจริงตามที่ระบุไหม
          </h3>
          <p className={style.faqAnswer}>
            Tourwow
            จดทะเบียนบริษัทและมีใบอนุญาตประกอบธุรกิจนำเที่ยวอย่างถูกต้องตามกฏหมาย
            ให้คุณจองทัวร์กับทัวร์ว้าวได้อย่างมั่นใจ เชื่อถือได้
            และสามารถเดินทางได้จริง
          </p>
        </div>
        <div>
          <h3 className={style.faqQuestion}>
            หลังจองทัวร์{locationText}เสร็จแล้ว ต้องเตรียมตัวอย่างไรบ้าง
          </h3>
          <p className={style.faqAnswer}>
            เตรียมหนังสือเดินทาง (Passport) ของคุณ โดยต้องมีอายุการใช้งานคงเหลือ
            6 เดือนขึ้นไปก่อนวันหมดอายุ
            หากประเทศที่ต้องการเดินทางระบุว่าต้องใช้วีซ่า
            กรุณาเตรียมเอกสารสำหรับทำวีซ่ารวมไปถึงและเอกสารประกอบการท่องเที่ยวที่เกี่ยวข้อง
          </p>
        </div>
        <div>
          <h3 className={style.faqQuestion}>
            ช่องทางการชำระเงินและค่าธรรมเนียมสำหรับจองกับ tourwow
          </h3>
          <p className={style.faqAnswer}>
            สามารถชำระเงินได้ทั้งการแสกน QR CODE พร้อมเพย์
            และชำระเงินผ่านบัตรเครดิต
          </p>
        </div>
        <div>
          <h3 className={style.faqQuestion}>ควรไปถึงสนามบินกี่โมง</h3>
          <p className={style.faqAnswer}>
            การเดินทางภายในประเทศควรไปถึงสนามบินก่อนเวลาเครื่องออกประมาณ 1-2
            ชั่วโมง การเดินทางไปต่างประเทศประมาณ 2-3 ชั่วโมง
          </p>
        </div>
        <div>
          <h3 className={style.faqQuestion}>
            ราคาตั๋วเครื่องบิน รวมอยู่ในค่าทัวร์{locationText}หรือไม่
          </h3>
          <p className={style.faqAnswer}>
            ในแต่ละโปรแกรมจะมีระบุรายละเอียดที่ชัดเจนว่ามีอัตรารวมและไม่รวมอะไรบ้าง
            และมีการรวมค่าตั๋วเครื่องบินหรือไม่
          </p>
        </div>
        <div>
          <h3 className={style.faqQuestion}>
            ค่าประกันภัยการเดินทางรวมอยู่ในค่าทัวร์{locationText}หรือไม่
          </h3>
          <p className={style.faqAnswer}>
            ในแต่ละโปรแกรมจะมีระบุรายละเอียดที่ชัดเจนว่ามีอัตรารวมและไม่รวมอะไรบ้าง
            และมีการรวมค่าประกันภัยการเดินทางหรือไม่
          </p>
        </div>
        <div>
          <h3 className={style.faqQuestion}>
            เมื่อจองทัวร์เสร็จ จะรู้ได้ยังไงว่าได้ที่นั่งแล้ว
          </h3>
          <p className={style.faqAnswer}>
            หลังจากชำระเงินเสร็จเรียบร้อยแล้ว Tourwow
            จะส่งรายละเอียดยืนยันการจองทัวร์สำเร็จไปในทุกช่องทางการติดต่อของคุณ
          </p>
        </div>
      </div>
    </section>
  );
}

export default SearchResultFaq;
