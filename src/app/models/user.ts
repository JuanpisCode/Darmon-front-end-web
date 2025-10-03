export interface Users {
  response: Response[];
}

export interface Response {
  id_user?: number;
  id_module?:number;
  id_club?:number;
  name: string;
  username?: string;
  email: string;
  phone: string;
  status: State | null;
  created_at: string;
  update_at: string;
  [key:string]:any;
}

export enum State {
  Empty = "",
  Enabled = "enabled",
}


