/*
 * @Description: 下载
 * @Author: chenxiaofan
 * @Date: 2020-01-13 12:43:03
 * @LastEditors  : chenxiaofan
 * @LastEditTime : 2020-01-14 17:01:04
 * @FilePath: \leigod_admin_front\src\utils\download.js
 */
function download(data, type, headerType) {
  let suffix = '';
  switch (type) {
    case 'excel': 
      headerType = headerType ? headerType : 'application/vnd.ms-excel';
      suffix = '.xlsx';
      break;
  }
  console.log(headerType);
  let blob = new Blob([data], { type: headerType });
  let filename = "download" + suffix;
  let a = document.createElement('a');
  let url = window.URL.createObjectURL(blob);
  a.href = url;
  a.download = filename;
  let body = document.getElementsByTagName('body')[0];
  body.appendChild(a);
  a.click();
  body.removeChild(a);
  window.URL.revokeObjectURL(url);
}
/**
 * 二进制流转成JSON
 * @param {Object} data 请求响应值
 * @return {Object} 
 * {
 *    data: Any // 响应值，原始值或转成JSON格式的ArrayBuffer
 *    isJSON: Boolean // 是否是JSON
 * }
 */
function arrayBufferToJson(data) {
  let d = null;
  let isJSON = true;
  try {
    let enc = new TextDecoder('utf-8');
    d = JSON.parse(enc.decode(new Uint8Array(data)));
  } catch {
    d = data;
    isJSON = false;
  }
  return {
    data: d,
    isJSON,
  };
}
export {download, arrayBufferToJson};