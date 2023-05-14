import { css } from "@emotion/react";
import { get } from "../utils";
import { FOLLOW_POST_LIST, POST_LIST } from "../constants/api";
import useLoadMoreScrollDetect from "../hooks/useLoadMoreScrollDetect";
import { Post as PostType, PostWithUser } from "../types";
import Post from "../components/Post";
import useLoadMore from "../hooks/useLoadMore";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.svg";
import Header from "../components/Header";

export default function Follow() {
  const navigator = useNavigate();
  const { hasNext, onNext, totalData, isLoading, onRefresh, onHardRefresh } =
    useLoadMore<{ limit?: number; loadMoreKey?: string }, PostWithUser>(
      [FOLLOW_POST_LIST],
      async (params) =>
        get(FOLLOW_POST_LIST, { params: { ...params, flag: 0 } }).then(
          (res) => res.data
        )
    );

  const { ref, onScroll } = useLoadMoreScrollDetect(onNext);

  if (isLoading && !totalData.length) {
    return null;
  }

  return (
    <div
      css={css`
        /* menu height */
        padding: 60px 10px 50px;
        height: 100vh;
        overflow: auto;

        .main {
          display: grid;
          height: 100%;
        }
      `}
      ref={ref}
      onScroll={(e) => {
        console.log("scroll");
        if (hasNext) {
          onScroll(e);
        }
      }}
    >
      {totalData.length ? (
        totalData.map((item) => {
          return (
            <div key={item.id}>
              {/* {item.user.id} */}
              <Post
                data={item}
                showMore
                showRemoveFollow
                onRefresh={onRefresh}
              />
              <hr />
            </div>
          );
        })
      ) : (
        <div
          css={css`
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100%;
            gap: 10px;
            span {
              opacity: 0.5;
            }
          `}
        >
          <img src={logo} alt="" />
          <span>还没有内容 去关注一些人吧</span>
        </div>
      )}
    </div>
  );
}
