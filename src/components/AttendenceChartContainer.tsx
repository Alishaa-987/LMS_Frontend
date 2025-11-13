import Image from "next/image";
import React from "react";
import AttendenceChart from "./AttendenceChart";
import { prisma } from "@/lib/prisma";

const AttendenceChartContainer = async () => {
  const today = new Date();
  const dayOfWeek = today.getDay();
  const daysSinceMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;

  // Start of week (UTC)
  const lastMonday = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate() - daysSinceMonday));

  // End of today (UTC)
  const endOfToday = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate(), 23, 59, 59, 999));

  console.log(
    "Local Date Range:",
    lastMonday.toString(),
    "→",
    endOfToday.toString()
  );

  // Fetch all for debugging
  const allData = await prisma.attendance.findMany({
    select: {
      date: true,
      present: true,
    },
  });

  console.log(
    "All attendance data:",
    allData.length,
    allData.map((d) => ({
      date: d.date.toString(),
      present: d.present,
    }))
  );

  // Filter this week's attendance
  const resData = await prisma.attendance.findMany({
    where: {
      date: {
        gte: lastMonday,
        lte: endOfToday,
      },
    },
    select: {
      date: true,
      present: true,
    },
  });

  console.log("Filtered attendance data:", resData.length, resData);

  const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri"];
  const attendenceMap: { [key: string]: { present: number; absent: number } } =
    {
      Mon: { present: 0, absent: 0 },
      Tue: { present: 0, absent: 0 },
      Wed: { present: 0, absent: 0 },
      Thu: { present: 0, absent: 0 },
      Fri: { present: 0, absent: 0 },
    };

  // Count present/absent per weekday
  resData.forEach((item) => {
    const itemDate = new Date(item.date);
    const itemDayOfWeek = itemDate.getDay();
    if (itemDayOfWeek >= 1 && itemDayOfWeek <= 5) {
      const dayName = daysOfWeek[itemDayOfWeek - 1];
      if (item.present) {
        attendenceMap[dayName].present += 1;
      } else {
        attendenceMap[dayName].absent += 1;
      }
    }
  });

  const todayName = daysOfWeek[dayOfWeek - 1];
  const data = daysOfWeek.map((day) => ({
    name: day,
    present: attendenceMap[day].present,
    absent: attendenceMap[day].absent,
  }));

  console.log("Chart data:", data);

  return (
    <div className="bg-white rounded-lg p-4 h-full">
      <div className="flex justify-between items-center">
        <h1 className="font-semibold text-lg">AttendenceChart</h1>
        <Image src="/moreDark.png" alt="" width={20} height={20} />
      </div>
      <AttendenceChart data={data} />
    </div>
  );
};

export default AttendenceChartContainer;
