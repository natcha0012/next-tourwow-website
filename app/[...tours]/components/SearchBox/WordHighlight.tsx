type Props = {
  text: string;
  keyword: string | null;
  type?: "partial" | "full";
};

export default function WordHighlight({
  text,
  keyword,
  type = "partial",
}: Props) {
  if (!keyword || keyword.trim() === "") return <>{text}</>;

  const regex =
    type === "full"
      ? new RegExp(`\\b(${keyword})\\b`, "gi")
      : new RegExp(`(${keyword})`, "gi");

  const parts = text.split(regex);

  return (
    <>
      {parts.map((part, i) =>
        regex.test(part) ? (
          <span key={i} className="text-black">
            {part}
          </span>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </>
  );
}
