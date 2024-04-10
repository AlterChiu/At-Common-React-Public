import React from "react";
import dayjs, { ManipulateType } from "dayjs";

export default class AtTimeTranslate {
  public static now = (format?: string): string => {
    return format
      ? dayjs().format(format)
      : dayjs().format("YYYY-MM-DD HH:mm:ss");
  };

  public static parseString = (date: string, format: string): dayjs.Dayjs => {
    // if (dayjs(date, format, true).isValid()) throw ;
    // else 
    return dayjs(date, format);
  };

  public static parseDate = (date:Date) :dayjs.Dayjs =>{
    return dayjs(date);
  }

  public static parseMillisecond = (millisecond: number) => {
    return dayjs(millisecond);
  };
  public static parseSecond = (second: number) => {
    return dayjs.unix(second);
  };

  public static addHour = (date: dayjs.Dayjs, hours: number): dayjs.Dayjs => {
    return date.add(hours, "hour");
  };
  public static addMinute = (date: dayjs.Dayjs, min: number): dayjs.Dayjs => {
    return date.add(min, "minute");
  };
  public static addSecond = (date: dayjs.Dayjs, sec: number): dayjs.Dayjs => {
    return date.add(sec, "second");
  };
  public static addDay = (date: dayjs.Dayjs, days: number): dayjs.Dayjs => {
    return date.add(days, "day");
  };
  public static addMonth = (date: dayjs.Dayjs, months: number): dayjs.Dayjs => {
    return date.add(months, "month");
  };
  public static addYear = (date: dayjs.Dayjs, year: number): dayjs.Dayjs => {
    return date.add(year, "year");
  };
  public static getDateInMonth = (year: number, month: number): number => {
    return dayjs(year + "-" + month, "yyyy-M").daysInMonth();
  };
  public static getDifference = (
    date1: dayjs.Dayjs,
    date2: dayjs.Dayjs,
    format: ManipulateType
  ) => {
    return date1.diff(date2, format, true);
  };

  public static getStart = (date: dayjs.Dayjs, format: ManipulateType) => {
    //https://day.js.org/docs/en/manipulate/start-of
    return date.startOf(format);
  };

  public static getEnd = (date: dayjs.Dayjs, format: ManipulateType) => {
    //https://day.js.org/docs/en/manipulate/end-of
    return date.endOf(format);
  };
}
