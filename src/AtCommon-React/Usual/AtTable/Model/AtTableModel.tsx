import { ButtonProps, CheckboxProps, FormControlLabelProps, FormGroupProps, PaginationProps, TableBodyProps, TableCellProps, TableHeadProps, TablePaginationBaseProps, TablePaginationProps, TableProps, TableRow, TableRowProps, TableSortLabelProps } from "@mui/material";
import { AtJsonResponse } from "../../../Global/Models/AtJsonResponse";
import { AtDouEntityModel } from "../../AtDou/Model/AtDouModel";
import { AtTableHeaderModel } from "./AtTableHeaderModel";
import { ChangeEvent } from "react";
import { AtModalModel } from "../../AtModal/Model/AtModalModel";
import { FormLabelWithColProps } from "react-bootstrap/esm/FormLabel";

//#region  DouTable的interface
// Dou Table的設定值，T為一列資料的格式
export interface DouTableDef<T = any> {
  //==========基本設定==============================================
  rootParentContainer?: string; //對應Table的ID
  containnerProps?: React.HTMLProps<HTMLDivElement>; //root container的div props;
  classes?: string;// 對應ClassName，會放在Table Root裡面

  feilds: DouTableFeildDef<T>[];// 欄位定義

  //==========取得Table資料==========================================
  tableOptions: DouTableOption;//取得table data的方法

  //========Table Header顯示相關======================================
  headerContainerProps?: TableHeadProps;//Mui的Header Props
  headerRowProps?: TableRowProps;//Mui的 TableRow Props，這是Table主要的欄位顯示，裡面的cell會由feilds內的tableCellProps去設定;
  extraHeaders?: JSX.Element[]; //這邊限制會傳 MUI TableRow，會在Table主要欄位的上方顯示。目的是提供特殊欄位合併顯示用

  //=========Table的控制功能==========================================
  ctrlContainerProps?: React.HTMLProps<HTMLDivElement>;//上方控制面板的
  ctrlfeildAlign?: "right" | "left";// 搜尋欄位的位置，看是放在最左邊還是最右邊

  search?: boolean;//是否可搜尋，預設true

  addable?: boolean;//是否可新增，預設false
  addLable?: string;//新增按鈕的名稱
  addButtonProps?: ButtonProps;//新增按鈕的props，MUI

  editable?: boolean;//是否可編輯，預設false
  editaButtonProps?: ButtonProps;//編輯按鈕的props，MUI

  deleteable?: boolean;//是否可刪除，預設false
  deleteButtonProps?: ButtonProps;//編輯按鈕的props，MUI

  viewable?: boolean;//是否可顯示詳細資訊，預設false

  useMutiDelete?: boolean;//批次刪除功能，預設為false
  useMutiSelect?: boolean;//批次選擇，預設為false，要透過ref取得選取內容

  //============與後台溝通=============================================
  // 以下功能已有複寫，與原先方法格式有差異，之後douCore這邊也得相對應調整
  addServerData?: ( // 資料格式
    requsetURL: string,// add資料的url，按照douCore方法所需參數建立fetch 
    row: T,  //新增的資料行
    // 完成新增後的動作，預設會更新table(Exception會alert)，其他動作自行新增。
    // callBack參數限制 AtJsonResponse(data可為空值)
    callBack: (response: AtJsonResponse<T[]>) => void) => void;

  deleteServerData?: (requsetURL: string, row: T, callBack: (response: AtJsonResponse<T[]>) => void) => void;
  updateServerData?: (requsetURL: string, row: T, callBack: (response: AtJsonResponse<T[]>) => void) => void;
  addToListTop?: boolean;//新增資料後，true=>放在第一列，false=>放到最後面，預設為false(都會zoom到該列)

  //=============編輯介面的外層框=============================================
  editformSize?: EditModelSize; //編輯Modal開啟時，那個編輯介面的大小
  editformProps?: React.HTMLProps<HTMLDivElement>; //編輯Modal開啟時，編輯外框的顯示內容(width/height/minWidth/minHeight會先參考editformSize)
  custumerEditForm?: (douTableDef: DouTableDef, row: T) => JSX.Element;//若不設定，會以上兩個參數去產預設邊框。若設定使客製化編輯介面，會把整個def及該row的編輯資料回傳，需要全部自己實作。

  //==============先不開發區=================================================
  importable?: boolean;//是否支援匯入功能，僅DouCore版本提供，預設false(先不做功能，看不太懂)
}

interface EditModelSize {
  width?: string; // 與css相同
  height?: string;// 與css相同
  minWidth?: string;// 與css相同
  minHeight?: string;// 與css相同
}

// 如何取得資料
interface DouTableOption {
  search?: boolean; //是否可手動搜尋
  searchLable?: string; //搜尋按鈕的Label
  searchButtonProps?: ButtonProps; //搜尋按鈕的props，繼承mui button

  url: string;// 取得資料的URL
  getDatas?: <T>(url: string,//URL是上方設定值
    params: QueryParameter//預設會放在postBody裡面
  ) => Promise<AtJsonResponse<T[]>>;//客製化取得data的方法，預設透過fetch的post方式取得(T是回傳的資料格式)
}

// 取資料時的post body
interface QueryParameter {
  paras: QueryKeyValue<"search" | "sort" | "order" | "filter">[]
}
interface QueryKeyValue<T = any> {
  key: T;
  value?: QueryKeyValue[];
}
//#endregion

//#region  AtTable使用的interface

//每一欄位的定義，T為一列資料的格式
export interface DouTableFeildDef<T = any> {

  //===========基本資訊==========================
  feildKey: string; //資料欄位名稱
  title: string; //顯示名稱
  decsciption?: string;//描述文字，我不知道要幹嘛的?
  datatype?: "default" | "number" | "datetime" | "date" | "select" | "textarea" | "image";
  key?: boolean;//是否為資料庫的key值，預設為false
  allowNull?: boolean;//是否允許null，預設值為true
  defaultValue?: string;//預設值，需要依據資料格式去呈現


  //===========操作功能==============================
  editable?: boolean;//是否可變更(disabled)，預設為false
  visiable?: boolean;//是否可瀏覽，預設為true
  visiableEdit?: boolean;//是否於編輯戶面上呈現，預設為true

  sortable?: boolean;//是否可排序，預設為false;
  sortLableProps?: TableSortLabelProps;//排序Lable的Props，MUI TableSourtable
  customerSort: (row1: any, row2: any) => number;

  filter?: boolean; //是否為過濾欄位，預設為false;
  currentFilters?:string[]; //目前的篩選項目
  customerFilterOptions?:(feild: DouTableFeildDef, data: any[])=>string[]; //可篩選項目
  customerFilter: (feild:DouTableFeildDef, row:T , filterStrings:string[]) => boolean; //篩選結果
  customerFilterDialog?:AtTableFilterDialog; //Filter選單的客製化設定
  filterdefaultvalue?: string;//filter預設值，僅filter=true時啟用(DOU使用)
  

  //=========View顯示相關===============================
  formatter?: (feildKey: string, row: T, data: T[]) => JSX.Element;//(MUI TableCell) //若不設定，回傳預設顯示。設定的話就完全客製化回傳內容
  headerCellProps?: TableCellProps;//Mui Header cell的props，顯示內容會放在這裡面
  bodyCellProps?: TableCellProps;//MUI Body Cell的props

  //=========Edit顯示相關================================
  editDivProps?: React.HTMLProps<HTMLDivElement>;//編輯畫面，輸入功能外層的div，要啥功能裡面自己來實作

}


export interface AtTableModel<T = any> {
  //==========基本設定==============================================
  tableProps?: TableProps; //Mui Table的內容設定
  feilds: DouTableFeildDef<T>[];// 欄位定義
  datas?: any[];//資料

  currentSort?: string;//目前Sorting的欄位名稱，僅允許單一條件做sorting
  currentFilter?:string[];//目前處在filter階段中的欄位名稱，允許多個欄位

  detailable?//是否可呈現細部內容
  currentDetail?: number;//目前呈現細部內容的rowIndex
  detailformatter?: (row: T, data: T[]) => JSX.Element;//細部內容呈現的div

  pageination?: boolean;//是否啟用分頁式
  pageinationProps?: AtTablePaginationProps;//MUI TablePageNation(有客製化繼承)


  //========Table Header顯示相關======================================
  headerShow?:boolean;//是否顯示Header
  headerContainerProps?: TableHeadProps;//Mui的Header Props
  headerRowProps?: TableRowProps;//Mui的 TableRow Props，這是Table主要的欄位顯示，裡面的cell會由feilds內的tableCellProps去設定;
  extraHeaders?: JSX.Element[]; //這邊限制會傳 MUI TableRow，會在Table主要欄位的上方顯示。目的是提供特殊欄位合併顯示用

  //========Table Body顯示相關===========================================
  bodyContainerProps?: TableBodyProps;//MUI的Body Props
  bodyRowProps?: (rowIndex: number) => TableRowProps; // MUI的 TableRow props，可客製化設定各Row的配色(call Back的rowIndex從0開始)
}
//#endregion

//#region  AtTable的對外功能清單
export interface AtTableRef {
  getFeildsDef: () => DouTableFeildDef[];
  setFeilds: (feilds: DouTableFeildDef[]) => void;

  // ExtraHeader的部分須從Parant層取得
  //getExtraHeaders: () => void;

  getDatas: () => any[];//任意資料
  insertData: (data: object, index?: number) => void;
  removeData: (index: number) => void;
  setDatas: (datas: any[]) => void;
}
export interface DouTableRef { }
//#endregion

//#region 切換頁面
export interface AtTablePaginationProps extends PaginationProps{
  rowsPerPage?:number;//預設呈現筆數
  rowsPerPageOptions?:number[]; //每頁呈現筆數
  rowsPerPageChange?:(value:number)=>void; //每頁呈現筆數切換時動作
}
//#endregion

//#region  Filter選單的客製化功能(基本不需要設定)
export interface AtTableFilterDialog{
  //Dialog分為
  /*
    AtModal
    ---------------------
      DialogContent
        AtComplete(搜尋用)
        Formgroup(指定要搜尋項目用)
          Formlabel
            Checkbox
      ---------------------
      DialogAction
        確認button(button)
        取消button(button)
  */
    atmodalModel?:AtModalModel; //Modal樣式
    formGroupProps?:FormGroupProps; //checkbox群組外層
    formControlLabelProps?:FormControlLabelProps; // checkbox controller
    formCheckboxProps?:CheckboxProps; //checkbox 本身
}
//#endregion