import { css } from "@emotion/react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Meun from "./Meun";
import { useQuery } from "@tanstack/react-query";
import { USER_PROFILE } from "../constants/api";
import { get } from "../utils";
import { User } from "../types";
import { useRecoilState } from "recoil";
import { userState } from "../store";
import { useEffect } from "react";
import { refreshTokenRequest } from "../utils/interceptor";
import Header from "./Header";

export default function Layout() {
  const location = useLocation();
  const navigator = useNavigate();
  const [user, setUser] = useRecoilState(userState);
  console.log("location", location.pathname);

  const { data: profile } = useQuery({
    queryKey: [USER_PROFILE],
    queryFn: async () =>
      get<{ success: boolean; data: User }>(USER_PROFILE).then(
        (res) => res.data.data
      ),
    onSuccess: (data) => {
      setUser(data);
      if (!data?.nickname || !data?.avatar) {
        navigator("./profile-setting");
      }
    },
    onError: (err) => {
      console.log("err", err);
    },
  });

  useEffect(() => {
    refreshTokenRequest()
      .then((res) => {
        if ((res as any)?.response.status === 401) {
          navigator("../login");
        }
      })
      .catch((err) => {});
  }, []);

  return (
    <div
      css={css`
        height: 100%;
      `}
    >
      <main
        css={css`
          height: calc(100% - 50px);
        `}
      >
        <Header />
        <Outlet />
      </main>
      {location.pathname !== "/profile-setting" &&
        location.pathname !== "/login" && <Meun />}
    </div>
  );
}
