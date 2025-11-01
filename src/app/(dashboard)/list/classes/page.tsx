import FormModel from "@/components/FormModel";
import FormContainer from "@/components/forms/FormContainer";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { ITEM_PER_PAGE } from "@/lib/settings";
import { getRole, role } from "@/lib/utils";
import { Class, Prisma, PrismaClient, Teacher } from "@prisma/client";
import Image from "next/image";
import React from "react";

type ClassList = Class & {supervisor: Teacher, grade: any}

const columns = [
  {
    header: "Class Name",
    accessor: "info",
  },
  {
    header: "Capacity",
    accessor: "capacity",
    className: "hidden md:table-cell",
  },
  {
    header: "Grade",
    accessor: "grade",
    className: "hidden md:table-cell",
  },
  {
    header: "Supervisor",
    accessor: "supervisro",
    className: "hidden md:table-cell",
  },
  ...( true ?[
  {   header: "Actions",
    accessor: "action",
  },
  ]: []),
];
 const renderRow = (item: ClassList) => (
    <tr
      key={item.id}
      className="border-b border-gray-200 even:bg-slate-200 text-sm hover:bg-lamaPurpleLight"
    >
      <td className="flex items-center gap-4 p-4">
        <div className="flex flex-col">{item.name}</div>
      </td>
      <td className="hidden md:table-cell">{item?.capacity}</td>
      <td className="hidden md:table-cell">{item?.grade?.level}</td>
      <td className="hidden md:table-cell">{item?.supervisor.name + " " + item.supervisor.surname}</td>

      <td>
        <div className="flex items-center gap-4">
          {true && (
            <>
              <FormContainer table="class" type="update" data={item}  />
              <FormContainer table="class" type="delete" id={item.id} />
            </>
          )}
        </div>
      </td>
    </tr>
  );
const ClassListPage  = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) => {
  const { page, ...queryParams } = await searchParams;
  const p = page ? parseInt(page) : 1;

  const role = await getRole();

  // URL PARAMS CONDITION
  const query: Prisma.ClassWhereInput = {};
  if (queryParams) {
    for (const [key, value] of Object.entries(queryParams)) {
      if (value !== undefined) {
        switch (key) {
          case "supervisorId":
            query.supervisorId = value;
            break;
          case "search":
            query.name = { contains: value, mode: "insensitive" };
            break;
          default:
            break;
        }
      }
    }
  }
    const prisma = new PrismaClient();
  
  const [data, count] = await prisma.$transaction([
    prisma.class.findMany({
      where: query,
      include: {
        supervisor: true,
        grade: true,
      },
      take: ITEM_PER_PAGE,
      skip: ITEM_PER_PAGE * (p - 1),
    }),
    prisma.class.count({ where: query }),
  ]);

  // Fetch teachers and grades for the form
  const teachers = await prisma.teacher.findMany({
    select: { id: true, name: true, surname: true },
  });

  const grades = await prisma.grade.findMany({
    select: { id: true, level: true },
  });

  const relatedData = { teachers, grades };

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      {/* Top */}
      <div className="flex items-center justify-between">
        <h1 className="text-lg hidden md:block font-semibold">All Classes</h1>
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
              <FormContainer table="class" type="create" relatedData={relatedData} />

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

export default ClassListPage;
