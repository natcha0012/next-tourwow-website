"use client";
import React, { useState } from "react";
import MobileSideBar from "./MobileSideBar/MobileSideBar";

function SideBarButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="lg:hidden text-tw-blue">
        <button
          className="text-3xl cursor-pointer"
          onClick={() => setIsOpen(true)}
        >
          &#9776;
        </button>
      </div>
      {isOpen && (
        <MobileSideBar onClose={() => setIsOpen(false)}></MobileSideBar>
      )}
    </>
  );
}

export default SideBarButton;
