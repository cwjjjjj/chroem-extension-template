import { css } from "@emotion/react";
import UserSmallCard, { MOCK_IMG } from "./UserSmallCard";
import { Popover, Toast } from "antd-mobile";
import { HTMLAttributes, ReactNode, useCallback, useState } from "react";
import { PostWithUser } from "../types";
import day from "../utils/day";
import { post } from "../utils";
import { FOLLOW, REMOVE_POST, SUBSCRIBE_REMOVE, VIEWD } from "../constants/api";
import { useRecoilState } from "recoil";
import { sharePopupState, userState } from "../store";
import play from "../assets/play.svg";
import EditPopup from "./EditPopup";
import { isEmpty } from "lodash";

export interface PostProps extends HTMLAttributes<HTMLDivElement> {
  data: PostWithUser;
  // renderMore: ReactNode;
  onRefresh?: () => void;
  showMore?: boolean;
  showRemove?: boolean;
  showFollow?: boolean;
  showRemoveFollow?: boolean;
  showEdit?: boolean;
}

export default function Post({
  data,
  // renderMore,
  onRefresh,
  showMore = false,
  showRemove = false,
  showFollow = false,
  showRemoveFollow = false,
  showEdit = false,
  ...props
}: PostProps) {
  const [visible, setVisible] = useState(false);

  const { user, title, url, summary, image, scope, viewed, updatedAt, type } =
    data ?? {};
  const [showPopover, setShowPopover] = useState(false);
  const [me, setMe] = useRecoilState(userState);
  const handleRemove = useCallback(async () => {
    await post(`${REMOVE_POST}?id=${data?.id}`);
    await onRefresh?.();
    Toast.show({
      content: "删除成功",
    });
  }, [data]);

  const handleFollow = useCallback(async () => {
    await post(FOLLOW, {
      subscriber: me?.id,
      publisher: user?.id,
    });
    await onRefresh?.();
    Toast.show({
      content: "关注成功",
    });
  }, [data]);

  const handleRemoveFollow = useCallback(async () => {
    await post(SUBSCRIBE_REMOVE, {
      publisher: user?.id,
    });
    await onRefresh?.();
    Toast.show({
      content: "取关成功",
    });
  }, [data]);

  const handleEdit = useCallback(async () => {
    setVisible(true);
    setShowPopover(false);
  }, [data]);

  console.log("data", data);

  if (!data || isEmpty(data)) {
    return null;
  }

  return (
    <div
      css={css`
        padding: 5px;
        margin: 5px 0;
        transition: all 0.6s;
        word-break: break-all;

        &:hover {
          /* background-color: rgba(0, 0, 0, 0.25); */
        }

        .user-header {
          display: grid;
          grid-template-columns: 200px 30px;
          justify-content: space-between;
          align-items: center;
          justify-items: start;
          white-space: nowrap;
        }
        .more {
          cursor: pointer;
          justify-self: center;
        }
        .img {
          width: 100%;
          height: 100%;
          object-fit: contain;
          border-radius: 8px;
        }
        .img-wrap {
          position: relative;
          width: 100%;
          height: 200px;
        }
        p {
          margin: 4px 0;
          font-weight: 400;
          font-size: 12px;
          color: #808080;
          width: 100%;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        h5 {
          margin: 4px 0;
          font-weight: 500;
          font-size: 16px;
          line-height: 22px;
          color: #333333;
          width: 100%;
          display: -webkit-box;
          -webkit-line-clamp: 8;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        main {
          cursor: pointer;
          margin: 0 0 10px 0;
        }
      `}
      {...props}
    >
      <header className="user-header">
        <UserSmallCard
          data={user}
          timeFromNow={day(updatedAt).fromNow()}
          isPrivate={scope === "private"}
        />
        {showMore && (
          <Popover
            content={
              <section
                css={css`
                  display: grid;
                  gap: 5px;
                  padding: 10px;

                  .item {
                    padding: 5px 0;
                  }

                  div {
                    &:not(:last-child) {
                      padding: 0 0 5px 0;
                      border-bottom: 1px solid #eee;
                    }
                    cursor: pointer;
                  }
                `}
              >
                {/* {renderMore} */}
                {(showRemove || me?.id === user.id) && (
                  <div onClick={handleRemove}>删除</div>
                )}
                {showFollow && !(me?.id === user.id) && (
                  <div onClick={handleFollow}>关注</div>
                )}
                {showRemoveFollow && (
                  <div onClick={handleRemoveFollow}>取消关注</div>
                )}
                {(showEdit || me?.id === user.id) && (
                  <div onClick={handleEdit}>编辑</div>
                )}
              </section>
            }
            placement="right"
            trigger="click"
            visible={showPopover}
            onVisibleChange={setShowPopover}
          >
            <div className="more">···</div>
          </Popover>
        )}
      </header>
      <main
        onClick={() => {
          post(VIEWD, { id: data.id });
          window.open(url);
        }}
      >
        <h5>{title}</h5>
        <p>{summary}</p>
        {type === "VIDEO" && image && (
          <div className="img-wrap">
            <img src={image} alt="img" className="img" />
            <div className="mask">
              <img src={play} alt="" />
            </div>
          </div>
        )}
      </main>
      <EditPopup
        data={data}
        destroyOnClose
        visible={visible}
        setVisible={setVisible}
        onRefresh={onRefresh}
        key={Date.now()}
      />
    </div>
  );
}
