"use client";
import React, { useState } from "react";
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp,
} from "react-icons/md";

type ArticleButtonProps = {
  children: React.ReactNode;
};

function ArticleButton({ children }: ArticleButtonProps) {
  const [expanded, setExpanded] = useState(false);
  return (
    <>
      {expanded && children}
      <button
        onClick={() => setExpanded(!expanded)}
        className="cursor-pointer text-blue-600 mt-4 flex items-center"
      >
        {expanded ? (
          <>
            <span>อ่านน้อยลง</span>
            <MdOutlineKeyboardArrowUp />
          </>
        ) : (
          <>
            <span> อ่านเพิ่มเติม</span>
            <MdOutlineKeyboardArrowDown />
          </>
        )}
      </button>
    </>
  );
}

export default ArticleButton;
