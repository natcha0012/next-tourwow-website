import React from "react";
import SeoArticleHtml from "../components/SeoArticleHtml/SeoArticleHtml";
import { getCurrentPageData } from "@/app/libs/apis/page-data";
import styles from "./page.module.css";
import Breadcrumb, { BreadcrumbType } from "@/components/Breadcrumb";

async function page({ params }: { params: Promise<{ articles: string }> }) {
  const { articles } = await params;
  const pageData = await getCurrentPageData(`/blog/${articles}`);
  let blogId = 0;
  if (pageData) {
    blogId = pageData.page_argument.seo_article.id;
  } else {
    return <div>Page not found</div>;
  }
  const breadcrumb: BreadcrumbType[] = [
    { text: "บทความ", link: "/blog" },
    { text: articles, link: null },
  ];
  return (
    <div>
      <Breadcrumb breadcrumb={breadcrumb}></Breadcrumb>
      <div className={styles.seoArticleContainer}>
        <SeoArticleHtml
          blogId={blogId}
          contentCollapsed={false}
        ></SeoArticleHtml>
      </div>
    </div>
  );
}

export default page;
