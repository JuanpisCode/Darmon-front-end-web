import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { catchError, mapTo, of, tap } from 'rxjs';
import { Tokens } from '../models/token';
import { ErrorInterceptor } from '../helpers/error.interceptor';
import jwt_decode from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  tokenForm!:FormGroup;
  error=false;

  private token= 'token';

  private id_user='id_user';

  constructor(private http:HttpClient){}


  login(user:{username:string,password:string,id_module:string,id_user:string,token:string}){

    const url = 'https://api.darmon.co/auth/login-admin';

    return this.http.post<any>(url,user).pipe(

      tap(
        tokens=>{
          this.doLogin(tokens);
        }),

        mapTo(true),
        catchError(error=>{
          return of (error.status)
        })
    )
  }

  private doLogin(tokens:Tokens){
    this.guardarTokens(tokens);
  }

 public expTiempoToken():boolean{

  return (this.expJwtToken()<0)

  }

  expJwtToken():number{

  return this.getDecodeToken().exp -(Date.now()/1000)
}

getJwtToken(){
return localStorage.getItem(this.token);
}

getIdUser(){
  return localStorage.getItem(this.id_user);
}

getIdUserParam(){

  const item= localStorage.getItem(this.id_user);
  return item ? JSON.parse(item):[];

}

isLoggedToken(){
    return !!this.getJwtToken()&& !this.expTiempoToken();
  }

isLoggedId(){
  return !!this.getIdUser();
}

private guardarTokens(tokens:Tokens){
  this.guardarId(tokens.id_user)
  this.guardarTokenJWT(tokens.token)
}

private guardarTokenJWT(token:string){

  localStorage.setItem(this.token,token)
}

private guardarId(id_user:string){
  localStorage.setItem(this.id_user,id_user)

}

private getDecodeToken():any{
  return jwt_decode(this.getJwtToken()!);
}

logOut(){

  let id=this.getIdUserParam();
  let tok='ksaisaiuisabt6tqt26632vgdvf632g72h2e8gdtf6defg7e2hfuib2eg73287hf7bg2c7wvg623vg76vdb8y32nf89n98nf276b2'

  this.tokenForm= new FormGroup({
    id_user:new FormControl(id),
    token:new FormControl(tok)
  })

  let param={
    id_user:this.tokenForm.value.id_user,
    token:this.tokenForm.value.token,
  }

  const url='https://api.darmon.co/auth/logout-admin';

  return this.http.post<void>(url,param);

}

 modifyTokenError(){

  let id=this.getIdUserParam();

  let tok=this.getJwtToken();

  this.tokenForm= new FormGroup({
    id_user:new FormControl(id),
    token:new FormControl(tok)
  });

  let param={
    id_user:this.tokenForm.value.id_user,
    token:this.tokenForm.value.token
  }

  const url='https://api.darmon.co/auth/validation-token';

  return this.http.post<any>(url,param);
}

tokenValidate(){
  this.modifyTokenError()
    .subscribe(resp => {
      this.error = resp === 409;
      ErrorInterceptor;
    })
}
}
