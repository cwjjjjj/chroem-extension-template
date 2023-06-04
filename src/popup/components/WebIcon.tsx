import { css } from "@emotion/react";
import { HTMLAttributes, useState } from "react";
import { CloseOutline } from "antd-mobile-icons";

export interface WebIconType {
  url: string;
  id: string;
  favIconUrl?: string;
}

export interface WebIconProps extends HTMLAttributes<HTMLDivElement> {
  data: WebIconType;
}

export default function WebIcon({ data, ...props }: WebIconProps) {
  const [showCloseIcon, setShowCloseIcon] = useState(false);
  if (!data) {
    return null;
  }

  return (
    <div
      css={css`
        height: 44px;
        width: 44px;
        cursor: pointer;
        position: relative;
        border-radius: 12px;
        background: rgba(0, 0, 0, 0.15);
        display: flex;
        align-items: center;
        justify-content: center;

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
    >
      <img src={data.favIconUrl} alt="icon" className="favIconImg" />
      {showCloseIcon && <CloseOutline className="closeIcon" />}
    </div>
  );
}
