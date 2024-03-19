export interface Entitie {
  response: Response[];
}

export interface Response {
  id_entitie?:number;
  id_user?:number;
  name: string;
  phone: string;
  email: string;
  state: State | null;
}

export enum State {
  Empty = "",
  Enabled = "enabled",
}
