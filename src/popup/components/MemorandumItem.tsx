import { HTMLAttributes } from "react";
import { MemorandumItem as MemorandumItemType } from "./Memorandum";
import { css } from "@emotion/react";

export interface MemorandumItemProps extends HTMLAttributes<HTMLDivElement> {
  data: MemorandumItemType;
}

export default function MemorandumItem({
  data,
  ...props
}: MemorandumItemProps) {
  if (!data) {
    return null;
  }

  const { task, state, id } = data ?? {};

  return (
    <div
      {...props}
      css={css`
        .task-done {
          text-decoration: line-through;
        }
      `}
    >
      <h5 className={state === "done" ? "task-done" : ""}>{task}</h5>
    </div>
  );
}
