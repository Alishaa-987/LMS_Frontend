"use client";

import Image from "next/image";
import { useState } from "react";
import { Calendar } from "react-calendar";
import "react-calendar/dist/Calendar.css";

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

const events = [
  {
    id: 1,
    title: "Event 1",
    time: "12:00 PM  - 2:00 PM",
    description: "This is event 1 description",
  },
  {
    id: 2,
    title: "Event 2",
    time: "3:00 PM  - 4:00 PM",
    description: "This is event 2 description",
  },
  {
    id: 3,
    title: "Event 3",
    time: "5:00 PM  - 6:00 PM",
    description: "This is event 3 description",
  },
];

const EventCalender = () => {
  const [value, onChange] = useState<Value>(new Date());

  return (
    <div className="bg-white p-4 rounded-md">
      <Calendar onChange={onChange} value={value} />
      <div className="flex items-center justify-between"></div>
      <h1 className="text-lg semibold my-4">Events</h1>
      <Image src='/moreDark.png' alt="" width={20} height={20}/>
      <div className="flex flex-col gap-4">
        {events.map((event) => (
          <div key={event.id} className="border-2 border-gray-100 p-5 rounded-md border-t-4 odd:border-t-lamaSky even:border-t-lamaPurple">
            <div className="font-bold flex items-center justify-between">
              <h1 className="font-semibold text-gray-600">{event.title}</h1>
              <span className="text-sm text-gray-300">{event.time}</span>
            </div>

            <p className="mt-2 text-gray-600 text-sm">{event.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventCalender;
