export interface AtJsonResponse<T> {
  isSussecced: boolean; // 是否成功
  data: T; //回傳物件
  desc: string; //描述
  redirect: string; // 跳轉網址
}
