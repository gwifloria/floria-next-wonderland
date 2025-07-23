import { useSWR, useSWRMutation } from "@/api/useFetch";

export enum teachers {
  "Key" = 535,
  "Peggy" = 462,
}

interface CasterSchedule {
  teacher_name: string;
  id: number | string;
  start_time: string;
  title: string;
  teacher_id: string;
}
export const useCaster = () => {
  const { trigger: subscribe } = useSWRMutation(
    "/floria-service/caster/subscribe",
    {
      method: "POST",
    },
  );
  const { trigger: unsubscribe } = useSWRMutation(
    "/floria-service/caster/unsubscribe",
    {
      method: "POST",
    },
  );

  const { data, isLoading } = useSWR<CasterSchedule[]>(
    "/floria-service/caster/list",
  );

  const schedules = data?.map((item) => ({
    teacherName: item.teacher_name,
    courseName: item.title,
    startTime: item.start_time,
    teacherId: item.teacher_id,
    courseId: item.id,
  }));

  return {
    schedules: schedules,
    isLoading,
    subscribe: (courseId: string) => subscribe({ courseId }),
    unsubscribe: (courseId: string) => unsubscribe({ courseId }),
  };
};
