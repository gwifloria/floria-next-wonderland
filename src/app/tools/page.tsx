"use client";
import { AuthProvider } from "@/context";
import UploadBox from "./upload";

const Tools = () => {
  return (
    <AuthProvider>
      <div>
        <UploadBox></UploadBox>
      </div>
    </AuthProvider>
  );
};

export default Tools;
