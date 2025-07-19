import Link from "next/link";
import { PiUserCircleLight } from "react-icons/pi";

export default function ProfileHeader() {
  return (
    <Link
      prefetch={false}
      className="flex items-center"
      title="Login"
      href="/login"
    >
      <PiUserCircleLight className="w-8 h-8 text-[#0191ff]" />
      เข้าสู่ระบบ
    </Link>
  );
}
