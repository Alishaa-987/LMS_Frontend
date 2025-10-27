"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "./prisma";
import { Subjectschema, TeacherSchema } from "./FormValidationSchema";
import { clerkClient } from "@clerk/nextjs/server";

type CurrentState = { success: boolean; error: boolean };

export const createSubject = async (
  currentState: CurrentState,
  formData: FormData
) => {
  try {
    const name = formData.get("name") as string;
    const teachers = formData.getAll("teachers") as string[];

    await prisma.subject.create({
      data: {
        name,
        teachers: {
          connect: teachers.map(teacherId => ({ id: teacherId })),
        },
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
  formData: FormData
) => {
  try {
    const id = formData.get("id") as string;
    const name = formData.get("name") as string;
    const teachers = formData.getAll("teachers") as string[];

    console.log(
      "updateSubject called with id:",
      id,
      "name:",
      name,
      "teachers:",
      teachers
    );

    if (!id) {
      console.error("id is undefined or null");
      return { success: false, error: true };
    }

    const existingSubject = await prisma.subject.findUnique({
      where: { id: Number(id) },
    });

    if (!existingSubject) {
      console.error("Subject not found with id:", id);
      return { success: false, error: true };
    }

    await prisma.subject.update({
      where: {
        id: Number(id),
      },
      data: {
        name,
        teachers: {
          set: teachers.map((teacherId) => ({ id: teacherId })),
        },
      },
    });

    console.log("Subject updated successfully");
    // revalidatePath("/list/subjects");
    return { success: true, error: false };
  } catch (err) {
    console.error("updateSubject error:", err);
    return { success: false, error: true };
  }
};



export const createTeacher = async (
  currentState: CurrentState,
  data: TeacherSchema
) => {
  try {
    console.log("Creating teacher with data:", data);

    // Check if username or email already exists
    const existingTeacher = await prisma.teacher.findFirst({
      where: {
        OR: [
          { username: data.username },
          ...(data.email ? [{ email: data.email }] : [])
        ]
      }
    });

    if (existingTeacher) {
      console.error("Teacher with username or email already exists:", data.username, data.email);
      return { success: false, error: true };
    }

    console.log("Creating Prisma teacher first...");
    const teacher = await prisma.teacher.create({
      data: {
        id: `temp_${Date.now()}`, // Temporary ID
        username: data.username,
        name: data.name,
        surname: data.surname,
        email: data.email || null,
        phone: data.phone || null,
        address: data.address,
        bloodType: data.bloodType,
        sex: data.sex === "Male" ? "MALE" : "FEMALE",
        birthday: data.birthday,
        img: data.img || null,
        subjects: {
          connect: data.subjects?.map((subjectId: string) => ({ id: parseInt(subjectId) })) || [],
        },
      },
    });
    console.log("Teacher created in database:", teacher.id);

    // Try to create Clerk user, but don't fail if it doesn't work
    try {
      const clerk = await clerkClient();
      console.log("Creating Clerk user...");
      const user = await clerk.users.createUser({
        externalId: teacher.id,
        username: data.username,
        password: data.password,
        firstName: data.name,
        lastName: data.surname,
        emailAddress: data.email ? [data.email] : undefined,
        phoneNumber: data.phone ? [data.phone] : undefined,
      });
      console.log("Clerk user created:", user.id);

      // Update teacher with Clerk ID
      await prisma.teacher.update({
        where: { id: teacher.id },
        data: { id: user.id }
      });
    } catch (clerkErr) {
      console.warn("Clerk user creation failed, but teacher was created in DB:", clerkErr);
    }

    console.log("Teacher creation process completed");

    // revalidatePath("/list/teachers");
    return { success: true, error: false };
  } catch (err) {
    console.error("Error in createTeacher:", err);
    return { success: false, error: true };
  }
};

export const updateTeacher = async (
  currentState: CurrentState,
  data: TeacherSchema
) => {
  try {
    if (!data.id) {
      console.error("id is undefined or null");
      return { success: false, error: true };
    }

    const existingTeacher = await prisma.teacher.findUnique({
      where: { id: data.id },
    });

    if (!existingTeacher) {
      console.error("Teacher not found with id:", data.id);
      return { success: false, error: true };
    }

    await prisma.teacher.update({
      where: {
        id: data.id,
      },
      data: {
        username: data.username,
        name: data.name,
        surname: data.surname,
        email: data.email || null,
        phone: data.phone || null,
        address: data.address,
        bloodType: data.bloodType,
        sex: data.sex === "Male" ? "MALE" : "FEMALE",
        birthday: data.birthday,
        img: data.img || null,
        subjects: {
          set: data.subjects?.map((subjectId) => ({ id: parseInt(subjectId) })) || [],
        },
      },
    });

    console.log("Teacher updated successfully");
    // revalidatePath("/list/teachers");
    return { success: true, error: false };
  } catch (err) {
    console.error("updateTeacher error:", err);
    return { success: false, error: true };
  }
};


export const deleteTeacher = async (
  currentState: CurrentState,
  formData: FormData
) => {
  try {
    const id = formData.get("id") as string;

    if (!id) {
      console.error("id is undefined or null");
      return { success: false, error: true };
    }

    const existingTeacher = await prisma.teacher.findUnique({
      where: { id },
    });

    if (!existingTeacher) {
      console.error("Teacher not found with id:", id);
      return { success: false, error: true };
    }

    await prisma.teacher.delete({
      where: {
        id,
      },
    });

    console.log("Teacher deleted successfully");
    revalidatePath("/list/teachers");
    return { success: true, error: false };
  } catch (err) {
    console.error("deleteTeacher error:", err);
    return { success: false, error: true };
  }
};


export const deleteSubject = async (
  currentState: CurrentState,
  formData: FormData
) => {
  try {
    const id = formData.get("id") as string;

    if (!id) {
      console.error("id is undefined or null");
      return { success: false, error: true };
    }

    const existingSubject = await prisma.subject.findUnique({
      where: { id: Number(id) },
    });

    if (!existingSubject) {
      console.error("Subject not found with id:", id);
      return { success: false, error: true };
    }

    await prisma.subject.delete({
      where: {
        id: Number(id),
      },
    });

    console.log("Subject deleted successfully");
    // revalidatePath("/list/subjects");
    return { success: true, error: false };
  } catch (err) {
    console.error("deleteSubject error:", err);
    return { success: false, error: true };
  }
};


export const deleteStudent = async (
  currentState: CurrentState,
  formData: FormData
) => {
  try {
    const id = formData.get("id") as string;

    if (!id) {
      console.error("id is undefined or null");
      return { success: false, error: true };
    }

    const existingStudent = await prisma.student.findUnique({
      where: { id },
    });

    if (!existingStudent) {
      console.error("Student not found with id:", id);
      return { success: false, error: true };
    }

    await prisma.student.delete({
      where: {
        id,
      },
    });

    console.log("Student deleted successfully");
    revalidatePath("/list/students");
    return { success: true, error: false };
  } catch (err) {
    console.error("deleteStudent error:", err);
    return { success: false, error: true };
  }
};

export const deleteParent = async (
  currentState: CurrentState,
  formData: FormData
) => {
  try {
    const id = formData.get("id") as string;

    if (!id) {
      console.error("id is undefined or null");
      return { success: false, error: true };
    }

    const existingParent = await prisma.parent.findUnique({
      where: { id },
    });

    if (!existingParent) {
      console.error("Parent not found with id:", id);
      return { success: false, error: true };
    }

    await prisma.parent.delete({
      where: {
        id,
      },
    });

    console.log("Parent deleted successfully");
    revalidatePath("/list/parents");
    return { success: true, error: false };
  } catch (err) {
    console.error("deleteParent error:", err);
    return { success: false, error: true };
  }
};

export const deleteClass = async (
  currentState: CurrentState,
  formData: FormData
) => {
  try {
    const id = formData.get("id") as string;

    if (!id) {
      console.error("id is undefined or null");
      return { success: false, error: true };
    }

    const existingClass = await prisma.class.findUnique({
      where: { id: Number(id) },
    });

    if (!existingClass) {
      console.error("Class not found with id:", id);
      return { success: false, error: true };
    }

    await prisma.class.delete({
      where: {
        id: Number(id),
      },
    });

    console.log("Class deleted successfully");
    // revalidatePath("/list/classes");
    return { success: true, error: false };
  } catch (err) {
    console.error("deleteClass error:", err);
    return { success: false, error: true };
  }
};

export const deleteExam = async (
  currentState: CurrentState,
  formData: FormData
) => {
  try {
    const id = formData.get("id") as string;

    if (!id) {
      console.error("id is undefined or null");
      return { success: false, error: true };
    }

    const existingExam = await prisma.exam.findUnique({
      where: { id: Number(id) },
    });

    if (!existingExam) {
      console.error("Exam not found with id:", id);
      return { success: false, error: true };
    }

    await prisma.exam.delete({
      where: {
        id: Number(id),
      },
    });

    console.log("Exam deleted successfully");
    revalidatePath("/list/exams");
    return { success: true, error: false };
  } catch (err) {
    console.error("deleteExam error:", err);
    return { success: false, error: true };
  }
};

export const deleteAssignment = async (
  currentState: CurrentState,
  formData: FormData
) => {
  try {
    const id = formData.get("id") as string;

    if (!id) {
      console.error("id is undefined or null");
      return { success: false, error: true };
    }

    const existingAssignment = await prisma.assignment.findUnique({
      where: { id: Number(id) },
    });

    if (!existingAssignment) {
      console.error("Assignment not found with id:", id);
      return { success: false, error: true };
    }

    await prisma.assignment.delete({
      where: {
        id: Number(id),
      },
    });

    console.log("Assignment deleted successfully");
    revalidatePath("/list/assignments");
    return { success: true, error: false };
  } catch (err) {
    console.error("deleteAssignment error:", err);
    return { success: false, error: true };
  }
};

export const deleteResult = async (
  currentState: CurrentState,
  formData: FormData
) => {
  try {
    const id = formData.get("id") as string;

    if (!id) {
      console.error("id is undefined or null");
      return { success: false, error: true };
    }

    const existingResult = await prisma.result.findUnique({
      where: { id: Number(id) },
    });

    if (!existingResult) {
      console.error("Result not found with id:", id);
      return { success: false, error: true };
    }

    await prisma.result.delete({
      where: {
        id: Number(id),
      },
    });

    console.log("Result deleted successfully");
    revalidatePath("/list/results");
    return { success: true, error: false };
  } catch (err) {
    console.error("deleteResult error:", err);
    return { success: false, error: true };
  }
};

export const deleteAttendance = async (
  currentState: CurrentState,
  formData: FormData
) => {
  try {
    const id = formData.get("id") as string;

    if (!id) {
      console.error("id is undefined or null");
      return { success: false, error: true };
    }

    const existingAttendance = await prisma.attendance.findUnique({
      where: { id: Number(id) },
    });

    if (!existingAttendance) {
      console.error("Attendance not found with id:", id);
      return { success: false, error: true };
    }

    await prisma.attendance.delete({
      where: {
        id: Number(id),
      },
    });

    console.log("Attendance deleted successfully");
    revalidatePath("/list/attendances");
    return { success: true, error: false };
  } catch (err) {
    console.error("deleteAttendance error:", err);
    return { success: false, error: true };
  }
};

export const deleteEvent = async (
  currentState: CurrentState,
  formData: FormData
) => {
  try {
    const id = formData.get("id") as string;

    if (!id) {
      console.error("id is undefined or null");
      return { success: false, error: true };
    }

    const existingEvent = await prisma.event.findUnique({
      where: { id: Number(id) },
    });

    if (!existingEvent) {
      console.error("Event not found with id:", id);
      return { success: false, error: true };
    }

    await prisma.event.delete({
      where: {
        id: Number(id),
      },
    });

    console.log("Event deleted successfully");
    revalidatePath("/list/events");
    return { success: true, error: false };
  } catch (err) {
    console.error("deleteEvent error:", err);
    return { success: false, error: true };
  }
};

export const deleteAnnouncement = async (
  currentState: CurrentState,
  formData: FormData
) => {
  try {
    const id = formData.get("id") as string;

    if (!id) {
      console.error("id is undefined or null");
      return { success: false, error: true };
    }

    const existingAnnouncement = await prisma.announcement.findUnique({
      where: { id: Number(id) },
    });

    if (!existingAnnouncement) {
      console.error("Announcement not found with id:", id);
      return { success: false, error: true };
    }

    await prisma.announcement.delete({
      where: {
        id: Number(id),
      },
    });

    console.log("Announcement deleted successfully");
    revalidatePath("/list/announcements");
    return { success: true, error: false };
  } catch (err) {
    console.error("deleteAnnouncement error:", err);
    return { success: false, error: true };
  }
};

export const deleteLesson = async (
  currentState: CurrentState,
  formData: FormData
) => {
  try {
    const id = formData.get("id") as string;

    if (!id) {
      console.error("id is undefined or null");
      return { success: false, error: true };
    }

    const existingLesson = await prisma.lesson.findUnique({
      where: { id: Number(id) },
    });

    if (!existingLesson) {
      console.error("Lesson not found with id:", id);
      return { success: false, error: true };
    }

    await prisma.lesson.delete({
      where: {
        id: Number(id),
      },
    });

    console.log("Lesson deleted successfully");
    revalidatePath("/list/lessons");
    return { success: true, error: false };
  } catch (err) {
    console.error("deleteLesson error:", err);
    return { success: false, error: true };
  }
};


export const createClass = async (
  currentState: CurrentState,
  formData: FormData
) => {
  try {
    const name = formData.get("name") as string;
    const capacity = formData.get("capacity") as string;
    const gradeId = formData.get("gradeId") as string;
    const supervisorId = formData.get("supervisorId") as string;

    await prisma.class.create({
      data: {
        name,
        capacity: parseInt(capacity),
        gradeId: parseInt(gradeId),
        supervisorId: supervisorId || null,
      },
    });

    // revalidatePath("/list/classes");
    return { success: true, error: false };
  } catch (err) {
    console.error(err);
    return { success: false, error: true };
  }
};


export const updateClass = async (
  currentState: CurrentState,
  formData: FormData
) => {
  try {
    const id = formData.get("id") as string;
    const name = formData.get("name") as string;
    const capacity = formData.get("capacity") as string;
    const gradeId = formData.get("gradeId") as string;
    const supervisorId = formData.get("supervisorId") as string;

    console.log(
      "updateClass called with id:",
      id,
      "name:",
      name,
      "capacity:",
      capacity,
      "gradeId:",
      gradeId,
      "supervisorId:",
      supervisorId
    );

    if (!id) {
      console.error("id is undefined or null");
      return { success: false, error: true };
    }

    const existingClass = await prisma.class.findUnique({
      where: { id: Number(id) },
    });

    if (!existingClass) {
      console.error("Class not found with id:", id);
      return { success: false, error: true };
    }

    await prisma.class.update({
      where: {
        id: Number(id),
      },
      data: {
        name,
        capacity: parseInt(capacity),
        gradeId: parseInt(gradeId),
        supervisorId: supervisorId || null,
      },
    });

    console.log("Class updated successfully");
    // revalidatePath("/list/classes");
    return { success: true, error: false };
  } catch (err) {
    console.error("updateClass error:", err);
    return { success: false, error: true };
  }
};
