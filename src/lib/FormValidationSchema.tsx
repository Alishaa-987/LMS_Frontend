import { z } from "zod";
export const subjectschema = z.object({
    id: z.number().optional(),
    name: z.string().min(1, { message: "Subject name is required" }),
    teachers: z.array(z.string()),  // teacherIds
});
export type Subjectschema = z.infer<typeof subjectschema>;


export const classSchema = z.object({
    id: z.number().optional(),
    name: z.string().min(1, { message: "Class name is required" }),
    capacity: z.coerce.number().min(1, { message: "Class capacity is required" }),
    gradeId: z.coerce.number().min(1, { message: "Class grade is required" }),
    supervisorId: z.string().optional(),  // teacherIds
});
export type ClassSchema = z.infer<typeof classSchema>;


export const teacherSchema = z.object({
    id: z.string().optional(),
  username: z
    .string()
    .min(3, { message: "username must be atleast three character long!" })
    .max(20, { message: "username must be atleast three character long!" }),

  email: z.string().email({ message: "Invalid email address" }).optional().or(z.literal("")),
  password: z
    .string()
    .min(8, { message: "password must be atleast 8 character long" }),
  name: z.string().min(1, { message: "First Name is required" }),
  surname: z.string().min(1, { message: "Last name is required" }),
  phone: z.string().optional(),
  address: z.string(),
  bloodType: z.string().min(1, { message: "Blood Type is required" }),

  birthday: z.coerce.date({ message: "Birthday is required" }),
  sex: z.enum(["Male", "Female"], { message: "Sex is required" }),
  img: z.string().optional(),
  subjects:z.array(z.string()).optional(),  // store subjects ids
});
export type TeacherSchema = z.infer<typeof teacherSchema>;