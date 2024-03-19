import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { LoginService } from './login.service';
import { Response, Sport } from '../models/sport';

@Injectable({
  providedIn: 'root'
})
export class SportsService {

  datos!: FormGroup;

  constructor(
    private httpClient:HttpClient,
    private loginService:LoginService
    ) { }

  getSports(){
    let tok=this.loginService.getJwtToken();

    this.datos= new FormGroup({
      token:new FormControl(tok),
    });

    let param={
      token:this.datos.value.token,
    };

    const url='https://api.darmon.co/auth/get-sports';

    return this.httpClient.post<Sport>(url,param);
  }

  getSportsArray(){
    let tok=this.loginService.getJwtToken();

    this.datos= new FormGroup({
      token:new FormControl(tok),
    });

    let param={
      token:this.datos.value.token,
    };

    const url='https://api.darmon.co/auth/get-sports-array';

    return this.httpClient.post<Response>(url,param);
  }

  getSingleSportEdit(id_sport:number){

    let tok=this.loginService.getJwtToken();
    let id = id_sport;

    this.datos= new FormGroup({
      id_sport:new FormControl(id),
      token:new FormControl(tok)
    });

    let param={
      id_sport:this.datos.value.id_sport,
      token:this.datos.value.token
    }

    const url = 'https://api.darmon.co/auth/get-single-sport';

    return  this.httpClient.post<Response>(url,param)

  }

  deleteSport(id_sport:number){
    let tok=this.loginService.getJwtToken();
    let id=id_sport;

    this.datos= new FormGroup({
      id_sport:new FormControl(id),
      token:new FormControl(tok)
    });

    let param={
      id_sport:this.datos.value.id_sport,
      token:this.datos.value.token,
    };

    const url= 'https://api.darmon.co/auth/delete-sport';

    return this.httpClient.post<void>(url,param)

  }

}
