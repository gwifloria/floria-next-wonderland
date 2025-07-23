"use client";
import { AuthProvider } from "@/context";
import withTheme from "@/theme";
import { useCaster } from "./useCaster";
import { useOneway } from "./useOneway";
import { CourseItem } from "./CourseItem";
import { Tabs, Spin, Empty } from "antd";
import { useCallback, useMemo } from "react";

const CourseList = ({
  courses,
  subscribe,
  unsubscribe,
  isLoading,
}: {
  courses?: Array<any>;
  subscribe: Function;
  unsubscribe: Function;
  isLoading?: boolean;
}) => {
  if (isLoading) {
    return (
      <div className="flex justify-center py-8">
        <Spin />
      </div>
    );
  }

  if (!courses?.length) {
    return <Empty description="No courses available" className="py-8" />;
  }

  return (
    <div className="grid gap-3 p-4">
      {courses.map((item) => (
        <CourseItem
          course={item}
          unsubscribe={unsubscribe}
          subscribe={subscribe}
          key={item.courseId}
        />
      ))}
    </div>
  );
};

const CasterBooking = () => {
  const {
    schedules: casterSchedules,
    subscribe: casterSubscribe,
    unsubscribe: casterUnsubscribe,
    isLoading: isCasterLoading,
  } = useCaster();

  const {
    schedules: onewaySchedules,
    subscribe: onewaySubscribe,
    unsubscribe: onewayUnsubscribe,
    isLoading: isOnewayLoading,
  } = useOneway();

  const items = useMemo(
    () => [
      {
        key: "caster",
        label: "Caster Studio",
        children: (
          <CourseList
            courses={casterSchedules}
            subscribe={casterSubscribe}
            unsubscribe={casterUnsubscribe}
            isLoading={isCasterLoading}
          />
        ),
      },
      {
        key: "oneway",
        label: "One Way",
        children: (
          <CourseList
            courses={onewaySchedules}
            subscribe={onewaySubscribe}
            unsubscribe={onewayUnsubscribe}
            isLoading={isOnewayLoading}
          />
        ),
      },
    ],
    [
      casterSchedules,
      onewaySchedules,
      casterSubscribe,
      casterUnsubscribe,
      onewaySubscribe,
      onewayUnsubscribe,
      isCasterLoading,
      isOnewayLoading,
    ],
  );

  return (
    <AuthProvider>
      <div className="max-w-4xl mx-auto py-6 px-4">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          Dance Class Booking
        </h1>
        <Tabs
          items={items}
          className="bg-white rounded-lg shadow-sm p-4"
          tabBarStyle={{
            marginBottom: 24,
            padding: "0 16px",
          }}
          tabBarGutter={32}
        />
      </div>
    </AuthProvider>
  );
};

const CasterBookingPage = () => {
  return withTheme(<CasterBooking />);
};

export default CasterBookingPage;
