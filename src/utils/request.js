import axios from "axios";
import { AesEncrypt, AesDecrypt, rsaDecrypt } from "@/utils/encryptUtil";
import { isString } from "@/utils/util";
import { VueAxios } from "./axios";
import ViewUI from "view-design";
let baseURL = "";
if (process.env.NODE_ENV === "testing") {
  // 测试环境
  baseURL = "http://192.168.102.245:30552";
} else if (process.env.NODE_ENV === "production") {
  // 生产环境
  baseURL = "http://192.168.108.106:8002";
} else {
  // 开发环境
  baseURL = "http://192.168.108.106:8002";
}
// 创建 axios 实例
const service = axios.create({
  baseURL: baseURL, // api base_url 测试
  headers: { "Content-Type": "application/json;charset=utf-8" }, //即将被发送的自定义请求头
  withCredentials: true, //表示跨域请求时是否需要使用凭证
  timeout: 60000 // 请求超时时间
});
// 跨域请求，允许保存cookie
axios.defaults.withCredentials = true;

const err = error => {
  if (error.response) {
    //状态码
    const status = error.response.status;
    if (status === 401) {
      ViewUI.Message.error({
        title: "登录超时，请重新登录",
        icon: "none",
        duration: 1500
      });
    } else {
      ViewUI.Message.error({
        title: "连接服务器失败，请稍后重试",
        icon: "none",
        duration: 1500
      });
    }
  }
  return Promise.reject(error);
};

// request interceptor
service.interceptors.request.use(config => {
  const token = localStorage.getStorageSync("ACCESS_TOKEN");
  if (token) {
    config.headers.Authorization = "Bearer " + token; // 让每个请求携带自定义 token 请根据实际情况自行修改
  }

  if (
    config.method == "post" &&
    config.params.encrypt &&
    config.params.mode === "AES"
  ) {
    if (isString(config.data)) {
      config.data = AesEncrypt(config.data);
    } else {
      let fanalData = AesEncrypt(JSON.stringify(config.data));
      config.data = fanalData;
    }
  }
  //console.log("请求拦截器 final发送:"+JSON.stringify(config.data))
  return config;
}, err);

// response 拦截器
service.interceptors.response.use(response => {
  let encmode = response.data.mode;
  // // 后端返回字符串表示需要解密操作
  // console.log('response.data');
  // console.log(response.data);
  if (encmode === "RSA") {
    localStorage.getStorage({
      key: "RSA_PRV_KEY",
      success: function(res) {
        const prvKey = res.data;
        const rdata = rsaDecrypt(response.data.data, prvKey).replace(
          /[\r\n\s]/g,
          ""
        );
        response.data.data = JSON.parse(rdata);
      }
    });
  }

  if (encmode === "AES") {
    let aa = AesDecrypt(response.data.data).replace(/[\r\n\s]/g, "");
    response.data.data = JSON.parse(aa);
  }
  // console.log(response.data);
  return response.data;
}, err);

const installer = {
  vm: {},
  install(Vue) {
    Vue.use(VueAxios, service);
  }
};

export { installer as VueAxios, service as axios };
