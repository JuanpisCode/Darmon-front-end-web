import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';
import { UsersService } from 'src/app/services/users.service';
import { Location } from '@angular/common';
import * as Notiflix from 'notiflix';

@Component({
  selector: 'app-register-entities',
  templateUrl: './register-entities.component.html',
  styleUrls: ['./register-entities.component.scss']
})
export class RegisterEntitiesComponent {

  datos:FormGroup;
  dataSport:any;
  dataUser:any;
  keyword='name';
  item:any;
  private idUser='idUser';
  id_module:number;
  private emailPattern:any = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  length=1;

  constructor(
    private Httpclient:HttpClient,
    private loginService:LoginService,
    private _location:Location,
    private userServices:UsersService
    ) {

    let tok= this.loginService.getJwtToken();

    this.datos=new FormGroup({
      token:new FormControl(tok),
      name:new FormControl('',[Validators.required,Validators.minLength(1),Validators.maxLength(40)]),
      email:new FormControl('',[Validators.required,Validators.pattern(this.emailPattern)]),
      phone:new FormControl('',[Validators.required,Validators.minLength(1),Validators.maxLength(10)]),
    });

    this.id_module = 2

  }

  goBack(){
    this._location.back();
  }


  registerEntitie(){

    let idU=localStorage.getItem(this.idUser);

    let params={
      token:this.datos.value.token,
      name:this.datos.value.name,
      email:this.datos.value.email,
      phone:this.datos.value.phone,
      id_user:idU,
    }

    if(this.datos.valid){
      this.Httpclient.post('https://api.darmon.co/auth/register-entitie',params).subscribe(()=>{
        this._location.back();
        Notiflix.Notify.success('Entidad registrado');
        localStorage.removeItem(this.idUser);
      })
    }else{
      alert('Error! campos obligatorios');
    }
  }

  ngOnInit(): void {

    this.getUsers(this.length);

  }

  getUsers(length:number){
    this.userServices.getUsersClub(this.id_module,length)
    .subscribe(resp=>{
      this.dataUser=resp
    })
  }

  selectEventClient(item:any){
    localStorage.removeItem(this.idUser);
    localStorage.setItem(this.idUser, item.id_user)
  }

}
