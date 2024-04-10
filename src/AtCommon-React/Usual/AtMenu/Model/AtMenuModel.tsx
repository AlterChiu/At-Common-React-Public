import AtIdCreader from "../../AtCommon/AtIdCreater";
import { AtKeyVal } from "../../AtCommon/AtKeyVal";

export interface IAtMenuModel {
  anchor?: HTMLElement | null;
  anchorOrigin?: any; //預設

  id?: string;

  datas: AtKeyVal[]; //展示資訊，properties裡面可以放icon
}

export class AtMenuModel {
  public static create = (props: IAtMenuModel) => {
    return Object.assign(
      {
        anchor: null,
        id: AtIdCreader.getId("menu"),
      },
      props
    );
  };
}

export interface AtMenuRef {
  show: (anchor: HTMLElement | null) => void;
}
