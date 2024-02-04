import { redirect } from 'next/navigation';
import { MdOutlineDashboardCustomize } from 'react-icons/md';

import { auth } from '@/auth';
import { prisma } from '@/lib/prismaClient';

import { EditForm } from './components/EditForm';

const fetchCourse = async (courseId: string, userId: string) => {
  const course = await prisma.course.findUnique({
    where: {
      id: courseId,
      userId,
    },
  });
  return course;
};

const CourseIdPage = async ({
  params: { courseId },
}: {
  params: { courseId: string };
}) => {
  const session = await auth();
  const user = session?.user;
  const course = await fetchCourse(courseId, user?.id as string);

  if (!course) {
    redirect('/dashboard/courses');
  }

  const requiredFields = [
    course?.title,
    course?.description,
    course.imageUrl,
    course?.price,
    course?.categoryId,
  ];

  const totalFields = requiredFields.length;
  const filledFields = requiredFields.filter(Boolean).length;
  const completionText = `${filledFields}/${totalFields}`;

  return (
    <div className="p-6">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-y-2">
          <h1 className="text-2xl font-medium">Course setup</h1>
          <span className="text-sm font-medium text-indigo-800">
            Complete all fields {completionText}
          </span>
        </div>
      </div>
      <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <div className="flex items-center gap-x-2">
            <MdOutlineDashboardCustomize fill="blue" size={25} />
            <h2 className="text-xl">Customize your course</h2>
          </div>
          <EditForm initialData={course} courseId={courseId} />
        </div>
        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-x-2">
              <h2 className="text-xl">Course chapters</h2>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-x-2">
              <h2 className="text-xl">Sell your course</h2>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-x-2">
              <h2 className="text-xl">Resources & Attachments</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseIdPage;
