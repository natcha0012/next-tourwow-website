import styles from "./TopArticles.module.css";
import BlogCard from "../../../components/BlogCard/BlogCard";
import { BlogCardData } from "../../../components/BlogCard/BlogCard.type";
import Link from "next/link";

function extractFirstParagraph(text: string): string {
  const cleaned = text.replace(/&nbsp;/g, "").replace(/<p><\/p>/g, "");
  const match = cleaned.match(/<p>(.*?)<\/p>/i);
  return match ? match[1].replace(/(<([^>]+)>)/gi, "") : "";
}

export default async function TopArticle() {
  const params = new URLSearchParams({
    db_limit: "3",
    is_active: "true",
    article_type_id: "2",
  });
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/twm/${
      process.env.NEXT_PUBLIC_AGENCY_DOMAIN
    }/seo_articles?${params.toString()}`,
    {
      next: { revalidate: 3600 },
    }
  );
  const json = await res.json();
  const blogs = (
    json.status === "success" ? (json.data as BlogCardData[]) : []
  ).map((b) => ({
    ...b,
    firstParagraphText: extractFirstParagraph(b.content),
  }));

  if (blogs.length === 0) {
    return <p className="text-center">ไม่พบบทความ</p>;
  }

  return (
    <section className={styles.section}>
      <div className="container py-4">
        <Link href="/blog" className={styles.blogLink}>
          ดูบทความทั้งหมด
        </Link>
        <h2 className="text-[var(--tw-dark-blue)] text-5xl">บทความ</h2>
        <strong className="text-[var(--tw-dark-blue)]">
          รีวิวสถานที่ท่องเที่ยวทั้งในประเทศและต่างประเทศ
        </strong>
        <div className="flex sm:grid sm:grid-cols-3 gap-4 mt-4 overflow-y-scroll">
          {blogs.map((blog) => (
            <div className="pb-4 w-[80%] sm:w-full" key={blog.url_path}>
              <BlogCard blog={blog} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
