"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React, { startTransition, useActionState, useEffect } from "react";
import { FieldError, useForm } from "react-hook-form";
import { z } from "zod";
import InputField from "../InputField";
import { classSchema, ClassSchema } from "@/lib/FormValidationSchema";
import { createClass, updateClass } from "@/lib/actions";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const schema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  capacity: z.string().min(1, { message: "Capacity is required" }),
  gradeLevel: z.string().min(1, { message: "Grade Level is required" }),
});

type Inputs = z.infer<ClassSchema>;

const ClassForm = ({
  type,
  data,
  setOpen,
  relatedData,
}: {
  type: "create" | "update";
  data?: any;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  relatedData?: any;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(classSchema),
    defaultValues: {
      name: data?.name || "",
    capacity: Number(data?.capacity) || 0,
    gradeId: Number(data?.gradeId) || 0,
      supervisorId: data?.supervisorId || "",
      id: data?.id,
    },
  });

  const [state, formAction] = useActionState(
    type === "create" ? createClass : updateClass,
    {
      success: false,
      error: false,
    }
  );

  const router = useRouter();

  useEffect(() => {
    if (state.success) {
      toast.success(
        `Class has been ${
          type === "create" ? "created" : "updated"
        } successfully!`
      );
      setOpen(false);
      router.refresh();
    } else if (state.error) {
      toast.error("Something went wrong!");
    }
  }, [state.success, state.error, type, router, setOpen]);

  const { teachers, grades } = relatedData || {};
  return (
    <form className="flex flex-col gap-8" action={formAction}>
      <h1 className="text-xl font-semibold">
        {type === "create" ? "Create a new class" : "Update class"}
      </h1>
      <span className="text-xs text-gray-400 font-medium">
        Class Information
      </span>
      <div className="flex justify-between flex-wrap gap-4">
        {type === "update" && (
          <input type="hidden" {...register("id")} defaultValue={data?.id} />
        )}
        <InputField
          label="Name"
          name="name"
          defaultValue={data?.name}
          register={register}
          error={errors?.name}
          inputProps={{}}
        />
        <InputField
          label="Capacity"
          name="capacity"
          defaultValue={data?.capacity}
          register={register}
          error={errors?.capacity as FieldError | undefined}
          inputProps={{}}
        />
        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label className="text-xs text-gray-500">Grade Level</label>
          <select
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
            {...register("gradeId")}
            defaultValue={data?.gradeId}
          >
            <option value="">Select Grade</option>
            {relatedData?.grades?.map(
              (grade: { id: number; level: number }) => (
                <option key={grade.id} value={grade.id}>
                  {grade.level}
                </option>
              )
            )}
          </select>
          {errors.gradeId?.message && (
            <p className="text-red-400 text-xs">
              {errors.gradeId.message.toString()}
            </p>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-2 w-full md:w-1/4">
        <label className="text-xs text-gray-500">Supervisor</label>
        <select
          className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
          {...register("supervisorId")}
          defaultValue={data?.supervisorId}
        >
          <option value="">Select Supervisor</option>
          {relatedData?.teachers?.map(
            (teacher: { id: string; name: string; surname: string }) => (
              <option key={teacher.id} value={teacher.id}>
                {teacher.name + " " + teacher.surname}
              </option>
            )
          )}
        </select>
        {errors.supervisorId?.message && (
          <p className="text-red-400 text-xs">
            {errors.supervisorId.message.toString()}
          </p>
        )}
      </div>

      {state.error && (
        <span className="text-red-500">Something went wrong!</span>
      )}
      <button type="submit" className="bg-blue-400 text-white p-2 rounded-md">
        {type === "create" ? "Create" : "Update"}
      </button>
    </form>
  );
};

export default ClassForm;
