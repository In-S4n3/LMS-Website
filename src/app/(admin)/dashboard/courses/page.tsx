import { Button } from '@/src/components/Button';

const CoursePage = () => {
  return (
    <div>
      <Button className="px-5" href="/dashboard/create">
        New Course
      </Button>
    </div>
  );
};

export default CoursePage;
