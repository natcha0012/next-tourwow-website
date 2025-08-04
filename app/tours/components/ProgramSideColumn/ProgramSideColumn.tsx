import React from "react";
import {
  Period,
  ProgramDetail,
} from "../../interfaces/program-detail.interface";
import PromotionBanner from "./components/PromotionBanner/PromotionBanner";
import MiniBoxProgramSummary from "./components/MiniBoxProgramSummary/MiniBoxProgramSummary";
import ProgramDetailCalendar from "./components/ProgramDetailCalendar/ProgramDetailCalendar";
type Props = {
  program: ProgramDetail | null;
  mapActiveDate: Record<
    string,
    { date: number; type: string | null; period?: Period }[]
  >;
  hotMonth: number | null;
};

function ProgramSideColumn({ program, mapActiveDate, hotMonth }: Props) {
  const showBanner = hotMonth !== null;
  return (
    <div className="static w-full sm:absolute sm:pl-4">
      {showBanner && (
        <div className="block mt-4 sm:hidden">
          <PromotionBanner></PromotionBanner>
        </div>
      )}
      <MiniBoxProgramSummary program={program}></MiniBoxProgramSummary>
      {showBanner && (
        <div className="hidden sm:block sm:mt-4">
          <PromotionBanner></PromotionBanner>
        </div>
      )}
      <ProgramDetailCalendar
        mapActiveDate={mapActiveDate}
        hotMonth={null}
      ></ProgramDetailCalendar>
    </div>
  );
}

export default ProgramSideColumn;
