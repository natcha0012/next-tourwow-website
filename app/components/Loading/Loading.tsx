import React from "react";
import Image from "next/image";
function Loading() {
  return (
    <div className="flex justify-center items-center h-full">
      <Image src="/loading.gif" alt="Loading" width={120} height={120} />
    </div>
  );
}

export default Loading;
