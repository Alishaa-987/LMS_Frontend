import AttendenceChart from "@/components/AttendenceChart";
import CountChart from "@/components/CountChart";
import UserCard from "@/components/UserCard";
import React from "react";

function AdminPage() {
  return (
    <div className="p-4 flex gap-4 flex-col md:flex-row">
      {/* left */}
      <div className="w-full lg:w-2/3 flex flex-col gap-4">
        <div className="flex gap-4 justify-between flex-wrap">
          {/* UserCard */}
          <UserCard type="parent" />
          <UserCard type="student" />
          <UserCard type="staff" />
          <UserCard type="teacher" />
        </div>
        {/* Middle Chart */}
        <div className="flex gap-4 flex-col lg:flex-row">
          {/* Counter Chart */}
          <div className="w-full lg:w-1/3 h-[450px]">
            <CountChart />
          </div>

          {/* Attendance Chart */}
          <div className="w-full lg:w-2/3 h-[450px]">
            <AttendenceChart />
          </div>
        </div>
        {/* Bottom Chart */}
        <div></div>
      </div>
      {/* right */}
      <div className="w-full lg:w-1/3"></div>
    </div>
  );
}

export default AdminPage;
