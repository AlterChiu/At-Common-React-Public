export default class AtParser {
  public static jsonToString = (json: any): string => {
    return JSON.stringify(json);
  };

  public static stringToJson = (jsonString: string): object => {
    return JSON.parse(jsonString);
  };

  public static numberCommas = (number: number): string => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  public static numberToString = (
    number: number,
    decimal?: number // 如果未提供，則直接四捨五入進整數
  ): string => {
    return decimal ? number.toFixed(decimal) : number.toFixed();
  };

  // 負向整數
  public static numberToStringFloor = (
    number: number,
    decimal?: number // 如果未提供，則直接進整數
  ): string => {
    return decimal
      ? AtParser.numberToString(number - (Math.pow(0.1,decimal)) * 0.5, decimal)
      : AtParser.numberToString(number - 0.5, decimal);
  };

  // 正向整數
  public static numberToStringCeil = (
    number: number,
    decimal?: number // 如果未提供，則直接進整數
  ): string => {
    return decimal
      ? AtParser.numberToString(number + (Math.pow(0.1,decimal)) * 0.5, decimal)
      : AtParser.numberToString(number + 0.5, decimal);
  };
}
