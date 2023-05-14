import { css } from "@emotion/react";
import { Button, NavBar } from "antd-mobile";
import { LeftOutline } from "antd-mobile-icons";
import { useNavigate, useParams } from "react-router-dom";
import useLoadMore from "../hooks/useLoadMore";
import { FOLLOW, SUBSCRIBE_REMOVE, USER_PUBLIC_LIST } from "../constants/api";
import { PostWithUser } from "../types";
import { get, post } from "../utils";
import useLoadMoreScrollDetect from "../hooks/useLoadMoreScrollDetect";
import Post from "../components/Post";
import { userState } from "../store";
import { useRecoilState } from "recoil";
import { useState } from "react";
import backArrow from "../assets/backArrow.svg";

export default function User() {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [subscriberCount, setSubscriberCount] = useState(0);
  const [user, setUser] = useRecoilState(userState);

  // 获取 params
  const { id, name } = useParams();
  const navigator = useNavigate();
  console.log("id", id, user);

  const { hasNext, onNext, totalData, isLoading, onRefresh, onHardRefresh } =
    useLoadMore<
      { id: string; limit?: number; loadMoreKey?: string },
      PostWithUser
    >([USER_PUBLIC_LIST], async (params) =>
      get(USER_PUBLIC_LIST, {
        params: { ...params, userId: id },
      }).then((res) => {
        setIsSubscribed(res.data?.isSubscribed);
        setSubscriberCount(res.data?.subscriberCount);
        return res.data;
      })
    );

  const { ref, onScroll } = useLoadMoreScrollDetect(onNext);
  return (
    <div
      css={css`
        /* menu height */
        padding: 68px 10px 0;
        height: 100%;
        overflow: auto;
      `}
      ref={ref}
      onScroll={(e) => {
        console.log("scroll");
        if (hasNext) {
          onScroll(e);
        }
      }}
    >
      {/* <NavBar
        onBack={() => {
          navigator(-1);
        }}
        right={
          <div
            css={css`
              width: 80px;
            `}
          >
            <Button
              color="success"
              size="mini"
              onClick={async () => {
                await (isSubscribed
                  ? post(SUBSCRIBE_REMOVE, {
                      publisher: id,
                    })
                  : post(FOLLOW, {
                      subscriber: user.id,
                      publisher: id,
                    }));
                onRefresh();
              }}
            >
              {isSubscribed ? "取消关注" : "关注"}
            </Button>
          </div>
        }
      >
        <div
          css={css`
            font-weight: 500;
            font-size: 14px;
            line-height: 20px;
            color: #333333;
          `}
        >
          <div>{name} 在看什么</div>
          <div
            css={css`
              font-weight: 400;
              font-size: 12px;
              line-height: 17px;
              color: #808080;
            `}
          >
            订阅者 {subscriberCount}
          </div>
        </div>
      </NavBar> */}
      <header
        css={css`
          display: grid;
          grid-template-columns: 50px 1fr 60px;
          justify-items: center;
          align-items: center;
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          padding: 10px;
          background: white;
          border-bottom: 1px solid rgba(0, 0, 0, 0.1);
          height: 68px;
          z-index: 2;

          img {
            width: 100%;
          }
          .icon {
            width: 24px;
            height: 24px;
          }

          p {
            margin: 0;
          }
          .copy {
            background: rgba(0, 0, 0, 0.1);
            margin: 0 5px;
            padding: 1px 5px;
            cursor: pointer;
          }
        `}
      >
        <img
          src={backArrow}
          alt=""
          onClick={() => {
            navigator(-1);
          }}
          className="icon"
        />
        <div
          css={css`
            font-weight: 500;
            font-size: 14px;
            line-height: 20px;
            color: #333333;
            display: grid;
            justify-items: center;
          `}
        >
          <div>{name} 在看什么</div>
          <div
            css={css`
              font-weight: 400;
              font-size: 12px;
              line-height: 17px;
              color: #808080;
            `}
          >
            订阅者 {subscriberCount}
          </div>
        </div>
        <Button
          color="success"
          size="mini"
          onClick={async () => {
            await (isSubscribed
              ? post(SUBSCRIBE_REMOVE, {
                  publisher: id,
                })
              : post(FOLLOW, {
                  subscriber: user.id,
                  publisher: id,
                }));
            onRefresh();
          }}
        >
          {isSubscribed ? "取消关注" : "关注"}
        </Button>
      </header>
      {totalData.map((item) => {
        return (
          <div key={item.id}>
            {/* {item.user.id} */}
            <Post data={item} showMore showFollow onRefresh={onRefresh} />
            <hr />
          </div>
        );
      })}
    </div>
  );
}
