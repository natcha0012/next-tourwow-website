import Link from "next/link";
import Image from "next/image";
import styles from "./BlogCard.module.css";
import { LuCalendarDays } from "react-icons/lu";
import { BlogCardData } from "./BlogCard.type";

function extractFirstParagraph(content: string): string {
  const cleaned = content.replace(/&nbsp;/g, "").replace(/<p><\/p>/g, "");

  const match = cleaned.match(/<p>(.*?)<\/p>/i);
  return match ? match[1].replace(/(<([^>]+)>)/gi, "") : "";
}

function formatThaiDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("th-TH", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function BlogCard({ blog }: { blog: BlogCardData }) {
  const firstParagraph =
    blog.firstParagraphText || extractFirstParagraph(blog.content);

  return (
    <div className={styles.card}>
      <Link href={blog.url_path}>
        <figure className={styles.cover}>
          <Image
            src={blog.mobile_cover_image_thumbnail_url}
            alt={blog.cover_image_alt_text}
            width={400}
            height={209}
          />
        </figure>
      </Link>

      <div className="p-2">
        <Link href={blog.url_path}>
          <h3 className={styles.headline}>{blog.name}</h3>
        </Link>
        <p className={styles.prelude}>{firstParagraph}</p>
      </div>

      <div className="flex p-2 items-center">
        <LuCalendarDays />
        <span className="ml-2">{formatThaiDate(blog.updated_at)}</span>
      </div>
    </div>
  );
}
