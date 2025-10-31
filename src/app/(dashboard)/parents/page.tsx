import Announcements from '@/components/Announcements'
import BigCalendarContainer from '@/components/BigCalendarContainer'
import EventCalender from '@/components/EventCalender'
import { prisma } from '@/lib/prisma'
import { auth } from '@clerk/nextjs/server'
import React from 'react'

const ParentsPage= async () =>{
   const { userId } = await auth();
  const currentUserId = userId;
    const students = await prisma.student.findMany({
    where: {
      parentId: currentUserId!,
    },
  });

  return (
    <div className='p-4 flex gap-4 flex-col xl:flex-row'>
      {/* left */}
      <div className='w-full xl:w-2/3'>
      <div className='h-full bg-white p-4 rounded-md'>
        <h1>
          {students.map(student => student.name + " " + student.surname).join(", ")}
        </h1>
        <div className='flex flex-col gap-4'>
          {students.map((student) => (
        <BigCalendarContainer key={student.id} type="classId" id={student.classId} />
          ))}
        </div>
      </div>
        </div>
      {/* right */}
      <div className='w-full lg:w-1/3 flex flex-col gap-8'>
      <EventCalender/>
      <Announcements/>
      </div>
    </div>
  )
}

export default ParentsPage