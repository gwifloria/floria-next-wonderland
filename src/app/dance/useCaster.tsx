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
  const { trigger } = useSWRMutation("/floria-service/caster/subscribe");

  const { data } = useSWR<CasterSchedule[]>("/floria-service/caster/list");

  const schedules = data?.map((item) => ({
    teacherName: item.teacher_name,
    courseName: item.title,
    startTime: item.start_time,
    teacherId: item.teacher_id,
    courseId: item.id,
  }));

  const handleCasterSubmit = (values: any) => {
    console.log("Submitting caster booking with values:", values);
    trigger({ courseId: values });
  };

  return { schedules: schedules, subscribe: handleCasterSubmit };
};
