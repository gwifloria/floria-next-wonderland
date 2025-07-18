import { Button } from "antd";

export const CourseItem = ({
  course,
  confirmFunction,
}: {
  course: {
    courseName: string;
    teacherName: string;
    courseId: string | number;
    startTime?: string;
  };

  confirmFunction: Function;
}) => {
  return (
    <div>
      <span>{course.teacherName}</span>
      <span>{course.courseName}</span>
      <span>{course.startTime}</span>

      <Button onClick={() => confirmFunction(course.courseId)}>book</Button>
    </div>
  );
};
