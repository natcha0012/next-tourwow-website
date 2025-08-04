"use client";
import React, { useEffect, useState } from "react";
import styles from "./PromotionBanner.module.css";
import Image from "next/image";
import Link from "next/link";
import { useSetAtom } from "jotai";
import { DayButtonAtom } from "../../atoms/DayButtonAtom";

function PromotionBanner() {
  const [showFireIcon, setShowFireIcon] = useState(true);
  const setSelectedDate = useSetAtom(DayButtonAtom);

  useEffect(() => {
    setSelectedDate(null);
    const interval = setInterval(() => {
      setShowFireIcon((prev) => !prev);
    }, 800);
    return () => clearInterval(interval);
  }, []);
  return (
    <div className={styles.bannerBox}>
      <Link href="#hotPromo">
        <div className={styles.redBanner}>
          <div className={styles.iconSpeaker}>
            {showFireIcon && (
              <Image
                src={"/icons/icon-loudspeaker.png"}
                width={40}
                height={40}
                alt="speaker"
                className=""
              />
            )}
          </div>
          <h4>ดูช่วงเวลาเดินทาง โปรไฟไหม้ที่นี่</h4>
          <div className={styles.iconFire}>
            {showFireIcon && (
              <Image
                src={"/icons/icon-fire.svg"}
                width={20}
                height={20}
                alt="fire"
              />
            )}
          </div>
        </div>
      </Link>
    </div>
  );
}

export default PromotionBanner;
