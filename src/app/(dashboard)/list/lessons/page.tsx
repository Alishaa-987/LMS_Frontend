import FormModel from "@/components/FormModel";
import FormContainer from "@/components/forms/FormContainer";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { Lesson } from "@/generated/prisma";
import { ITEM_PER_PAGE } from "@/lib/settings";
import { getRole } from "@/lib/utils";
import { Class, Prisma, PrismaClient, Subject, Teacher } from "@prisma/client";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import React from "react";

type LessonList = Lesson & {subject:Subject} & {class:Class} & {teacher: Teacher};

const columns = [
  {
    header: "Subject Name",
    accessor: "info",
  },
  {
    header: "Class",
    accessor: "class",
  },
  {
    header: "Teacher",
    accessor: "teacher",
    className: "hidden md:table-cell",
  },

...( true ?[  {
  header: "Actions",
  accessor: "action",
},]:[])
];
const renderRow = (item: LessonList) => (
    <tr
      key={item.id}
      className="border-b border-gray-200 even:bg-slate-200 text-sm hover:bg-lamaPurpleLight"
    >
      <td className="flex items-center gap-4 p-4">
        <div className="flex flex-col">{item.subject.name}</div>
      </td>
      <td>{item?.class.name}</td>
      <td className="hidden md:table-cell">{item?.teacher.name + "   "  + item.teacher.surname}</td>

      <td>
        <div className="flex items-center gap-4">
          {true && (
            <>
              <FormContainer table="lesson" type="update" data={item} />

              <FormContainer table="lesson" type="delete" id={item.id} />
            </>
          )}
        </div>
      </td>
    </tr>
  );
const LessonListPage  = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) => {
  const role = await getRole();
  const searchParamsResolved = await searchParams;
  const { page, ...queryParams } = searchParamsResolved;
  const p = page ? parseInt(page) : 1;

  // URL PARAMS CONDITION
  const query: Prisma.LessonWhereInput = {};
  if (queryParams) {
    for (const [key, value] of Object.entries(queryParams)) {
      if (value !== undefined) {
        switch (key) {
          case "classId":
            query.classId = parseInt(value);
            break;
              case "teacherId":
            query.teacherId =value;
            break;
          case "search":
            query.OR = [
              {subject : {name: {  contains: value, mode: "insensitive" }}},
              {teacher : {name: {  contains: value, mode: "insensitive" }}},


            ]
            break;
          default:
            break;
        }
      }
    }
  }
    const prisma = new PrismaClient();
  
  const [data, count] = await prisma.$transaction([
    prisma.lesson.findMany({
      where: query,
      include: {
        subject: {select : {name : true}},
        class: {select : {name : true}}, 
        teacher: {select : {name : true , surname : true}},

      },
      take: ITEM_PER_PAGE,
      skip: ITEM_PER_PAGE * (p - 1),
    }),
    prisma.lesson.count({ where: query }),
  ]);

  
  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      {/* Top */}
      <div className="flex items-center justify-between">
        <h1 className="text-lg hidden md:block font-semibold">All Lessons</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto"></div>
        <TableSearch />
        <div className="flex items-center gap-4 self-end">
          <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
            <Image src="/filter.png" alt="" width={14} height={14} />
          </button>

          <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
            <Image src="/sort.png" alt="" width={14} height={14} />
          </button>

          {true && (
             <FormContainer table="lesson" type="create"/>

          )}
        </div>
      </div>
      {/* List */}
      <Table columns={columns} renderRow={renderRow} data={data} />
      {/* PAGINATION */}
      <div className="">
        <Pagination page={p} count={count} />
      </div>
    </div>
  );
};

export default LessonListPage;
