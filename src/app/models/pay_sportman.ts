export interface Pay_sportman {
  response: Resp[];
}

export interface Resp {
  id_pay?: number;
  id_user?:number;
  id_club?:number;
  name: string;
  ready: string;
  month: number;
  year: number;
}



