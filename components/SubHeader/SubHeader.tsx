// components/SubHeader.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import PopupMenu from "./PopupMenu";

export default function SubHeader() {
  const [showPopupMenu, setShowPopupMenu] = useState(false);

  return (
    <section id="sub-header" className="bg-tw-blue">
      <div className="container">
        <ul id="menu-list" className="hidden lg:flex">
          <li
            className="p-4 text-white"
            onMouseLeave={() => setShowPopupMenu(false)}
          >
            <a
              onMouseOver={() => setShowPopupMenu(true)}
              title="ทัวร์ต่างประเทศ"
            >
              ทัวร์ต่างประเทศ
            </a>
            {showPopupMenu && <PopupMenu />}
          </li>
          <li className="p-4 text-white">
            <Link prefetch={false} href="/japan-tour" title="ทัวร์ญี่ปุ่น">
              ทัวร์ญี่ปุ่น
            </Link>
          </li>
          <li className="p-4 text-white">
            <Link prefetch={false} href="/south-korea-tour" title="ทัวร์เกาหลี">
              ทัวร์เกาหลี
            </Link>
          </li>
          <li className="p-4 text-white">
            <Link prefetch={false} href="/vietnam-tour" title="ทัวร์เวียดนาม">
              ทัวร์เวียดนาม
            </Link>
          </li>
          <li className="p-4 text-white">
            <Link prefetch={false} href="/singapore-tour" title="ทัวร์สิงคโปร์">
              ทัวร์สิงคโปร์
            </Link>
          </li>
          <li className="p-4 text-white">
            <Link prefetch={false} href="/europe-tour" title="ทัวร์ยุโรป">
              ทัวร์ยุโรป
            </Link>
          </li>
          <li className="p-4 text-white">
            <Link prefetch={false} href="/taiwan-tour" title="ทัวร์ไต้หวัน">
              ทัวร์ไต้หวัน
            </Link>
          </li>
          <li className="p-4 text-white">
            <Link prefetch={false} href="/georgia-tour" title="ทัวร์จอร์เจีย">
              ทัวร์จอร์เจีย
            </Link>
          </li>
        </ul>
      </div>
    </section>
  );
}
