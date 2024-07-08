"use client";
import { AuthProvider } from "@/context";
import withTheme from "@/theme";
import { VisionCard } from "./VisionCard";
import { weekVisions } from "./constants";
import { Card, Space } from "antd";
import { DailyReview } from "./DailyReview";

const VisionBoard = () => {
  return (
    <AuthProvider>
      <div className="vision_board-container container mx-auto px-4 justify-between">
        <div>visionBoard</div>
        <div className="flex grid gap-12 grid-cols-2 justify-between">
          <div className="rounded-xl py-4 px-2 border-2 border-indigo-500/100">
            本周vision
            <VisionCard items={weekVisions}></VisionCard>
          </div>
          <div className="rounded-xl  py-4 px-2 border-2 border-indigo-500/100">
            本月度vision
            <VisionCard items={weekVisions}></VisionCard>
          </div>
        </div>
        <div>Daily Record</div>
        <div>
          <DailyReview></DailyReview>
        </div>
      </div>
    </AuthProvider>
  );
};
const VisionBoardPage = () => {
  return withTheme(<VisionBoard />);
};
export default VisionBoardPage;
