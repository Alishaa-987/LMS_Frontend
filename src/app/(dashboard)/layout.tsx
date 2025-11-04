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
      <div className="w-[16%] md:w-[12%] lg:w-[16%] xl:w-[14%] p-2 md:p-4">
        <Link
          href="/"
          className="flex item-center justify-center lg:justify-start gap-1 md:gap-2"
        >
          <div className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 flex items-center justify-center rounded-full bg-gradient-to-tr from-yellow-100 via-teal-100 to-blue-100 shadow-md ring-2 md:ring-4 ring-blue-200">
            <Image src="/logo.png" alt="Logo" width={20} height={20} className="md:w-6 md:h-6 lg:w-8 lg:h-8" />
          </div>
          <span className="hidden lg:block font-extrabold text-lg md:text-xl lg:text-2xl text-indigo-300 tracking-tight mt-1">SchoolHub</span>
        </Link>
        <Menu />
      </div>


      {/* {right} */}
      <div className="w-[84%] md:w-[88%] lg:w-[84%] xl:w-[86%] bg-[#F78FA] overflow-scroll bg-lamaPurpleLight flex flex-col flex-1">
        <Navbar />
        {children}
      </div>
    </div>
  );
}
