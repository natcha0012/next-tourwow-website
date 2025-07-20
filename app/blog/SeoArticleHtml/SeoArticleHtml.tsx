import React from "react";
import Image from "next/image";
import { getSeoArticle } from "@/app/[...tours]/apis/seo-article";
import style from "./SeoArticleHtml.module.css";
import { getBlogDetail } from "../apis/blog";

type Props = {
  path?: string;
  blogId?: number;
  showH1?: boolean;
  bannerPriority?: boolean;
  contentCollapsed?: boolean;
};
async function SeoArticleHtml({
  path,
  blogId,
  showH1 = true,
  bannerPriority = true,
  contentCollapsed = true,
}: Props) {
  if (!path && !blogId) return;
  const seoArticle = path
    ? await getSeoArticle(path)
    : await getBlogDetail(blogId!);
  if (seoArticle) {
    const imageClassInnerHTML = style.image;
    let html = seoArticle.content;
    html = html.replace(/<img/g, '<img loading="lazy"');
    html = html.replace(/class="image"/g, `class="${imageClassInnerHTML}"`);
    seoArticle.content = html;
  }

  return (
    <section className={`container`}>
      {seoArticle?.desktop_cover_image_preview_url && (
        <figure className="flex justify-center">
          <Image
            src={seoArticle.desktop_cover_image_preview_url}
            alt={seoArticle.cover_image_alt_text || ""}
            width={960}
            height={502}
            priority={bannerPriority}
          ></Image>
        </figure>
      )}
      {showH1 && <h1 className="p-4">{seoArticle?.name}</h1>}
      {seoArticle?.first_paragraph && (
        <div
          className={`${style.articleTextContent} ${
            contentCollapsed ? style.collapsed : ""
          }`}
          dangerouslySetInnerHTML={{ __html: seoArticle.first_paragraph }}
        ></div>
      )}

      {seoArticle?.content && (
        <div
          className={`${style.articleTextContent} ${
            contentCollapsed ? style.collapsed : ""
          }`}
          dangerouslySetInnerHTML={{ __html: seoArticle.content }}
        ></div>
      )}
    </section>
  );
}

export default SeoArticleHtml;
