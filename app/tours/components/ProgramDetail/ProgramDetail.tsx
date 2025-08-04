import React, { Suspense } from "react";
import {
  getProgramDetail,
  getProgramDetailPdfFile,
} from "../../apis/program-detail";
import ProgramGallery from "../ProgramDetailGallery/ProgramGallery";
import ProgramSideColumn from "../ProgramSideColumn/ProgramSideColumn";
import ProgramDetailHighlight from "../ProgramDetailHighlight/ProgramDetailHighlight";
import ProgramDetailTourClient from "../ProgramDetailTour/ProgramDetailTourClient";
import ProgramDerailTour from "../ProgramDetailTour/ProgramDerailTour";
import ProgramDetailTravelTime from "../ProgramDetailTravelTime/ProgramDetailTravelTime";
import Loading from "@/app/components/Loading/Loading";
import { Period } from "../../interfaces/program-detail.interface";
import ProgramDetailRelateList from "../ProgramDetailRelateList/ProgramDetailRelateList";
type Props = {
  routerUrl: string;
};
async function ProgramDetail({ routerUrl }: Props) {
  const programDetail = await getProgramDetail(routerUrl);
  const poolKey = programDetail?.pool_key;
  const filePdfUrl = poolKey ? await getProgramDetailPdfFile(poolKey) : null;
  const mapActiveDate: Record<string, { date: number; type: string | null }[]> =
    {};
  const mapPeriods: Record<string, Period[]> = {};

  function findHotMonth(periods: Period[]) {
    const period = periods.find(
      (p) => p.price_adult_double_compare && p.price_adult_double_compare > 0
    );
    if (period) {
      const startDate = new Date(period.start_at);
      if (startDate) return startDate?.getMonth() - new Date().getMonth();
    }
    return null;
  }
  const hotMonth = findHotMonth(programDetail?.periods ?? []);

  programDetail?.periods.forEach((p) => {
    if (!p.start_at || !p.is_active) return;
    const startAt = new Date(p.start_at);
    const month = startAt.getMonth();
    const year = startAt.getFullYear();
    const key = `${month}-${year}`;
    const activeDate: { date: number; type: string | null; period?: Period } = {
      date: startAt.getDate(),
      type: null,
      period: p,
    };
    if (p.quantity_remaining > 0 && startAt > new Date()) {
      activeDate.type = "blank";
    } else if (p.quantity_remaining === 0) {
      activeDate.type = "full";
    }
    if (!mapActiveDate[key]) {
      mapActiveDate[key] = [activeDate];
      mapPeriods[key] = [p];
    } else {
      mapActiveDate[key].push(activeDate);
      mapPeriods[key].push(p);
    }
  });
  return (
    <>
      <div className="container flex flex-wrap">
        <ProgramGallery program={programDetail}></ProgramGallery>
        <div className="relative w-full sm:basis-[35%]">
          <ProgramSideColumn
            program={programDetail}
            mapActiveDate={mapActiveDate}
            hotMonth={hotMonth}
          ></ProgramSideColumn>
        </div>
        <div className="flex flex-col w-full sm:basis-[65%]">
          <ProgramDetailHighlight
            description={
              programDetail?.tw_hilight_description ||
              programDetail?.hilight_description ||
              ""
            }
          ></ProgramDetailHighlight>

          <ProgramDetailTourClient filePdfUrl={filePdfUrl}>
            <ProgramDerailTour program={programDetail}></ProgramDerailTour>
          </ProgramDetailTourClient>

          <ProgramDetailTravelTime
            hotMonth={hotMonth}
            mapPeriods={mapPeriods}
          ></ProgramDetailTravelTime>

          {programDetail?.tour_condition && (
            <section>
              <h2>เงื่อนไขทัวร์</h2>
              <div
                dangerouslySetInnerHTML={{
                  __html: programDetail.tour_condition,
                }}
              ></div>
            </section>
          )}
        </div>

        <Suspense fallback={<Loading></Loading>}>
          <ProgramDetailRelateList
            routerUrl={routerUrl}
          ></ProgramDetailRelateList>
        </Suspense>
      </div>
    </>
  );
}

export default ProgramDetail;
