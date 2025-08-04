"use client";
import React, { useState } from "react";
import { MdFileCopy } from "react-icons/md";
type Props = {
  filePdfUrl: string | null;
  children: React.ReactNode;
};
function ProgramDetailTourClient({ children, filePdfUrl }: Props) {
  const [collapsed, setCollapsed] = useState(true);

  function loadPdfFile() {
    if (filePdfUrl) {
      window.open(filePdfUrl, "_blank");
    }
  }
  return (
    <div
      className="relative p-4 pb-14"
      style={{ boxShadow: "0 0 3px #00000040" }}
    >
      {filePdfUrl && (
        <button
          onClick={() => loadPdfFile()}
          className="float-right flex items-center text-tw-blue border border-[var(--tw-light-gray)] rounded-2xl py-2 px-4"
        >
          {" "}
          <MdFileCopy className="text-tw-blue" /> ดาวน์โหลด PDF
        </button>
      )}
      <div
        className={`w-full ${
          collapsed ? "max-h-[750px] overflow-hidden" : "max-h-none"
        }`}
      >
        {children}
      </div>
      <a
        className="absolute b-0 left-0 p-4 text-tw-blue pointer"
        onClick={() => setCollapsed(!collapsed)}
      >
        <span>{collapsed ? "แสดงทั้งหมด" : "ซ่อนข้อมูล"}</span>
      </a>
    </div>
  );
}

export default ProgramDetailTourClient;
