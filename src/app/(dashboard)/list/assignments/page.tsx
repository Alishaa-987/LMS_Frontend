import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { ITEM_PER_PAGE } from "@/lib/settings";
import { getCurrentUserId, getRole } from "@/lib/utils";
import {
  Assignment,
  Class,
  Prisma,
  PrismaClient,
  Subject,
  Teacher,
} from "@prisma/client";
import Image from "next/image";
import React from "react";
import FormContainer from "@/components/forms/FormContainer";

type AssignmentList = Assignment & {
  lesson: {
    subject: Subject;
    class: Class;
    teacher: Teacher;
  };
};
const AssignmentListPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) => {
  const { page, ...queryParams } = await searchParams;
  const p = page ? parseInt(page) : 1;

  const role = await getRole();
  const currentUserId = await getCurrentUserId();

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
    {
      header: " Due Date",
      accessor: " dueDate",
      className: "hidden md:table-cell",
    },

   ...(role === "admin" || role ==="teacher" ?[ {
      header: "Actions",
      accessor: "action",
    }] : []),
  ];
  const renderRow = (item: AssignmentList) => (
    <tr
      key={item.id}
      className="border-b border-gray-200 even:bg-slate-200 text-sm hover:bg-lamaPurpleLight"
    >
      <td className="flex items-center gap-4 p-4">
        <div className="flex flex-col">{item.lesson.subject.name}</div>
      </td>
      <td>{item?.lesson.class.name}</td>
      <td className="hidden md:table-cell">
        {item?.lesson.teacher.name + " " + item?.lesson.teacher.surname}
      </td>
      <td className="hidden md:table-cell">
        {new Intl.DateTimeFormat("en-US").format(item.dueDate)}
      </td>

      <td>
        <div className="flex items-center gap-4">
          {(role === "admin" || role === "teacher") && (
            <>
              <FormContainer table="assignment" type="update" data={item} relatedData={relatedData} />
              <FormContainer table="assignment" type="delete" id={item.id} />
            </>
          )}
        </div>
      </td>
    </tr>
  );

  // URL PARAMS CONDITION
  const query: Prisma.AssignmentWhereInput = {};


  query.lesson ={};
  if (queryParams) {
    for (const [key, value] of Object.entries(queryParams)) {
      if (value !== undefined) {
        switch (key) {
          case "classId":
            query.lesson .classId= parseInt(value) ;
            break;
          case "teacherId":
            query.lesson.teacherId= value;
            break;
          case "search":
            query.lesson. subject= {
                name: { contains: value, mode: "insensitive" },
              };
            break;
          default:
            break;
        }
      }
    }
  }

// Role conditiions

switch(role){
  case "admin":
  break;
case "teacher":
  query.lesson.teacherId = currentUserId!;
  break;
case "student":
  query.lesson.class={
    students:{
      some:{
        id:currentUserId!,
      }
    }
  };
  break;
  case "parent":
  query.lesson.class={
    students:{
      some:{
        parentId:currentUserId!,
      }
    }
  };
  break;
  default:
    break;
}


  const prisma = new PrismaClient();

  const [data, count] = await prisma.$transaction([
    prisma.assignment.findMany({
      where: query,
      include: {
        lesson: {
          include: {
            subject: { select: { name: true } },
            teacher: { select: { name: true, surname: true } },
            class: { select: { name: true } },
          },
        },
      },
      take: ITEM_PER_PAGE,
      skip: ITEM_PER_PAGE * (p - 1),
    }),
    prisma.assignment.count({ where: query }),
  ]);

  // Fetch subjects and classes for the form
  const subjects = await prisma.subject.findMany({
    select: { id: true, name: true },
  });

  const classes = await prisma.class.findMany({
    select: { id: true, name: true },
  });

  const relatedData = { subjects, classes };

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      {/* Top */}
      <div className="flex items-center justify-between">
        <h1 className="text-lg hidden md:block font-semibold">
          All Assignment
        </h1>
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
            <FormContainer table="assignment" type="create" relatedData={relatedData} />
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

export default AssignmentListPage;
