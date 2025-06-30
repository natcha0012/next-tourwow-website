"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

type BannerData = {
  advertise_1_link_url: string | null;
  advertise_2_link_url: string | null;
  advertise_3_link_url: string | null;
  advertise_image_1_url: string | null;
  advertise_image_2_url: string | null;
  advertise_image_3_url: string | null;
  advertise_image_mobile_1_url: string | null;
  advertise_image_mobile_2_url: string | null;
  advertise_image_mobile_3_url: string | null;
};
type Slide = {
  img: string | null;
  link: string | null;
};

export default function Banner() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [activeMobileIdx, setActiveMobileIdx] = useState(0);
  const [slidesMobile, setSlidesMobile] = useState<Slide[]>([]);
  const [slidesDesktop, setSlidesDesktop] = useState<Slide[]>([]);

  useEffect(() => {
    const fetchBanner = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/twm/${process.env.NEXT_PUBLIC_AGENCY_DOMAIN}/banners`
        );
        const data = await res.json();
        if (data.status === "success") {
          const banner = data.data as BannerData;
          setSlide(banner);
        }
      } catch (error) {
        console.error("Error fetching banners:", error);
      }
    };
    fetchBanner();
  }, []);

  useEffect(() => {
    if (!slidesDesktop.length) return;
    const interval = setInterval(() => {
      setActiveIdx((prev) => (prev >= slidesDesktop.length - 1 ? 0 : prev + 1));
    }, 5000);

    return () => clearInterval(interval);
  }, [slidesDesktop]);

  useEffect(() => {
    if (!slidesMobile.length) return;

    const interval = setInterval(() => {
      setActiveMobileIdx((prev) =>
        prev >= slidesMobile.length - 1 ? 0 : prev + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [slidesMobile]);

  const setSlide = (banner: BannerData) => {
    if (!banner) return null;

    const mobile = [
      {
        img: banner.advertise_image_mobile_1_url,
        link: banner.advertise_1_link_url,
      },
      {
        img: banner.advertise_image_mobile_2_url,
        link: banner.advertise_2_link_url,
      },
      {
        img: banner.advertise_image_mobile_3_url,
        link: banner.advertise_3_link_url,
      },
    ].filter((s) => s.img);
    const desktop = [
      { img: banner.advertise_image_1_url, link: banner.advertise_1_link_url },
      { img: banner.advertise_image_2_url, link: banner.advertise_2_link_url },
      { img: banner.advertise_image_3_url, link: banner.advertise_3_link_url },
    ].filter((s) => s.img);

    setSlidesMobile(mobile);
    setSlidesDesktop(desktop);
  };

  const renderSlides = (slides: Slide[], active: number) => {
    return slides.map((s, idx) =>
      s.img ? (
        <Link
          className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ${
            active === idx ? "opacity-100" : "opacity-0"
          }`}
          href={s.link ?? "/"}
          key={idx}
        >
          <Image
            src={s.img}
            alt={`Banner ${idx + 1}`}
            fill
            priority={idx === 0}
            sizes="(min-width: 640px) 1024px, 100vw"
            className="w-full h-full object-cover"
          />
        </Link>
      ) : null
    );
  };

  return (
    <div className="w-full overflow-hidden">
      {/* Mobile */}
      <div className="block sm:hidden h-[375px] relative">
        {renderSlides(slidesMobile, activeMobileIdx)}
      </div>
      {/* Desktop */}
      <div className="hidden sm:flex h-[26vw] max-h-[380px] relative">
        {renderSlides(slidesDesktop, activeIdx)}
      </div>
    </div>
  );
}
