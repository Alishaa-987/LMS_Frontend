import { prisma } from "@/lib/prisma";
import React from "react";

const EventList = async ({ dateParam }: { dateParam: string | undefined }) => {
  const selectedDate = dateParam ? new Date(dateParam) : new Date();

const startOfDay = new Date(selectedDate);
  startOfDay.setHours(0, 0, 0, 0);

  const endOfDay = new Date(selectedDate);
  endOfDay.setHours(23, 59, 59, 999);

  console.log("📅 Querying events from:", startOfDay, "to", endOfDay);


  const data = await prisma.event.findMany({
    where: {
      startTime: {
        gte: startOfDay,
        lte: endOfDay,
      },
    },
  });
  
  return data.map((event) => (
    <div
      key={event.id}
      className="border-2 border-gray-100 p-5 rounded-md border-t-4 odd:border-t-lamaSky even:border-t-lamaPurple"
    >
      <div className="font-bold flex items-center justify-between">
        <h1 className="font-semibold text-gray-600">{event.title}</h1>
        <span className="text-sm text-gray-300">
          {event.startTime.toLocaleTimeString("en-UK", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          })}
        </span>
      </div>

      <p className="mt-2 text-gray-600 text-sm">{event.description}</p>
    </div>
  ));
};

export default EventList;
