import { useSWR, useSWRMutation } from "@/api/useFetch";

interface Schedule {
  scheduleid: string | number;
  teachername: string;
  projectname: string;
}
export const useOneway = () => {
  const { data, isLoading } = useSWR<Schedule[]>("/floria-service/oneway/list");

  const { trigger: subscribe } = useSWRMutation(
    "/floria-service/oneway/subscribe",
    {
      method: "POST",
    },
  );

  const { trigger: unsubscribe } = useSWRMutation(
    "/floria-service/oneway/unsubscribe",
    {
      method: "POST",
    },
  );

  const schedules = data?.map((item) => ({
    courseId: item.scheduleid,
    teacherName: item.teachername,
    courseName: item.projectname,
  }));

  return {
    schedules: schedules,
    isLoading,
    subscribe: (courseId: string) => subscribe({ courseId }),
    unsubscribe: (courseId: string) => unsubscribe({ courseId }),
  };
};
