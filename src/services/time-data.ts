export interface TimeData {
  startTime: number;
  endTime: number;
  duration: number;
  calc: number;
}

export type Params = Record<'timeData', TimeData>;