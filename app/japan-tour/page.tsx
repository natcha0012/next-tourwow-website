import React from "react";
import guruLogo from "@/assets/tourwow-guru-logo.png";
import Image from "next/image";

function page() {
  return (
    <div className="ml-4">
      <div>test japan page</div>
      <Image
        src={guruLogo}
        alt="guru-logo"
        width={251}
        height={32}
        priority
      ></Image>
    </div>
  );
}

export default page;
