"use client";
import React, { useEffect, useState } from "react";

import ProgramGalleryDT from "../ProgramDetailGallery/ProgramGalleryDT";
import ProgramGalleryMB from "../ProgramDetailGallery/ProgramGalleryMB";
import { ProgramDetail } from "../../interfaces/program-detail.interface";

type Props = {
  program: ProgramDetail | null;
};

function ProgramGallery({ program }: Props) {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640); // ตาม tailwind sm breakpoint
    };

    handleResize(); // run ครั้งแรก
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!program || isMobile === null) return null; // or skeleton

  return isMobile ? (
    <div className=" w-full">
      <ProgramGalleryMB program={program}></ProgramGalleryMB>
    </div>
  ) : (
    <div className="flex w-full sm:basis-[65%]">
      <ProgramGalleryDT program={program}></ProgramGalleryDT>
    </div>
  );
}

export default ProgramGallery;
