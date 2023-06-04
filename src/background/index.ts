import Browser from "webextension-polyfill";
import { DEFAULT_PINNED_TABS } from "../popup/globalState";

Browser.runtime.onInstalled.addListener(async (detail) => {
  // "install" | "update" | "browser_update"
  // 插件更新
  if (detail.reason === "update" || detail.reason === "browser_update") {
    return;
  }

  // 首次安装
  if (detail.reason === "install") {
    Browser.storage.local.set({ pinnedWebs: DEFAULT_PINNED_TABS });
  }
});
