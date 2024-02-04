import { redirect } from 'next/navigation';
import {
  LuCircleDollarSign,
  LuLayoutDashboard,
  LuListChecks,
} from 'react-icons/lu';

import { auth } from '@/auth';
import { prisma } from '@/lib/prismaClient';

import { EditForm } from './components/EditForm';
import { PriceForm } from './components/PriceForm';

const fetchCourse = async (courseId: string, userId: string) => {
  const course = await prisma.course.findUnique({
    where: {
      id: courseId,
      userId,
    },
  });
  return course;
};

const fetchCategories = async () => {
  const categories = await prisma.category.findMany({
    orderBy: {
      name: 'asc',
    },
  });
  return categories;
};

const CourseIdPage = async ({
  params: { courseId },
}: {
  params: { courseId: string };
}) => {
  const session = await auth();
  const user = session?.user;
  const course = await fetchCourse(courseId, user?.id as string);
  const categories = await fetchCategories();

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
            <LuLayoutDashboard stroke="blue" size={25} />
            <h2 className="text-xl">Customize your course</h2>
          </div>
          <EditForm
            initialData={course}
            courseId={courseId}
            categories={categories}
          />
        </div>
        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-x-2">
              <LuListChecks stroke="blue" size={25} />
              <h2 className="text-xl">Course chapters</h2>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-x-2">
              <LuCircleDollarSign stroke="blue" size={25} />
              <h2 className="text-xl">Sell your course</h2>
            </div>
            <PriceForm courseId={courseId} initialData={course} />
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
