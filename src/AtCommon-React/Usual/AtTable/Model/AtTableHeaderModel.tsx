import { AtKeyVal } from "../../AtCommon/AtKeyVal";

export interface AtTableHeaderModel
  extends React.HtmlHTMLAttributes<HTMLDivElement> {
  linkName: string;
  displayName?: string | undefined;
  isShow?: boolean;
  headerAlign?: "inherit" | "left" | "center" | "right" | "justify";
  bodyAlign?: "inherit" | "left" | "center" | "right" | "justify";

  formatter?: (
    tableDatas: any,
    rowDatas: any,
    linkName?: string
  ) => JSX.Element;
  sortNum?: number;

  isSortable?: boolean;
  isFiltable?: boolean;
  isEditable?: boolean;
  isNullable?: boolean;
  dataType?:
    | "string"
    | "String"
    | "nuumber"
    | "double"
    | "float"
    | "date"
    | "selection"
    | "select";

  colSpan?: number;

  //在下拉是選單上用的
  selectionDatas?: AtKeyVal[];
}

export class AtTableHeader {
  public static create = (props: AtTableHeaderModel): AtTableHeaderModel => {
    return Object.assign(
      {
        displayName: props.linkName,
        isShow: true,
        headerAlign: "center",
        bodyAlign: "center",
        formatter: (tableDatas: any, rowData: any, linkName?: string) => {
          return <>{rowData[linkName!]}</>;
        },
        isSortable: false,
        isFiltable: false,
        isEditable: false,
        isNullable: false,
        dataType: "string",
        colSpan: 1,
      },
      props
    );
  };
}
