export enum ETodoStatus {
  done = "Done",
  notDone = "Not done",
}

export interface ITodo {
  id: string[10];
  name: string;
  status: ETodoStatus;
}
