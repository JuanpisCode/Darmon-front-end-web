import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { LoginService } from './login.service';
import { HttpClient } from '@angular/common/http';
import { Response } from '../models/payments';
import { Resp } from '../models/pay_sportman';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PayService {

  datos!:FormGroup;

  constructor(
    private httpClient:HttpClient,
    private loginService:LoginService
  ) { }

  getPayments(length:number):Observable<Response[]>{
    let tok=this.loginService.getJwtToken();
    let id=this.loginService.getIdUser();
    this.datos= new FormGroup({
      token:new FormControl(tok),
      id_user:new FormControl(id),
      length:new FormControl(length),
    });

    let param={
      token:this.datos.value.token,
      id_user:this.datos.value.id_user,
      length:this.datos.value.length,
    };

    const url='https://api.darmon.co/auth/get-payments';

    return this.httpClient.post<Response[]>(url, param);
  }

  getPaySportman(
    id_club: number,
    year: number,
    month: number,
    length:number
  ):Observable<Resp[]>{
    let tok=this.loginService.getJwtToken();

    this.datos= new FormGroup({
      token:new FormControl(tok),
      id_club:new FormControl(id_club),
      year:new FormControl(year),
      month:new FormControl(month),
      length:new FormControl(length),
    });

    let param={
      token:this.datos.value.token,
      id_club:this.datos.value.id_club,
      year:this.datos.value.year,
      month:this.datos.value.month
    };

    const url='https://api.darmon.co/auth/get-pay-sportman';

    return this.httpClient.post<Resp[]>(url, param);
  }

}
