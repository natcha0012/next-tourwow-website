"use client";
import React, { useState } from "react";
import style from "./SeoArticleHtml.module.css";
type Props = {
  children: React.ReactNode;
};
function SeoArticleHtmlClient({ children }: Props) {
  const [collapsed, setCollapsed] = useState(true);
  return (
    <div className={style.seoArticleContainer}>
      <div className={`${collapsed ? "" : style.override} mt-20`}>
        {children}
      </div>
      <div className="flex justify-center items-center pointer">
        <div className={style.toggle} onClick={() => setCollapsed(!collapsed)}>
          <span>{collapsed ? "แสดงทั้งหมด" : "แสดงน้อยลง"}</span>
        </div>
      </div>
    </div>
  );
}

export default SeoArticleHtmlClient;
