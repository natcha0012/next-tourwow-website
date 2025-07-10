import React from "react";
import style from "./Loading.module.css";
import Image from "next/image";
function Loading() {
  return (
    <div className={style.loadingPage}>
      <Image src="/loading.gif" alt="Loading" width={120} height={120} />
    </div>
  );
}

export default Loading;
