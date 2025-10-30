import FormContainer from "@/components/forms/FormContainer";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
const role = "admin"; // Temporary fix
import { ITEM_PER_PAGE } from "@/lib/settings";
import { auth } from "@clerk/nextjs/server";
// import { role } from "@/lib/utils";
import { Class, Prisma, PrismaClient, Student } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export async function getRole() {
  const { sessionClaims } = await auth();
  return (sessionClaims?.metadata as { role?: string })?.role;
}

export async function getCurrentUserId() {
  const { userId } = await auth();
  return userId;
}

type StudentList = Student & { class: Class };

const columns = [
  {
    header: "Info",
    accessor: "info",
  },
  {
    header: "Student  ID",
    accessor: "studentId",
    className: "hidden md:table-cell",
  },
  {
    header: "Class",
    accessor: "class",
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
    header: "Grade",
    accessor: "grade",
    className: "hidden md:table-cell",
  },
  ...( role === "admin"?[{
    header: "Actions",
    accessor: "action",
  }]:[]),
];
const renderRow = (item: StudentList) => (
  <tr
    key={item.id}
    className="border-b border-gray-200 even:bg-slate-200 text-sm hover:bg-lamaPurpleLight"
  >
    <td className="flex items-center gap-4 p-4">
      <Link href={`/list/students/${item.id}`}>
        <Image
          src={item.img || "/noAvatar.png"}
          alt=""
          width={40}
          height={40}
          className="md:hidden xl:block w-10 h-10 rounded-full object-cover cursor-pointer"
        />
      </Link>
      <div className="flex flex-col">
        <Link href={`/list/students/${item.id}`}>
          <h3 className="font-semibold cursor-pointer hover:text-blue-600">{item.name}</h3>
        </Link>
        <p className="text-xs text-gray-500">{item?.email}</p>
      </div>
    </td>

    <td className="hidden md:table-cell"> {item.username}</td>
    <td className="hidden md:table-cell"> {item.class.name}</td>
    <td className="hidden md:table-cell"> {item.phone}</td>
    <td className="hidden md:table-cell"> {item.address}</td>

    <td className="hidden md:table-cell"> {item.class.name[0]}</td>

    <td>
      <div className="flex items-center gap-4">
        <Link href={`/list/students/${item.id}`}>
          <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaSky hover:bg-lamaSkyLight transition-colors">
            <Image src="/view.png" alt="View" width={20} height={20} />
          </button>
        </Link>
        {role === "admin" && (
          <>
            <FormContainer table="student" type="update" data={item} />
            <FormContainer table="student" type="delete" id={item.id} />
          </>
        )}
      </div>
    </td>
  </tr>
);
const StudentListPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) => {
  const searchParamsResolved = await searchParams;
  console.log(searchParamsResolved);
  const { page, ...queryParams } = searchParamsResolved;
  const p = page ? parseInt(page) : 1;

  // URL PARAMS CONDITION
  const query: Prisma.StudentWhereInput = {};
  if (queryParams) {
    for (const [key, value] of Object.entries(queryParams)) {
      if (value !== undefined) {
        switch (key) {
          case "teacherId": {
            query.class = {
              lessons: {
                some: {
                  teacherId: value,
                },
              },
            };
            break;
          }

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
    prisma.student.findMany({
      where: query,
      include: {
        class: true,
      },
      take: ITEM_PER_PAGE,
      skip: ITEM_PER_PAGE * (p - 1),
    }),
    prisma.student.count({ where: query }),
  ]);

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      {/* Top */}
      <div className="flex items-center justify-between">
        <h1 className="text-lg hidden md:block font-semibold">All Students</h1>
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
            <FormContainer table="student" type="create" />
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

export default StudentListPage;
