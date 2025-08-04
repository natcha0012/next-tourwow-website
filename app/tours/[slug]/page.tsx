import Breadcrumb, { BreadcrumbType } from "@/components/Breadcrumb";
import React, { Suspense } from "react";
import { getProgramDetailHeader } from "../apis/program-detail";
import Loading from "@/app/components/Loading/Loading";
import { Metadata } from "next";
import ProgramDetail from "../components/ProgramDetail/ProgramDetail";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const header = await getProgramDetailHeader(`/tours/${slug}`);
  return {
    title: header?.meta.title,
    description: header?.meta.description,
    openGraph: {
      title: header?.meta.title,
      description: header?.meta.description,
      images: header?.meta.images,
    },
  };
}
async function page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const header = await getProgramDetailHeader(`/tours/${slug}`);
  const breadcrumb: BreadcrumbType[] = [
    { text: "ผลการค้นหา", link: "/tours" },
    {
      text: header?.countryTh || "",
      link: `/${header?.countryEn?.toLowerCase().replace(" ", "-")}-tour`,
    },
    { text: header?.name || "", link: null },
  ];

  return (
    <div>
      <Suspense fallback={<Loading></Loading>}>
        <Breadcrumb breadcrumb={breadcrumb}></Breadcrumb>
      </Suspense>
      <Suspense fallback={<Loading></Loading>}>
        <ProgramDetail routerUrl={`/tours/${slug}`}></ProgramDetail>
      </Suspense>
    </div>
  );
}

export default page;
