import Announcements from "@/components/Announcements";
import AttendenceChartContains from "@/components/AttendenceChartContainer";
import EventCalendarContainer from "@/components/EventCalendarContainer";
import FinanceChart from "@/components/FinanceChart";
import CountChartContainer from "@/components/forms/CountChartContainer";
import UserCard from "@/components/UserCard";
import React from "react";

const AdminPage = ({
  searchParams,
}: {
  searchParams: { [keys: string]: string | undefined };
}) => {
  return (
    <div className="p-4 flex gap-4 flex-col md:flex-row">
      {/* left */}
      <div className="w-full lg:w-2/3 flex flex-col gap-4">
        <div className="flex gap-4 justify-between flex-wrap">
          {/* UserCard */}
          <UserCard type="parent" />
          <UserCard type="student" />
          <UserCard type="admin" />
          <UserCard type="teacher" />
        </div>
        {/* Middle Chart */}
        <div className="flex gap-4 flex-col lg:flex-row">
          {/* Counter Chart */}
          <div className="w-full lg:w-1/3 h-[450px]">
            <CountChartContainer />
          </div>

          {/* Attendance Chart */}
          <div className="w-full lg:w-2/3 h-[450px]">
            <AttendenceChartContains />
          </div>
        </div>
        {/* Bottom Chart */}
        <div className="w-full h-[500px]">
          <FinanceChart/>
        </div>
      </div>
      {/* right */}
      <div className="w-full lg:w-1/3 flex flex-col gap-6">
        <EventCalendarContainer searchParams={searchParams} />
        <Announcements />
      </div>
    </div>
  );
}

export default AdminPage;
