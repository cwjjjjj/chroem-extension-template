import { css } from "@emotion/react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const MENU_LIST = [
  //   {
  //     name: "login",
  //     to: "login",
  //   },
  {
    name: "关注",
    to: "follow",
  },
  {
    name: "发现",
    to: "explore",
  },
  {
    name: "我的",
    to: "mine",
  },
];

export default function Meun() {
  const navigator = useNavigate();
  const location = useLocation();

  return (
    <div
      css={css`
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
      `}
    >
      <hr />
      <div
        css={css`
          width: 100%;
          height: 50px;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          align-items: center;
          justify-items: center;
          background-color: white;
          backdrop-filter: blur(15px);
          font-weight: 400;
          font-size: 16px;
          line-height: 22px;
          color: #bfbfbf;

          .menu {
            cursor: pointer;
            height: 100%;
            width: 100%;
            display: grid;
            align-items: center;
            justify-items: center;
          }

          .active {
            font-weight: 500;
            font-size: 16px;
            line-height: 22px;
            color: #333333;
          }
        `}
      >
        {MENU_LIST.map((item) => {
          return (
            <div
              onClick={() => {
                navigator(`./${item.to}`);
              }}
              className={`menu ${
                location.pathname.includes(item.to) && "active"
              }`}
              key={item.to}
            >
              {item.name}
            </div>
          );
        })}
      </div>
    </div>
  );
}
