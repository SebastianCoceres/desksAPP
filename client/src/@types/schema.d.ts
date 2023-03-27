import { type } from "os";

type SetState<T> = (
  state: T | ((prevState: T) => T),
  callback?: () => void
) => void;

export type TDesk = {
  _id: string;
  title: string;
  tasks: TTaskRef[];
  __v: number;
};

export type TTask = {
  _id: string;
  title: string;
  description: string;
  checked: boolean;
};

export type TNewTask = {
  title: string;
  description: string;
  checked: boolean;
};
