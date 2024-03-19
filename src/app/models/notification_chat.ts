export interface Notification_chat {
  response: Response[];
}

export interface Response {
  id_user?: number;
  id_chat?:number;
  name: string;
  message: string;
  read: string;
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
  meridiem: string;
}



