import { Injectable } from '@angular/core';
import { LoginService } from './login.service';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup } from '@angular/forms';
import { Entitie, Response } from '../models/entitie';

@Injectable({
  providedIn: 'root'
})
export class EntitiesService {

  datos!:FormGroup;

  constructor(
    private httpClient:HttpClient,
    private loginService:LoginService
  ) {

   }

   getEntities(){
    let tok=this.loginService.getJwtToken();

    this.datos= new FormGroup({
      token:new FormControl(tok),
    });

    let param={
      token:this.datos.value.token,
    };

    const url='https://api.darmon.co/auth/get-entities';

    return this.httpClient.post<Entitie>(url,param);

   }

   getSingleEntitieEdit(id_entitie:number){

    let tok=this.loginService.getJwtToken();
    let id = id_entitie;

    this.datos= new FormGroup({
      id_entitie:new FormControl(id),
      token:new FormControl(tok)
    });

    let param={
      id_entitie:this.datos.value.id_entitie,
      token:this.datos.value.token
    }

    const url = 'https://api.darmon.co/auth/get-single-entitie';

    return  this.httpClient.post<Response>(url,param)

  }

  getSingleEntitie(id_entitie:number){
    let tok=this.loginService.getJwtToken();
    let id=id_entitie
    this.datos= new FormGroup({
      token:new FormControl(tok),
      id_entitie:new FormControl(id)
    });

    let param={
      token:this.datos.value.token,
      id_entitie:this.datos.value.id_entitie
    };

    const url='https://api.darmon.co/auth/get-single-entitie-view';

    return this.httpClient.post<Entitie>(url,param);
  }

  deleteEntitie(id_entitie:number){
    let tok=this.loginService.getJwtToken();
    let id=id_entitie;

    this.datos= new FormGroup({
      id_entitie:new FormControl(id),
      token:new FormControl(tok)
    });

    let param={
      id_entitie:this.datos.value.id_entitie,
      token:this.datos.value.token,
    };

    const url= 'https://api.darmon.co/auth/delete-entitie';

    return this.httpClient.post<void>(url,param)

  }

}
