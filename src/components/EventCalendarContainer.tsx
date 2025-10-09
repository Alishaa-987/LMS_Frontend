import Image from "next/image";
import React from "react";
import EventCalender from "./EventCalender";
import EventList from "./EventList";

const EventCalendarContainer =  ({
  searchParams,
}: {
  searchParams: { [keys: string]: string | undefined };
}) => {
    const {date} = searchParams;
  return (
    <div className="bg-white p-4 rounded-md">
      <EventCalender />
      <div className="flex items-center justify-between"></div>
      <h1 className="text-lg semibold my-4">Events</h1>
      <Image src="/moreDark.png" alt="" width={20} height={20} />
      <div className="flex flex-col gap-4">
        <EventList dateParam={date}/>
      </div>
    </div>
  );
};

export default EventCalendarContainer;
