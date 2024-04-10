//引用path模組
const path = require("path");
module.exports = {
  //這個webpack打包的對象，這裡面加上剛剛建立的index.js
  entry: {
    index: "./index.js",
  },
  output: {
    //這裡是打包後的檔案名稱
    filename: "bundle.js",
    //打包後的路徑，這裡使用path模組的resolve()取得絕對位置，也就是目前專案的根目錄
    path: path.resolve("./"),
  },
  resolve: {
    // 👇️ Add `.ts` and `.tsx` as a resolvable extension.
    extensions: [".ts", ".tsx", ".js", ".d.ts"],
    // fallback: {
    //   "fs": false,
    //   "tls": false,
    //   "net": false,
    //   "path": false,
    //   "zlib": false,
    //   "http": false,
    //   "https": false,
    //   "stream": false,
    //   "crypto": false,
    //   "crypto-browserify": require.resolve('crypto-browserify'), //if you want to use this module also don't forget npm i crypto-browserify
    // }
  },
  module: {
    rules: [
      // 👇️ all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
      { test: /\.tsx?$/, loader: "ts-loader" },
    ],
  },
};
