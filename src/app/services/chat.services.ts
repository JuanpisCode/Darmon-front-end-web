import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { LoginService } from './login.service';
import { Response } from '../models/notification_chat';
import { Resp } from '../models/chat';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  datos!:FormGroup;

  constructor(
    private httpClient:HttpClient,
    private loginService:LoginService
    ) {

   }

  getNotificationChat(length:number):Observable<Response[]>{
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

    const url='https://api.darmon.co/auth/get-notification-chat';

    return this.httpClient.post<Response[]>(url,param);
  }

  deleteChat(id_user:number){
    let tok=this.loginService.getJwtToken();
    let id=id_user;

    this.datos= new FormGroup({
      id_user:new FormControl(id),
      token:new FormControl(tok)
    });

    let param={
      id_user:this.datos.value.id_user,
      token:this.datos.value.token,
    };

    const url= 'https://api.darmon.co/auth/delete-notification-chat';

    return this.httpClient.post<void>(url,param)

  }

  getChat(id_user:number){
    let tok=this.loginService.getJwtToken();
    let id=id_user;
    this.datos= new FormGroup({
      token:new FormControl(tok),
      id_user:new FormControl(id)
    });

    let param={
      token:this.datos.value.token,
      id_user:this.datos.value.id_user
    };

    const url='https://api.darmon.co/auth/get-chat';

    return this.httpClient.post<Resp>(url,param);
  }

}
