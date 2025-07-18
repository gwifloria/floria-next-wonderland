"use client";
import { AuthProvider } from "@/context";
import withTheme from "@/theme";
import { useCaster } from "./useCaster";
import { useOneway } from "./useOneway";
import { CourseItem } from "./CourseItem";

const CasterBooking = () => {
  const { schedules: casterSchedules, subscribe: casterSubscribe } =
    useCaster();
  const { schedules: onewaySchedules, subscribe: onewaySubscribe } =
    useOneway();

  return (
    <AuthProvider>
      {casterSchedules?.map((item) => (
        <CourseItem
          course={item}
          confirmFunction={casterSubscribe}
          key={item.courseId}
        ></CourseItem>
      ))}
      {onewaySchedules?.map((item) => (
        <CourseItem
          confirmFunction={onewaySubscribe}
          course={item}
          key={item.courseId}
        ></CourseItem>
      ))}
    </AuthProvider>
  );
};
const CasterBookingPage = () => {
  return withTheme(<CasterBooking />);
};
export default CasterBookingPage;
