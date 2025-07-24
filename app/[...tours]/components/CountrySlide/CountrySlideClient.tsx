"use client";
import { useRef } from "react";
import { MdOutlineNavigateBefore, MdOutlineNavigateNext } from "react-icons/md";
import styles from "./CountrySlideClient.module.css";

type Props = {
  children: React.ReactNode;
};

export default function CountrySlideClient({ children }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const slideScroll = (direction: "prev" | "next") => {
    const el = scrollRef.current;
    if (!el) return;
    const amount = direction === "prev" ? -500 : 500;
    el.scrollBy({ left: amount, behavior: "smooth" });
  };

  return (
    <section className="container mb-8">
      <h2>ประเทศยอดนิยม</h2>
      <div className="relative h-[208px]">
        <div ref={scrollRef} id="scroll" className="flex overflow-x-auto">
          {children}
        </div>
        <button
          id="prev-button"
          className={`${styles.slideButton} left-0`}
          onClick={() => slideScroll("prev")}
        >
          <MdOutlineNavigateBefore className="text-4xl text-tw-blue" />
        </button>
        <button
          id="next-button"
          className={`${styles.slideButton} right-0`}
          onClick={() => slideScroll("next")}
        >
          <MdOutlineNavigateNext className="text-4xl text-tw-blue" />
        </button>
      </div>
    </section>
  );
}
