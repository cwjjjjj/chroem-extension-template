import { css } from "@emotion/react";
import { SetOutline } from "antd-mobile-icons";
import { get, post } from "../utils";
import { POST_LIST, REMOVE_POST, USER_PROFILE } from "../constants/api";
import useLoadMoreScrollDetect from "../hooks/useLoadMoreScrollDetect";
import { Post as PostType, PostWithUser, User } from "../types";
import Post from "../components/Post";
import useLoadMore from "../hooks/useLoadMore";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { userState } from "../store";
import logo from "../assets/logo.svg";
import setting from "../assets/setting.svg";

export default function Mine() {
  const navigator = useNavigate();
  const [user, setUser] = useRecoilState(userState);

  const { hasNext, onNext, totalData, isLoading, onRefresh, onHardRefresh } =
    useLoadMore<{ limit?: number; loadMoreKey?: string }, PostWithUser>(
      [POST_LIST],
      async (params) => get(POST_LIST, { params }).then((res) => res.data)
    );

  const { ref, onScroll } = useLoadMoreScrollDetect(onNext);

  if (isLoading && !totalData.length) {
    return null;
  }

  return (
    <div
      css={css`
        /* menu height */
        padding: 70px 10px 50px;
        height: 100vh;
        overflow: auto;

        .header {
          display: grid;
          grid-template-columns: 200px 30px;
          justify-content: space-between;
          justify-items: start;
          align-items: center;
          padding-bottom: 10px;
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          background: white;
          padding: 10px 20px;
          border-bottom: 1px solid rgba(0, 0, 0, 0.1);
          height: 67px;
          z-index: 2;

          p {
            margin: 0 0 4px 0;
          }
          .copy {
            background: rgba(0, 0, 0, 0.1);
            margin: 0 5px;
            padding: 1px 5px;
            cursor: pointer;
          }
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
      <header className="header">
        <div>
          <p
            css={css`
              font-weight: 700;
              font-size: 16px;
            `}
          >
            {user?.nickname} 在看什么
          </p>
          <p
            css={css`
              opacity: 0.7;
              font-size: 12px;
            `}
          >
            订阅者：{user.subscribedCount}
            <span className="copy">复制订阅链接</span>
          </p>
        </div>
        <div
          css={css`
            justify-self: center;
          `}
          onClick={() => navigator("../profile-setting")}
        >
          <img src={setting} alt="" />
        </div>
      </header>

      {totalData.length ? (
        totalData.map((item) => {
          return (
            <div key={item.id}>
              {/* {item.user.id} */}
              <Post
                data={item}
                onRefresh={onRefresh}
                showEdit
                // renderMore={
                //   <>
                //     <div
                //       onClick={() => {
                //         post(REMOVE_POST, {
                //           id: item.id,
                //         }).then((res) => {
                //           onRefresh();
                //           Toast.show({
                //             content: "删除成功",
                //           });
                //         });
                //       }}
                //     >
                //       删除
                //     </div>
                //   </>
                // }
                showMore
                showRemove
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
          <span>还没有内容 快发布一些吧</span>
        </div>
      )}
    </div>
  );
}
