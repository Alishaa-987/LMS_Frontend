import { prisma } from "@/lib/prisma";
import React from "react";

const StudentAttendenceCard = async ({ id }: { id: string }) => {
  console.log("Calculating attendance for student:", id);

  const attendence = await prisma.attendance.findMany({
    where: {
      studentId: id,
    },
  });

  console.log("Found attendance records:", attendence.length);

  const totalDays = attendence.length;
  const presentDays = attendence.filter((day) => day.present).length;
  const percentage = totalDays > 0 ? Math.round((presentDays / totalDays) * 100) : 0;

  console.log("Total days:", totalDays, "Present days:", presentDays, "Percentage:", percentage);

  return (
    <div className="text-center">
      <h1 className="text-xl font-semibold">{percentage || "-"}%</h1>
      <span className="text-sm text-gray-500">Attendance</span>
    </div>
  );
};

export default StudentAttendenceCard;
