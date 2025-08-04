import { Period } from "@/app/tours/interfaces/program-detail.interface";
import { atom } from "jotai";

export type TDayButtonAtom = {
  day: number;
  period?: Period;
};
export const DayButtonAtom = atom<TDayButtonAtom | null>(null);
