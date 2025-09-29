import FormModel from "@/components/FormModel";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { role, teachersData } from "@/lib/data";
import { Class, Subject, Teacher } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Prisma } from "@prisma/client";
import { PrismaClient } from "@prisma/client";

type TeacherList = Teacher & { subjects: Subject[] } & { classes: Class[] };

const columns = [
  {
    header: "Info",
    accessor: "info",
  },
  {
    header: "Teacher  ID",
    accessor: "teacherId",
    className: "hidden md:table-cell",
  },
  {
    header: "Classes",
    accessor: "classes",
    className: "hidden md:table-cell",
  },
  {
    header: "Phone",
    accessor: "phone",
    className: "hidden md:table-cell",
  },
  {
    header: "Address",
    accessor: "address",
    className: "hidden md:table-cell",
  },
  {
    header: "Actions",
    accessor: "action",
  },
];
const renderRow = (item: TeacherList) => (
  <tr
    key={item.id}
    className="border-b border-gray-200 even:bg-slate-200 text-sm hover:bg-lamaPurpleLight"
  >
    <td className="flex items-center gap-4 p-4">
      <Image
        src={item.img || "/noAvatar.png"}
        alt=""
        width={40}
        height={40}
        className="md:hidden xl:block w-10 h-10 rounded-full object-cover"
      />
      <div className="flex flex-col">
        <h3 className="font-semibold">{item.name}</h3>
        <p className="text-xs text-gray-500">{item?.email}</p>
      </div>
    </td>

    <td className="hidden md:table-cell"> {item.username}</td>
    <td className="hidden md:table-cell">
      {" "}
      {item.classes.map((classItem) => classItem.name).join(",")}
    </td>
    <td className="hidden md:table-cell"> {item.phone}</td>
    <td className="hidden md:table-cell"> {item.address}</td>

    <td className="hidden md:table-cell">
      {" "}
      {item.subjects.map((subject) => subject.name).join(",")}
    </td>

    <td>
      <div className="flex items-center gap-4">
        <Link href={`/list/teachers/${item.id}`}>
          <button className="w-7 flex items-center justify-center rounded-sm bg-lamaSky">
            <Image src="/edit.png" alt="" width={18} height={28} />
          </button>
        </Link>
        {role === "admin" && (
          <FormModel table="parent" type="delete" id={Number(item.id)} />
        )}
      </div>
    </td>
  </tr>
);
const TeacherListPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string } | undefined;
}) => {
console.log(searchParams);
  const prisma = new PrismaClient();
  const data = await prisma.teacher.findMany({
    include: {
      subjects: true,
      classes: true,
    },
    take: 10,
  });
  // console.log(data)
  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      {/* Top */}
      <div className="flex items-center justify-between">
        <h1 className="text-lg hidden md:block font-semibold">All Teachers</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto"></div>
        <TableSearch />
        <div className="flex items-center gap-4 self-end">
          <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
            <Image src="/filter.png" alt="" width={14} height={14} />
          </button>

          <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
            <Image src="/sort.png" alt="" width={14} height={14} />
          </button>

          {role === "admin" && (
            // <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
            //   <Image src="/plus.png" alt="" width={14} height={14} />
            // </button>
            <FormModel table="teacher" type="create" />
          )}
        </div>
      </div>
      {/* List */}
      <Table columns={columns} renderRow={renderRow} data={data} />
      {/* PAGINATION */}
      <div className="">
        <Pagination />
      </div>
    </div>
  );
};

export default TeacherListPage;
