import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginService } from './login.service';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { Subscription } from '../models/subscription';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {

  datos!:FormGroup;

  constructor(
    private httpClient:HttpClient,
    private loginService:LoginService
  ) {

  }

  getSubscriptions(length:number):Observable<Subscription[]>{

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

    const url='https://api.darmon.co/auth/get-subscriptions';

    return this.httpClient.post<Subscription[]>(url,param);
  }

  getSingleSubscription(id_payment_plan:number,id_user:number){
    let tok=this.loginService.getJwtToken();

    this.datos=new FormGroup({
      token:new FormControl(tok),
      id_payment_plan:new FormControl(id_payment_plan),
      id_user:new FormControl(id_user),
    });

    let param={
      token:this.datos.value.token,
      id_payment_plan:this.datos.value.id_payment_plan,
      id_user:this.datos.value.id_user
    };

    const url='https://api.darmon.co/auth/get-single-subscription';

    return this.httpClient.post<Subscription>(url,param);
  }

  deleteSubscription(id_payment_plan:number, id_user:number){

    let tok=this.loginService.getJwtToken();

    this.datos= new FormGroup({
      id_payment_plan:new FormControl(id_payment_plan),
      token:new FormControl(tok),
      id_user:new FormControl(id_user),
    });

    let param={
      token:this.datos.value.token,
      id_payment_plan:this.datos.value.id_payment_plan,
      id_user:this.datos.value.id_user
    };

    const url='https://api.darmon.co/auth/delete-subscription';

    return this.httpClient.post<void>(url,param);
  }
}
