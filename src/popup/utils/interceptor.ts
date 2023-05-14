import Axios, { AxiosError, AxiosRequestConfig } from "axios";
import axios from "axios";
import buildHost from "./buildHost";
import { Toast } from "antd-mobile";
import Browser from "webextension-polyfill";
import { router } from "../App";

export const COLINK_HOST = "https://colink.codefuture.top/";

export const ACCESS_TOKEN_KEY = "x-jike-access-token";
export const REFRESH_TOKEN_KEY = "x-jike-refresh-token";
export const HOST = buildHost(COLINK_HOST);
export const BASE_URL = `${HOST}v1`;

export const axiosInstance = Axios.create({
  withCredentials: true,
  baseURL: BASE_URL,
});

let _accessToken =
  (await Browser.storage.local.get(ACCESS_TOKEN_KEY))[ACCESS_TOKEN_KEY] ?? "";
let _refreshToken =
  (await Browser.storage.local.get(REFRESH_TOKEN_KEY))[REFRESH_TOKEN_KEY] ?? "";

export function setToken(accessToken: string, refreshToken: string) {
  _accessToken = accessToken;
  _refreshToken = refreshToken;
  Browser.storage.local.set({ [ACCESS_TOKEN_KEY]: accessToken });
  Browser.storage.local.set({ [REFRESH_TOKEN_KEY]: refreshToken });
}

//  创建一个新的axios实例对象  这样做的目的就是 不会进入之前的请求拦截和响应 防止进入死循环
export const refreshTokenAxiosClient = axios.create();

export async function refreshTokenRequest() {
  try {
    const res = await refreshTokenAxiosClient({
      method: "GET",
      url: `${HOST}app_auth_tokens.refresh`,
      headers: {
        [REFRESH_TOKEN_KEY]: _refreshToken,

        // ["x-jike-access-token-timeout"]: 10,
      },
    });
    if (res.status < 400) {
      setToken(res.data[ACCESS_TOKEN_KEY], res.data[REFRESH_TOKEN_KEY]);
    } else {
      throw new Error("refresh token error");
    }
  } catch (error) {
    if ((error as AxiosError).response?.status === 401) {
      // window.location.replace("index.html");
      // console.log("401");
      // redirect("./mine");
      // console.log("error", error);
      router.navigate("/login");

      return error;
    }
  }
}

async function fillHeaders(config: AxiosRequestConfig) {
  return {
    ...config,
    headers: {
      ...config.headers,
      [ACCESS_TOKEN_KEY]: _accessToken,
      [REFRESH_TOKEN_KEY]: _refreshToken,
      // [ACCESS_TOKEN_KEY]:
      //   (await Browser.storage.local.get(ACCESS_TOKEN_KEY))[ACCESS_TOKEN_KEY] ??
      //   "",
      // [REFRESH_TOKEN_KEY]:
      //   (await Browser.storage.local.get(REFRESH_TOKEN_KEY))[
      //     REFRESH_TOKEN_KEY
      //   ] ?? "",
      // ["x-jike-access-token-timeout"]: 10,
    },
  };
}

axiosInstance.interceptors.request.use(async (config: any) => {
  try {
    config = await fillHeaders(config);
    return config;
  } catch (e) {
    console.error("in request interceptor catch", e);
    throw e;
  }
});

axiosInstance.interceptors.response.use(
  async (res) => {
    if (res.status < 400) {
      if (res.headers[ACCESS_TOKEN_KEY] && res.headers[REFRESH_TOKEN_KEY]) {
        setToken(res.headers[ACCESS_TOKEN_KEY], res.headers[REFRESH_TOKEN_KEY]);
      }
      return res;
    }
    return res;
  },

  async (error: AxiosError<{ success?: boolean; toast?: string }>) => {
    console.log("err", error, error.response?.data.toast);
    if (error.response?.data.toast && error.response?.status !== 401) {
      Toast.show({
        content: error.response?.data.toast,
        position: "bottom",
      });
    }
    if (error.response?.status === 401) {
      return new Promise(async (resolve, reject) => {
        await refreshTokenRequest();
        setTimeout(() => {
          fillHeaders(error?.config ?? {})
            .then((config: any) =>
              axiosInstance.request(config).then(resolve).catch(reject)
            )
            .catch((err) => {});
        }, 1000);
      });
    }

    return Promise.reject(error);
  }
);
