import { type } from "os";

export type TDesk = {
  _id: string;
  title: string;
  tasks: TTask[];
  __v: number;
};

export type TTask = {
  _id: string;
  title: string;
  description: string;
  checked: boolean;
  desk: string;
  __v: number;
};
