export default class AtFileUpload {
  uploadUrl: string; // 依據專案需求，上傳
  constructor(uploadUrl: string) {
    this.uploadUrl = uploadUrl;
  }

  uploadFile = (
    file,
    successCallBack: (fileUrl: string) => {},
    errorCallBack: (expect: string) => {},
    finalCallBack: () => {}
  ): string => {
    var postData = new FormData();
    postData.append("file", file);
    postData.append("type", "classCover");

    var returnLog = "";
    fetch(this.uploadUrl, {
      method: "post",
      body: postData,
    })
      .then((e) => e.text())

      //成功回傳檔案URL位置
      .then((response) => {
        successCallBack(response);
        returnLog = response;
      })

      //失敗回傳exception
      .catch((expect) => {
        errorCallBack(expect);
        returnLog = expect;
      })

      // 不管上傳成功失敗都執行final
      .finally(() => {
        finalCallBack;
      });

    return returnLog;
  };

  public static toBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };
}
