import Announcements from '@/components/Announcements'
import BigCalendar from '@/components/BigCalendar'
import React from 'react'

function TeacherPage() {
  return (
    <div className='p-4 flex gap-4 flex-col xl:flex-row flex-1'>
      {/* left */}
      <div className='w-full xl:w-2/3'>
      <div className='h-full min-h-[600px] bg-white p-4 rounded-md'>
        <h1 className='text-xl font-semibold'>Schedule(4A)</h1>
        <BigCalendar />
      </div>
        </div>
      {/* right */}
      <div className='w-full lg:w-1/3 flex flex-col gap-8 '>
      <Announcements/>
      </div>
    </div>
  )
}

export default TeacherPage