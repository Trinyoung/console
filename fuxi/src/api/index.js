import axios from "axios";
import router from "../router";
import * as Sentry from "@sentry/browser";
import { getTokenName, encryptNormal, encryptJson } from "./config";
import { Message } from "element-ui";
import { computeSign } from "@akc/sign";
import { loading } from "../commons/loading";
import Cookies from "js-cookie";

import {
  getToken,
  getEnvIdentity,
} from "@/commons/utils";
let httpCount = 0;

/**
 * 获取签名
 * @param {*} config
 */
function getSign(config) {
  let time = new Date().getTime();
  if (!config.params) {
    config.params = {};
  }
  config.params.time = time;
  if (config.newSign) {
    config.headers["Content-Type"] = "";
    config = computeSign(config);
    return config;
  }
  if (config.method.toLowerCase() === "get") {
    config.params = Object.assign(config.params, config.data);
    config.params.sign = encryptNormal(config.params);
    config.headers["Content-Type"] = "";
    return config;
  }

  if (
    config.headers["Content-Type"] &&
    config.headers["Content-Type"].indexOf("multipart") !== -1
  ) {
    config.params = Object.assign(config.params, config.data);
    config.params.sign = encryptNormal(config.params);
    return config;
  }
  // 说明是application/json请求方式
  if (config.headers.common.Accept.indexOf("json") !== -1) {
    if (typeof config.data === "undefined" || config.data == null) {
      config.params.sign = encryptJson(time);
    } else {
      config.params.sign = encryptJson(JSON.stringify(config.data) + time);
    }
  } else {
    config.params = Object.assign(config.params, config.data);
    config.params.sign = encryptNormal(config.params);
  }
  return config;
}

/**
 * 请求拦截器
 */
axios.interceptors.request.use(
  function (config) {
    if (!config.noToken) {
      let tokenName = getTokenName(config.url);
      config.headers[tokenName] = getToken();
    }
    if (
      config.url.indexOf("stable") > -1 ||
      (config.baseURL && config.baseURL.includes("stable")) ||
      location.hostname.match(/^\d+\.\d+\.\d+\.\d+$/)
    ) {
      const envIdentity = getEnvIdentity();
      envIdentity && (config.headers["X-Hades-Env-Identity"] = envIdentity);
    }
    if (!config.timeout) {
      config.timeout = 30000;
    }
    if (!config.noLoading && !config.noGlobalLoading) {
      openLoading();
    }
    let shopCode =
      sessionStorage.getItem("merActiveShop") || Cookies.get("merActiveShop");
    if (shopCode) {
      config.headers.shopCode = shopCode;
    }
    return getSign(config);
  },
  function (error) {
    return Promise.reject(error);
  }
);

/**
 * 接口处理
 * @param resp
 * @param resolve
 */
function successHandler(resp, resolve, reject) {
  if (resp.request.responseType === "arraybuffer") {
    if (
      resp.headers &&
      resp.headers["content-type"] &&
      resp.headers["content-type"].indexOf("application/json") > -1
    ) {
      let reader = new FileReader();
      reader.onload = (e) => {
        errorHandler(
          {
            data: JSON.parse(e.target.result),
            status: 200,
          },
          reject
        );
      };
      reader.readAsText(new Blob([resp.data]));
    } else {
      resolve(resp);
    }
  } else {
    if (
      resp.data.code - 0 === 0 ||
      resp.data.success ||
      resp.config.pass ||
      resp.data.status === "success"
    ) {
      resolve(resp.data);
    } else {
      errorHandler(resp, reject);
    }
  }
}

/**
 * 错误接口处理
 * @param resp
 */
function errorHandler(resp = {}, reject) {
  const { config = {}, data = {}, status, statusText } = resp;
  switch (status) {
    case 200:
      Sentry.withScope((scope) => {
        scope.setTag("api.path", config.url);
        scope.setExtra("API_CONFIG", config);
        scope.setExtra("API_DATA", data);
        scope.setLevel("error");
        Sentry.captureException(new Error("API ERROR"));
      });
      if (config.passErr || config.pass) {
        reject(resp);
      } else if (config.passErrN) {
        Message({
          title: "提示",
          message: `<p>${
            data.message.replace(/;/g, "\n") || data.msg || "系统异常"
          }</p>`,
          type: "error",
          duration: 3000,
          dangerouslyUseHTMLString: true,
        });
      } else {
        Message({
          title: "提示",
          message: `${data.message || data.msg || "系统异常"}`,
          type: "error",
          duration: 3000,
        });
        if (!config.noGlobalLoading) {
          closeLoading();
        }
        reject(data);
      }
      if (data.code === 401) {
        parent.window.postMessage(
          {
            jump: "/login.html",
          },
          "*"
        );
        router.push({
          path: "/",
        });
      }
      break;
    case 401:
      Sentry.withScope((scope) => {
        scope.setTag("api.path", config.url);
        scope.setExtra("API_CONFIG", config);
        scope.setExtra("API_DATA", data);
        scope.setLevel("error");
        Sentry.captureException(new Error("API ERROR"));
      });
      Message({
        title: "提示",
        message: `异常信息：${status}—${statusText}`,
        type: "error",
        duration: 3000,
      });
      if (!config.noGlobalLoading) {
        closeLoading();
      }
      parent.window.postMessage(
        {
          jump: "/login.html",
        },
        "*"
      );
      router.push({
        path: "/",
      });
      break;
    case undefined:
      Message({
        title: "提示",
        message: "异常信息：系统异常",
        type: "error",
        duration: 3000,
      });
      if (!config.noGlobalLoading) {
        closeLoading();
      }
      break;
    default:
      Sentry.withScope((scope) => {
        scope.setTag("api.path", config.url);
        scope.setExtra("API_CONFIG", config);
        scope.setExtra("API_DATA", data);
        scope.setLevel("error");
        Sentry.captureException(new Error("API ERROR"));
      });
      if (config.pass) {
        reject(data);
      } else {
        Message({
          title: "提示",
          message: `异常信息：${status}—${
            data.message || data.msg || data.error || statusText || "系统异常"
          }`,
          type: "error",
          duration: 3000,
        });
        if (!config.noGlobalLoading) {
          closeLoading();
        }
      }
      break;
  }
  reject(data);
}

/**
 * 为全局对象Vue绑定fetch函数
 * @param apiName
 * @param params
 * @returns {*}
 */
export const fetch = (item) => {
  return new Promise((resolve, reject) => {
    if (
      !item.hasOwnProperty("method") ||
      item.method.toUpperCase() === "GET" ||
      item.method.toUpperCase() === "DELETE" ||
      item.method.toUpperCase() === "PUT"
    ) {
      item.params = item.hasOwnProperty("params") ? item.params : item.data;
    }
    axios(item)
      .then((resp) => {
        successHandler(resp, resolve, reject);
      })
      .catch((err) => {
        if (!err.response) {
          const { config = {} } = err;
          Sentry.withScope((scope) => {
            scope.setTag("api.path", config.url);
            scope.setExtra("API_CONFIG", config);
            scope.setLevel("error");
            Sentry.captureException(new Error("NETWORK ERROR"));
          });
        }
        errorHandler(err.response, reject);
      });
  }).finally(() => {
    if (!item.noGlobalLoading) {
      closeLoading();
    }
  });
};

/**
 * 打开加载浮层
 */
function openLoading() {
  if (httpCount === 0) {
    loading.open();
  }
  httpCount++;
}

/**
 * 关闭加载浮层
 */
function closeLoading() {
  if (httpCount > 0) {
    httpCount--;
  }
  if (httpCount === 0) {
    loading.close();
  }
}
