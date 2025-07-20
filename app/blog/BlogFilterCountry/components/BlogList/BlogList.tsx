"use client";
import React, { useEffect, useState } from "react";
import styles from "./BlogList.module.css";
import { getBlogList } from "../../../apis/blog";
import { BlogItem } from "../../interfaces/blog";
import BlogCard from "@/components/BlogCard/BlogCard";

type Props = {
  countryId: number | null;
};
function BlogList({ countryId }: Props) {
  const pageEntries = 6;
  const [blogList, setBlogList] = useState<BlogItem[]>([]);
  const [page, setPage] = useState(1);
  const [blogTotal, setBlogTotal] = useState(0);

  useEffect(() => {
    getBlogList(countryId, page, pageEntries).then((data) => {
      if (!data) return;
      setBlogTotal(data.total);
      if (page === 1) {
        setBlogList(data?.result ?? []);
      } else {
        setBlogList([...blogList, ...data?.result]);
      }
    });
  }, [countryId, page]);

  return (
    <div className={styles.blogListLayout}>
      <div className={styles.blogListLeft}>
        <div className="flex flex-wrap justify-center mb-8 md:grid md:grid-cols-2 gap-4">
          {blogList.map((blog) => (
            <div className=" w-full mb-1 max-w-[400px]" key={blog.url_path}>
              <BlogCard blog={blog} />
            </div>
          ))}
        </div>
        {blogTotal > blogList.length && (
          <div className={styles.moreArticle}>
            <button onClick={() => setPage(page + 1)} className={styles.btn}>
              ดูบทความเพิ่มเติม
            </button>
          </div>
        )}
      </div>
      <div className={styles.blogListRight}>
        <div id="headline-category" className="text-2xl">
          เลือกหัวข้อที่สนใจ
        </div>
        <ul id="category-list" className={`${styles.categoryList} my-4`}>
          <li>กินแบบว้าว</li>
          <li>เที่ยวแบบว้าว</li>
          <li>ช้อปแบบว้าว</li>
          <li>ที่พักแบบว้าว</li>
          <li>อัปเดตเรื่องว้าว ๆ</li>
        </ul>
      </div>
    </div>
  );
}

export default BlogList;
