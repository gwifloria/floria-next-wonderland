"use client";
import { AuthProvider } from "@/context";
import withTheme from "@/theme";
import { CasterForm } from "./useCasterForm";

const CasterBooking = () => {
  return (
    <AuthProvider>
      <CasterForm></CasterForm>
    </AuthProvider>
  );
};
const CasterBookingPage = () => {
  return withTheme(<CasterBooking />);
};
export default CasterBookingPage;
