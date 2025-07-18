import { useSWR, useSWRMutation } from "@/api/useFetch";

interface Schedule {
  scheduleid: string | number;
  teachername: string;
  projectname: string;
}
export const useOneway = () => {
  const { data } = useSWR<Schedule[]>("/floria-service/oneway/list");

  const { trigger } = useSWRMutation("/floria-service/oneway/subscribe");

  const handleBook = (id: string) => {
    trigger({ scheduleId: id });
  };

  const schedules = data?.map((item) => ({
    courseId: item.scheduleid,
    teacherName: item.teachername,
    courseName: item.projectname,
  }));

  return { schedules: schedules, subscribe: handleBook };
};
