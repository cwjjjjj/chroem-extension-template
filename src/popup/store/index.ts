import { atom } from "recoil";
import { UrlData } from "../components/PreviewUrl";
import { User } from "../types";

export const sharePopupState = atom({
  key: "sharePopupState",
  default: false,
});

export const currentHtmlInfoState = atom<UrlData>({
  key: "currentHtmlInfoState",
  default: {},
});

export const userState = atom<User>({
  key: "userState",
  default: undefined,
});

export const needToRefreshState = atom({
  key: "needToRefreshState",
  default: false,
});
