import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import {  assignmentsData, role, subjectsData } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React from "react";

type Assignment = {
  id: number;
  subject: string;
  class: number;
  teacher: string;
  dueDate:string;
};

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

  {
    header: "Actions",
    accessor: "action",
  },
];

const AssignmentListPage = () => {
  const searchParams = useSearchParams();
  const {page , ...queryParams} = Object.fromEntries(searchParams.entries());
  const p = page ? parseInt(page) : 1 ;
  const count = assignmentsData.length;
  const renderRow = (item: Assignment) => (
    <tr
      key={item.id}
      className="border-b border-gray-200 even:bg-slate-200 text-sm hover:bg-lamaPurpleLight"
    >
      <td className="flex items-center gap-4 p-4">
        <div className="flex flex-col">{item.subject}</div>
      </td>
      <td>{item?.class}</td>
      <td className="hidden md:table-cell">{item?.teacher}</td>
            <td className="hidden md:table-cell">{item?.dueDate}</td>


      <td>
        <div className="flex items-center gap-4">
          <Link href={`/list/teachers/${item.id}`}>
            <button className="w-7 flex items-center justify-center rounded-full bg-lamaSky">
              <Image src="/update.png" alt="" width={16} height={16} />
            </button>
          </Link>
          {role === "admin" && (
            <button className="w-7 flex items-center justify-center rounded-full bg-lamaPurple">
              <Image src="/delete.png" alt=""width={16} height={16} />
            </button>
          )}
        </div>
      </td>
    </tr>
  );
  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      {/* Top */}
      <div className="flex items-center justify-between">
        <h1 className="text-lg hidden md:block font-semibold">All Assignment</h1>
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
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
              <Image src="/plus.png" alt="" width={14} height={14} />
            </button>
          )}
        </div>
      </div>
      {/* List */}
      <Table columns={columns} renderRow={renderRow} data={assignmentsData} />
      {/* PAGINATION */}
      <div className="">
        <Pagination page={p} count={count} />
      </div>
    </div>
  );
};

export default AssignmentListPage;
