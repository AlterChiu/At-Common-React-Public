import { DialogActionsProps, DialogContentProps, DialogProps, DialogTitleProps } from "@mui/material";
import React from "react";

export interface AtModalModel {
 //Dialog分為
  /*
    DialogTitle
    ---------------------
    DialogContent
        內容客製化(children)
    ---------------------
    DialogAction
      確認button(button)
      取消button(button)
  */   

    dialogProps?:AtDialogProps; //整個dialog的物件 props
    dialogTitle?:string|JSX.Element; // title文字，可客製化jsx(若undefine，整個title都會不見)
    dialogTitleProps?:DialogTitleProps; //titleProps

    dialogContentProps?:DialogContentProps; // 內容container的props
    children?: React.ReactNode; //客製化內容

    dialogActionProps?:DialogActionsProps;// dialog的footer props
    dialogActionContent?:React.ReactNode; //客製化內容，預設只有取消
}

interface AtDialogProps extends Omit<DialogProps , "open">{
    open?:boolean; //預設關閉
}

export interface AtModalRef{
    closeModal:()=>void;
    openModal:()=>void;
    toggleModal:()=>void;
    isOpen:()=>boolean;
}