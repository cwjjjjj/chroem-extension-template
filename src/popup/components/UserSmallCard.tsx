import { css } from "@emotion/react";
import Avatar from "./Avatar";
import { HTMLAttributes } from "react";
import { User } from "../types";
import { useNavigate } from "react-router-dom";

export const MOCK_IMG =
  "https://avatars.githubusercontent.com/u/22167673?s=48&v=4";

export interface UserSmallCardProps extends HTMLAttributes<HTMLDivElement> {
  data: User;
  timeFromNow?: string;
  isPrivate?: boolean;
}

export default function UserSmallCard({
  data,
  timeFromNow,
  isPrivate,
  ...props
}: UserSmallCardProps) {
  const navigator = useNavigate();

  if (!data) {
    return null;
  }

  return (
    <div
      css={css`
        display: grid;
        grid-template-columns: 20px 1fr;
        justify-items: center;
        align-items: center;
        cursor: pointer;
        font-weight: 500;
        font-size: 12px;
        line-height: 17px;
        color: #808080;

        span {
          margin: 0 8px;
        }
      `}
      onClick={() => {
        console.log("click", data.id);
        navigator(`../user/${data?.id}/${data.nickname}`);
      }}
      {...props}
    >
      <Avatar src={data?.avatar} />
      <span>
        {data?.nickname} · {timeFromNow} {isPrivate && "· 私密"}
      </span>
    </div>
  );
}
