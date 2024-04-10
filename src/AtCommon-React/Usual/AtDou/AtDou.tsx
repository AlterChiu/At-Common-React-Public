import "./Style.css";

import react, { useImperativeHandle } from "react";
import {
  AtDouEntityModel,
  AtDouModel,
  AtDouRef,
  InitialDouEntity,
} from "./Model/AtDouModel";
import React from "react";
import { Divider, Modal } from "@mui/material";
import AtInput from "../AtInput/AtInput";
import AtSelection from "../AtSelection/AtSelection";
import { AtSelectionRef } from "../AtSelection/Model/AtSelectionModel";
import { AtInputRef } from "../AtInput/Model/AtInputModel";

const AtDou: React.ForwardRefRenderFunction<AtDouRef, AtDouModel> = (
  props: AtDouModel,
  ref?
) => {
  // 載入預設參數
  const [model, setModel] = React.useState<AtDouModel>(InitailEntities(props));

  // // 由外部更新時，全部以外部資料為主
  // React.useEffect(() => {
  //   var initailedProps = InitailEntities(props);
  //   setModel((pre) => {
  //     return { ...initailedProps };
  //   });
  // }, [props]);

  // modal 控制
  const handelModalClose = () => {
    setModel((pre) => {
      pre.open = false;
      return { ...pre };
    });
  };

  //跟外部作業的互動
  useImperativeHandle(ref, () => ({
    setOpen: () => {
      setModel((pre) => {
        return { ...pre, open: true };
      });
    },

    setClose: () => {
      setModel((pre) => {
        return { ...pre, open: false };
      });
    },

    setEntities: (entities: AtDouEntityModel[]) => {
      setModel((pre) => {
        return { ...pre, entities: entities };
      });
    },

    addEntity: (entity: AtDouEntityModel) => {
      setModel((pre) => {
        var entities = pre.entities;
        entities!.push(entity);
        return { ...pre, entities: entities };
      });
    },

    setType: (type: "view" | "update" | "create") => {
      setModel((pre) => {
        return { ...pre, type: type };
      });
    },
    getType: () => {
      return model.type!;
    },

    getEntities: () => {
      return model.entities!;
    },

    setError: (error: string) => {
      setModel((pre) => {
        return { ...pre, error: error };
      });
    },

    getError: () => {
      return model.error!;
    },
  }));

  return (
    <Modal
      className="AtDou-Modal-Container"
      open={model.open}
      onClose={handelModalClose}
    >
      <div className="AtDou-Modal-background">
        <div className="AtDou-Modal-Header">
          {(model.type == "view"
            ? "檢視-"
            : model.type == "update"
              ? "編輯-"
              : "新增-") + model.title}
          <Divider />
        </div>
        <div className="AtDou-Modal-Content">
          {model.entities!.map((entity) => {
            return (
              <div
                style={{ display: entity.isVisable == true ? "block" : "none" }}
              >
                {
                  entity.type == "selection"
                    ? DouSelectionEntity(entity, model.type == "view") // 下拉選單
                    : DouInputEntity(entity, model.type == "view") // 一般文字輸入
                }
              </div>
            );
          })}
        </div>
        <div className="AtDou-Modal-footer">
          {/* 錯誤訊息 */}
          {model.error ? (
            <div className="alert alert-danger" role="alert">
              {model.error}
            </div>
          ) : (
            <></>
          )}
          <div className="AtDou-Modal-footer-content">
            {/* 操作button */}
            {model.type == "update" ? (
              <button
                className="btn btn-success"
                onClick={() => {
                  if (model.update) model.update(model.entities!);
                  else updateFunction(model);
                }}
              >
                更新
              </button>
            ) : model.type == "create" ? (
              <button
                className="btn btn-success"
                onClick={() => {
                  if (model.create) model.create(model.entities!);
                  else createFunction(model);
                }}
              >
                新增
              </button>
            ) : (
              <></>
            )}
            <button className="btn btn-secondary" onClick={handelModalClose}>
              取消
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};
export default React.forwardRef(AtDou);

// 載入預設參數
const InitailEntities = (props: AtDouModel): AtDouModel => {
  const cloneProps = Object.assign({ ...props });

  // 採用類別的預設參數
  cloneProps.type = props.type == null ? props.defaultType : props.type;

  // 採用entities預設參數
  cloneProps.entities =
    props.entities == null ? props.defaultEntities : props.entities;
  cloneProps.entities = cloneProps.entities.map((e) => InitialDouEntity(e));

  // 回傳物件
  var returnObj = Object.assign(
    {
      update: (datas) => { }, //預設不回傳
    },
    cloneProps
  );
  return returnObj;
};

//#region Dou 預設的兩種輸入方式
const DouInputEntity = (props: AtDouEntityModel, isView: boolean) => {
  return (
    <AtInput
      name={props.displayName!}
      defaultValue={props.defaultValue}
      type={props.type == "selection" ? "TextField" : props.type}
      ref={props.ref}
      inputProps={{ disabled: isView || !props.isEditable }}
      onChange={props.onChange}
    />
  );
};

const DouSelectionEntity = (props: AtDouEntityModel, isView: boolean) => {
  return (
    <AtSelection
      selectProps={{
        label: props.displayName!,
        disabled: isView || !props.isEditable,
        defaultValue: props.defaultValue,
        variant: "standard"
      }}
      label={props.displayName!}
      datas={props.selectionDatas!}
      textquery={true}
      ref={props.ref}
    />
  );
};
//#endregion

//#region 預設更新/新增的function
const updateFunction = (props: AtDouModel) => {
  fetch(props.updateUrl!, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(getAllValues(props)),
  })
    .then((e) => e.json())
    .then((e) => {
      alert("更新完成");
      window.location.reload();
    })
    .catch((e) => {
      alert(e);
    });
};

const createFunction = (props: AtDouModel) => {
  fetch(props.createUrl!, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(getAllValues(props)),
  })
    .then((e) => e.json())
    .then((e) => {
      alert("新增完成");
      window.location.reload();
    })
    .catch((e) => {
      alert(e);
    });
};

const getAllValues = (props: AtDouModel) => {
  var outObject = {};
  props.entities!.forEach((entity) => {
    var ref =
      entity.type == "selection"
        ? (entity.ref! as React.RefObject<AtSelectionRef>)
        : (entity.ref! as React.RefObject<AtInputRef>);
    outObject[entity.name] = ref.current?.getValue();
  });

  return outObject;
};
//#endregion
