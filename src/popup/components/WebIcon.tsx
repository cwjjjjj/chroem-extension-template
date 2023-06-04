import { css } from "@emotion/react";
import { HTMLAttributes, useEffect, useState } from "react";
import { AddSquareOutline, CloseOutline } from "antd-mobile-icons";
import { getCurrentTab } from "../../utils/getCurrentTab";
import { useRecoilState } from "recoil";
import { currentTabState } from "../globalState";

export interface WebIconType {
  url: string;
  id: string;
  favIconUrl?: string;
}

export interface WebIconProps extends HTMLAttributes<HTMLDivElement> {
  data?: WebIconType;
  add?: boolean;
}

export default function WebIcon({ data, add = false, ...props }: WebIconProps) {
  const [showCloseIcon, setShowCloseIcon] = useState(false);
  const [currentTab, setCurrentTab] = useRecoilState(currentTabState);

  useEffect(() => {
    console.log("currentTab", currentTab);
  }, []);

  const handleClick = async (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.stopPropagation();
    if (add) {
      const currentTab = await getCurrentTab();
      console.log("currentTab", currentTab);
    }
    if (!add && data) {
      window.open(data.url);
    }
  };

  return (
    <div
      css={css`
        min-height: 44px;
        /* max-height: 60px; */
        min-width: 44px;
        /* max-width: 60px; */
        height: 100%;
        flex: 1;
        cursor: pointer;
        position: relative;
        border-radius: 12px;
        background: rgba(0, 0, 0, 0.15);
        display: flex;
        align-items: center;
        justify-content: center;

        &:hover .addIcon::after {
          content: "固定当页";
          position: absolute;
          left: 50%;
          top: 0;
          white-space: nowrap;
          transform: translate(-50%, 0);
          color: white;
          z-index: 10;
          background-color: rgba(0, 0, 0, 0.6);
          border-radius: 4px;
          padding: 2px 4px;
        }

        .favIconImg {
          height: 20px;
          width: 20px;
          object-fit: contain;
          pointer-events: none;
          color: white;
        }

        .closeIcon {
          position: absolute;
          width: 12px;
          height: 12px;
          right: 3px;
          top: 3px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.25);
          padding: 2px;
        }
      `}
      {...props}
      onMouseEnter={() => setShowCloseIcon(true)}
      onMouseLeave={() => setShowCloseIcon(false)}
      onClick={handleClick}
    >
      {add ? (
        <div className="addIcon">
          <AddSquareOutline className="favIconImg" />
        </div>
      ) : (
        <img src={data?.favIconUrl} alt="icon" className="favIconImg" />
      )}
      {!add && showCloseIcon && <CloseOutline className="closeIcon" />}
    </div>
  );
}
