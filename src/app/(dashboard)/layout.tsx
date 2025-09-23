import Link from "next/link";
import Image from "next/image";
import Menu from "@/components/Menu";
import Navbar from "@/components/Navbar";
export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-screen flex">
      {/* {left} */}
      <div className="w-[14%] md:w-[8%] lg:w-[16%] xl:w-[14%]  p-4">
        <Link
          href="/"
          className="flex item-center justify-center lg:justify-start gap-2"
        >
          <Image src="/logo.png" alt="Logo" width={32} height={32} />
          <span className="hidden lg:block font-bold mt-2 text-xl">EduVerse</span>
        </Link>
        <Menu />
      </div>

      {/* {right} */}
      <div className="w-[86%] md:w-[92%] lg:w-[84%] xl:w-[86%] bg-[#F78FA] overflow-scroll bg-lamaPurpleLight flex flex-col flex-1">
        <Navbar />
        {children}
      </div>
    </div>
  );
}
