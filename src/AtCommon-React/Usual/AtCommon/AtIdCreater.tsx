export default class AtIdCreader {
  static getId = (preFixType?: string): string => {
    const ramdom = Math.floor(Math.random() * 100000000);
    const preFix = preFixType ? preFixType : "default";
    return "At-" + preFix + "-" + ramdom;
  };
}
