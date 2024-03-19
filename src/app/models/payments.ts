export interface Payments {
  response: Response[];
}

export interface Response {
  id_pay?: number;
  id_payment_plan?:number;
  id_user?:number;
  price: string;
  year: number;
  month: number;
  day: number;
}



