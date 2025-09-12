"use client";

import Image from "next/image";
import {
  RadialBarChart,
  RadialBar,
  Legend,
  ResponsiveContainer,
} from "recharts";
const data = [
    {
    name: "Total",
    Count: 100,
    fill: "white",
  },
  {
    name: "Girls",
    Count: 60,
    fill: "#FAE27C",
  },
  {
    name: "Boys",
    Count: 40,
    fill: "#C3EBFA",
  },
  
];
const style = {
  top: "50%",
  right: 0,
  transform: "translate(0, -50%)",
  lineHeight: "24px",
};

const CountChart = () => {
  return (
    <div className="bg-white rounded-xl w-full h-full p-4 ">
      {/* title */}
      <div className="flex justify-between items-center">
        <h1 className=" text-lg font-semibold">Students</h1>
        <Image src="/moreDark.png" alt="" width={20} height={20} />
      </div>
      {/* Chart */}
      <div className=" relative w-full h-[75%]">
        <ResponsiveContainer >
          <RadialBarChart
            cx="50%"
            cy="50%"
            innerRadius="40%"
            outerRadius="100%"
            barSize={32}
            data={data}
          >
            <RadialBar
            //   label={{ position: "insideStart", fill: "#fff" }}
              background
              dataKey="Count"
            />
          </RadialBarChart>
        </ResponsiveContainer>
        <Image src="/maleFemale.png" alt="" width={50} height={50} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"/>
      </div>
      {/* Bottom */}
      <div className="flex justify-center gap-16">
        {/* Boys */}
        <div className="flex flex-col items-center gap-1">
          <div className="w-5 h-5 bg-lamaSky rounded-full"></div>
          <h1 className="font-bold">1,234</h1>
          <h2 className="text-xs text-gray-300">Boys (55%)</h2>
        </div>

        {/* Girls */}
        <div className="flex flex-col items-center gap-1">
          <div className="w-5 h-5 bg-lamaYellow rounded-full"></div>
          <h1 className="font-bold">1,234</h1>
          <h2 className="text-xs text-gray-300">Girls (45%)</h2>
        </div>
      </div>
    </div>
  );
};

export default CountChart;
