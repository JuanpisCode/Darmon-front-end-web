export interface Clubs {
  response: Response[];
}

export interface Response {
  id_club?: number;
  id_sport?:number;
  name: string;
  phone: string;
  address: string;
  state: State | null;
}

export enum State {
  Empty = "",
  Enabled = "enabled",
}


