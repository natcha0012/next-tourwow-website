import React from "react";

function DaySelector() {
  return (
    <section className="container">
      <span id="sub-title">
        <h2>เลือกวัน</h2>
        <span>
          <span>
            <i id="green-dot"></i> ที่ว่าง{" "}
          </span>
          <span> และราคาเริ่มต้น </span>
          <span>
            <i id="gray-dot"></i> เต็ม
          </span>
        </span>
      </span>
    </section>
  );
}

export default DaySelector;
