import Announcements from "@/components/Announcements";
import BigCalendarContainer from "@/components/BigCalendarContainer";
import FormContainer from "@/components/forms/FormContainer";
import Performance from "@/components/Performance";
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { Teacher } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

const SingleTeacherPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  const { sessionClaims } = await auth();
  const role = (sessionClaims?.metadata as { role?: string })?.role;

  const teacher: (Teacher & { _count: { subjects: number; lessons: number; classes: number } }) | null = await prisma.teacher.findUnique({
    where: { id },
    include: {
      _count: {
        select: {
          subjects: true,
          lessons: true,
          classes: true,
        }
      }
    }
  });

 if(!teacher){
  return notFound();
 }
  return (
    <div className="flex-1 p-4 flex flex-col gap-4 xl:flex-row">
      {/* left */}
      <div className="w-full xl:w-2/3">
        {/* TOP */}
        <div className="flex flex-col lg:flex-row gap-4">
          {/* USER CARD INFO */}
          <div className="bg-lamaSky py-6 px-4 rounded-md flex-1 flex gap-4 relative">
            <div className="absolute top-4 right-4">
              {role === "admin" && (
                <FormContainer
                  table="teacher"
                  type="update"
                  data={teacher}
                />
              )}
            </div>
            <div className="w-full md:w-1/3 flex justify-center md:justify-start mt-4">
              <Image
                src={teacher.img  || '/noAvatar.png'}
                alt=""
                width={146}
                height={146}
                className="w-38 h-38 md:w-36 md:h-36 rounded-full object-cover"
              />
            </div>

            <div className="w-2/3 flex flex-col  justify-between gap-4 ">
              <h1 className="text-xl font-semibold">
                {teacher.name + " " + teacher.surname}
              </h1>
              <p className="text-sm text-gray-500">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              </p>

              <div className="flex items-center  justify-between gap-2 flex-wrap text-xs  font-medium">
                <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
                  <Image src="/blood.png" alt="" width={14} height={14} />
                  <span>{teacher.bloodType}</span>
                </div>
                <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
                  <Image src="/date.png" alt="" width={14} height={14} />
                  <span>
                    {new Date(teacher.birthday).toLocaleDateString()}
                  </span>
                </div>
                <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
                  <Image src="/mail.png" alt="" width={14} height={14} />
                  <span>{teacher.email || "-"}</span>
                </div>
                <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex flex-row items-center gap-2">
                  <Image src="/phone.png" alt="" width={14} height={14} />
                  <span>{teacher.phone || "-"}</span>
                </div>
              </div>
            </div>
          </div>
          {/* SMALL CARDS */}
          <div className="flex-1 grid grid-cols-2 gap-4">
            {/* CARD */}
            <div className="bg-white p-4 rounded-md shadow-md flex flex-col items-center gap-2">
              <Image
                src="/singleAttendance.png"
                alt=""
                width={24}
                height={24}
                className="w-6 h-6"
              />
              <div className="text-center">
                <h1 className="text-xl font-semibold">90%</h1>
                <span className="text-sm text-gray-500">Attendence</span>
              </div>
            </div>
            <div className="bg-white p-4 rounded-md shadow-md flex flex-col items-center gap-2">
              <Image
                src="/singleClass.png"
                alt=""
                width={24}
                height={24}
                className="w-6 h-6"
              />
              <div className="text-center">
                <h1 className="text-xl font-semibold">{teacher._count.classes}</h1>
                <span className="text-sm text-gray-500">Classes</span>
              </div>
            </div>
            <div className="bg-white p-4 rounded-md shadow-md flex flex-col items-center gap-2">
              <Image
                src="/singleLesson.png"
                alt=""
                width={24}
                height={24}
                className="w-6 h-6"
              />
              <div className="text-center">
                <h1 className="text-xl font-semibold">{teacher._count.lessons}</h1>
                <span className="text-sm text-gray-500">Lessons</span>
              </div>
            </div>
            <div className="bg-white p-4 rounded-md shadow-md flex flex-col items-center gap-2">
              <Image
                src="/singleBranch.png"
                alt=""
                width={24}
                height={24}
                className="w-6 h-6"
              />
              <div className="text-center">
                <h1 className="text-xl font-semibold">{teacher._count.subjects}</h1>
                <span className="text-sm text-gray-500">Branches</span>
              </div>
            </div>
          </div>
        </div>
        {/* BOTTOM */}
        <div className="mt-4 bg-white rounded-md p-4 h-[880px]">
          <h1>Teacher Schedule</h1>
          <BigCalendarContainer type="teacherId" id={teacher.id} />
        </div>
      </div>
      {/* right */}
      <div className="w-full xl:w-1/3 flex flex-col gap-4">
        <div className="bg-white p-4 rounded-md">
          <h1 className="text-xl font-semibold">Shortcuts</h1>
          <div className="mt-4 flex gap-4 flex-wrap text-xs text-gray-500">
            <Link
              className="p-3 rounded-md bg-lamaSky"
              href={`/list/classes?supervisorId=${teacher.id}`}
            >
              Teacher Classes
            </Link>
            <Link
              className="p-3 rounded-md bg-lamaPurpleLight"
              href={`/list/students?teacherId=${teacher.id}`}
            >
              Teacher Students
            </Link>
            <Link
              className="p-3 rounded-md bg-lamaYellow"
              href={`/list/lessons?teacherId=${teacher.id}`}
            >
              Teacher Lessons
            </Link>
            <Link
              className="p-3 rounded-md bg-pink-50"
              href={`/list/exams?teacherId=${teacher.id}`}
            >
              Teacher Exams
            </Link>
            <Link
              className="p-3 rounded-md bg-lamaSkyLight"
              href={`/list/assignments?teacherId=${teacher.id}`}
            >
              Teacher Assignments
            </Link>
          </div>
        </div>
        <Performance />
        <Announcements />
      </div>
    </div>
  );
};

export default SingleTeacherPage;
