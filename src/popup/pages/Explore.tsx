import { css } from "@emotion/react";
import { get, post } from "../utils";
import { DISCOVER_LIST } from "../constants/api";
import useLoadMoreScrollDetect from "../hooks/useLoadMoreScrollDetect";
import { Post as PostType, PostWithUser } from "../types";
import Post from "../components/Post";
import useLoadMore from "../hooks/useLoadMore";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.svg";
import { useRecoilState } from "recoil";
import { needToRefreshState, userState } from "../store";
import { useEffect } from "react";

export default function Explore() {
  const [needToRefresh, setneedToRefresh] = useRecoilState(needToRefreshState);

  const { hasNext, onNext, totalData, isLoading, onRefresh, onHardRefresh } =
    useLoadMore<{ limit?: number; loadMoreKey?: string }, PostWithUser>(
      [DISCOVER_LIST],
      async (params) => get(DISCOVER_LIST, { params }).then((res) => res.data)
    );

  const { ref, onScroll } = useLoadMoreScrollDetect(onNext);
  useEffect(() => {
    if (needToRefresh) {
      onRefresh().then(() => {
        setneedToRefresh(false);
      });
    }
  }, [needToRefresh]);

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
            <div key={item?.id}>
              {/* {item.user.id} */}
              <Post data={item} showMore showFollow onRefresh={onRefresh} />
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
