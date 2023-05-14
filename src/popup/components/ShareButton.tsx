import React, { useEffect, useRef, useState } from "react";
import { Button, CenterPopup, Image, Input, Loading, Toast } from "antd-mobile";
import { HTMLAttributes } from "react";
import { useRecoilState } from "recoil";
import { currentHtmlInfoState, sharePopupState } from "../store";
import { getCurrentTab } from "../utils/getCurrentTab";
import { getLinkPreview } from "link-preview-js";
import { get, post } from "../utils";
import {
  CREATE_POST,
  FOLLOW_POST_LIST,
  GET_BILIBILI_IMG,
} from "../constants/api";
import { handleUpload } from "../utils/upload";
import { isEmpty } from "lodash";
import { css } from "@emotion/react";
import { needToRefreshState } from "../store/index";

const VIDEOWEB = ["youtube.com", "bilibili.com"];

export const getBILIBILIIMG = async (url: string) => {
  const pattern = /^.*bilibili\.com\/video\/(\w+).*$/;

  const match = url.match(pattern);
  if (match) {
    const videoId = match[1];
    const res = await get(`${GET_BILIBILI_IMG}${videoId}`);
    return res.data.data.pic;
  } else {
    console.log("URL 不符合要求");
    return null;
  }
};

export interface SharePopupProps extends HTMLAttributes<HTMLDivElement> {}

export default ({ children, ...props }: SharePopupProps) => {
  const [loading, setIsLoading] = useState(false);
  const [ready, setReady] = useState(false);
  const [needToRefresh, setneedToRefresh] = useRecoilState(needToRefreshState);

  const [currentTabInfo, setCurrentTabInfo] =
    useRecoilState(currentHtmlInfoState);

  const handleHtmlInfo = async () => {
    const tabInfo = await getCurrentTab();
    const { url, title, favIconUrl } = tabInfo ?? {};
    if (!url) {
      return;
    }
    try {
      const htmlInfo = await getLinkPreview(url);
      const BILIBILIIMG = await getBILIBILIIMG(url);
      if (BILIBILIIMG) {
        // @ts-ignore
        htmlInfo.images = [BILIBILIIMG];
      }
      setCurrentTabInfo(Object.assign({}, htmlInfo, tabInfo));
      setReady(true);
    } catch (error) {
      console.log("error", error);
      setCurrentTabInfo(tabInfo);
      setReady(true);
    }
  };

  const sharePost = (data: any) => {
    setIsLoading(true);
    if (isEmpty(data)) {
      Toast.show({
        content: "分享网页信息失败",
      });
      return;
    }
    return post(CREATE_POST, {
      url: data.url,
      title: data.title,
      summary: data.description,
      imageFileInfo: data?.imageFileInfo,
      type: data?.type,
    }).then((res) => {
      setIsLoading(false);
      setneedToRefresh(true);
      Toast.show({
        content: "分享成功",
      });
    });
  };

  useEffect(() => {
    handleHtmlInfo();
  }, []);

  return (
    <div>
      <Button
        onClick={async () => {
          setIsLoading(true);
          const webUrl = currentTabInfo.url;
          if (!webUrl) {
            Toast.show({
              content: "分享失败",
            });
            return;
          }
          const isVideoWeb = VIDEOWEB.some((item) => webUrl.includes(item));

          const imgUrl = currentTabInfo?.images?.[0];
          if (isVideoWeb && imgUrl) {
            console.log("weburl", webUrl, isVideoWeb);

            fetch(imgUrl)
              .then((response) => response.blob())
              .then((blob) => handleUpload(blob as unknown as File))
              .then((res) => {
                setCurrentTabInfo((prev) => ({
                  ...prev,
                  imageFileInfo: res,
                }));
                sharePost({
                  ...currentTabInfo,
                  imageFileInfo: res,
                  type: "VIDEO",
                });
              });
          } else {
            sharePost(currentTabInfo);
          }
        }}
        color="success"
        size="mini"
        disabled={!ready || loading}
      >
        <div
          css={css`
            width: 80px;
          `}
        >
          {!loading ? (
            "分享当前网页"
          ) : (
            <>
              分享中
              <Loading />
            </>
          )}
        </div>
      </Button>
    </div>
  );
};
