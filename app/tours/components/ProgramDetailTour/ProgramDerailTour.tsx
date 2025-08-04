import React from "react";
import { ProgramDetail } from "../../interfaces/program-detail.interface";
import Image from "next/image";
type Props = {
  program: ProgramDetail | null;
};
function ProgramDerailTour({ program }: Props) {
  return (
    <div>
      <h2>รายละเอียดทัวร์</h2>
      <strong>
        เดินทาง {program?.duration_day} วัน
        {program?.duration_night} คืน
      </strong>
      {program?.product_descriptions.map((item) => (
        <div key={item.id}>
          {item.type_slug === "text" && (
            <div
              className="sarabun"
              dangerouslySetInnerHTML={{ __html: item.description || "" }}
            ></div>
          )}
          {item.type_slug === "image" && (
            <figure className="relative w-full min-h-[350px]">
              <div>{item.product_file?.url}</div>
              <Image
                alt={`programtour-${item.ordinal}`}
                fill
                sizes="w-full"
                src={item.product_file?.url || ""}
                className="h-full object-cover"
              />
            </figure>
          )}
        </div>
      ))}
    </div>
  );
}

export default ProgramDerailTour;
