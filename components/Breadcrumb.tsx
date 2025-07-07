import Link from "next/link";

export interface BreadcrumbType {
  text: string;
  link: string | null;
}

interface BreadcrumbProps {
  breadcrumb: BreadcrumbType[];
}

export default function Breadcrumb({ breadcrumb }: BreadcrumbProps) {
  return (
    <div className="hidden md:block container mx-auto px-4 my-1">
      <ul className="flex flex-wrap items-center text-sm text-gray-700">
        <li>
          <Link href="/" className=" text-tw-blue hover:underline">
            หน้าแรก
          </Link>
        </li>
        {breadcrumb.map((item, index) => (
          <li key={index} className="flex items-center">
            <span className="mx-2 text-black">/</span>
            {item.link ? (
              <Link href={item.link} className="text-tw-blue hover:underline">
                {item.text}
              </Link>
            ) : (
              <span>{item.text}</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
