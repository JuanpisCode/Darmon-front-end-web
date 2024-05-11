import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { LoginService } from './login.service';
import { Response, Users } from '../models/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  datos!:FormGroup;

  constructor(
    private httpClient:HttpClient,
    private loginService:LoginService
    ) {

   }

   getUsersModule(id_module:number,length:number):Observable<Response[]>{
    let tok=this.loginService.getJwtToken();

    this.datos= new FormGroup({
      token:new FormControl(tok),
      id_module:new FormControl(id_module),
      length:new FormControl(length),
    });

    let param={
      token:this.datos.value.token,
      id_module:this.datos.value.id_module,
      length:this.datos.value.length,
    };

    const url='https://api.darmon.co/auth/get-users';

    return this.httpClient.post<Response[]>(url,param);
  }

   getUsers(length:number):Observable<Response[]>{
    let tok=this.loginService.getJwtToken();

    this.datos= new FormGroup({
      token:new FormControl(tok),
      length:new FormControl(length),
    });

    let param={
      token:this.datos.value.token,
      length:this.datos.value.length,
    };

    const url='https://api.darmon.co/auth/get-users-all';

    return this.httpClient.post<Response[]>(url,param);
  }

  getUsersClub(id_module:number,length:number):Observable<Response[]>{
    let tok=this.loginService.getJwtToken();

    this.datos= new FormGroup({
      token:new FormControl(tok),
      id_module:new FormControl(id_module),
      length:new FormControl(length),
    });

    let param={
      token:this.datos.value.token,
      id_module:this.datos.value.id_module,
      length:this.datos.value.length,
    };

    const url='https://api.darmon.co/auth/get-users-club';

    return this.httpClient.post<Response[]>(url,param);
  }

  getSingleUserEdit(id_user:number){

    let tok=this.loginService.getJwtToken();
    let id = id_user;

    this.datos= new FormGroup({
      id_user:new FormControl(id),
      token:new FormControl(tok)
    });

    let param={
      id_user:this.datos.value.id_user,
      token:this.datos.value.token
    }

    const url = 'https://api.darmon.co/auth/get-single-user';

    return  this.httpClient.post<Response>(url,param)

  }

  getSingleUser(id_user:number){
    let tok=this.loginService.getJwtToken();
    let id=id_user
    this.datos= new FormGroup({
      token:new FormControl(tok),
      id_user:new FormControl(id)
    });

    let param={
      token:this.datos.value.token,
      id_user:this.datos.value.id_user
    };

    const url='https://api.darmon.co/auth/get-single-user-view';

    return this.httpClient.post<Users>(url,param);
  }

  getMeUser(){
    let tok=this.loginService.getJwtToken();
    let id=this.loginService.getIdUser()
    this.datos= new FormGroup({
      token:new FormControl(tok),
      id_user:new FormControl(id)
    });

    let param={
      token:this.datos.value.token,
      id_user:this.datos.value.id_user
    };

    const url='https://api.darmon.co/auth/get-single-user-view';

    return this.httpClient.post<Users>(url,param);
  }

  deleteUser(id_user:number){
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

    const url= 'https://api.darmon.co/auth/delete-user';

    return this.httpClient.post<void>(url,param)

  }

}
