"use client";
import { useSWR, useSWRMutation } from "@/api/useFetch";
import { AuthProvider } from "@/context";
import withTheme from "@/theme";
import { Button } from "antd";
interface Schedule {
  scheduleid: string;
  teachername: string;
  projectname: string;
}

const OnewayBooking = () => {
  const { data } = useSWR<Schedule[]>("/floria-service/oneway/list", {
    method: "GET",
  });

  const { trigger } = useSWRMutation("/floria-service/oneway/subscribe", {
    method: "POST",
  });

  const handleBook = (id: string) => {
    trigger({ scheduleId: id });
  };
  return (
    <AuthProvider>
      <div>
        {data?.map((schedule) => (
          <div key={schedule.scheduleid}>
            <span>
              {schedule.projectname}-{schedule.teachername}
            </span>
            <Button onClick={() => handleBook(schedule.scheduleid)}>
              book
            </Button>
          </div>
        ))}
      </div>
    </AuthProvider>
  );
};
const CasterBookingPage = () => {
  return withTheme(<OnewayBooking />);
};
export default CasterBookingPage;
