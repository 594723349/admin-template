import axios from "axios";
import { session } from "./util";
import Message from "ant-design-vue/es/message";
const baseURL = "";
const instance = axios.create({
  baseURL,
  timeout: 6000,
});

instance.__proto__ = axios;

instance.interceptors.request.use((config) => {
  // config.headers.Authorization = window.sessionStorage.getItem('token')
  const { params, data } = config;
  config.headers["token"] = session.get("token");
  return config;
});
instance.interceptors.response.use(
  (response) => {
    let { data } = response.data;
    switch (data.code) {
      case 0:
        return Promise.resolve(data);
      default:
        if (data.msg) {
          Message.warning(data.msg, 2);
        }
        return Promise.reject({ ...data, msg: data.msg });
    }
  },
  (error) => {
    const response = error.response;
    return Promise.reject(response.data);
  },
);
/**
 * 执行并发请求
 * @param {Array} request 请求方法
 * @param {Array} cbs 请求完成后的回调方法
 * @return {Promise}
 */
function all(request, cbs) {
  return new Promise((resolve, reject) => {
    instance
      .all(request)
      .then(
        instance.spread(function() {
          let arg = [...arguments];
          if (Array.isArray(cbs)) {
            cbs.forEach((fn, index) => fn(arg[index]));
          }
          resolve(arg);
        }),
      )
      .catch((err) => {
        reject(err);
      });
  });
}
const get = (url, params, config = {}) => instance.get(url, { ...config, params });
// const deletes = (url, params, config = {}) => instance.delete(url, { ...config, params });
const post = (url, params, config = {}) => instance.post(url, params, config);
// const put = (url, params, config = {}) => instance.put(url, params, config);
export default {
  get,
  deletes,
  post,
  put,
  all,
};
