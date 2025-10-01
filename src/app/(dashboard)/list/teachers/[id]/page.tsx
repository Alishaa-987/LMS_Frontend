import Announcements from "@/components/Announcements";
import BigCalendar from "@/components/BigCalendar";
import FormModel from "@/components/FormModel";
import Performance from "@/components/Performance";
import Image from "next/image";
import Link from "next/link";

const SingleTeacherPage = () => {
  const teacherData = {
    username: "leonard",
    email: "user@gmail.com",
    password: "",
    firstName: "Leonard",
    lastName: "Synder",
    phone: "+1 234 59",
    address: "123 Main St",
    bloodType: "A+",
    birthday: "1990-01-01",
    sex: "male",
    img: null,
  };

  return (
    <div className="flex-1 p-4 flex flex-col gap-4 xl:flex-row">
      {/* left */}
      <div className="w-full xl:w-2/3">
        {/* TOP */}
        <div className="flex flex-col lg:flex-row gap-4">
          {/* USER CARD INFO */}
          <div className="bg-lamaSky py-6 px-4 rounded-md flex-1 flex gap-4 relative">
            <div className="absolute top-4 right-4">
              <FormModel table="teacher" type="update" data={teacherData} />
            </div>
            <div className="w-full md:w-1/3 flex justify-center md:justify-start ">
              <Image
                src="https://img.freepik.com/premium-photo/portrait-young-professional-man-smiling_604472-8539.jpg"
                alt=""
                width={144}
                height={144}
                className="w-36 h-36 md:w-36 md:h-36 rounded-full object-cover"
              />
            </div>


            <div className="w-2/3 flex flex-col  justify-between gap-4 ">
              <h1 className="text-xl font-semibold  ">{teacherData.firstName} {teacherData.lastName}</h1>
              <p className="text-sm text-gray-500">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              </p>

              <div className="flex items-center  justify-between gap-2 flex-wrap text-xs  font-medium">
                <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
                  <Image src="/blood.png" alt="" width={14} height={14} />
                  <span>{teacherData.bloodType}</span>
                </div>
                <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
                  <Image src="/date.png" alt="" width={14} height={14} />
                  <span>{new Date(teacherData.birthday).toLocaleDateString()}</span>
                </div>
                <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
                  <Image src="/mail.png" alt="" width={14} height={14} />
                  <span>{teacherData.email}</span>
                </div>
                <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex flex-row items-center gap-2">
                  <Image src="/phone.png" alt="" width={14} height={14} />
                  <span>{teacherData.phone}</span>
                </div>
              </div>
            </div>
          </div>
          {/* SMALL CARDS */}
          <div className="flex-1 grid grid-cols-2 gap-4">
            {/* CARD */}
            <div className="bg-white p-4 rounded-md shadow-md flex flex-col items-center gap-2">
              <Image
                src="/singleAttendance.png"
                alt=""
                width={24}
                height={24}
                className="w-6 h-6"
              />
              <div className="text-center">
                <h1 className="text-xl font-semibold">90%</h1>
                <span className="text-sm text-gray-500">Attendence</span>
              </div>
            </div>
            <div className="bg-white p-4 rounded-md shadow-md flex flex-col items-center gap-2">
              <Image
                src="/singleClass.png"
                alt=""
                width={24}
                height={24}
                className="w-6 h-6"
              />
              <div className="text-center">
                <h1 className="text-xl font-semibold">6</h1>
                <span className="text-sm text-gray-500">Classes</span>
              </div>
            </div>
            <div className="bg-white p-4 rounded-md shadow-md flex flex-col items-center gap-2">
              <Image
                src="/singleLesson.png"
                alt=""
                width={24}
                height={24}
                className="w-6 h-6"
              />
              <div className="text-center">
                <h1 className="text-xl font-semibold">4</h1>
                <span className="text-sm text-gray-500">Lessons</span>
              </div>
            </div>
            <div className="bg-white p-4 rounded-md shadow-md flex flex-col items-center gap-2">
              <Image
                src="/singleBranch.png"
                alt=""
                width={24}
                height={24}
                className="w-6 h-6"
              />
              <div className="text-center">
                <h1 className="text-xl font-semibold">2</h1>
                <span className="text-sm text-gray-500">Branches</span>
              </div>
            </div>
          </div>
        </div>
        {/* BOTTOM */}
        <div className="mt-4 bg-white rounded-md p-4 h-[880px]">
          <h1>Teacher Schedule</h1>
          <BigCalendar />
        </div>
      </div>
      {/* right */}
      <div className="w-full xl:w-1/3 flex flex-col gap-4">
        <div className="bg-white p-4 rounded-md">
          <h1 className="text-xl font-semibold">Shortcuts</h1>
          <div className="mt-4 flex gap-4 flex-wrap text-xs text-gray-500">
            <Link className="p-3 rounded-md bg-lamaSky " href={`/list/classes?supervisorId=${"teacher2"}`}>
               Teacher Classes
            </Link>
            <Link className="p-3 rounded-md bg-lamaPurpleLight " href={`list/students?teacherId=${"teacher2"}`}>
              Teacher Students
            </Link>
            <Link className="p-3 rounded-md bg-lamaYellow" href="/">
             Teacher Lessons
            </Link>
            <Link className="p-3 rounded-md bg-pink-50" href="/">
             Teacher Exams
            </Link>
            <Link className="p-3 rounded-md bg-lamaSkyLight " href="/">
             Teacher Assignments
            </Link>
          </div>
        </div>
        <Performance/>
        <Announcements />
      </div>
    </div>
  );
};

export default SingleTeacherPage;
