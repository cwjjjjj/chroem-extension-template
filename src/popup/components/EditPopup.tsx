import { useRecoilState } from "recoil";
import { currentHtmlInfoState, sharePopupState } from "../store";
import { css } from "@emotion/react";
import {
  Button,
  CenterPopup,
  CenterPopupProps,
  Image,
  Input,
  TextArea,
  Toast,
} from "antd-mobile";
import { useMutation } from "@tanstack/react-query";
import { POST_EDIT } from "../constants/api";
import { post } from "../utils";
import { Post } from "../types";
import { Dispatch, useEffect, useState } from "react";

export interface EditPopupProps extends CenterPopupProps {
  data: Post;
  visible: boolean;
  setVisible: Dispatch<boolean>;
  onRefresh?: () => void;
}

export default function EditPopup({
  data,
  visible,
  setVisible,
  onRefresh,
  ...props
}: EditPopupProps) {
  const [currentTabInfo, setCurrentTabInfo] = useState<Post>(data);

  const { mutateAsync } = useMutation({
    mutationFn: () => post(POST_EDIT, currentTabInfo),
    onSuccess: () => {
      setVisible(false);
      onRefresh?.();
    },
  });

  return (
    <CenterPopup
      visible={visible}
      onMaskClick={() => {
        setVisible(false);
      }}
      bodyStyle={{
        display: "grid",
      }}
      {...props}
    >
      <div
        css={css`
          padding: 10px;
          display: grid;
          gap: 5px;

          .title {
            opacity: 0.5;
          }
        `}
      >
        <label htmlFor="">
          <span className="title">标题</span>
          <TextArea
            placeholder="请输入标题"
            value={currentTabInfo?.title}
            onChange={(value) => {
              setCurrentTabInfo((prev) => ({
                ...prev,
                title: value,
              }));
            }}
            autoSize={{ minRows: 1, maxRows: 8 }}
          />
        </label>
        <hr />
        <label htmlFor="">
          <span className="title">内容</span>
          <TextArea
            placeholder="请输入内容"
            value={currentTabInfo?.summary}
            onChange={(value) => {
              setCurrentTabInfo((prev) => ({
                ...prev,
                summary: value,
              }));
            }}
            autoSize={{ minRows: 1, maxRows: 5 }}
          />
        </label>
        {/* {currentTabInfo?.image && (
          <Image src={currentTabInfo.image} fit="contain" />
        )} */}
      </div>
      <Button
        onClick={() => {
          console.log(currentTabInfo);
          mutateAsync();
        }}
        color="success"
      >
        确定修改
      </Button>
    </CenterPopup>
  );
}
