"use client";
import { AuthProvider } from "@/context";
import withTheme from "@/theme";
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
const ToolsPage = () => {
  return withTheme(<Tools />);
};
export default ToolsPage;
