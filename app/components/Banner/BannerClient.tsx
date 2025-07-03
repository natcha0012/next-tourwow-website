"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

type Slide = {
  img: string | null;
  link: string | null;
};

export default function BannerClient({
  desktopSlides,
  mobileSlides,
}: {
  desktopSlides: Slide[];
  mobileSlides: Slide[];
}) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [activeMobileIdx, setActiveMobileIdx] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIdx((prev) => (prev >= desktopSlides.length - 1 ? 0 : prev + 1));
      setActiveMobileIdx((prev) =>
        prev >= mobileSlides.length - 1 ? 0 : prev + 1
      );
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const renderSlides = (slides: Slide[], active: number) =>
    slides.map((s, idx) =>
      s.img ? (
        <Link
          key={idx}
          href={s.link ?? "/"}
          className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ${
            active === idx ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={s.img}
            alt={`Banner ${idx + 1}`}
            fill
            priority={idx === 0}
            sizes="(max-width: 640px) 286px, 100vw"
            className="sm:w-full w-[286px] h-full object-contain sm:object-cover"
          />
        </Link>
      ) : null
    );

  return (
    <section className="w-full overflow-hidden">
      <div className="block sm:hidden h-[375px] relative">
        {renderSlides(mobileSlides, activeMobileIdx)}
      </div>
      <div className="hidden sm:flex h-[26vw] max-h-[380px] relative">
        {renderSlides(desktopSlides, activeIdx)}
      </div>
    </section>
  );
}
