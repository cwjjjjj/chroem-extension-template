import { css } from "@emotion/react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  AVATAR_LIST,
  PROFILE_UPDATE,
  USER_PROFILE,
  IMG_PREFIX_URL,
} from "../constants/api";
import { get, post } from "../utils";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { userState } from "../store";
import { Button, Input, NavBar, Toast } from "antd-mobile";
import { handleUpload } from "../utils/upload";
import { useNavigate } from "react-router-dom";
import { QiniuFile } from "../@types/Qiniu";
import Avatar from "../components/Avatar";
import upload from "../assets/upload.svg";
import backArrow from "../assets/backArrow.svg";

export default function ProfileSetting() {
  const navigator = useNavigate();
  const queryClient = useQueryClient();
  const { data: avatarList } = useQuery<string[]>({
    queryKey: [AVATAR_LIST],
    queryFn: async () => get(AVATAR_LIST).then((res) => res.data.data),
  });

  const [isLoading, setIsLoading] = useState(false);

  const [user, setUser] = useRecoilState(userState);

  const [currentAvatar, setCurrentAvatar] = useState<string | undefined>(
    user?.avatar
  );
  const [currentNickname, setCurrentNickname] = useState<string | undefined>(
    user?.nickname
  );

  const updateProfile = async (
    profile: {
      name?: string;
      avatar?: string;
      avatarFileInfo?: QiniuFile;
    } = {
      name: currentNickname,
      avatar: currentAvatar,
    }
  ) => {
    console.log("profile", profile);
    if (!profile?.name) {
      Toast.show({
        content: "请输入用户名",
      });
      return;
    }
    if (!profile?.avatar) {
      Toast.show({
        content: "请选择头像",
      });
      return;
    }
    setIsLoading(true);
    console.log("1");

    await post(PROFILE_UPDATE, {
      nickname: profile.name,
      avatar: profile?.avatar,
    });
    console.log("2");

    setUser((prev) => ({
      ...prev,
      nickname: profile.name,
      avatar: profile.avatar,
    }));

    console.log("3");

    Toast.show({
      content: "资料修改成功",
    });
    setIsLoading(false);
    navigator("../explore");
    return true;
  };

  return (
    <div
      css={css`
        padding: 68px 10px 0;
        height: 100%;
        overflow: auto;
        border-bottom: 1px solid #eee;

        .avatar-list {
          display: flex;
          flex-wrap: wrap;
        }

        .avatar-wrap {
          width: 44px;
          height: 44px;

          &-active {
            border: solid 2px black;
            border-radius: 50%;
          }
        }

        .avatar {
          height: 100%;
          width: 100%;
          border-radius: 50%;
          transition: transform 0.2s ease-in-out;

          &:hover {
            transform: scale(1.7);
          }

          &-current {
            /* transform: scale(2.7); */
            height: 60px;
            width: 60px;
          }
        }

        .label {
          display: grid;
          grid-template-columns: 60px 100px 150px;
          align-items: center;
        }
      `}
    >
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
        {user?.avatar && user?.nickname ? (
          <img
            src={backArrow}
            alt=""
            onClick={() => {
              navigator(-1);
            }}
            className="icon"
          />
        ) : (
          <div></div>
        )}
        <div>设置</div>
        <Button
          color="success"
          size="mini"
          onClick={() => {
            updateProfile({
              name: currentNickname,
              avatar: currentAvatar,
            });
          }}
        >
          保存
        </Button>
      </header>
      <div
        css={css`
          padding: 10px;
          overflow: auto;
          display: grid;
          gap: 5px;
          align-items: start;
          justify-items: start;
          grid-template-rows: 50px 70px 1fr;

          .desc {
            justify-self: end;
          }
        `}
      >
        <div className="label">
          <span className="desc">用户名：</span>
          <Input
            placeholder="请输入用户名"
            value={currentNickname}
            onChange={setCurrentNickname}
            style={{
              marginLeft: "10px",
            }}
          />
        </div>
        <div className="label">
          <span className="desc">头像：</span>
          {currentAvatar ? (
            <Avatar className="avatar-current" src={currentAvatar} />
          ) : (
            <div>暂无头像</div>
          )}
          <label>
            <div
              css={css`
                display: flex;
                align-items: center;
                gap: 5px;
                background: #eeeeee;
                border-radius: 6px;
                padding: 6px 30px;
                cursor: pointer;
              `}
            >
              <img src={upload} alt="" /> 上传头像
            </div>
            <input
              type="file"
              id="albums"
              name="albums"
              accept="image/*"
              css={css`
                display: none;
              `}
              onChange={async (e) => {
                const files = e?.target?.files as unknown as File[];
                // 限制图片大小为 2mb
                if (files[0].size > 2 * 1024 * 1024) {
                  Toast.show({
                    content: "图片大小不能超过 2mb",
                  });
                  return;
                }
                const res = await handleUpload(files[0]);
                const avatarUrl = IMG_PREFIX_URL + res.key;
                setCurrentAvatar(avatarUrl);
                // updateProfile({
                //   name: currentNickname,
                //   avatarFileInfo: res,
                // });
                // updateProfile();
              }}
            />
          </label>
        </div>
        <div className="avatar-list">
          {avatarList?.map((avatar) => (
            <div
              className={`avatar-wrap ${
                currentAvatar === avatar && "avatar-wrap-active"
              }`}
              onClick={() => {
                setCurrentAvatar(avatar);
              }}
              key={avatar}
            >
              <img src={avatar} alt="avatar" className="avatar" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
