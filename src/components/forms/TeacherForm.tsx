"use client"

import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react'
import { useForm } from 'react-hook-form';
import { z } from 'zod'; // or 'zod/v4'

const schema = z.object({
username: z
.string()
.min(3, { message: 'username must be atleast three character long!' })
.max(20, { message: 'username must be atleast three character long!' }),

    email: z.string().email({ message: "Invalid email address"}),
    password:z.string().min(8 ,{message:"password must be atleast 8 character long"}),
    firstName:z.string().min(1,{message:"First Name is required"}),
    lastName:z.string().min(1,{message:"Last name is required"}),
    phone:z.string().min(1 ,{message:"Phone is required"}),
    address:z.string().min(1 ,{message:"Adress is required"}),
    birthday:z.date({message:"Birthday is required"}),
    sex:z.enum(["male" , "female"],{message:"Sex is required"}),
    img:z.instanceof(File ,{message:"Image is required"}),


});


const TeacherForm = ({ type, data }: {
    type: "create" | "update";
    data?: any;
}) => {

    const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = handleSubmit((data)=>{
      console.log(data)
  })

  
    return (
        <form className='flex flex-col gap-8' onSubmit={onSubmit}>
            <h1 className='text-xl font-semibold'>Create a new teacher</h1>
            <span className='text-xs text-gray-400 font-medium'>Authentication Infomration</span>
            <input type='text' {...register("username")} className='ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm'/>
            {errors.username?.message && <p className='text-red-400 text-xs'>{errors.username?.message.toString()}</p>}
            <span className='text-xs text-gray-400 font-medium'>Personal Infomration</span>
            <button className='bg-blue-400 text-white p-2 rounded-md'>{type === 'create' ? "Create" : "Update"}</button>

        </form>
    )
}

export default TeacherForm