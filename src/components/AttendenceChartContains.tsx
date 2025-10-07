import Image from 'next/image'
import React from 'react'
import AttendenceChart from './AttendenceChart'
import { Prisma } from '@prisma/client'

const AttendenceChartContains = async ()=> {

    const today = new Date()
    const dayOfWeek = today.getDay()
    const daysSinceMonday = dayOfWeek === 0 ? 6: dayOfWeek -1;

    const lastMonday = new Date(today);
    lastMonday.setDate(today.getDate() - daysSinceMonday)

    const resData = await Prisma.attendence.findMany({
        where:{
            date:{
                gte:lastMonday
            }
        }
        ,select:{
            date:true,
            present:true,
        }
    })
        resData.forEach(item=>{
            
        })


     const dayOfWeek = ["Mon" , "Tue" , "Wed" , "Thu" , "Fri"]
     const attendenceMap = {
        Mon: {present: 0 , absent: 0},
        Tue: {present: 0 , absent: 0},
        Wed: {present: 0 , absent: 0},
        Thu: {present: 0 , absent: 0},
        Fri: {present: 0 , absent: 0},

     }
  return (
    <div className="bg-white rounded-lg p-4 h-full">
      <div className="flex justify-between items-center">
        <h1 className="font-semibold text-lg">AttendenceChart</h1>
        <Image src="/moreDark.png" alt="" width={20} height={20} />
    </div> 
    <AttendenceChart/>
    </div>
     )
        }

export default AttendenceChartContains