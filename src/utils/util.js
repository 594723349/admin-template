// import Cookies from 'js-cookie';
import Moment from "moment";
// export const cookie = {
//     get(key) {
//         return Cookies.get(key);
//     },
//     set(key, val, opt) {
//         Cookies.set(key, val, opt);
//     },
//     remove(key) {
//         Cookies.remove(key);
//     }
// };
export const session = {
  get(key) {
    const value = sessionStorage.getItem(key);
    if (value) {
      return JSON.parse(value);
    }
    return undefined;
  },
  set(key, value) {
    return sessionStorage.setItem(key, JSON.stringify(value));
  },
  remove(key) {
    sessionStorage.removeItem(key);
  },
  clear() {
    sessionStorage.clear();
  },
};
/**
 * 类型判断
 */
export function typeOf(obj) {
  const toString = Object.prototype.toString;
  const map = {
    "[object Boolean]": "boolean",
    "[object Number]": "number",
    "[object String]": "string",
    "[object Function]": "function",
    "[object Array]": "array",
    "[object Date]": "date",
    "[object RegExp]": "regExp",
    "[object Undefined]": "undefined",
    "[object Null]": "null",
    "[object Object]": "object",
  };
  return map[toString.call(obj)];
}

/**
 * 过滤JSON对象中的值为undefined的字段
 */
export function filterUndefined(values, defValue) {
  if (typeOf(values) !== "object") return values;
  let obj = {};
  for (let k in values) {
    const val = values[k];
    if (val != null && val !== "") {
      obj[k] = val;
    } else {
      if (typeof defValue === "function") {
        obj[k] = defValue(k, val);
      } else if (defValue !== undefined) {
        obj[k] = defValue;
      }
    }
  }
  return obj;
}

// 加法
export function accAdd(arg1, arg2) {
  let r1, r2, m;
  try {
    r1 = arg1.toString().split(".")[1].length;
  } catch (e) {
    r1 = 0;
  }
  try {
    r2 = arg2.toString().split(".")[1].length;
  } catch (e) {
    r2 = 0;
  }
  m = 10 ** Math.max(r1, r2);
  return (arg1 * m + arg2 * m) / m;
}

// 减法
export function Subtr(arg1, arg2) {
  let r1, r2, m, n;
  try {
    r1 = arg1.toString().split(".")[1].length;
  } catch (e) {
    r1 = 0;
  }
  try {
    r2 = arg2.toString().split(".")[1].length;
  } catch (e) {
    r2 = 0;
  }
  m = 10 ** Math.max(r1, r2);
  // last modify by deeka
  // 动态控制精度长度
  n = r1 >= r2 ? r1 : r2;
  return ((arg1 * m - arg2 * m) / m).toFixed(n);
}

// 乘法
export function accMul(arg1, arg2) {
  let m = 0;
  const s1 = arg1.toString();
  const s2 = arg2.toString();
  try {
    m += s1.split(".")[1].length;
  } catch (error) {
    m = 0;
  }
  try {
    m += s2.split(".")[1].length;
  } catch (error) {
    m = 0;
  }
  return (Number(s1.replace(".", "")) * Number(s2.replace(".", ""))) / 10 ** m;
}

// 除法
export function accDiv(num1, num2) {
  var t1, t2, r1, r2;
  try {
    t1 = num1.toString().split(".")[1].length;
  } catch (e) {
    t1 = 0;
  }
  try {
    t2 = num2.toString().split(".")[1].length;
  } catch (e) {
    t2 = 0;
  }
  r1 = Number(num1.toString().replace(".", ""));
  r2 = Number(num2.toString().replace(".", ""));
  return (r1 / r2) * Math.pow(10, t2 - t1);
}
/**
 * 数组去重
 */
export function distinct(arr1, arr2) {
  let arr = arr1.concat(arr2);
  let newArr = [];
  let obj = {};

  for (let i of arr) {
    if (!obj[i]) {
      newArr.push(i);
      obj[i] = 1;
    }
  }
  return newArr;
}
/**
 * 格式化时间戳
 * @param {String || Number} data 时间戳
 * @param {String} format 时间格式
 * @param {String} type s: data为秒数 sm: data为毫秒
 */
export function formatDate(date, format = "YYYY-MM-DD HH:mm:ss", type = "s") {
  if (date === "") {
    return "";
  } else {
    if (typeof date === "number") {
      date = type === "s" ? new Date(date * 1000) : new Date(date);
    }
    return Moment(date).format(format);
  }
}
/**
 * ××小时××分钟
 */
export function formatDates(date, format = "HH小时mm分钟", type = "s") {
  if (date === "") {
    return "";
  } else {
    if (typeof date === "number") {
      date = type === "s" ? new Date(date * 1000) : new Date(date);
    }
    return Moment(date).format(format);
  }
}
/**
 * 深拷贝
 */
export function deepCopy(data) {
  try {
    const proto = Object.getPrototypeOf(data);
    return Object.assign({}, Object.create(proto), data);
  } catch (error) {
    console.warn("不是一个对象");
    return data;
  }
}
/**
 * 将对象转换为数组
 */
export function changeArr(data) {
  var arr = [];
  for (let i in data) {
    arr.push(data[i]);
  }
  return arr;
}
