import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { LoginService } from './login.service';
import { HttpClient } from '@angular/common/http';
import { Clubs, Response } from '../models/club';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClubsService {

  datos!: FormGroup;
  length=1;

  constructor(
    private httpClient:HttpClient,
    private loginService:LoginService
    ) { }

  getClubs(){
    let tok=this.loginService.getJwtToken();

    this.datos= new FormGroup({
      token:new FormControl(tok),
    });

    let param={
      token:this.datos.value.token,
    };

    const url='https://api.darmon.co/auth/get-clubs';

    return this.httpClient.post<Clubs>(url,param);
  }

  getClubsArray(length:number):Observable<Response[]>{
    let tok=this.loginService.getJwtToken();

    this.datos= new FormGroup({
      token:new FormControl(tok),
      length:new FormControl(length),
    });

    let param={
      token:this.datos.value.token,
      length:this.datos.value.length,
    };

    const url='https://api.darmon.co/auth/get-clubs-array';

    return this.httpClient.post<Response[]>(url,param);
  }

  getSingleClubEdit(id_club:number){

    let tok=this.loginService.getJwtToken();
    let id = id_club;

    this.datos= new FormGroup({
      id_club:new FormControl(id),
      token:new FormControl(tok)
    });

    let param={
      id_club:this.datos.value.id_club,
      token:this.datos.value.token
    }

    const url = 'https://api.darmon.co/auth/get-single-club';

    return  this.httpClient.post<Response>(url,param)

  }

  getSingleClub(id_club:number){
    let tok=this.loginService.getJwtToken();

    this.datos= new FormGroup({
      token:new FormControl(tok),
      id_club:new FormControl(id_club)
    });

    let param={
      token:this.datos.value.token,
      id_club:this.datos.value.id_club
    };

    const url='https://api.darmon.co/auth/get-single-club-view';

    return this.httpClient.post<Clubs>(url,param);
  }

  deleteClub(id_club:number){
    let tok=this.loginService.getJwtToken();
    let id=id_club;

    this.datos= new FormGroup({
      id_club:new FormControl(id),
      token:new FormControl(tok)
    });

    let param={
      id_club:this.datos.value.id_club,
      token:this.datos.value.token,
    };

    const url= 'https://api.darmon.co/auth/delete-club';

    return this.httpClient.post<void>(url,param)

  }

}
