export interface Chat {
  response: Resp[];
}

export interface Resp {
  id_user?: number;
  id_chat?:number;
  message: string;
  isMe: string;
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
  meridiem: string;
}



