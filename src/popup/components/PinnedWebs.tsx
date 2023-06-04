import { HTMLAttributes } from "react";
import { getCurrentTab } from "../../utils/getCurrentTab";
import WebIcon, { WebIconType } from "./WebIcon";
import { css } from "@emotion/react";

export interface PinnedWebsProps extends HTMLAttributes<HTMLDivElement> {}

export const DEFAULT_PINNED_TABS: WebIconType[] = [
  {
    url: "https://web.okjike.com/",
    id: "1",
    favIconUrl: "https://web.okjike.com/favicon.ico",
  },
  {
    url: "https://www.bing.com/",
    id: "2",
    favIconUrl: "https://www.bing.com/favicon.ico",
  },
  {
    url: "https://www.douban.com/",
    id: "3",
    favIconUrl: "https://www.douban.com/favicon.ico",
  },
  {
    url: "https://www.zhihu.com/",
    id: "4",
    favIconUrl: "https://www.zhihu.com/favicon.ico",
  },
  {
    url: "https://www.bilibili.com",
    id: "5",
    favIconUrl: "https://www.bilibili.com/favicon.ico",
  },
  {
    url: "https://www.github.com",
    id: "6",
    favIconUrl: "https://www.github.com/favicon.ico",
  },
];

export default function PinnedWebs(props: PinnedWebsProps) {
  const handleAdd = async () => {
    const currentTab = await getCurrentTab();
    console.log("currentTab", currentTab);
  };

  return (
    <div
      {...props}
      css={css`
        height: 100%;
        width: 100%;
        overflow: auto;
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
        padding: 10px;
        align-content: flex-start;
        justify-content: flex-start;
      `}
    >
      {DEFAULT_PINNED_TABS.map((item) => (
        <WebIcon key={item.id} data={item} />
      ))}
    </div>
  );
}
