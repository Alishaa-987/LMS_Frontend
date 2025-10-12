"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React, { startTransition, useActionState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import InputField from "../InputField";
import { subjectschema, Subjectschema } from "@/lib/FormValidationSchema";
import { createSubject, updateSubject } from "@/lib/actions";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const schema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
});

type Inputs = z.infer<typeof schema>;

const SubjectForm = ({
  type,
  data,
  setOpen,
}: {
  type: "create" | "update";
  data?: any;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof subjectschema>>({
    resolver: zodResolver(subjectschema),
  });

  const [state, formAction] = useActionState(
    type === "create" ? createSubject : updateSubject,
    {
      success: false,
      error: false,
    }
  );

  const router = useRouter();

  const onSubmit = handleSubmit((data) => {
    console.log("Form data being submitted:", data);
    console.log("Form type:", type);
    startTransition(() => {
    formAction(data);
    });
  });
  useEffect(() => {
    if (state.success) {
      toast(
        `Subject has been ${type === "create" ? "created" : "updated"} successfully!`
      );
      setOpen(false);
      router.refresh();
    }
  }, [state, type, router, setOpen]);

  return (
    <form className="flex flex-col gap-8" onSubmit={onSubmit}>
      <h1 className="text-xl font-semibold">
        {type === "create" ? "Create a new subject" : "Update subject"}
      </h1>

      <div className="flex justify-between flex-wrap gap-4">
        {type === "update" && (
          <input type="hidden" {...register("id")} defaultValue={data?.id} />
        )}
        <InputField
          label=" Subject Name"
          name="name"
          defaultValue={data?.name}
          register={register}
          error={errors?.name}
          inputProps={{}}
        />
      </div>
      {state.error && (
        <span className="text-red-500">Something went wrong!</span>
      )}
      <button className="bg-blue-400 text-white p-2 rounded-md">
        {type === "create" ? "Create" : "Update"}
      </button>
    </form>
  );
};

export default SubjectForm;
