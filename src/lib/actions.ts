"use server";

import { revalidatePath } from "next/cache";
import { Subjectschema } from "./FormValidationSchema";
import { prisma } from "./prisma";

type CurrentState = { success: boolean; error: boolean };

export const createSubject = async (currentState: CurrentState,
  data: Subjectschema) => {
  try {
    await prisma.subject.create({
      data: {
        name: data.name,
      },
    });
    // revalidatePath("/list/subjects");
    return { success: true, error: false };
  } catch (err) {
    console.error(err);
    return { success: false, error: true };
  }
};


export const updateSubject = async (
  currentState: CurrentState,
  data: Subjectschema
) => {
  try {
    console.log('updateSubject called with data:', data);
    await prisma.subject.update({
        where: {
            id: data.id,
        },
      data: {
        name: data.name,
      },
    });
    console.log('Subject updated successfully');
    // revalidatePath("/list/subjects");
    return { success: true, error: false };
  } catch (err) {
    console.error('updateSubject error:', err);
    return { success: false, error: true };
  }
};
