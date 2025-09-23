import FormModel from "@/components/FormModel";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { lessonsData, role, subjectsData } from "@/lib/data";
import Image from "next/image";
import React from "react";

type Lesson = {
  id: number;
  subject: string;
  class: number;
  teacher: number;
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
    header: "Actions",
    accessor: "action",
  },
];

const LessonListPage = () => {
  const renderRow = (item: Lesson) => (
    <tr
      key={item.id}
      className="border-b border-gray-200 even:bg-slate-200 text-sm hover:bg-lamaPurpleLight"
    >
      <td className="flex items-center gap-4 p-4">
        <div className="flex flex-col">{item.subject}</div>
      </td>
      <td>{item?.class}</td>
      <td className="hidden md:table-cell">{item?.teacher}</td>

      <td>
        <div className="flex items-center gap-4">
          {role === "admin" && (
            <>
              <FormModel table="lesson" type="update" data={item} />

              <FormModel table="lesson" type="delete" id={item.id} />
            </>
          )}
        </div>
      </td>
    </tr>
  );
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

          {role === "admin" && (
             <FormModel table="lesson" type="create"/>

          )}
        </div>
      </div>
      {/* List */}
      <Table columns={columns} renderRow={renderRow} data={lessonsData} />
      {/* PAGINATION */}
      <div className="">
        <Pagination />
      </div>
    </div>
  );
};

export default LessonListPage;
