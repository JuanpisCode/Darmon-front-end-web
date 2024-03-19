export interface Events {
  response: Response[];
}

export interface Response {
  id_event?: number;
  id_sport?:number;
  id_entitie?:number;
  name: string;
  day: number;
  month: number;
  year: number;
  info: string;
}



