import { atom } from "recoil";
import { MemorandumItem } from "../components/Memorandum";

const mockData: MemorandumItem[] = [
  {
    task: "task1",
    state: "todo",
    id: "1",
  },
  {
    task: "task2",
    state: "done",
    id: "2",
  },
];

export const memorandumListState = atom<MemorandumItem[]>({
  key: "memorandumListState",
  default: mockData,
});
