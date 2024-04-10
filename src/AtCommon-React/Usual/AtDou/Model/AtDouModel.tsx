import React, { ChangeEvent } from "react";
import { AtInputRef } from "../../AtInput/Model/AtInputModel";
import { AtSelectionRef } from "../../AtSelection/Model/AtSelectionModel";
import { AtKeyVal } from "../../AtCommon/AtKeyVal";

export interface AtDouRef {
  setError: (error: string) => void;
  getError: () => string;
  setOpen: () => void;
  setClose: () => void;
  setEntities: (entities: AtDouEntityModel[]) => void;
  addEntity: (entity: AtDouEntityModel) => void;
  getEntities: () => AtDouEntityModel[];
  setType: (type: "view" | "update" | "create") => void;
  getType: () => string;
}

export interface AtDouModel {
  open: boolean; //啟動編輯畫面
  title: string; // 編輯名稱

  defaultType: "view" | "update" | "create"; // 預設模式
  type?: "view" | "update" | "create"; // 目前模式，ref更新

  updateUrl?: string; //更新後的上傳function
  update?: (props: AtDouEntityModel[]) => void;

  createUrl?: string; //新增的function
  create?: (props: AtDouEntityModel[]) => void;

  defaultEntities: AtDouEntityModel[]; //預設物件，後續可透過ref更新
  entities?: AtDouEntityModel[]; //這個編輯畫面內的所有物件，如果寫在這邊，ref將無法修改資料

  error?: string;
}

// 每一個物件的變動內容
export interface AtDouEntityModel {
  defaultValue?: string; // 預設值
  name: string; //物件名稱，後續會新增在DB中的，在單一douModel中唯一值
  displayName?: string; //顯示名稱
  type: "TextField" | "number" | "date" | "selection";
  className?: string; // 帶入客製化css
  ref?: React.RefObject<any>;

  // 數值變化時的客製化動作
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  isVisable?: boolean; //是否顯示
  isEditable?: boolean; // 是否可編輯
  isNullable?: boolean; //是否可為空

  // 下拉選單時的
  selectionDatas?: AtKeyVal[];
}

//方便使用時快速產製entity
export const CreateDefaultDouEntity = (
  name: string,
  type: "TextField" | "number" | "date" | "selection",
  displayName?: string
): AtDouEntityModel => {
  return InitialDouEntity({
    displayName: displayName == null ? name : displayName,
    name: name,
    type: type,
  });
};

export const InitialDouEntity = (props: AtDouEntityModel) => {
  return Object.assign(
    {
      isVisable: true,
      isEditable: true,
      displayName: props.name,
      ref:
        props.type == "selection"
          ? React.createRef<AtSelectionRef>()
          : React.createRef<AtInputRef>(),
    },
    props
  );
};
