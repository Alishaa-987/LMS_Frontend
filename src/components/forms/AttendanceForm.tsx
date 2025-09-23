"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import InputField from "../InputField";

const schema = z.object({
  student: z.string().min(1, { message: "Student is required" }),
  date: z.string().min(1, { message: "Date is required" }),
  status: z.string().min(1, { message: "Status is required" }),
});

type Inputs = z.infer<typeof schema>;

const AttendanceForm = ({
  type,
  data,
}: {
  type: "create" | "update";
  data?: any;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
  });

  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });

  return (
    <form className="flex flex-col gap-8" onSubmit={onSubmit}>
      <h1 className="text-xl font-semibold">
        {type === "create" ? "Create a new attendance" : "Update attendance"}
      </h1>
      <span className="text-xs text-gray-400 font-medium">
        Attendance Information
      </span>
      <div className="flex justify-between flex-wrap gap-4">
        <InputField
          label="Student"
          name="student"
          defaultValue={data?.student}
          register={register}
          error={errors?.student}
          inputProps={{}}
        />
        <InputField
          label="Date"
          name="date"
          type="date"
          defaultValue={data?.date}
          register={register}
          error={errors?.date}
          inputProps={{}}
        />
        <InputField
          label="Status"
          name="status"
          defaultValue={data?.status}
          register={register}
          error={errors?.status}
          inputProps={{}}
        />
      </div>
      <button className="bg-blue-400 text-white p-2 rounded-md">
        {type === "create" ? "Create" : "Update"}
      </button>
    </form>
  );
};

export default AttendanceForm;