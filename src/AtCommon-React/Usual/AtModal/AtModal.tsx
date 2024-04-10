import React from "react";
import { AtModalModel, AtModalRef } from "./Model/AtModalModel";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import AtIdCreader from "../AtCommon/AtIdCreater";
import "./Style.css";

const AtModal: React.ForwardRefRenderFunction<AtModalRef, AtModalModel> = (
  props: AtModalModel,
  ref?
) => {
  //#region 預設參數
  const handleClose = () => {
    setModal(pre => { return { ...pre, dialogProps: { ...pre.dialogProps, open: false } } })
  }

  const [modal, setModal] = React.useState(GetDefualtProps({}, props, handleClose));
  React.useEffect(() => { setModal(pre => { return { ...GetDefualtProps(pre, props, handleClose) } }); }, [props])
  //#endregion

  //#region 對外功能
  React.useImperativeHandle(ref, () => ({
    openModal: () => { setModal(pre => { return { ...pre, dialogProps: { ...pre.dialogProps, open: true } } }) },
    closeModal: () => { handleClose() },
    toggleModal: () => { setModal(pre => { return { ...pre, dialogProps: { ...pre.dialogProps, open: !pre.dialogProps?.open } } }) },
    isOpen: () => { return modal.dialogProps?.open! }
  }))
  //#endregion



  return <Dialog {...modal.dialogProps}
    open={modal.dialogProps?.open!}
    className={`At-Modal ${modal.dialogProps?.className}`}>
    {/* Title */}

    <DialogTitle {...modal.dialogTitleProps}
      className={`At-Modal-TitleContainer ${modal.dialogTitleProps?.className}`}>
      {modal.dialogTitle}
    </DialogTitle>

    {/* Content */}
    <DialogContent {...modal.dialogContentProps}>
      <div className="At-Modal-Conent-Container">{modal.children}</div>
    </DialogContent>

    {/* Footer */}
    <DialogActions {...modal.dialogActionProps}>
      <div className="At-Modal-Footer-Container">
        {modal.dialogActionContent}
      </div>
    </DialogActions>
  </Dialog>
}
export default React.forwardRef(AtModal);


const GetDefualtProps = (pre: AtModalModel, props: AtModalModel, handleClose: () => void): AtModalModel => {
  return {
    ...props,

    // 外層的dialogProps
    dialogProps: Object.assign({
      id: AtIdCreader.getId("At-Modal"),
      open: pre.dialogProps?.open ?? props.dialogProps?.open ?? false,//以上一個狀態為優先，先採用ref方式控制
    }, props.dialogProps),

    // 最下層的功能紐
    dialogActionContent: props.dialogActionContent ??
      <>
        <Button variant="contained" onClick={handleClose}>取消</Button>
      </>
  }
}