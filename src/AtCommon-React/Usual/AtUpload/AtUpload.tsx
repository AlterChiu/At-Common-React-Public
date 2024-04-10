import React, { ChangeEvent, useImperativeHandle } from "react";
import { IAtUploadModel, AtUploadRef } from "./Model/AtUploadModel";
import AtIdCreader from "../AtCommon/AtIdCreater";
import { AtJsonResponse } from "../../../AtCommon-React/Global/Models/AtJsonResponse";
import AtLoading from "../../../Module/Loading/AtLoading";

const AtUpload: React.ForwardRefRenderFunction<AtUploadRef, IAtUploadModel> = (
  props: IAtUploadModel,
  ref?
) => {
  // 建立預設值
  const [isInputLoading, setInputLoading] = React.useState<boolean>(false);
  const [uploadProps, setUpload] = React.useState<IAtUploadModel>(
    Object.assign(
      {
        id: AtIdCreader.getId("upload"),
        defaultValue: "",
        sx: {},
        isImage: false,
        isDisabled: false,

        //檔案上傳的位置以及callBack
        setLoading: (isLoading: boolean) => {
          setInputLoading(isLoading);
        },
        fetchFunction: () => {},
        fetchCallBack: (res) => {
          var response = res as AtJsonResponse<string>;
          if (response.isSussecced)
            setUpload((pre) => {
              return { ...pre, defaultValue: response.data };
            }); //預設塞入input中
          alert(response.desc);
        },
      },
      props
    )
  );

  React.useEffect(() => {
    setUpload((pre) => {
      return { ...pre, ...props };
    });
  }, [props]);

  //跟外部作業的互動
  useImperativeHandle(ref, () => ({
    setDisable: (value: boolean) => {
      setUpload((pre) => {
        return { ...pre, isDisabled: value };
      });
    },
    setValue: (value: string) => {
      setUpload((pre) => {
        return { ...pre, defaultValue: value };
      });
    },

    getValue: () => {
      return uploadProps.defaultValue!;
    },
  }));

  return (
    <>
      {uploadProps.isImage ? (
        <ImageMode
          uploadProps={uploadProps}
          defaulLoading={isInputLoading}
          setUpload={setUpload}
        />
      ) : (
        <FileMode
          uploadProps={uploadProps}
          defaulLoading={isInputLoading}
          setUpload={setUpload}
        />
      )}
    </>
  );
};

const ImageMode = (props: {
  uploadProps: IAtUploadModel;
  defaulLoading: boolean;
  setUpload;
}) => {
  return (
    <>
      <AtLoading isOpen={props.defaulLoading} />
      <img
        style={{ width: "100%", height: "100%", cursor: "pointer" }}
        src={props.uploadProps.defaultValue}
        onClick={(e) => {
          var elem = document.getElementById(props.uploadProps.id + "-input");
          if (elem && document.createEvent) {
            var evt = document.createEvent("MouseEvents");
            evt.initEvent("click", true, false);
            elem.dispatchEvent(evt);
          }
        }}
      />
      <input
        type="file"
        accept="image/*"
        id={props.uploadProps.id + "-input"}
        style={{ display: "none" }}
        onChange={(e) => {
          fileUpload(
            e,
            props.uploadProps.setLoading!,
            props.uploadProps.fetchFunction,
            props.uploadProps.fetchCallBack,
            props.setUpload
          );
        }}
      />
    </>
  );
};

const FileMode = (props: {
  uploadProps: IAtUploadModel;
  defaulLoading: boolean;
  setUpload;
}) => {
  return (
    <input
      type="file"
      accept="*.*"
      onChange={(e) => {
        fileUpload(
          e,
          props.uploadProps.setLoading!,
          props.uploadProps.fetchFunction,
          props.uploadProps.fetchCallBack,
          props.setUpload
        );
      }}
      onBlur={() => {
        props.uploadProps.setLoading!(false);
      }}
    />
  );
};

export default React.forwardRef(AtUpload);

const fileUpload = (
  event: ChangeEvent<HTMLInputElement>, // click event觸發動作
  onLoading: (boolean: boolean) => void, // 上傳檔案期間的modal
  fetchFunction: (uploadBlob) => Promise<any>, // 上傳的fetch，會傳的response會往下callBack丟
  fetchCallBack: (any) => void, // 執行完的fetch後續作業

  setUpload //更新畫面圖片/文字
) => {
  // 上傳檔案時新增一個modal
  onLoading(true);

  var reader = new FileReader();
  reader.readAsDataURL(event.target.files![0]);
  reader.onload = function () {
    fetchFunction(reader.result).then((res) => {
      var uploadString = fetchCallBack(res); //執行客製化作業內容
      setUpload((pre) => {
        return { ...pre, defaultValue: uploadString };
      });

      onLoading(false); //結束modal
    });
  };
  reader.onerror = function (error) {
    console.log("Error: ", error);
  };
};
