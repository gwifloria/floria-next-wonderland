"use client";
import { AuthProvider } from "@/context";
import { DailyReview } from "./DailyReview";
import { VisionCard } from "./VisionCard";
import { weekVisions } from "./constants";

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

export default VisionBoard;
