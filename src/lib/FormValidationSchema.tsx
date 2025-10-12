import { z } from "zod";
export const subjectschema = z.object({
    id:z.number().optional(),
  name: z.string()
.min(1, { message: "Subject name is required" })


});
export type Subjectschema = z.infer<typeof subjectschema>;