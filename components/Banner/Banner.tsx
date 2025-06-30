import BannerClient from "./BannerClient";

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

async function getBanner(): Promise<BannerData | null> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/twm/${process.env.NEXT_PUBLIC_AGENCY_DOMAIN}/banners`
    );
    const data = await res.json();
    return data.status === "success" ? data.data : null;
  } catch {
    return null;
  }
}

function mapSlides(banner: BannerData): {
  desktopSlides: Slide[];
  mobileSlides: Slide[];
} {
  const desktopSlides = [
    { img: banner.advertise_image_1_url, link: banner.advertise_1_link_url },
    { img: banner.advertise_image_2_url, link: banner.advertise_2_link_url },
    { img: banner.advertise_image_3_url, link: banner.advertise_3_link_url },
  ].filter((s) => s.img);

  const mobileSlides = [
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

  return { desktopSlides, mobileSlides };
}

export default async function Banner() {
  const banner = await getBanner();
  if (!banner) return null;

  const { desktopSlides, mobileSlides } = mapSlides(banner);

  return (
    <BannerClient desktopSlides={desktopSlides} mobileSlides={mobileSlides} />
  );
}
