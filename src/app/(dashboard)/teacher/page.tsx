import Announcements from '@/components/Announcements'
import BigCalendarContainer from '@/components/BigCalendarContainer'
import { auth } from '@clerk/nextjs/server';
import { prisma } from '@/lib/prisma';
import React from 'react'

const TeacherPage = async () => {
  const { userId } = await auth();

  // Get teacher's classes for dynamic title
  const teacherClasses = await prisma.class.findMany({
    where: {
      supervisorId: userId!
    },
    select: {
      name: true
    }
  });

  const classNames = teacherClasses.map(c => c.name).join(', ') || 'All Classes';

  return (
    <div className='p-4 flex gap-4 flex-col xl:flex-row flex-1'>
      {/* left */}
      <div className='w-full xl:w-2/3'>
        <div className='bg-white p-4 rounded-md' style={{ height: 'calc(100vh - 8rem)' }}>
          <h1 className='text-xl font-semibold mb-4'>Weekly Schedule - {classNames}</h1>
          <div className='h-[calc(100%-4rem)]'>
            <BigCalendarContainer type="teacherId" id={userId!} />
          </div>
        </div>
      </div>
      {/* right */}
      <div className='w-full xl:w-1/3 flex flex-col gap-8'>
        <Announcements />
      </div>
    </div>
  )
}

export default TeacherPage