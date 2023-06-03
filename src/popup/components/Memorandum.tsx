import { Button, CheckList, Input } from "antd-mobile";
import { HTMLAttributes, useMemo } from "react";
import MemorandumItem from "./MemorandumItem";
import { useRecoilState } from "recoil";
import { memorandumListState } from "../globalState";
import { cloneDeep } from "lodash";
import { css } from "@emotion/react";

export interface MemorandumProps extends HTMLAttributes<HTMLDivElement> {}

type State = "todo" | "done";

export interface MemorandumItem {
  task: string;
  state: State;
  id: string;
}

export default function Memorandum({ ...props }: MemorandumProps) {
  const [memorandumList, setMemorandumList] =
    useRecoilState(memorandumListState);

  const memorandumListValue = useMemo(
    () =>
      memorandumList
        .filter((item) => item.state === "done")
        .map((item) => item.id),
    [memorandumList]
  );

  const handleChange = (value: string[]) => {
    console.log("change", value);
    const preMemorandumList = cloneDeep(memorandumList);
    const newMemorandumList = preMemorandumList.map((item) => {
      if (value.includes(item.id)) {
        item.state = "done";
      } else {
        item.state = "todo";
      }
      return item;
    });
    console.log("newMemorandumList", newMemorandumList);
    setMemorandumList(newMemorandumList);
  };

  return (
    <div
      {...props}
      css={css`
        height: 100%;
      `}
    >
      <CheckList multiple value={memorandumListValue} onChange={handleChange}>
        {memorandumList.map((item) => (
          <CheckList.Item value={item.id} key={item.id}>
            <MemorandumItem data={item} />
          </CheckList.Item>
        ))}
      </CheckList>

      <section>
        <Input
          placeholder="新增代办事项"
          //   onBlur={(e) => {
          //     console.log(e.target.value);
          //   }}
          //   onEnterPress={(e) => console.log(e.target.value)}
        />
      </section>
    </div>
  );
}
