"use client";
import { ProgramDetail } from "../../interfaces/program-detail.interface";
import Image from "next/image";
import { useState } from "react";

type Props = {
  program: ProgramDetail | null;
};

export default function ProgramGalleryMB({ program }: Props) {
  const images = program?.banner_image_files || [];

  const title = `TWP-${program?.tour_code} ${program?.name}`;
  const [selectedImage, setSelectedImage] = useState(images[0]);

  return (
    <div>
      <figure className="flex relative w-full min-h-[300px]">
        <Image
          src={selectedImage.preview_url}
          fill
          sizes="w-full"
          alt={title}
          className="cursor-pointer object-contain rounded"
        />
      </figure>
      <div className="flex w-full  overflow-x-auto gap-1">
        {images.map((img, i) => (
          <a
            className={`shrink-0 ${
              img.id === selectedImage.id &&
              " border-2 rounded border-[var(--tw-blue)]"
            }`}
            key={img.id}
            onClick={() => setSelectedImage(img)}
          >
            <Image
              className="cursor-pointer object-cover  w-[55px] h-[55px]"
              src={img.thumbnail_url}
              title={`${title} ${i + 1}`}
              alt={`${title} ${i + 1}`}
              width={55}
              height={55}
            />
          </a>
        ))}
      </div>
    </div>
  );
}
