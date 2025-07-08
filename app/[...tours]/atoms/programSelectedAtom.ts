import { atom } from "jotai";

export type TProgramSelectedAtom = {
  day: number;
  month: number;
};
export const programSelectedAtom = atom<TProgramSelectedAtom | null>(null);
