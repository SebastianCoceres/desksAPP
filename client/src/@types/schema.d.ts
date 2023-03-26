import { type } from "os";

export type TDesk = {
  _id: string;
  title: string;
  tasks: TTaskRef[];
  __v: number;
};

export type TTaskRef = {
  _id: string;
  title: string;
  taskId: string;
};


export type TTask = {
  _id: string;
  title: string;
  description: string;
  checked: boolean;
  desk: string;
  __v: number;
};
