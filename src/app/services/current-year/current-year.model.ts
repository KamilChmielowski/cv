export interface CurrentYearResponse {
  $id: string,
  currentDateTime: Date,
  utcOffset: string,
  isDayLightSavingsTime: boolean,
  dayOfTheWeek: string,
  timeZoneName: string,
  currentFileTime: number,
  ordinalDate: string,
  serviceResponse: any
}
