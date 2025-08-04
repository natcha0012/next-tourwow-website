"use client";
import LightGallery from "lightgallery/react";
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-thumbnail.css";
import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom";
import Image from "next/image";
import { ProgramDetail } from "../../interfaces/program-detail.interface";

type Props = {
  program: ProgramDetail | null;
};

export default function ProgramGalleryDT({ program }: Props) {
  const images = program?.banner_image_files || [];

  const title = `TWP-${program?.tour_code} ${program?.name}`;

  return (
    <LightGallery
      plugins={[lgThumbnail, lgZoom]}
      speed={500}
      elementClassNames=" grid grid-cols-4 gap-2 pt-4 w-full"
    >
      <a
        data-src={program?.banner_image_files[0].preview_url ?? ""}
        className="col-span-2 row-span-3 relative h-full"
      >
        <Image
          src={program?.banner_image_files[0].preview_url ?? ""}
          alt={`${title} 1`}
          fill
          sizes="w-full"
          priority
          className="cursor-pointer object-cover rounded"
        />
      </a>

      {images.slice(1, 6).map((img, i) => (
        <a
          data-src={img.preview_url}
          key={i + 1}
          className="relative h-[140px] w-full"
        >
          <Image
            src={img.preview_url}
            alt={`${title} ${i + 2}`}
            fill
            sizes="w-full"
            className="cursor-pointer object-cover rounded"
          />
        </a>
      ))}

      {images.length > 7 ? (
        <a
          data-src={images[6].preview_url}
          className="bg-black/50 h-full rounded flex items-center justify-center text-white font-bold"
        >
          ดูรูปทั้งหมด {images.length} รูป
          <Image
            src={images[6].thumbnail_url}
            alt={`${title} ${7}`}
            width={96}
            height={76}
            className="hidden cursor-pointer object-cover rounded"
          />
        </a>
      ) : (
        images[6] && (
          <a
            data-src={images[6].preview_url}
            className="relative h-[140px] w-full"
          >
            <Image
              src={images[6].preview_url}
              alt={`${title} 7`}
              fill
              sizes="w-full"
              className="cursor-pointer object-cover rounded"
            />
          </a>
        )
      )}
      {images.slice(7).map((img, i) => (
        <a data-src={img.preview_url} key={i + 8} className="hidden">
          <Image
            src={img.thumbnail_url}
            alt={`${title} ${i + 8}`}
            width={96}
            height={76}
            className="hidden cursor-pointer object-cover rounded"
          />
        </a>
      ))}
    </LightGallery>
  );
}
