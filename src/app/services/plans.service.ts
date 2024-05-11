import { Injectable } from '@angular/core';
import { LoginService } from './login.service';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { Payment_plans } from '../models/payment_plans';

@Injectable({
  providedIn: 'root'
})
export class PlansService {

  datos!:FormGroup;

  constructor(
    private httpClient:HttpClient,
    private loginService:LoginService
  ) { }

  getPlans(length:number):Observable<Payment_plans[]>{

    let tok=this.loginService.getJwtToken();
    let id=this.loginService.getIdUser();
    this.datos= new FormGroup({
      token:new FormControl(tok),
      id_user:new FormControl(id),
      length:new FormControl(length)
    });

    let param={
      token:this.datos.value.token,
      id_user:this.datos.value.id_user,
      length:this.datos.value.length,
    };

    const url='https://api.darmon.co/auth/get-plans';

    return this.httpClient.post<Payment_plans[]>(url,param);
  }

  getSinglePlan(id_payment_plan:number){
    let tok=this.loginService.getJwtToken();
    let idU=this.loginService.getIdUser();

    this.datos=new FormGroup({
      token:new FormControl(tok),
      id_payment_plan:new FormControl(id_payment_plan),
      id_user:new FormControl(idU),
    });

    let param={
      token:this.datos.value.token,
      id_payment_plan:this.datos.value.id_payment_plan,
      id_user:this.datos.value.id_user
    };

    const url='https://api.darmon.co/auth/get-single-plan';

    return this.httpClient.post<Payment_plans>(url,param);
  }

  deletePlan(id_payment_plan:number){

    let tok=this.loginService.getJwtToken();
    let idU=this.loginService.getIdUser();

    this.datos= new FormGroup({
      id_payment_plan:new FormControl(id_payment_plan),
      token:new FormControl(tok),
      id_user:new FormControl(idU),
    });

    let param={
      token:this.datos.value.token,
      id_payment_plan:this.datos.value.id_payment_plan,
      id_user:this.datos.value.id_user
    };

    const url='https://api.darmon.co/auth/delete-plan';

    return this.httpClient.post<void>(url,param);
  }
}
