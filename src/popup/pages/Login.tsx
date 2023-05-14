import { css } from "@emotion/react";
import { useNavigate } from "react-router-dom";
import { get, post } from "../utils";
import { Button, CapsuleTabs, Input, Toast } from "antd-mobile";
import { useEffect, useState } from "react";
import {
  GET_QR_CODE,
  LOGIN_OR_SIGNUP,
  QR_CODE_STATUS,
  SEND_VERIFY_CODE,
  USER_PROFILE,
} from "../constants/api";
import { useQuery } from "@tanstack/react-query";
import QRCode from "react-qr-code";
import { User } from "../types";
import { UndoOutline } from "antd-mobile-icons";
import { throttle } from "lodash";
import { refreshTokenRequest } from "../utils/interceptor";
import { useRecoilState } from "recoil";
import { userState } from "../store";

export interface QRCodeData {
  expAt: number;
  qrCode: string;
  sceneId: string;
}

export type LoginType = "qrCode" | "phoneNumber";

export default function Login() {
  const navigator = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState<string>();
  const [verifyCode, setVerifyCode] = useState<string>();
  const [isExpired, setIsExpired] = useState(false);
  const [loginType, setLoginType] = useState<LoginType>("qrCode");
  const [phoneLoginStet, setPhoneLoginStet] = useState<"input" | "verify">(
    "input"
  );
  const [user, setUser] = useRecoilState(userState);

  const [refetchInterval, setRefetchInterval] = useState<number | false>(1000);

  const refreQRCode = throttle(async () => {
    if (isLoading) {
      return;
    }
    await refetch();
    setIsExpired(false);
  }, 5000);

  const loginSuccess = () => {
    Toast.show({
      content: "登录成功",
    });
    get<{ success: boolean; data: User }>(USER_PROFILE).then((res) => {
      console.log("login", res.data.data);
      if (res.data.data.nickname && res.data.data.avatar) {
        setUser(res.data.data);
        navigator("../explore");
      } else {
        navigator("../profile-setting");
      }
    });
    // setTimeout(() => {
    // navigator("../explore");
    // }, 2000);
  };

  const {
    data: qrCodeData,
    error,
    refetch,
    isLoading,
  } = useQuery<QRCodeData & { success: boolean }>({
    queryKey: [GET_QR_CODE],
    queryFn: async () => post(GET_QR_CODE).then((res) => res.data.data),
    onError: (err) => {
      Toast.show({
        content: "获取二维码失败 请稍后重试",
      });
    },
    refetchOnWindowFocus: false,
  });

  const { data: loginStatus } = useQuery<{
    success: boolean;
    status: string;
    user?: User;
  }>({
    queryKey: [QR_CODE_STATUS],
    queryFn: async () =>
      get(QR_CODE_STATUS, {
        params: { sceneId: qrCodeData?.sceneId },
      }).then((res) => res.data),
    refetchInterval: refetchInterval,
    onSuccess: (data) => {
      if (data.success && data.status === "done") {
        setRefetchInterval(false);
        loginSuccess();
      }
    },
    enabled: !!qrCodeData,
  });

  useEffect(() => {
    let timer = setInterval(() => {
      const now = Date.now();
      const expiredTime = qrCodeData?.expAt;
      console.log(now, expiredTime);
      if (expiredTime && now >= expiredTime) {
        setIsExpired(true);
        setRefetchInterval(false);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [qrCodeData]);

  return (
    <div
      css={css`
        .code-wrap {
          height: 100%;
          display: grid;
          justify-content: center;
          position: relative;
        }
        .mask {
          height: 256px;
          width: 256px;
          opacity: 0.8;
        }
        .refresh {
          position: absolute;
          z-index: 1;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          display: grid;
          justify-items: center;
          align-items: center;
          color: white;
          font-weight: 800;
          font-size: 18px;
        }
        main {
          padding: 20px 0;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      `}
    >
      <header>
        <CapsuleTabs
          activeKey={loginType}
          onChange={(key) => {
            setLoginType(key as LoginType);
          }}
        >
          <CapsuleTabs.Tab title="手机号" key="phoneNumber" />
          <CapsuleTabs.Tab title="扫码登录" key="qrCode" />
        </CapsuleTabs>
      </header>

      <hr />

      <main>
        {loginType === "phoneNumber" && (
          <section>
            {phoneLoginStet === "input" && (
              <div
                css={css`
                  display: grid;
                  gap: 5px;
                `}
              >
                手机号：
                <Input
                  value={phoneNumber}
                  onChange={setPhoneNumber}
                  placeholder="请输入手机号"
                  maxLength={11}
                />
                <Button
                  onClick={() => {
                    console.log({ phoneNumber });
                    post(SEND_VERIFY_CODE, {
                      phoneNumber,
                    }).then((res) => {
                      setPhoneLoginStet("verify");
                    });
                  }}
                  disabled={phoneNumber?.length !== 11}
                >
                  获取验证码
                </Button>
              </div>
            )}
            {phoneLoginStet === "verify" && (
              <div
                css={css`
                  display: grid;
                  gap: 5px;
                `}
              >
                <Input
                  value={verifyCode}
                  onChange={setVerifyCode}
                  placeholder="请输入验证码"
                />
                <Button
                  onClick={() => {
                    post(LOGIN_OR_SIGNUP, {
                      phoneNumber,
                      verifyCode,
                    }).then((res) => {
                      if (res.data.success) {
                        loginSuccess();
                      }
                    });
                  }}
                >
                  登录
                </Button>
              </div>
            )}
          </section>
        )}

        {loginType === "qrCode" && (
          <div className="code-wrap">
            {isExpired ? (
              <div className="mask">
                <QRCode
                  size={256}
                  value={""}
                  css={css`
                    filter: blur(8px);
                  `}
                />
                <div className="refresh" onClick={refreQRCode}>
                  <UndoOutline
                    css={css`
                      height: 100px;
                      width: 100px;
                      color: white;
                    `}
                  />
                  <div>点击刷新</div>
                </div>
              </div>
            ) : (
              <div>
                {qrCodeData?.qrCode && (
                  <QRCode size={256} value={qrCodeData?.qrCode} />
                )}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
