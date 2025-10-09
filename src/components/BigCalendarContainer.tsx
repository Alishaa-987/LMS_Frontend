import { prisma } from "@/lib/prisma";
import React from "react";
import BigCalendar from "./BigCalendar";
import { adjustScheduleToCurrentWeek } from "@/lib/utils";

const BigCalendarContainer = async ({
  type,
  id,
}: {
  type: "teacherId" | "classId";
  id: string | number;
}) => {
  const dataRes = await prisma.lesson.findMany({
    where: {
      ...(type === "teacherId"
        ? { teacherId: id as string }
        : { classId: id as number }),
    },
    include: {
      class: true,
      subject: true,
      teacher: {
        select: {
          name: true,
          surname: true,
        }
      },
    },
  });


  const data = dataRes.map(lesson=>({
    title: type === "teacherId"
      ? `${lesson.name} - ${lesson.class.name}`
      : `${lesson.subject.name} - ${lesson.teacher?.name || 'Teacher'}`,
    start:lesson.startTime,
    end:lesson.endTime,
    resource: {
      subject: lesson.subject.name,
      class: lesson.class.name,
      lessonName: lesson.name,
      teacher: lesson.teacher?.name,
    }
  }))

    const schedule = adjustScheduleToCurrentWeek(data)

  return <div>
    {schedule.length > 0 ? (
      <BigCalendar data={schedule}/>
    ) : (
      <div className="flex items-center justify-center h-full text-gray-500">
        <div className="text-center">
          <p className="text-lg mb-2">No lessons scheduled</p>
          <p className="text-sm">Lessons need to be added to the database with proper start and end times.</p>
        </div>
      </div>
    )}
  </div>;
};

export default BigCalendarContainer;
